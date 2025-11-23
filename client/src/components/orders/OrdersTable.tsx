import { Order } from '@/types/Order';
import { deleteOrder } from '@/utils/api';
import { ActionIcon, NumberInput, Pagination, Table } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IOrdersTable {
    orders: Order[];
}

const OrdersTable = (props: IOrdersTable) => {
    const { orders } = props;

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // debounce pageSize so table recalculation happens after user stops changing the input
    const [debouncedPageSize] = useDebouncedValue(pageSize, 700);

    const navigate = useNavigate();

    const totalPages = Math.ceil(orders.length / debouncedPageSize);
    const paginatedOrders = orders
        .sort((a, b) => a.createdAt!.localeCompare(b.createdAt!))
        .slice((page - 1) * debouncedPageSize, page * debouncedPageSize)

    const handleDeleteOrder = (orderId: string) => {
        try {
            deleteOrder(orderId);
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    }

    return (
            <div className="table-container">
                <Table className='table' striped highlightOnHover highlightOnHoverColor='var(--mantine-color-blue-light)'>
                    <Table.Thead >
                        <Table.Tr c="var(--mantine-color-blue-light-color)" fs={'bold'}>
                            <Table.Th>Order</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Customer</Table.Th>
                            <Table.Th>Total cost</Table.Th>
                            <Table.Th>Delete</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {paginatedOrders?.map((o) => (
                            <Table.Tr key={o._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/order?orderId=${o._id}`)}>
                                <Table.Td>{o._id}</Table.Td>
                                <Table.Td>{o.status}</Table.Td>
                                <Table.Td>{o.customer?.firstName} {o.customer?.lastName}</Table.Td>
                                <Table.Td>{`${o.totalCost} Kč`}</Table.Td>
                                <Table.Td>
                                    <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => { e.stopPropagation(); handleDeleteOrder(o._id!); }}>
                                        <IconTrash stroke={1.5} />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 20, marginTop: 16 }}>
                    <div>
                        <Pagination
                            value={page}
                            onChange={setPage}
                            total={totalPages}
                        />
                    </div>

                    <div>
                        <NumberInput
                            radius="md"
                            size="md"
                            name="pageSize"
                            min={1}
                            max={orders.length}
                            value={pageSize}
                            onChange={(value) => setPageSize(value as number)}
                            style={{ width: 100 }}
                        />
                    </div>
                </div>
            </div>
        )
    }

    export default OrdersTable