import { Customer } from '@/types/Customer';
import { addCustomer, updateCustomer } from '@/utils/api';
import { Button, Drawer, Grid, Textarea, TextInput, Title } from '@mantine/core'
import { IconAt, IconUser, IconPhone, IconMapPin, IconDeviceFloppy } from '@tabler/icons-react';
import em from "@/utils/errorMessages";
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

interface ICustomerDrawer {
    userDrawer: boolean;
    customer?: Customer;
    setCustomer: (customer: Customer) => void;
    setUserDrawer: (value: boolean) => void;
    onSaveSuccess?: () => void;
}

const CustomerDrawer = (props: ICustomerDrawer) => {
    const { customer, userDrawer, setUserDrawer, onSaveSuccess } = props;
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm({
        initialValues: {
            _id: customer?._id,
            firstName: customer?.firstName || '',
            lastName: customer?.lastName || '',
            email: customer?.email || '',
            phoneNumber: customer?.phoneNumber || '',
            address: customer?.address || '',
            note: customer?.note || '',
        },
        validate: {
            firstName: (val: string) => (val?.trim() ? null : em.mandatoryField),
            lastName: (val: string) => (val?.trim() ? null : em.mandatoryField),
            email: (val: string) => !val?.trim() ? em.mandatoryField : (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            phoneNumber: (val: string) => (val?.trim() ? null : em.mandatoryField),
            address: (val: string) => (val?.trim() ? null : em.mandatoryField),
        },
    });
    
    useEffect(() => {
        form.setValues({
            _id: customer?._id,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            email: customer?.email,
            phoneNumber: customer?.phoneNumber,
            address: customer?.address,
            note: customer?.note,
        });
    }, [customer]);

    const handleSave = async (values: typeof form.values) => {
        setIsSaving(true);
        try {
            if (values._id) {
                await updateCustomer(values);
            } else {
                await addCustomer(values);
            }
            setUserDrawer(false);
            onSaveSuccess?.();
        } catch (error) {
            console.error('Error saving customer:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <Drawer
                opened={userDrawer}
                onClose={() => { setUserDrawer(false); }}
                position='right'
                size={"lg"}
            >

                <form onSubmit={form.onSubmit((values) => handleSave(values))}>
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
                                value={form.values.firstName}
                                onChange={(e) => form.setFieldValue('firstName', e.currentTarget.value)}
                                error={form.errors.firstName}
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
                                value={form.values.lastName}
                                onChange={(e) => form.setFieldValue('lastName', e.currentTarget.value)}
                                error={form.errors.lastName}
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
                                value={form.values.email}
                                onChange={(e) => form.setFieldValue('email', e.currentTarget.value)}
                                error={form.errors.email}
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
                                value={form.values.phoneNumber}
                                onChange={(e) => form.setFieldValue('phoneNumber', e.currentTarget.value)}
                                error={form.errors.phoneNumber}
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
                                value={form.values.address}
                                onChange={(e) => form.setFieldValue('address', e.currentTarget.value)}
                                error={form.errors.address}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Textarea
                                label="Note"
                                placeholder="Note"
                                radius="md"
                                size="md"
                                name="note"
                                value={form.values.note}
                                onChange={(e) => form.setFieldValue('note', e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={12} />
                        <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="light"
                                radius="md"
                                loading={isSaving}
                                leftSection={
                                    <IconDeviceFloppy stroke={1.5} size={20} />
                                }
                            >
                                Save
                            </Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Drawer>
        </>
    )
}

export default CustomerDrawer