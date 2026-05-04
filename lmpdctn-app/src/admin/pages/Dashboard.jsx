import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Users, ShoppingCart, TrendingUp, ArrowUp, ArrowDown, Activity, Image, Settings } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import AdminLayout from '../components/AdminLayout'

function Dashboard() {
  const { stats, orders } = useAdminData()

  const cards = [
    {
      label: 'Commandes',
      value: stats.totalOrders || 0,
      icon: ShoppingCart,
      change: 12,
      color: 'blue'
    },
    {
      label: 'Revenu',
      value: `${((stats.monthlyRevenue || 0) / 1000).toFixed(1)}k FCFA`,
      icon: TrendingUp,
      change: 8,
      color: 'green'
    },
    {
      label: 'Clients Actifs',
      value: stats.totalUsers || 0,
      icon: Users,
      change: -2,
      color: 'purple'
    },
    {
      label: 'Produits en ligne',
      value: stats.totalProducts || 0,
      icon: Package,
      change: 0,
      color: 'amber'
    }
  ]

  // Mix de vraies commandes et fausses activités pour remplir le tableau si vide
  const activities = [
    ...(orders || []).slice(0, 5).map(o => ({
      action: `Nouvelle commande ${o.id}`,
      item: o.items,
      time: o.time || 'À l\'instant',
      status: o.status || 'pending'
    })),
    // Dummy fallbacks si aucune commande n'a été passée
    ...(orders?.length > 0 ? [] : [
      { action: 'Système initialisé', item: 'Tableau de bord prêt.', time: 'Aujourd\'hui', status: 'success' }
    ])
  ]

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeInUp">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[0.6rem] font-bold tracking-[2px] text-slate-400 uppercase mb-2">
              LMPDCTN / Dashboard
            </div>
            <h1 className="section-title text-4xl md:text-5xl">Vue d'ensemble</h1>
          </div>
          <button className="btn-primary" style={{ padding: '8px 24px' }}>
            + NOUVELLE CAMPAGNE
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-sm relative overflow-hidden group hover:border-white/20 transition-colors"
              >
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-32 h-32 text-white" />
                </div>
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-wider text-slate-400 uppercase mb-1">{card.label}</p>
                    <p className="text-3xl font-bold text-white font-['Impact'] tracking-wide">{card.value}</p>
                  </div>
                  <div className="p-2 bg-white/5 border border-white/10 rounded-sm text-slate-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium relative z-10">
                  {card.change > 0 ? (
                    <span className="flex items-center gap-1 text-[#8FAABC] bg-[#8FAABC]/10 px-2 py-1 rounded-sm">
                      <ArrowUp className="w-3 h-3" /> +{card.change}%
                    </span>
                  ) : card.change < 0 ? (
                    <span className="flex items-center gap-1 text-[#e52e71] bg-[#e52e71]/10 px-2 py-1 rounded-sm">
                      <ArrowDown className="w-3 h-3" /> {card.change}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-1 rounded-sm">
                      <Activity className="w-3 h-3" /> 0%
                    </span>
                  )}
                  <span className="text-slate-500">vs mois dernier</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activité */}
          <div className="lg:col-span-2 glass-panel rounded-sm p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/10">Activité Récente</h2>
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-sm transition">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                    activity.status === 'warning' ? 'bg-amber-400' :
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'info' ? 'bg-[#8FAABC]' : 'bg-white'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-xs mt-1 truncate max-w-[400px]">{activity.item}</p>
                  </div>
                  <span className="text-slate-500 text-xs font-medium bg-slate-900/50 px-2 py-1 rounded-sm whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider border border-white/10 hover:bg-white/5 transition rounded-sm">
              Voir tout l'historique
            </button>
          </div>

          {/* Actions Rapides */}
          <div className="glass-panel rounded-sm p-6 flex flex-col">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/10">Actions Rapides</h2>
            <div className="space-y-3 flex-1">
              <Link to="/admin/products" className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm transition text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                <Package className="w-4 h-4 text-[#8FAABC]" />
                Ajouter un produit
              </Link>
              <Link to="/admin/products" className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm transition text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                <Image className="w-4 h-4 text-[#8FAABC]" />
                Voir le catalogue
              </Link>
              <Link to="/admin/users" className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm transition text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                <Users className="w-4 h-4 text-[#8FAABC]" />
                Gérer les accès
              </Link>
              <Link to="/admin/settings" className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm transition text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                <Settings className="w-4 h-4 text-[#8FAABC]" />
                Paramètres boutique
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
