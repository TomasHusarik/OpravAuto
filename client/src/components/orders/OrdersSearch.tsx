import { useEffect, useState } from 'react'
import OrdersTable from './OrdersTable'
import { getOrders } from '@/utils/api';
import { Order } from '@/types/Order';
import { Chip, Grid, Group, TextInput, Title } from '@mantine/core';
import { orderStatuses } from '@/utils/const';

const OrdersSearch = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [searchByOrder, setSearchByOrder] = useState<string>('');
    const [searchByName, setSearchByName] = useState<string>('');
    const [status, setStatus] = useState<string[]>([]);

    const filterData = async () => {
        const filtered = orders.filter((order) => {
            const matchesOrderId = order._id?.toLowerCase().includes(searchByOrder.toLowerCase());
            const matchesName = order.customer ? 
                (`${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchByName.toLowerCase())) 
                : false;
            const matchesStatus = status.length === 0 || (order.status && status.includes(order.status.replace(" ", "")));

            return matchesOrderId && matchesName && matchesStatus;
        });
        setFilteredOrders(filtered);
    };


    const loadData = async () => {
        try {
            const loadedOrders = await getOrders();
            setOrders(loadedOrders);
            setFilteredOrders(loadedOrders);
        } catch (error) {
            console.error('Failed to load customers:', error)
        }
    }

    useEffect(() => {
        filterData();
    }, [status, searchByName, searchByOrder]);

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
                        placeholder="Search by order ID"
                        value={searchByOrder}
                        onChange={(e) => setSearchByOrder(e.target.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        radius="xl"
                        size="md"
                        placeholder="Search by name"
                        value={searchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Chip.Group multiple value={status} onChange={setStatus}>
                        <Group justify="left" mt="md">
                            <Title order={4} mb={"10px"} c="var(--mantine-color-blue-light-color)">Status:</Title>
                            {Object.entries(orderStatuses).map(([key, label]) => (
                                <Chip key={key} value={key}>{label}</Chip>
                            ))}
                        </Group>
                    </Chip.Group>
                </Grid.Col>
                <Grid.Col span={12}>
                    <OrdersTable orders={filteredOrders} />
                </Grid.Col>
            </Grid>

        </>
    )
}

export default OrdersSearch