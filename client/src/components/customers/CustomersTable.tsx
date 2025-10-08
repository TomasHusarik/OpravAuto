import { Customer } from '@/types/Customer';
import { deleteCustomer } from '@/utils/api';
import { ActionIcon, Table } from '@mantine/core'
import { IconTrash, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

interface ICustomersTable {
    filteredCustomers: Customer[];
    setSelectedCustomer: (customer: Customer) => void;
    setUserDrawer: (value: boolean) => void;
    loadData?: () => void;
}

const CustomersTable = (props: ICustomersTable) => {
    const { filteredCustomers, setUserDrawer, setSelectedCustomer, loadData } = props;

    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this customer?');
        if (!confirmed) return;
        await deleteCustomer(id);
        loadData?.();
    }

    const handleCustomerClick = (customer: Customer) => {
        setSelectedCustomer(customer);
        setUserDrawer(true);
    }

    return (
        <>
            <Table striped highlightOnHover highlightOnHoverColor='var(--mantine-color-blue-light)'>
                <Table.Thead>
                    <Table.Tr c="var(--mantine-color-blue-light-color)" fs={'bold'} fz={'md'}>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Phone</Table.Th>
                        <Table.Th>Adress</Table.Th>
                        <Table.Th>Info</Table.Th>
                        <Table.Th>Delete</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredCustomers.map((c) => (
                        <Table.Tr key={c._id} style={{ cursor: 'pointer' }} onClick={() => handleCustomerClick(c)}>
                            <Table.Td>{c.firstName} {c.lastName}</Table.Td>
                            <Table.Td>{c.email}</Table.Td>
                            <Table.Td>{c.phoneNumber}</Table.Td>
                            <Table.Td>{c.address}</Table.Td>
                            <Table.Td>
                                <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => { e.stopPropagation(); navigate(`/customer?customerId=${c._id}`) }}>
                                    <IconUser stroke={1.5} />
                                </ActionIcon>
                            </Table.Td>
                            <Table.Td>
                                <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => { e.stopPropagation(); handleDelete(c._id!); }}>
                                    <IconTrash stroke={1.5} />
                                </ActionIcon>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    )
}

export default CustomersTable