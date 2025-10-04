import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { NavbarSimple } from './components/mantine/NavbarSimple';
import '@mantine/core/styles.css';
import { Login } from './pages/login';
import Orders from './pages/orders';
import { AppShell } from "@mantine/core";

const App = () => {
  return (
    <BrowserRouter>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: 'sm',
        }}
      >
        <AppShell.Navbar>
          <NavbarSimple />
        </AppShell.Navbar>

        <AppShell.Main m="xl">
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