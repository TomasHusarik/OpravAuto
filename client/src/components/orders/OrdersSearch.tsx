import { useEffect, useState } from 'react'
import OrdersTable from './OrdersTable'
import { getOrders } from '@/utils/api';
import { Order } from '@/types/Order';
import { ActionIcon, Chip, Grid, Group, TextInput, Title, Tooltip } from '@mantine/core';
import { orderStatuses } from '@/utils/const';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const OrdersSearch = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [inputFilter, setInputFilter] = useState<string>('');
    const [status, setStatus] = useState<string[]>(['Pending', 'InProgress']);

    const navigate = useNavigate();

    const filterData = (ordersToFilter: Order[]) => {
        const filtered = ordersToFilter.filter((order) => {
            const matchesOrderId = order._id?.toLowerCase().includes(inputFilter.toLowerCase());
            const matchesName = order.customer ?
                (`${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(inputFilter.toLowerCase()))
                : false;
            const matchesStatus = status.length === 0 || (order.status && status.includes(order.status.replace(" ", "")));

            return (matchesOrderId || matchesName) && matchesStatus;
        });
        setFilteredOrders(filtered);
    };

    const loadData = async () => {
        try {
            const loadedOrders = await getOrders();
            setOrders(loadedOrders);
            filterData(loadedOrders);
        } catch (error) {
            console.error('Failed to load orders:', error)
        }
    }

    useEffect(() => {
        filterData(orders);
    }, [status, inputFilter, orders]);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Grid>
                <Grid.Col span={12}>
                    <Title order={1} c="var(--mantine-color-blue-light-color)" mb="md">Search Orders</Title>
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        radius="xl"
                        size="md"
                        placeholder="Search by Order ID or Customer Name"
                        value={inputFilter}
                        onChange={(e) => setInputFilter(e.target.value)}
                        rightSection={
                            <Tooltip label="Add new order">
                                <ActionIcon size={32} radius="xl" variant="subtle" onClick={() => navigate('/order')} >
                                    <IconPlus stroke={1.5} />
                                </ActionIcon>
                            </Tooltip>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Chip.Group multiple value={status} onChange={setStatus}>
                        <Group justify="left" mt="md">
                            {/* <Title order={4} mb={"10px"} c="var(--mantine-color-blue-light-color)">Status:</Title> */}
                            {Object.entries(orderStatuses).map(([key, label]) => (
                                <Chip key={key} value={key}>{label}</Chip>
                            ))}
                        </Group>
                    </Chip.Group>
                </Grid.Col>
                <Grid.Col span={12}>
                    <OrdersTable orders={filteredOrders} loadData={loadData} />
                </Grid.Col>
            </Grid>

        </>
    )
}

export default OrdersSearch