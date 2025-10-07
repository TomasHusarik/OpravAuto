import { loginUser } from '@/utils/api';
import { useAuthContext } from '@/utils/authTypes';
import { Button, Center, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import type { PaperProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props: PaperProps) => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      email: 'jan.marek@opravy.cz',
      password: 'securePassword123!',
    },
    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleLogin = async (values: typeof form.values) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(values.email, values.password);

      localStorage.setItem('user', JSON.stringify(response));
      dispatch({ type: 'LOGIN', payload: response });
      navigate('/orders');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Paper radius="md" p="lg" withBorder {...props} style={{ width: 600, height: 'auto', margin: 20 }}>
        <Text size="lg" fw={500}>
          Welcome to OpravAuto
        </Text>

        <Divider my="lg" />

        <form onSubmit={form.onSubmit(handleLogin)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="typeyour@email.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              radius="md"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              radius="md"
            />
          </Stack>

          <Divider my="lg" />

          <Group justify="flex-end">
            <Button type="submit" radius="xl" loading={isLoading}>
              Login
            </Button>
            {error && (<Text color="red" size="sm">
              {error}
            </Text>
            )}
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default Login;