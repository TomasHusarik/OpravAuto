import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core';
import { AuthContextProvider } from '@/context/AuthContext';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <MantineProvider defaultColorScheme="dark">
        <Notifications position='bottom-center'/>
        <App />
      </MantineProvider>
    </AuthContextProvider>
  </StrictMode>,
)