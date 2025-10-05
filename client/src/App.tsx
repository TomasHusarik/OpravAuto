import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { NavbarSimple } from './components/mantine/NavbarSimple';
import '@mantine/core/styles.css';
import Login from '@pages/login';
import Orders from '@pages/orders';
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <BrowserRouter>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        header={{ 
          height: { base: 60, sm: 0 }
        }}
      >
        <AppShell.Header visibleFrom="base" hiddenFrom="sm">
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            m="md"
          />
        </AppShell.Header>

        <AppShell.Navbar>
          <NavbarSimple />
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  )
}

export default App;