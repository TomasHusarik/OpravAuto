import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconUsers,
  IconLogout,
  IconClipboardList,
  IconUser,
  IconLogin,
} from '@tabler/icons-react';
import { Divider, Group, Image, Text } from '@mantine/core';
import classes from './NavbarSimple.module.css';
import { ActionToggle } from './ActionToggle';
import { useAuthContext, useLogout, getUser } from '@/utils/authTypes';
import { getFullName } from '@/utils/helpers';

interface INavbarSimple {
  setOpened: (opened: boolean) => void;
}

export function NavbarSimple(props: INavbarSimple) {
  const { setOpened } = props;

  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const [active, setActive] = useState('');
  const { user, userType, orderId } = useAuthContext();

  const technicianData = [
    { link: '/orders', label: 'Orders', icon: IconClipboardList },
    { link: '/customers', label: 'Customers', icon: IconUsers }
  ];

  const customerData = [
    { link: `order?orderId=${orderId}`, label: 'My Order', icon: IconClipboardList },
    { link: '/contact', label: 'Contact', icon: IconUser }
  ];

  const guestData = [
    { link: '/login', label: 'Login', icon: IconLogin },
    { link: '/contact', label: 'Contact', icon: IconUser }
  ];

  // Update active based on current route
  useEffect(() => {
    const allItems = [...technicianData, ...customerData, ...guestData];
    const currentRoute = allItems.find(item => item.link === location.pathname);
    if (currentRoute) {
      setActive(currentRoute.label);
    } else {
      setActive('');
    }
  }, [location.pathname]);

  const navItems = userType === "technician" ? technicianData : userType === "customer" ? customerData : guestData;

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
        setOpened?.(false);
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
          <div style={{ display: "flex", justifyContent: "space-between", cursor: 'pointer' }} onClick={() => { setOpened?.(false); navigate('/'); }}>
            <Image src="/opravAuto.png" alt="OpravAuto Logo" w={32} h={32} style={{ marginLeft: "10px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", cursor: 'pointer' }} onClick={() => { setOpened?.(false); navigate('/'); }}>
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
          <a
            className={classes.link}
            href="/user"
            onClick={(event) => {
              event.preventDefault();
              setOpened?.(false);
              navigate('/user');
            }}
          >
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>
              {getFullName(getUser(user, userType))}
            </span>
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