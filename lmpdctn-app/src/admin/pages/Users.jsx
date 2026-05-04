import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Filter, ChevronDown, Shield } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import AdminLayout from '../components/AdminLayout'

function Users() {
  const { users, addUser, updateUser, deleteUser } = useAdminData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'editor',
    status: 'active'
  })

  const roles = ['all', 'super_admin', 'admin', 'editor', 'viewer']

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || u.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleOpenForm = (user) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: '',
        email: '',
        role: 'editor',
        status: 'active'
      })
    }
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    if (editingUser) updateUser(editingUser.id, formData)
    else addUser(formData)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      deleteUser(id)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fadeInUp">
        {/* Titre */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[0.6rem] font-bold tracking-[2px] text-slate-400 uppercase mb-2">
              LMPDCTN / Accès
            </div>
            <h1 className="section-title text-4xl">Utilisateurs</h1>
          </div>
          <button
            onClick={() => handleOpenForm(null)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            + Ajouter
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-panel border border-white/20 rounded-sm p-8 w-full max-w-md animate-popIn">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
                {editingUser ? 'Modifier l\'accès' : 'Nouvel accès'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Rôle</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-xs uppercase font-bold tracking-wider focus:outline-none focus:border-white/30 appearance-none"
                    >
                      <option value="editor" className="bg-slate-900">Éditeur</option>
                      <option value="admin" className="bg-slate-900">Admin</option>
                      <option value="viewer" className="bg-slate-900">Lecteur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Statut</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-xs uppercase font-bold tracking-wider focus:outline-none focus:border-white/30 appearance-none"
                    >
                      <option value="active" className="bg-slate-900">Actif</option>
                      <option value="inactive" className="bg-slate-900">Inactif</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-6">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors">Annuler</button>
                  <button type="submit" className="flex-1 btn-primary py-3 w-auto">{editingUser ? 'Enregistrer' : 'Valider'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-white/30 transition-colors uppercase tracking-wider font-bold text-[0.7rem]"
            >
              {roles.map(role => (
                <option key={role} value={role} className="bg-slate-900">{role === 'all' ? 'Tous les rôles' : role.replace('_', ' ')}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Tableau */}
        <div className="glass-panel rounded-sm overflow-hidden">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400">Identité</th>
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400">Rôle</th>
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400">Statut</th>
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-white font-bold text-sm tracking-wide uppercase">{user.name}</p>
                        <p className="text-slate-400 text-xs mt-1">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-white/10 text-white text-[0.6rem] uppercase tracking-wider font-bold rounded-sm border border-white/20 flex items-center inline-flex gap-1 w-max">
                          <Shield className="w-3 h-3" /> {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.status === 'active' ? (
                          <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Actif</span>
                        ) : (
                          <span className="text-[#e52e71] text-xs font-bold uppercase tracking-wider">Inactif</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleOpenForm(user)} className="p-2 hover:bg-white/10 rounded-sm transition text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(user.id)} className="p-2 hover:bg-red-500/20 rounded-sm transition text-slate-400 hover:text-[#e52e71]"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center">
              <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">Aucun utilisateur</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default Users
