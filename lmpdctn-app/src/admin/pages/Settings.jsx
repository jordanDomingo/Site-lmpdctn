import React from 'react'
import { Settings, Bell, Lock, Database, Globe, CreditCard } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'

function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto animate-fadeInUp">
        {/* Titre */}
        <div className="border-b border-white/10 pb-6 mb-8">
          <div className="text-[0.6rem] font-bold tracking-[2px] text-slate-400 uppercase mb-2">
            LMPDCTN / Configuration
          </div>
          <h1 className="section-title text-4xl">Paramètres</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Site Public */}
          <div className="glass-panel border border-white/10 rounded-sm p-8">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <Globe className="w-5 h-5 text-[#8FAABC]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Site Public</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-[#8FAABC]" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">Mode Maintenance</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-[#8FAABC]" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">Bannière Promo (Accueil)</span>
              </label>
              <div className="mt-4 pt-4 border-t border-white/10">
                <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Message de bannière</label>
                <input type="text" defaultValue="LIVRAISON OFFERTE DÈS 100€" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30" />
              </div>
            </div>
          </div>

          {/* Paiement & Livraison */}
          <div className="glass-panel border border-white/10 rounded-sm p-8">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <CreditCard className="w-5 h-5 text-[#8FAABC]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Transactions</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-[#8FAABC]" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">Stripe Actif</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-[#8FAABC]" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">PayPal Actif</span>
              </label>
              <div className="mt-4 pt-4 border-t border-white/10">
                <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Frais de port par défaut (€)</label>
                <input type="number" defaultValue="4.99" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-panel border border-white/10 rounded-sm p-8">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <Bell className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Alertes Admin</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-amber-400" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">Nouvelle commande</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-amber-400" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">Nouveau client</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-amber-400" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">Rupture de stock imminente</span>
              </label>
            </div>
          </div>

          {/* Base de données */}
          <div className="glass-panel border border-white/10 rounded-sm p-8">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <Database className="w-5 h-5 text-green-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Maintenance</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm transition text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                Sauvegarder catalogue
                <span className="text-green-400">.JSON</span>
              </button>
              <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm transition text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                Exporter clients
                <span className="text-blue-400">.CSV</span>
              </button>
              <button className="w-full text-left px-4 py-3 bg-[#e52e71]/10 hover:bg-[#e52e71]/20 border border-[#e52e71]/20 text-[#e52e71] rounded-sm transition text-xs font-bold uppercase tracking-wider">
                Vider le cache système
              </button>
            </div>
          </div>
        </div>

        {/* Bouton sauvegarde */}
        <div className="pt-8 text-right">
          <button className="btn-primary py-3 px-12">
            APPLIQUER LES MODIFICATIONS
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings
