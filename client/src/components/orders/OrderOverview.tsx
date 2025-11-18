import { Order } from '@/types/Order';
import { getOrder } from '@/utils/api';
import { getFullName, getVehicleName } from '@/utils/helpers';
import { Grid, Select, Switch, TextInput } from '@mantine/core';
import { IconCar, IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react'

interface IOrderOverview {
    orderId: string;
}

type ViewMode = 'technician' | 'customer';

const OrderOverview = (props: IOrderOverview) => {
    const { orderId } = props;

    const [viewMode, setViewMode] = useState<ViewMode>('technician');
    const [order, setOrder] = useState<Order>();

    const handleEditFormChange = (updatedValues: any) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            ...updatedValues,
        }));
    };

    const loadData = async () => {
        if (!orderId) return;

        try {
            const ord = await getOrder(orderId!);
            setOrder(ord);
        } catch (error) {
            console.error('Failed to load customer:', error);
        }
    }

    // const handleEditFormChange = (value: any, name: string) => {
    //     setOrder((prevOrder) => ({
    //         ...prevOrder!,
    //         [name]: value,
    //     }));
    // };

    useEffect(() => {
        loadData();
    }, []);

    console.log('order overview order:', order?.vehicle);

    return (
        <Grid>
            <Grid.Col span={12}>
                <Switch
                    checked={viewMode === 'technician'}
                    label="Switch mode"
                    description={viewMode === 'technician' ? "now you are using technician view mode" : "now you are using customer view mode"}
                    size="md"
                    onChange={(event) => setViewMode(event.currentTarget.checked ? 'technician' : 'customer')}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Order ID"
                    leftSection={<IconUser size={16} />}
                    radius="md"
                    size="md"
                    name="orderId"
                    value={order?._id || ''}
                    readOnly
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Full Name"
                    leftSection={<IconUser size={16} />}
                    radius="md"
                    size="md"
                    name="fullName"
                    value={getFullName(order?.customer!) || ''}
                    readOnly
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Select
                    label="Vehicle"
                    leftSection={<IconCar size={16} />}
                    radius="md"
                    size="md"
                    name="vehicle"
                    value={order?.vehicle?._id || ''}
                    data={order?.customer?.vehicles?.map(v => ({ value: v._id, label: getVehicleName(v) })) || []}
                    onChange={(vehicleId) => {
                        const vehicleObj = order?.customer?.vehicles?.find(v => v._id === vehicleId) || undefined;
                        handleEditFormChange({ vehicle: vehicleObj });
                    }}
                    readOnly={viewMode === 'customer'}
                />
            </Grid.Col>
        </Grid>
    )
}

export default OrderOverview