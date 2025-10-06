import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { NavbarSimple } from './components/mantine/NavbarSimple';
import '@mantine/core/styles.css';
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Technician } from "@/types/Technician";
import Login from "@pages/Login";
import Orders from "@pages/Orders";
import Customers from "@pages/Customers";

const App = () => {
  const [opened, { toggle }] = useDisclosure();
    const loggedUser: Technician = JSON.parse(localStorage.getItem('technician') || '{}');
  

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
            <Route path="/" element={!loggedUser ? <Navigate to="/login" replace /> : <Navigate to="/orders" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  )
}

export default App;