import React, { createContext, useContext, useState, useEffect } from 'react'
import { products as initialProducts } from '../../data/products'

const AdminDataContext = createContext()

// Utilisateurs par défaut
const DEFAULT_USERS = [
  { id: '1', name: 'Administrateur', email: 'admin@example.com', role: 'super_admin', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Jean Dupont', email: 'jean@example.com', role: 'editor', status: 'active', createdAt: '2024-02-20' },
  { id: '3', name: 'Marie Martin', email: 'marie@example.com', role: 'viewer', status: 'active', createdAt: '2024-03-10' }
]

export function AdminDataProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)
  const [users, setUsers] = useState(DEFAULT_USERS)
  
  // Commandes depuis le localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('lmpdctn_orders')
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error(e)
    }
    return []
  })

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    monthlyRevenue: 0
  })

  // Synchroniser les produits avec localStorage
  useEffect(() => {
    localStorage.setItem('lmpdctn_products', JSON.stringify(products))
  }, [products])

  // Synchroniser les commandes et mettre à jour les stats
  useEffect(() => {
    // Si la page est rechargée ou qu'une commande est passée ailleurs, 
    // on écoute les événements storage pour être réactif (optionnel mais recommandé).
    const handleStorageChange = (e) => {
      if (e.key === 'lmpdctn_orders') {
        setOrders(JSON.parse(e.newValue || '[]'))
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Mettre à jour les stats
  useEffect(() => {
    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: orders.length,
      monthlyRevenue: orders.reduce((sum, o) => sum + o.total, 0)
    })
  }, [products, users, orders])

  // Produits CRUD
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // Utilisateurs CRUD
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: `u${Date.now()}`,
      createdAt: new Date().toLocaleDateString()
    }
    setUsers(prev => [...prev, newUser])
    return newUser
  }

  const updateUser = (id, updates) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u))
  }

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <AdminDataContext.Provider value={{
      products,
      users,
      orders,
      stats,
      addProduct,
      updateProduct,
      deleteProduct,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) {
    throw new Error('useAdminData doit être utilisé dans un AdminDataProvider')
  }
  return context
}
