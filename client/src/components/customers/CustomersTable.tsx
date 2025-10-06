import { Customer } from '@/types/Customer';
import { ActionIcon, Table } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react';

interface ICustomersTable {
    filteredCustomers: Customer[];
    setUserDrawer: (value: boolean) => void;
}

const CustomersTable = (props: ICustomersTable) => {
    const { filteredCustomers, setUserDrawer } = props;

    return (
        <Table striped highlightOnHover highlightOnHoverColor='var(--mantine-color-blue-light)'>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Phone</Table.Th>
                    <Table.Th>Adress</Table.Th>
                    <Table.Th>Delete</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {filteredCustomers?.map((customer) => (
                    <Table.Tr key={customer._id} style={{ cursor: 'pointer' }} onClick={() => setUserDrawer(true)}>
                        <Table.Td>{customer.firstName} {customer.lastName}</Table.Td>
                        <Table.Td>{customer.email}</Table.Td>
                        <Table.Td>{customer.phoneNumber}</Table.Td>
                        <Table.Td>{customer.address}</Table.Td>
                        <Table.Td>
                            <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => e.stopPropagation()} >
                                <IconTrash stroke={1.5} />
                            </ActionIcon>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}

export default CustomersTable