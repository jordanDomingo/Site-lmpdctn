import React, { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import AdminLayout from '../components/AdminLayout'

function ProductForm({ product, onClose }) {
  const { addProduct, updateProduct, products } = useAdminData()
  const [formData, setFormData] = useState(product || {
    title: '',
    description: '',
    price: '',
    category: 'Vêtements',
    image: '',
    thumb: ''
  })

  const categories = new Set(products.map(p => p.category))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Vérification de la taille (2 Mo = 2 * 1024 * 1024 octets)
    if (file.size > 2 * 1024 * 1024) {
      alert("L'image est trop lourde. La taille maximale autorisée est de 2 Mo.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({ 
        ...prev, 
        image: reader.result,
        thumb: reader.result // On utilise la même image pour la miniature
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.price) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const dataToSubmit = {
      ...formData,
      price: Number(formData.price)
    }

    if (product) {
      updateProduct(product.id, dataToSubmit)
    } else {
      addProduct(dataToSubmit)
    }
    
    onClose()
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto animate-fadeInUp">
        {/* Titre */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-8">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-sm transition text-slate-400 hover:text-white border border-transparent hover:border-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[0.6rem] font-bold tracking-[2px] text-slate-400 uppercase mb-2">
              LMPDCTN / Boutique
            </div>
            <h1 className="section-title text-4xl">
              {product ? 'Modifier la pièce' : 'Nouvelle pièce'}
            </h1>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="glass-panel border border-white/10 rounded-sm p-8 space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">
              Titre *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: T-shirt Boxy Noir"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Détails de la pièce..."
              rows="4"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>

          {/* Prix et Catégorie */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">
                Prix (€) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: 35.00"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">
                Catégorie
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-xs uppercase font-bold tracking-wider focus:outline-none focus:border-white/30 appearance-none"
              >
                {Array.from(categories).map(cat => (
                  <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                ))}
                <option value="Nouvelle catégorie" className="bg-slate-900">+ Nouvelle catégorie</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">
              Image de la pièce
            </label>
            
            <div className="flex flex-col gap-4">
              {!formData.image ? (
                <div className="relative w-full h-40 border-2 border-dashed border-white/20 hover:border-[#8FAABC] rounded-sm bg-white/5 transition-colors flex items-center justify-center flex-col cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/webp, image/gif"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <span className="text-white text-sm font-bold uppercase tracking-wider mb-2 group-hover:text-[#8FAABC] transition-colors">Choisir une image sur le PC</span>
                  <span className="text-slate-500 text-[0.65rem] uppercase tracking-widest">Formats acceptés : JPG, PNG, WEBP, GIF (Max 2 Mo)</span>
                </div>
              ) : (
                <div className="flex items-start gap-6 bg-white/5 border border-white/10 p-4 rounded-sm">
                  <img src={formData.image} alt="Aperçu" className="w-32 h-32 object-cover object-top rounded-sm border border-white/20 bg-slate-900" />
                  <div className="flex-1 pt-2">
                    <p className="text-white text-sm font-bold uppercase tracking-wider mb-1">Image sélectionnée</p>
                    <p className="text-slate-400 text-[0.65rem] uppercase tracking-widest mb-4">Aperçu en temps réel</p>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '', thumb: '' }))}
                      className="text-[#e52e71] text-[0.65rem] font-bold uppercase tracking-widest hover:underline px-3 py-2 bg-[#e52e71]/10 rounded-sm border border-[#e52e71]/20 transition-colors hover:bg-[#e52e71]/20"
                    >
                      Supprimer l'image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* URL Fallback */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">
                Ou utiliser un lien direct (URL)
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value, thumb: e.target.value }))}
                placeholder="https://exemple.com/image.jpg"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-8 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {product ? 'MODIFIER' : 'CRÉER LA PIÈCE'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ProductForm
