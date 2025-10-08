import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './NothingFoundBackground.module.css';
import { useNavigate } from 'react-router';
import { useAuthContext } from '@/utils/authTypes';

export function NothingFoundBackground() {
  const navigate = useNavigate();
  const { user } = useAuthContext();



  const handleHomeButton = () => {
    if (user) navigate('/orders');
    else navigate('/login');
  }

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Button size="md" onClick={() => handleHomeButton()}>{user ? "Take me back to home page" : "Take me back to the login page"}</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}