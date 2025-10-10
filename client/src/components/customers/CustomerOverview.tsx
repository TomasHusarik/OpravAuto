import { useEffect, useState } from 'react'
import { getCustomer } from '@/utils/api'
import { Customer } from '@/types/Customer';
import { Button, Grid, Textarea, TextInput, Title } from '@mantine/core';
import { IconArrowBackUp, IconAt, IconMapPin, IconPencil, IconPhone, IconUser } from '@tabler/icons-react';
import { getFullName } from '@/utils/helpers';
import { useNavigate } from 'react-router';
import CustomerDrawer from '@/components/customers/CustomerDrawer';

interface ICustomerOverview {
  customerId?: string;
}

const CustomerOverview = (props: ICustomerOverview) => {
  const { customerId } = props;
  const [customer, setCustomer] = useState<Customer>();

  const [userDrawer, setUserDrawer] = useState(false);

  const navigate = useNavigate();

  const loadData = async () => {
    const usr = await getCustomer(customerId!);
    setCustomer(usr);
  }

  useEffect(() => {
    loadData();
  }, [customerId]);

  return (
    <>

      {customer &&
        <Grid>
          <Grid.Col span={12}>
            <Title order={1} c="var(--mantine-color-blue-light-color)" mb="md">Customer Info</Title>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Full Name"
              placeholder="fullName"
              leftSection={<IconUser size={16} />}
              radius="md"
              size="md"
              name="fullName"
              value={getFullName(customer!) || ''}
              readOnly
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Email"
              placeholder="email"
              leftSection={<IconAt size={16} />}
              radius="md"
              size="md"
              name="email"
              value={customer?.email || ''}
              readOnly
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Phone"
              placeholder="phone"
              leftSection={<IconPhone size={16} />}
              radius="md"
              size="md"
              name="phone"
              value={customer?.phoneNumber || ''}
              readOnly
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Address"
              placeholder="address"
              leftSection={<IconMapPin size={16} />}
              radius="md"
              size="md"
              name="address"
              value={customer?.address || ''}
              readOnly
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Note"
              placeholder="note"
              radius="md"
              size="md"
              name="note"
              value={customer?.note || ''}
              readOnly
            />

          </Grid.Col>
          <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="light"
              radius="md"
              onClick={() => { navigate("/customers") }}
              leftSection={
                <IconArrowBackUp stroke={1.5} size={20} />
              }
            >
              Back
            </Button>
            <Button
              variant="light"
              radius="md"
              onClick={() => setUserDrawer(true)}
              leftSection={
                <IconPencil stroke={1.5} size={20} />
              }
            >
              Edit
            </Button>
          </Grid.Col>
          <Grid.Col span={12}>
            <Title order={2} c="var(--mantine-color-blue-light-color)" mb="md">Vehicles</Title>
          </Grid.Col>
        </Grid>
      }

      <CustomerDrawer userDrawer={userDrawer} setUserDrawer={setUserDrawer} customer={customer} setCustomer={setCustomer} onSaveSuccess={() => { loadData() }} />
    </>
  )
}

export default CustomerOverview