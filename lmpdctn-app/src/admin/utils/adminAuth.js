// Authentification admin simple avec localStorage
// Production: à remplacer par un vrai système d'authentification sécurisé

const ADMIN_USERS = [
  { id: '1', email: 'admin@example.com', password: 'SecureAdmin@2024', role: 'super_admin', name: 'Administrateur' },
  { id: '2', email: 'editor@example.com', password: 'Editor@2024Pass', role: 'editor', name: 'Éditeur' }
]

export const adminLogin = (email, password) => {
  const user = ADMIN_USERS.find(u => u.email === email && u.password === password)
  if (user) {
    const { password, ...userWithoutPassword } = user
    const token = btoa(JSON.stringify({ ...userWithoutPassword, timestamp: Date.now() }))
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword))
    return { success: true, user: userWithoutPassword }
  }
  return { success: false, error: 'Email ou mot de passe incorrect' }
}

export const adminLogout = () => {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminUser')
}

export const getAdminUser = () => {
  const userStr = localStorage.getItem('adminUser')
  return userStr ? JSON.parse(userStr) : null
}

export const isAdminAuthenticated = () => {
  return localStorage.getItem('adminToken') !== null
}

export const canAccess = (requiredRole) => {
  const user = getAdminUser()
  if (!user) return false
  
  const roleHierarchy = {
    'super_admin': 3,
    'admin': 2,
    'editor': 1,
    'viewer': 0
  }
  
  return (roleHierarchy[user.role] || 0) >= (roleHierarchy[requiredRole] || 0)
}
