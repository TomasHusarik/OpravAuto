import { useEffect, useState } from 'react'
import { ActionIcon, Drawer, Grid, TextInput, Title, Tooltip } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconUserPlus } from '@tabler/icons-react'
import CustomersTable from '@/components/customers/CustomersTable'
import { getCustomers } from '@/utils/api'
import { Customer } from '@/types/Customer'
import { removeDiacritics } from '@/utils/helpers'

const CustomerSearch = () => {
    const [userDrawer, setUserDrawer] = useState<boolean>(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 150);

    const maxUsers: number = 10


    const loadData = async () => {
        try {
            const loadedCustomers = await getCustomers();
            setCustomers(loadedCustomers);
            setFilteredCustomers(loadedCustomers
                .sort((a: Customer, b: Customer) => a.lastName.localeCompare(b.lastName))
                .slice(0, maxUsers));
        } catch (error) {
            console.error('Failed to load customers:', error)
        }

    }

    // Filter customers when debounced search value changes
    useEffect(() => {
        const searchTerm = removeDiacritics(debouncedSearchValue);

        if (searchTerm.length < 3) {
            setFilteredCustomers(customers
                .sort((a: Customer, b: Customer) => a.lastName.localeCompare(b.lastName))
                .slice(0, maxUsers));
        } else {
            const filtered = customers.filter(customer => (
                removeDiacritics(customer.firstName).includes(searchTerm) ||
                removeDiacritics(customer.lastName).includes(searchTerm)
            ))
                .sort((a, b) => a.firstName.localeCompare(b.firstName))
                .slice(0, maxUsers);

            setFilteredCustomers(filtered);
        }
    }, [debouncedSearchValue, customers]);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Grid>
                <Grid.Col span={12}>
                    <Title order={1} mb="md">Search Customers</Title>
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        radius="xl"
                        size="md"
                        placeholder="Search by name"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        rightSection={
                            <Tooltip label="Add new customer">
                                <ActionIcon size={32} radius="xl" variant="subtle" onClick={() => setUserDrawer(true)} >
                                    <IconUserPlus stroke={1.5} />
                                </ActionIcon>
                            </Tooltip>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={6} />
                <Grid.Col span={12} />
                <Grid.Col span={12}>
                    <CustomersTable filteredCustomers={filteredCustomers} setUserDrawer={setUserDrawer} />
                </Grid.Col>
            </Grid>

            <Drawer opened={userDrawer} onClose={() => setUserDrawer(false)} title="Add New Customer" position='right' size={'lg'}>
                {/* Drawer content */}
            </Drawer>
        </>
    )
}

export default CustomerSearch