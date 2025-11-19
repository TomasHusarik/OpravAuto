import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { NavbarSimple } from './components/mantine/NavbarSimple';
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import '@mantine/core/styles.css';
import Login from "@/pages/Login";
import Orders from "@/pages/Orders";
import Customers from "@/pages/Customers";
import { useAuthContext } from "@/utils/authTypes";
import NothingFound from "@/pages/NothingFound";
import Customer from "@/pages/Customer";
import Order from "./pages/Order";
import User from "@/pages/User";


const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const { user, loading } = useAuthContext();
  const isMobile = useMediaQuery('(max-width: 48em)');

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
          <NavbarSimple setOpened={toggle} />
        </AppShell.Navbar>

        {!loading &&
          <AppShell.Main mx={"xl"} pt={"xl"} style={{ marginTop: isMobile ? 60 : 0 }}>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/orders" replace /> : <Navigate to="/login" replace />} />
              <Route path="/login" element={user ? <Navigate to="/orders" replace /> : <Login />} />
              <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" replace />} />
              <Route path="/order" element={user ? <Order /> : <Navigate to="/login" replace />} />
              <Route path="/customers" element={user ? <Customers /> : <Navigate to="/login" replace />} />
              <Route path="/customer" element={user ? <Customer /> : <Navigate to="/login" replace />} />
              <Route path="/user" element={user ? <User /> : <Navigate to="/login" replace />} />
              <Route path="*" element={<NothingFound />} />
            </Routes>
          </AppShell.Main>
        }

      </AppShell>
    </BrowserRouter>
  )
}

export default App;