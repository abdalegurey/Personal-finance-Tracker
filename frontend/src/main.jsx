import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // ✅ sax
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
 {/* <Toaster
  position="top-center"
  toastOptions={{
    duration: 1000, // 1 second
    style: {
      background: '#1d4ed8', // Tailwind "blue-700"
      color: '#ffffff',
      fontSize: '14px',
      borderRadius: '8px',
      padding: '12px 16px',
    },
    success: {
      iconTheme: {
        primary: '#22c55e', // green
        secondary: '#ffffff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444', // red
        secondary: '#ffffff',
      },
    },
  }}
/> */}

        <App /> {/* ✅ HAL App oo kaliya */}
      </BrowserRouter>
    
    </QueryClientProvider>
  </StrictMode>,
)
