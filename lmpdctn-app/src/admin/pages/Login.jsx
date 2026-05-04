import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../utils/adminAuth'
import { useAdminAuth } from '../context/AdminAuthContext'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

function AdminLogin() {
  const navigate = useNavigate()
  const { isAuthenticated, adminLogin: setContextUser } = useAdminAuth()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('SecureAdmin@2024')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = adminLogin(email, password)
      if (result.success) {
        setContextUser(result.user)
        navigate('/admin/dashboard')
      } else {
        setError(result.error)
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative w-full overflow-hidden text-white px-4"
      style={{
        background: 'linear-gradient(175deg, #3D5467 0%, #2E3F4F 35%, #1E2B35 70%, #151F28 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="section-title text-4xl mb-2">LMPDCTN <span style={{ color: '#8FAABC' }}>/</span> ADMIN</h1>
          <p className="text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase">Accès restreint</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="glass-panel border border-white/20 rounded-sm p-8 space-y-6">
          {error && (
            <div className="p-4 bg-[#e52e71]/10 border border-[#e52e71]/20 rounded-sm">
              <p className="text-[#e52e71] text-xs font-bold uppercase tracking-wider text-center">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Identifiant</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/30 transition-colors font-mono"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm bg-white/5 border border-white/20 accent-[#8FAABC]" />
            <span className="text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase">Se souvenir de moi</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                VÉRIFICATION...
              </>
            ) : (
              'CONNEXION'
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-[0.65rem] font-bold tracking-widest mt-8 uppercase">
          Système Sécurisé / v2.1.0
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
