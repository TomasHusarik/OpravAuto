import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconUsers,
  IconLogout,
  IconClipboardList,
  IconUser,
} from '@tabler/icons-react';
import { Divider, Group, Image, Text } from '@mantine/core';
import classes from './NavbarSimple.module.css';
import { ActionToggle } from './ActionToggle';
import { useAuthContext } from '@/utils/authTypes';
import { getFullName } from '@/utils/helpers';
import { Technician } from '@/types/Technician';

const data = [
  { link: '/orders', label: 'Orders', icon: IconClipboardList },
  { link: '/customers', label: 'Customers', icon: IconUsers }
];

export function NavbarSimple() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('Orders');
  const { dispatch } = useAuthContext();
  const [loggedUser, setLoggedUser] = useState<Technician | null>(null);

  // Update active based on current route
  useEffect(() => {
    const currentRoute = data.find(item => item.link === location.pathname);
    if (currentRoute) {
      setActive(currentRoute.label);
    }
  }, [location.pathname]);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link); // Use navigate instead of window.location.href
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const handleLogOut = () => {
    localStorage.removeItem('technician');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }

  useEffect(() => {
    const technician = localStorage.getItem('technician');
    if (technician) {
      setLoggedUser(JSON.parse(technician));
    }
  }, []);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Image src="/opravAuto.png" alt="OpravAuto Logo" w={32} h={32} style={{ marginLeft: "10px" }} />
          <Text
            fw={700}
            size="lg"
            c="blue.6"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.5px',
              marginLeft: '-60px',
            }}
          >
            OpravAuto
          </Text>
          <ActionToggle />
          {/* <Code fw={700}>v1.0.0</Code> */}
        </Group>
        {loggedUser && links}
      </div>

      {loggedUser &&
        <div className={classes.footer}>
          <a className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>{getFullName(loggedUser)}</span>
          </a>
          <Divider my="sm" />

          <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); handleLogOut(); }}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      }
    </nav>
  );
}