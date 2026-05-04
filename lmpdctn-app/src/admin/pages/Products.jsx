import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Filter, ChevronDown } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import AdminLayout from '../components/AdminLayout'
import ProductForm from './ProductForm'

function Products() {
  const { products, deleteProduct } = useAdminData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      deleteProduct(id)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (showForm) {
    return <ProductForm product={editingProduct} onClose={handleCloseForm} />
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fadeInUp">
        {/* Titre */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[0.6rem] font-bold tracking-[2px] text-slate-400 uppercase mb-2">
              LMPDCTN / Boutique
            </div>
            <h1 className="section-title text-4xl">La Collection</h1>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            + Ajouter
          </button>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une pièce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Catégorie */}
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-white/30 transition-colors uppercase tracking-wider font-bold text-[0.7rem]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat === 'all' ? 'Toutes les catégories' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Tableau */}
        <div className="glass-panel rounded-sm overflow-hidden">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400">Pièce</th>
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400">Catégorie</th>
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400">Prix</th>
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400">Statut</th>
                    <th className="px-6 py-4 text-[0.65rem] font-bold tracking-wider uppercase text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-sm overflow-hidden border border-white/10">
                            <img
                              src={product.image || product.thumb}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm tracking-wide">{product.title}</p>
                            <p className="text-slate-400 text-[0.65rem] uppercase tracking-widest mt-1">Ref: {product.id.slice(0, 8) || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-xs font-medium uppercase tracking-wider">{product.category}</td>
                      <td className="px-6 py-4 text-white font-bold text-sm">{(product.price / 1000).toFixed(1)}k €</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-white/10 text-white text-[0.6rem] uppercase tracking-wider font-bold rounded-sm border border-white/20">
                          En ligne
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 hover:bg-white/10 rounded-sm transition text-slate-400 hover:text-white"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 hover:bg-red-500/20 rounded-sm transition text-slate-400 hover:text-[#e52e71]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center">
              <p className="text-slate-400 font-medium mb-2 uppercase tracking-wider text-sm">Aucune pièce trouvée</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-sm p-4 text-center">
            <p className="text-[0.65rem] font-bold tracking-wider text-slate-400 uppercase mb-1">Total</p>
            <p className="text-3xl font-bold text-white font-['Impact'] tracking-wide">{products.length}</p>
          </div>
          <div className="glass-panel rounded-sm p-4 text-center">
            <p className="text-[0.65rem] font-bold tracking-wider text-slate-400 uppercase mb-1">Affichés</p>
            <p className="text-3xl font-bold text-white font-['Impact'] tracking-wide">{filteredProducts.length}</p>
          </div>
          <div className="glass-panel rounded-sm p-4 text-center">
            <p className="text-[0.65rem] font-bold tracking-wider text-slate-400 uppercase mb-1">Catégories</p>
            <p className="text-3xl font-bold text-white font-['Impact'] tracking-wide">{categories.length - 1}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Products
