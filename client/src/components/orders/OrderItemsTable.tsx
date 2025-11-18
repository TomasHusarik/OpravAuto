import { OrderItem } from '@/types/OrderItem';
import { ServiceItem } from '@/types/ServiceItem';
import { getServiceItems } from '@/utils/api';
import { NumberInput, Table } from '@mantine/core';
import { useEffect, useState } from 'react';

interface IOrderItemsTable {
    items?: OrderItem[];
    viewMode?: 'technician' | 'customer';
    handleItemChange?: (itemId: string, updatedValues: { [key: string]: any }) => void;
}

const OrderItemsTable = (props: IOrderItemsTable) => {
    const { items, handleItemChange, viewMode } = props;
    const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);

    useEffect(() => {
        const loadService = async () => {
            try {
                const serviceItems = await getServiceItems();
                setServiceItems(serviceItems);
            } catch (error) {
                console.error('Failed to load service items:', error);
            }
        };
        loadService();
    }, []);

    console.log('OrderItemsTable items:', items);

    return (
        <Table className='table'>
            <Table.Thead >
                <Table.Tr c="var(--mantine-color-blue-light-color)" fs={'bold'} >
                    <Table.Th>Item</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Unit Price</Table.Th>
                    <Table.Th>Price</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {items?.map((i) => (
                    <Table.Tr key={i._id}>
                        <Table.Td>{i.label}</Table.Td>
                        <Table.Td>
                            <NumberInput
                                radius="md"
                                value={i.quantity}
                                name='quantity'
                                onChange={(value) => handleItemChange(i._id, { quantity: value })}
                                min={1}
                                disabled={viewMode === 'customer'}
                            />
                        </Table.Td>
                        <Table.Td>
                            <NumberInput
                                radius="md"
                                value={i.unitPrice}
                                name='unitPrice'
                                onChange={(value) => handleItemChange(i._id, { unitPrice: value })}
                                min={0}
                                disabled={viewMode === 'customer'}
                            />
                        </Table.Td>
                        <Table.Td>
                            <NumberInput
                                radius="md"
                                value={i.totalPrice}
                                name='totalPrice'
                                min={0}
                                readOnly={true}
                            />
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}

export default OrderItemsTable