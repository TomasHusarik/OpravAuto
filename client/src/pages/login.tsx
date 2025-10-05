import { authenticateUser } from '@/utils/api';
import { Button, Center, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import type { PaperProps } from '@mantine/core';
import { useForm } from '@mantine/form';

const Login = (props: PaperProps) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    try {
      authenticateUser(values.email, values.password)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Paper radius="md" p="lg" withBorder {...props} style={{ width: 800, height: 'auto', margin: 20 }}>
        <Text size="lg" fw={500}>
          Welcome to OpravAuto
        </Text>

        <Divider my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default Login;