import React from 'react'
import { Bell, Search, User, Menu } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'

function Header({ setIsOpen }) {
  const { user } = useAdminAuth()

  return (
    <header className="glass-panel border-b border-white/10 px-6 py-4 sticky top-0 z-20 flex items-center justify-between gap-6" style={{ background: 'rgba(30, 43, 53, 0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-slate-300 hover:text-white transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Recherche */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/50 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-white/30 transition">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-white/5 rounded-full transition text-slate-300 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#e52e71] rounded-full" />
        </button>

        {/* Profil */}
        <button className="flex items-center gap-3 p-1 pr-4 hover:bg-white/5 rounded-full transition border border-transparent hover:border-white/10">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border border-white/20">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-white uppercase tracking-wider text-[0.7rem]">{user?.name || 'Admin'}</p>
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header
