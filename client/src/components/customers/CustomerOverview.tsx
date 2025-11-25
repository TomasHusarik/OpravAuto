import { useEffect, useState } from 'react'
import { getCustomer, deleteVehicle } from '@/utils/api'
import { Customer } from '@/types/Customer';
import { Vehicle } from '@/types/Vehicle'
import { ActionIcon, Button, Grid, Table, Textarea, TextInput, Title } from '@mantine/core';
import { IconEdit, IconTrash, IconArrowBackUp, IconAt, IconMapPin, IconPencil, IconPhone, IconUser, IconPlus } from '@tabler/icons-react';
import { getFullName, showErrorNotification, showSuccessNotification } from '@/utils/helpers';
import { useNavigate } from 'react-router';
import CustomerDrawer from '@/components/customers/CustomerDrawer';
import VehicleDrawer from '@/components/customers/VehicleDrawer';

interface ICustomerOverview {
  customerId?: string;
}


const CustomerOverview = (props: ICustomerOverview) => {
  const { customerId } = props;

  const [customer, setCustomer] = useState<Customer>();

  const [userDrawer, setUserDrawer] = useState(false);

  const [vehicleDrawer, setVehicleDrawer] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  const navigate = useNavigate();

  const loadData = async () => {
    if (!customerId) return;

    try {
      const usr = await getCustomer(customerId!);
      setCustomer(usr);
    } catch (error) {
      console.error('Failed to load customer:', error);
    }
  }


  useEffect(() => {
    loadData();
  }, [customerId]);

  const editVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setVehicleDrawer(true);
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmed) return;
    try {
      await deleteVehicle(id);
      loadData();
      showSuccessNotification('Vehicle deleted successfully');
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      showErrorNotification('Failed to delete vehicle');
    }
  }

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
                Edit Customer
              </Button>
          </Grid.Col>
          <Grid.Col span={12}>
            <Table className='table' striped highlightOnHover highlightOnHoverColor='var(--mantine-color-blue-light)'>
              <Table.Thead >
                <Table.Tr c="var(--mantine-color-blue-light-color)" fs={'bold'}>
                  <Table.Th>Vehicle</Table.Th>
                  <Table.Th>Year</Table.Th>
                  <Table.Th>Mileage</Table.Th>
                  <Table.Th>Engine</Table.Th>
                  <Table.Th>Color</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {customer.vehicles?.map((v) => (
                  <Table.Tr key={v._id} style={{ cursor: 'pointer' }}>
                    <Table.Td>{v.make} {v.model}</Table.Td>
                    <Table.Td>{v.year}</Table.Td>
                    <Table.Td>{v.mileage?.toLocaleString() + " km"}</Table.Td>
                    <Table.Td>{v.engineType}</Table.Td>
                    <Table.Td>{v.color}</Table.Td>
                    <Table.Td>
                      <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => { e.stopPropagation(); editVehicle(v); }}>
                        <IconEdit stroke={1.5} />
                      </ActionIcon>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon size={32} radius="xl" variant="subtle" onClick={(e) => { e.stopPropagation(); handleDelete(v._id!); }}>
                        <IconTrash stroke={1.5} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="light"
              radius="md"
              color="blue"
              leftSection={
                <IconPlus stroke={1.5} size={20} />
              }
              onClick={() => {
                setSelectedVehicle(undefined);
                setVehicleDrawer(true);
              }}
            >
              Add Vehicle
            </Button>
          </Grid.Col>
        </Grid>
      }

      <CustomerDrawer userDrawer={userDrawer} setUserDrawer={setUserDrawer} customer={customer} setCustomer={setCustomer} onSaveSuccess={() => { loadData() }} />
      <VehicleDrawer vehicleDrawer={vehicleDrawer} setVehicleDrawer={setVehicleDrawer} vehicle={selectedVehicle} setVehicle={setSelectedVehicle} onSaveSuccess={() => { loadData() }} ownerId={customer?._id} />
    </>
  )
}

export default CustomerOverview