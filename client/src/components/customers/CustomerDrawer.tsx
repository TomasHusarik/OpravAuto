import { Customer } from '@/types/Customer';
import { addCustomer, updateCustomer } from '@/utils/api';
import { ActionIcon, Button, Drawer, Grid, TextInput, Title } from '@mantine/core'
import { IconAt, IconUser, IconPhone, IconMapPin, IconDeviceFloppy } from '@tabler/icons-react';
import em from "@/utils/errorMessages";
import { useState } from 'react';

interface ICustomerDrawer {
    userDrawer: boolean;
    customer?: Customer | null;
    setCustomer: (customer: Customer) => void;
    setUserDrawer: (value: boolean) => void;
    onSaveSuccess?: () => void;
}

const CustomerDrawer = (props: ICustomerDrawer) => {
    const { customer, userDrawer, setUserDrawer, setCustomer, onSaveSuccess } = props;
    const [error, setError] = useState<boolean>(false);

    const handleSave = async () => {

        if (!customer || !customer.firstName?.trim() || !customer.lastName?.trim() ||
            !customer.email?.trim() || !customer.phoneNumber?.trim() ||
            !customer.address?.trim()) {
            setError(true);
            return;
        }

        try {
            if (customer._id) {
                await updateCustomer(customer);
            } else {
                await addCustomer(customer);
            }
            setError(false);
            setUserDrawer(false);
            onSaveSuccess?.();
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    }

    const handleChange = (name: string, value: string) => {
        if (customer) {
            setCustomer({
                ...customer,
                [name]: value
            });
        }
    }

    return (
        <>
            <Drawer
                opened={userDrawer}
                onClose={() => {setUserDrawer(false); setError(false);}}
                position='right'
                size={"lg"}
            >

                <Grid px={20}>
                    <Grid.Col span={12}>
                        <Title order={1} c="var(--mantine-color-blue-light-color)"> {customer?._id ? `Edit Customer` : 'Create New Customer'}</Title>
                    </Grid.Col>
                    <Grid.Col span={12} />
                    <Grid.Col span={6}>
                        <TextInput
                            label="First Name"
                            placeholder="First Name"
                            leftSection={<IconUser size={16} />}
                            radius="md"
                            size="md"
                            name="firstName"
                            required
                            value={customer?.firstName || ''}
                            onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}
                            error={error && !customer?.firstName?.trim() ? em.mandatoryField : undefined}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Last Name"
                            placeholder="Last Name"
                            leftSection={<IconUser size={16} />}
                            radius="md"
                            size="md"
                            name="lastName"
                            required
                            value={customer?.lastName || ''}
                            onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}
                            error={error && !customer?.lastName?.trim() ? em.mandatoryField : undefined}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Email"
                            placeholder="Email"
                            leftSection={<IconAt size={16} />}
                            radius="md"
                            size="md"
                            name="email"
                            required
                            value={customer?.email || ''}
                            onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}
                            error={error && !customer?.email?.trim() ? em.mandatoryField : undefined}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Phone Number"
                            placeholder="Phone Number"
                            leftSection={<IconPhone size={16} />}
                            radius="md"
                            size="md"
                            name="phoneNumber"
                            required
                            value={customer?.phoneNumber || ''}
                            onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}
                            error={error && !customer?.phoneNumber?.trim() ? em.mandatoryField : undefined}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Address"
                            placeholder="Address"
                            leftSection={<IconMapPin size={16} />}
                            radius="md"
                            size="md"
                            name="address"
                            required
                            value={customer?.address || ''}
                            onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}
                            error={error && !customer?.address?.trim() ? em.mandatoryField : undefined}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Note"
                            placeholder="Note"
                            radius="md"
                            size="md"
                            name="note"
                            value={customer?.note || ''}
                            onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} />
                    <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="filled"
                            radius="md"
                            onClick={handleSave}
                            leftSection={
                                <ActionIcon size={20} radius="md" c="white" variant="subtle">
                                    <IconDeviceFloppy stroke={1.5} />
                                </ActionIcon>
                            }
                        >
                            Save
                        </Button>
                    </Grid.Col>
                </Grid>
            </Drawer>
        </>
    )
}

export default CustomerDrawer