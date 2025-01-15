import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './Context/ThemeContext.tsx'
import { AuthProvider } from './Context/AuthContext.tsx'
import './index.css'
import AppRoutes from './Routes/AppRoutes.tsx'
import { Toaster } from './components/ui/toaster.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes/>
        <Toaster/>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
