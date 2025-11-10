import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconUsers,
  IconLogout,
  IconClipboardList,
  IconUser,
  IconHome,
  IconLogin,
} from '@tabler/icons-react';
import { Divider, Group, Image, Text } from '@mantine/core';
import classes from './NavbarSimple.module.css';
import { ActionToggle } from './ActionToggle';
import { useAuthContext, useLogout } from '@/utils/authTypes';
import { getFullName } from '@/utils/helpers';

const data = [
  { link: '/orders', label: 'Orders', icon: IconClipboardList },
  { link: '/customers', label: 'Customers', icon: IconUsers }
];

const guestData = [
  { link: '/login', label: 'Login', icon: IconLogin },
];

interface INavbarSimple {
  setOpened: (opened: boolean) => void;
}

export function NavbarSimple(props: INavbarSimple) {
  const { setOpened } = props;

  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const [active, setActive] = useState('');
  const { user } = useAuthContext();

  // Update active based on current route
  useEffect(() => {
    const allItems = [...data, ...guestData];
    const currentRoute = allItems.find(item => item.link === location.pathname);
    if (currentRoute) {
      setActive(currentRoute.label);
    } else {
      setActive('');
    }
  }, [location.pathname]);

  const navItems = user ? data : guestData;

  const links = navItems.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <div style={{ display: "flex", justifyContent: "space-between", cursor: 'pointer' }} onClick={() => {setOpened?.(false); navigate('/');}}>
            <Image src="/opravAuto.png" alt="OpravAuto Logo" w={32} h={32} style={{ marginLeft: "10px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", cursor: 'pointer' }} onClick={() => {setOpened?.(false); navigate('/');}}>
            <Text
              fw={700}
              size="lg"
              c="var(--mantine-color-blue-light-color)"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '0.5px',
                marginLeft: '-60px',
              }}
            >
              OpravAuto
            </Text>
          </div>
          <ActionToggle />
          {/* <Code fw={700}>v1.0.0</Code> */}
        </Group>

        <div>
          {links}
        </div>
      </div>

      {user &&
        <div className={classes.footer}>
          <a className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>{getFullName(user.technician)}</span>
          </a>
          <Divider my="sm" />

          <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); setOpened?.(false); logout(); }}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      }
    </nav>
  );
}