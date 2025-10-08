import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { NavbarSimple } from './components/mantine/NavbarSimple';
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import Login from "@/pages/Login";
import Orders from "@/pages/Orders";
import Customers from "@/pages/Customers";
import { useAuthContext } from "@/utils/authTypes";
import NothingFound from "@/pages/NothingFound";
import Customer from "@/pages/Customer";


const App = () => {
  const [opened, { toggle }] = useDisclosure();
    const { user } = useAuthContext();
  

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

        <AppShell.Main mx={"xl"} pt={"xl"}>
          <Routes>
            <Route path="/" element={!user ? <Navigate to="/login" replace /> : <Navigate to="/orders" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" replace />}/>
            <Route path="/customers" element={user ? <Customers /> : <Navigate to="/login" replace />}/>
            <Route path="/customer" element={<Customer />}/>
            <Route path="*" element={<NothingFound />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  )
}

export default App;