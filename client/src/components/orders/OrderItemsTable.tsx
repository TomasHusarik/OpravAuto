import { OrderItem } from '@/types/OrderItem';
import { ServiceItem } from '@/types/ServiceItem';
import { getServiceItems } from '@/utils/api';
import { Text, Autocomplete, NumberInput, Table, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

interface IOrderItemsTable {
    items?: OrderItem[];
    viewMode?: 'technician' | 'customer';
    handleItemChange?: (itemId: string, updatedValues: { [key: string]: any }) => void;
}

const OrderItemsTable = (props: IOrderItemsTable) => {
    const { items, handleItemChange, viewMode } = props;
    const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);

    const serviceItemNames = serviceItems.map((si) => si.name);

    const handleServiceItemChange = (item: OrderItem, value: string) => {
        if (!handleItemChange) return;

        handleItemChange(item._id, { label: value });

        const selectedItem = serviceItems.find((si) => si.name === value);

        if (selectedItem) {
            handleItemChange(item._id, {
                serviceItemId: selectedItem._id,
                label: selectedItem.name,
                unitPrice: selectedItem.defaultPrice,

            });
        }
    };

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

    return (
        <>
            <Table className="table">
                <Table.Thead>
                    <Table.Tr c="var(--mantine-color-blue-light-color)" fs={'bold'}>
                        <Table.Th style={{ width: '45%' }}>Item</Table.Th>
                        <Table.Th style={{ width: '15%' }}>Quantity</Table.Th>
                        <Table.Th style={{ width: '20%' }}>Unit Price (Kč)</Table.Th>
                        <Table.Th style={{ width: '20%' }}>Price (Kč)</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {items?.map((i) => (
                        <Table.Tr key={i._id}>
                            <Table.Td>
                                <Autocomplete
                                    placeholder="Select or type service item"
                                    data={serviceItemNames}
                                    clearable
                                    value={i.label || ''}
                                    onChange={(value) => handleServiceItemChange(i, value)}
                                    readOnly={viewMode === 'customer'}
                                />
                            </Table.Td>
                            <Table.Td>
                                <NumberInput
                                    radius="md"
                                    value={i.quantity}
                                    name="quantity"
                                    onChange={(value) =>
                                        handleItemChange(i._id, { quantity: value })
                                    }
                                    min={1}
                                    readOnly={viewMode === 'customer'}
                                />
                            </Table.Td>
                            <Table.Td>
                                <NumberInput
                                    radius="md"
                                    value={i.unitPrice}
                                    name="unitPrice"
                                    onChange={(value) =>
                                        handleItemChange(i._id, { unitPrice: value })
                                    }
                                    min={0}
                                    readOnly={viewMode === 'customer'}
                                />
                            </Table.Td>
                            <Table.Td>
                                <NumberInput
                                    radius="md"
                                    value={i.totalPrice}
                                    name="totalPrice"
                                    min={0}
                                    readOnly
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 10px', gap: '50px' }}>
                <div style={{ display: 'flex', gap: '40px', textAlign: 'right' }}>
                    <div style={{ minWidth: '150px' }}>
                        <Text fw={500} size="sm" c="gray">
                            Price without VAT
                        </Text>
                        <Text fw={700} size="lg">
                            {((items?.reduce((sum, i) => sum + (i.totalPrice || 0), 0) ?? 0) / 1.21).toFixed(2)} Kč
                        </Text>
                    </div>
                    <div style={{ minWidth: '150px' }}>
                        <Text fw={500} size="sm" c="gray">
                            VAT (21%)
                        </Text>
                        <Text fw={700} size="lg">
                            {((items?.reduce((sum, i) => sum + (i.totalPrice || 0), 0) ?? 0) - ((items?.reduce((sum, i) => sum + (i.totalPrice || 0), 0) ?? 0) / 1.21)).toFixed(2)} Kč
                        </Text>
                    </div>
                    <div style={{ minWidth: '150px' }}>
                        <Text fw={500} size="sm" c="gray">
                            Total Price (with VAT)
                        </Text>
                        <Text fw={700} size="lg">
                            {(items?.reduce((sum, i) => sum + (i.totalPrice || 0), 0) ?? 0).toFixed(2)} Kč
                        </Text>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderItemsTable;
