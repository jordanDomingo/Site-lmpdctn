import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Users, Settings, LogOut, X, ShoppingCart, Tag, Image } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()
  const { adminLogout } = useAdminAuth()

  const menuItems = [
    { path: '/admin/dashboard', label: 'VUE D\'ENSEMBLE', icon: LayoutDashboard },
    { path: '/admin/orders', label: 'COMMANDES', icon: ShoppingCart },
    { path: '/admin/products', label: 'COLLECTION', icon: Package },
    { path: '/admin/categories', label: 'CATÉGORIES', icon: Tag },
    { path: '/admin/content', label: 'CONTENU SITE', icon: Image },
    { path: '/admin/users', label: 'CLIENTS', icon: Users },
    { path: '/admin/settings', label: 'PARAMÈTRES', icon: Settings }
  ]

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <>
      {/* Backdrop mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 transform transition-transform duration-300 z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'rgba(30, 43, 53, 0.95)',
          backdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-2xl" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: '1px', color: '#fff' }}>
              LMPDCTN <span style={{ color: '#8FAABC' }}>/</span>
            </span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <div className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-[2px] mb-4 ml-2 mt-2">Administration</div>
          {menuItems.map(item => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  active
                    ? 'bg-white/10 text-white border-l-2 border-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-bold text-[0.7rem] tracking-wider uppercase">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-all font-bold text-[0.7rem] tracking-wider uppercase"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
