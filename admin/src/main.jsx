import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { DoctorProvider } from './context/DoctorContext.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AdminProvider>
          <DoctorProvider>
            <App />
            <ToastContainer/>
          </DoctorProvider>
        </AdminProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
