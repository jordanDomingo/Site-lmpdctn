import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Favoris from './pages/Favoris'
import NotFound from './pages/NotFound'

// Admin imports
import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import { AdminDataProvider } from './admin/context/AdminDataContext'
import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute'
import AdminLogin from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import Products from './admin/pages/Products'
import Users from './admin/pages/Users'
import AdminSettings from './admin/pages/Settings'

// Layout wrapper pour les routes publiques
function PublicLayout({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col relative w-full overflow-x-hidden"
      style={{
        background: 'linear-gradient(175deg, #3D5467 0%, #2E3F4F 35%, #1E2B35 70%, #151F28 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      <main className="flex-grow w-full relative z-10 stagger-enter" style={{ marginTop: '64px' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <Routes>
          {/* Admin Routes - PRIORITÉ HAUTE */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedAdminRoute>
              <Products />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedAdminRoute>
              <Users />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          } />

          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/collection" element={<PublicLayout><Collection /></PublicLayout>} />
          <Route path="/favoris" element={<PublicLayout><Favoris /></PublicLayout>} />
          <Route path="/product/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
          <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
          
          {/* 404 - NOT FOUND - DERNIER */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </AdminDataProvider>
    </AdminAuthProvider>
  )
}

export default App
