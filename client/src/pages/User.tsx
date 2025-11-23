import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Grid, Button, Title, PasswordInput } from '@mantine/core';
import { updateCurrentUser } from '@/utils/api';
import { useAuthContext } from '@/utils/authTypes';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { showErrorNotification, showSuccessNotification } from '@/utils/helpers';

interface CurrentUser {
  token?: string;
  technician?: any;
}

const User = () => {
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useAuthContext();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      email: (val) => (!val || /\S+@\S+/.test(val) ? null : 'Invalid email'),
      password: (val, values) => (val && val.length > 0 && val.length < 6 ? 'Password too short' : null),
      passwordConfirm: (val, values) => (values.password && val !== values.password ? 'Passwords do not match' : null),
    },
  });

  useEffect(() => {
    if (!user) return;
    const tech = user.technician || user.customer;
    form.setValues({
      firstName: tech?.firstName || '',
      lastName: tech?.lastName || '',
      email: tech?.email || '',
      phoneNumber: tech?.phoneNumber || '',
      password: '',
      passwordConfirm: '',
    });
  }, [user]);

  const handleSave = async (vals: typeof form.values) => {
    setLoading(true);
    try {
      const payload: any = {
        _id: user.technician?._id || user.customer?._id,
        firstName: vals.firstName,
        lastName: vals.lastName,
        phoneNumber: vals.phoneNumber,
      };
      if (vals.password) payload.password = vals.password;

      try {
        const res = await updateCurrentUser(payload);
        if ((res?.technician || res?.customer ) && res?.token) {
          const technician = res.technician || res.customer;
          const token = res.token;
          const newStore = { technician, token };
          dispatch({ type: 'LOGIN', payload: newStore});
          showSuccessNotification('Profile updated successfully');
        }
      } catch (err) {
        showErrorNotification('Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title order={1} c="var(--mantine-color-blue-light-color)" mb="md">My profile</Title>
      <form onSubmit={form.onSubmit((v) => handleSave(v))}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="First Name" required value={form.values.firstName} onChange={(e) => form.setFieldValue('firstName', e.currentTarget.value)} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Last Name" required value={form.values.lastName} onChange={(e) => form.setFieldValue('lastName', e.currentTarget.value)} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Email" value={form.values.email} readOnly />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Phone" required value={form.values.phoneNumber} onChange={(e) => form.setFieldValue('phoneNumber', e.currentTarget.value)} />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput label="New password" value={form.values.password} onChange={(e) => form.setFieldValue('password', e.currentTarget.value)} error={form.errors.password} />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput label="Confirm password" value={form.values.passwordConfirm} onChange={(e) => form.setFieldValue('passwordConfirm', e.currentTarget.value)} error={form.errors.passwordConfirm} />
          </Grid.Col>
          <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="light"
              radius="md"
              loading={loading}
              leftSection={
                <IconDeviceFloppy stroke={1.5} size={20} />
              }
            >
              Save
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </div >
  )
}

export default User