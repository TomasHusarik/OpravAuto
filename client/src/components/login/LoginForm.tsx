import { loginUser, verifyCustomerAccessCode } from '@/utils/api';
import { useAuthContext } from '@/utils/authTypes';
import { Button, Center, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput, Tabs } from '@mantine/core';
import type { PaperProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = (props: PaperProps) => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('customer');

  const technicianForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const customerForm = useForm({
    initialValues: {
      accessCode: '',
    },
    validate: {
      accessCode: (val: string) => (val.length < 6 ? 'Invalid access code' : null),
    },
  });

  const handleTechnicianLogin = async (values: typeof technicianForm.values) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(values.email, values.password);

      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('userType', 'technician');
      dispatch({ type: 'LOGIN', payload: response, userType: 'technician' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerLogin = async (values: typeof customerForm.values) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await verifyCustomerAccessCode(values.accessCode);

      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('userType', 'customer');
      dispatch({ type: 'CUSTOMER_LOGIN', payload: response, userType: 'customer'});
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid access code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <Paper radius="md" p="lg" withBorder {...props} style={{ width: 600, height: 'auto', margin: 20 }}>
        <Text size="lg" fw={500}>
          Welcome to OpravAuto
        </Text>

        <Divider my="lg" />

        <Tabs value={activeTab} onChange={setActiveTab} >
          <Tabs.List>
            <Tabs.Tab value="customer">View My Order</Tabs.Tab>
            <Tabs.Tab value="technician">Technician Login</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="technician" pt="md">
            <form onSubmit={technicianForm.onSubmit(handleTechnicianLogin)}>
              <Stack>
                <TextInput
                  required
                  label="Email"
                  placeholder="type your@email.com"
                  value={technicianForm.values.email}
                  onChange={(event) => technicianForm.setFieldValue('email', event.currentTarget.value)}
                  error={technicianForm.errors.email}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={technicianForm.values.password}
                  onChange={(event) => technicianForm.setFieldValue('password', event.currentTarget.value)}
                  error={technicianForm.errors.password}
                  radius="md"
                />
              </Stack>

              <Divider my="lg" />

              <Group justify="flex-end">
                <Button type="submit" radius="xl" loading={isLoading}>
                  Login
                </Button>
              </Group>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="customer" pt="md">
            <form onSubmit={customerForm.onSubmit(handleCustomerLogin)}>
              <Stack>
                <TextInput
                  required
                  label="Access Code"
                  placeholder="Enter your access code"
                  value={customerForm.values.accessCode}
                  onChange={(event) => customerForm.setFieldValue('accessCode', event.currentTarget.value.toUpperCase())}
                  error={customerForm.errors.accessCode}
                  radius="md"
                  maxLength={10}
                />
              </Stack>

              <Divider my="lg" />

              <Group justify="flex-end">
                <Button type="submit" radius="xl" loading={isLoading}>
                  View Order
                </Button>
              </Group>
            </form>
          </Tabs.Panel>
        </Tabs>

        {error && (<Text color="red" size="sm" mt="md">
          {error}
        </Text>
        )}
      </Paper>
    </Center>
  );
};

export default LoginForm;