import { Order } from '@/types/Order';
import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IOrdersTable {
    orders: Order[];
}

const pageSize = 10;

const OrdersTable = (props: IOrdersTable) => {
    const { orders } = props;

    const [page, setPage] = useState(1);


    const navigate = useNavigate();

    const totalPages = Math.ceil(orders.length / pageSize);
    const paginatedOrders = orders
        .sort((a, b) => a.createdAt!.localeCompare(b.createdAt!))
        .slice((page - 1) * pageSize, page * pageSize)

    return (
        <div className="table-container">
            <Table className='table' striped highlightOnHover highlightOnHoverColor='var(--mantine-color-blue-light)'>
                <Table.Thead >
                    <Table.Tr c="var(--mantine-color-blue-light-color)" fs={'bold'}>
                        <Table.Th>Order</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Customer</Table.Th>
                        <Table.Th>Total cost</Table.Th>
                        <Table.Th>Edit</Table.Th>
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
                                <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => { e.stopPropagation() }}>
                                    <IconEdit stroke={1.5} />
                                </ActionIcon>
                            </Table.Td>
                            <Table.Td>
                                <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => { e.stopPropagation(); }}>
                                    <IconTrash stroke={1.5} />
                                </ActionIcon>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <Pagination
                value={page}
                onChange={setPage}
                total={totalPages}
                mt="md"
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
            />
        </div>
    )
}

export default OrdersTable