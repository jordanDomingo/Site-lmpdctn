import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAdminUser, isAdminAuthenticated, adminLogout as logout } from '../utils/adminAuth'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    if (isAdminAuthenticated()) {
      setUser(getAdminUser())
    }
    setLoading(false)
  }, [])

  const adminLoginAction = (userData) => {
    setUser(userData)
  }

  const adminLogout = () => {
    logout()
    setUser(null)
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, adminLogin: adminLoginAction, adminLogout, isAuthenticated: !!user }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth doit être utilisé dans un AdminAuthProvider')
  }
  return context
}
