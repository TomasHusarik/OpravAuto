import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Grid, Button, Title, PasswordInput } from '@mantine/core';
import { updateCurrentUser } from '@/utils/api';

interface CurrentUser {
  token?: string;
  technician?: any;
}

const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

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
    const raw = localStorage.getItem('user');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setUser(parsed);
      const tech = parsed.technician || parsed.user || parsed;
      form.setValues({
        firstName: tech?.firstName || '',
        lastName: tech?.lastName || '',
        email: tech?.email || '',
        phoneNumber: tech?.phoneNumber || '',
        password: '',
        passwordConfirm: '',
      });
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
    }
  }, []);

  const handleSave = async (vals: typeof form.values) => {
    setLoading(true);
    try {
      const payload: any = {
        firstName: vals.firstName,
        lastName: vals.lastName,
        phoneNumber: vals.phoneNumber,
      };
      if (vals.password) payload.password = vals.password;

      try {
        const res = await updateCurrentUser(payload);
        if (res?.technician || res?.token) {
          const current = JSON.parse(localStorage.getItem('user') || 'null') || {};
          const technician = res.technician || res.user || payload;
          const token = res.token || current.token;
          const newStore = { ...current, technician, token };
          localStorage.setItem('user', JSON.stringify(newStore));
          setUser(newStore);
          alert('Profile updated');
        } else {
          const current = JSON.parse(localStorage.getItem('user') || 'null') || {};
          const technician = { ...(current.technician || {}), ...payload };
          const newStore = { ...current, technician };
          localStorage.setItem('user', JSON.stringify(newStore));
          setUser(newStore);
          alert('Profile updated locally (server not available)');
        }
      } catch (err) {
        const current = JSON.parse(localStorage.getItem('user') || 'null') || {};
        const technician = { ...(current.technician || {}), ...payload };
        const newStore = { ...current, technician };
        localStorage.setItem('user', JSON.stringify(newStore));
        setUser(newStore);
        alert('Profile updated locally (server call failed)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title order={2} mb={16}>Můj profil</Title>
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
            <Button type="submit" loading={loading}>Save</Button>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  )
}

export default User