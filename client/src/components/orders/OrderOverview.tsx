import { Customer } from '@/types/Customer';
import { Order } from '@/types/Order';
import { Vehicle } from '@/types/Vehicle';
import { approveOrder, createOrder, downloadInvoice, getCustomers, getCustomerVehicles, getNewId, getOrder, updateOrder } from '@/utils/api';
import { getFullName, getVehicleName, showErrorNotification, showSuccessNotification } from '@/utils/helpers';
import { Button, Grid, Select, Switch, TextInput, Title } from '@mantine/core';
import { IconCar, IconCheck, IconClipboardList, IconDeviceFloppy, IconDownload, IconPlus, IconUser, IconListCheck } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react'
import OrderItemsTable from './OrderItemsTable';
import { useAuthContext } from '@/utils/authTypes';

interface IOrderOverview {
    orderId: string;
}

type ViewMode = 'technician' | 'customer';

const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
];

const OrderOverview = (props: IOrderOverview) => {
    const { orderId } = props;
    const isNew = !orderId;

    const { userType } = useAuthContext();

    const [viewMode, setViewMode] = useState<ViewMode>(userType);

    const [order, setOrder] = useState<Order>();
    const [customers, setCustomers] = useState<Customer[]>();
    const [vehicles, setVehicles] = useState<Vehicle[]>();

    const [selectedCustomerId, setSelectedCustomerId] = useState<string>();
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>();

    const [saving, setSaving] = useState<boolean>(false);
    const [loadingApprove, setLodadingApprove] = useState<boolean>(false);

    const handleItemChange = useCallback((itemId: string, updatedValues: any) => {
        setOrder(prevOrder => {
            const updatedItems = prevOrder?.items?.map(item => {
                if (item._id === itemId) {
                    const updated = { ...item, ...updatedValues };
                    updated.totalPrice = updated.quantity * updated.unitPrice;
                    return updated;
                }
                return item;
            }) || [];

            const totalCost = updatedItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

            return {
                ...prevOrder,
                items: updatedItems,
                totalCost: totalCost
            };
        });
    }, []);

    const handleAddItem = async () => {
        const newId = await getNewId();

        const newItem: any = {
            _id: newId,
            label: '',
            quantity: 1,
            unitPrice: 0,
            totalPrice: 0,
        };

        console.log('Adding new item:', newItem);

        setOrder(prevOrder => ({
            ...prevOrder,
            items: [...(prevOrder?.items || []), newItem],
        }));
    }

    const customerOptions = customers?.map(c => ({
        value: c._id,
        label: getFullName(c)
    })) || [];

    const vehicleOptions = vehicles?.map(v => ({
        value: v._id,
        label: getVehicleName(v)
    })) || [];

    const handleDownloadInvoice = async () => {
        try {
            setSaving(true);
            const blob = await downloadInvoice(order?._id);
            const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${order?._id}.pdf`;
            a.click();
        } catch (error) {
            console.error('Failed to download invoice:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleApprove = async () => {
        try {
            setLodadingApprove(true);
            await approveOrder(order?._id);
        }
        catch (error) {
            console.error('Failed to approve order:', error);
        }
        finally {
            setLodadingApprove(false);
            loadData();
        }
    }

    const loadData = async () => {

        if (userType === 'technician') {
            try {
                const loadedCustomers = await getCustomers();
                setCustomers(loadedCustomers);
            } catch (error) {
                console.error('Failed to load customers:', error);
            }
        }

        if (!orderId) {
            setOrder({ _id: await getNewId() });
            return;
        }

        try {
            const ord = await getOrder(orderId!);
            setOrder(ord);
            setSelectedCustomerId(ord.customer?._id);
            setSelectedVehicleId(ord.vehicle?._id);
        } catch (error) {
            console.error('Failed to load customer:', error);
        }

    }

    const loadVehicles = async () => {
        if (viewMode === 'technician') {

            if (!selectedCustomerId) {
                setVehicles([]);
                setSelectedVehicleId(null);
                return;
            }

            try {
                const vehicles = await getCustomerVehicles(selectedCustomerId);
                setVehicles(vehicles);
            } catch (error) {
                console.error('Failed to load vehicles for customer:', error);
            }
        } else {
            setVehicles(order.customer.vehicles);
            // Also set customer if userRole is customer
            setCustomers([order.customer]);
        }
    }

    useEffect(() => {
        loadVehicles();
    }, [selectedCustomerId]);

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async () => {
        setSaving(true);

        if (!selectedCustomerId || !selectedVehicleId) {
            return;
        }

        const payload = {
            _id: order?._id,
            status: order?.status ?? "Pending",
            totalCost: order?.totalCost ?? 0,
            notes: order?.notes ?? "",
            customer: selectedCustomerId,
            vehicle: selectedVehicleId,
            items: order?.items
        };

        try {
            setSaving(true);
            if (isNew) {
                await createOrder(payload);
            } else {
                await updateOrder(payload);
            }
            showSuccessNotification('Order saved successfully');
        } catch (error) {
            console.error('Failed to save order:', error);
            showErrorNotification('Failed to save order');
        } finally {
            setSaving(false);
        }
    };

    console.log(order)

    return (
        <Grid>
            <Grid.Col span={12}>
                <Title order={1} c="var(--mantine-color-blue-light-color)" mb="md">Order Info</Title>
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Order ID"
                    leftSection={<IconClipboardList size={16} />}
                    radius="md"
                    size="md"
                    name="orderId"
                    value={order?._id || ''}
                    readOnly
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Select
                    label="Customer Name"
                    leftSection={<IconUser size={16} />}
                    radius="md"
                    size="md"
                    name="customer"
                    searchable
                    clearable
                    maxDropdownHeight={300}
                    data={customerOptions}
                    value={selectedCustomerId}
                    onChange={(value) => { setSelectedCustomerId(value) }}
                    readOnly={viewMode === 'customer'}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Select
                    label="Vehicle"
                    leftSection={<IconCar size={16} />}
                    radius="md"
                    size="md"
                    name="vehicle"
                    value={selectedVehicleId}
                    data={vehicleOptions}
                    onChange={(value) => setSelectedVehicleId(value)}
                    readOnly={viewMode === 'customer' && !selectedCustomerId}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Select
                    label="Status"
                    leftSection={<IconListCheck size={16} />}
                    radius="md"
                    size="md"
                    name="status"
                    data={statusOptions}
                    value={order?.status}
                    onChange={(value) => setOrder({ ...order, status: value || 'Pending' })}
                    readOnly={viewMode === 'customer'}
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <OrderItemsTable items={order?.items} viewMode={viewMode} handleItemChange={handleItemChange} />
            </Grid.Col>
            {viewMode === 'technician' &&
                <>
                    <Grid.Col span={6}>
                        <Button
                            variant="light"
                            radius="md"
                            onClick={handleAddItem}
                            leftSection={
                                <IconPlus stroke={1.5} size={20} />
                            }
                        >
                            Add Item
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="light"
                            radius="md"
                            loading={saving}
                            onClick={handleSubmit}
                            leftSection={
                                <IconDeviceFloppy stroke={1.5} size={20} />
                            }
                        >
                            Save
                        </Button>
                    </Grid.Col>
                </>
            }
            <Grid.Col span={6}>
                {viewMode === 'customer' && order?.status === 'Pending' &&
                    <Button
                        variant="light"
                        radius="md"
                        loading={loadingApprove}
                        onClick={handleApprove}
                        leftSection={
                            <IconCheck stroke={1.5} size={20} />
                        }
                    >
                        Approve
                    </Button>
                }
            </Grid.Col>

            {viewMode === 'customer' &&


                <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="light"
                        radius="md"
                        onClick={handleDownloadInvoice}
                        loading={saving}
                        leftSection={
                            <IconDownload stroke={1.5} size={20} />
                        }
                    >
                        Invoice
                    </Button>
                </Grid.Col>
            }
        </Grid>
    );
}

export default OrderOverview