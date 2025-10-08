import { useEffect, useState } from 'react'
import { ActionIcon, Grid, TextInput, Title, Tooltip } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconUserPlus } from '@tabler/icons-react'
import CustomersTable from '@/components/customers/CustomersTable'
import { getCustomers } from '@/utils/api'
import { Customer } from '@/types/Customer'
import { removeDiacritics } from '@/utils/helpers'
import CustomerDrawer from '@/components/customers/CustomerDrawer'

const CustomerSearch = () => {
    const [formData, setFormData] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

    const [searchValue, setSearchValue] = useState<string>('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 150);

    const [userDrawer, setUserDrawer] = useState<boolean>(false);

    const maxUsers: number = 8;

    const loadData = async () => {
        try {
            const loadedCustomers: Customer[] = await getCustomers();
            setFormData(loadedCustomers);
            setFilteredCustomers(loadedCustomers
                .sort((a: Customer, b: Customer) => a.lastName!.localeCompare(b.lastName!))
                .slice(0, maxUsers));
        } catch (error) {
            console.error('Failed to load customers:', error)
        }

    }

    // Filter customers when debounced search value changes
    useEffect(() => {
        const searchTerm = removeDiacritics(debouncedSearchValue);

        if (searchTerm.length < 3) {
            setFilteredCustomers(formData
                .sort((a: Customer, b: Customer) => a.lastName!.localeCompare(b.lastName!))
                .slice(0, maxUsers));
        } else {
            const filtered = formData.filter(customer => (
                removeDiacritics(customer.firstName!).includes(searchTerm) ||
                removeDiacritics(customer.lastName!).includes(searchTerm)
            ))
                .sort((a, b) => a.firstName!.localeCompare(b.firstName!))
                .slice(0, maxUsers);

            setFilteredCustomers(filtered);
        }
    }, [debouncedSearchValue, formData]);

    useEffect(() => {
        loadData();
    }, []);

    console.log(selectedCustomer)

    return (
        <>
            <Grid>
                <Grid.Col span={12}>
                    <Title order={1} c="var(--mantine-color-blue-light-color)" mb="md">Search Customers</Title>
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
                                <ActionIcon size={32} radius="xl" variant="subtle" onClick={() => {setSelectedCustomer({}); setUserDrawer(true);}} >
                                    <IconUserPlus stroke={1.5} />
                                </ActionIcon>
                            </Tooltip>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={6} />
                <Grid.Col span={12} />
                <Grid.Col span={12}>
                    <CustomersTable filteredCustomers={filteredCustomers} setUserDrawer={setUserDrawer} setSelectedCustomer={setSelectedCustomer} loadData={loadData}/>
                </Grid.Col>
            </Grid>
            
            <CustomerDrawer 
                customer={selectedCustomer} 
                setCustomer={setSelectedCustomer} 
                userDrawer={userDrawer} 
                setUserDrawer={setUserDrawer}
                onSaveSuccess={loadData}
            />
        </>
    )
}

export default CustomerSearch