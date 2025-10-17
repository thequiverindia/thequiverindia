import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { ApiProvider } from '../lib/contexts/ApiContext'

export const metadata = {
  title: 'The Quiver Admin - Content Management',
  description: 'Admin panel for The Quiver India news platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <ApiProvider>
          {children}
        </ApiProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
