import React, { useState } from 'react'
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    users,
    setCurrentUser,
    currentUser
  } = useApp()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  if (!authModalOpen) return null

  const isLogin = authModalMode === 'login'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create new profile or login
    if (!isLogin && username.trim()) {
      const newUser = {
        id: `usr_${Date.now()}`,
        username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''),
        name: name.trim() || username.trim(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username.trim()}`,
        bio: 'Just joined Snapi! 🎬',
        verified: false,
        followers_count: 0,
        following_count: 0,
        likes_count: 0,
        role: 'user' as const,
        status: 'active' as const,
        email: email.trim(),
        joined_date: 'Today'
      }
      setCurrentUser(newUser)
    }
    closeAuthModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 size-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-[#FE2C55]/20 text-[#FE2C55] mb-2">
            <span className="font-black text-xl">S</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {isLogin ? 'Log in to Snapi' : 'Sign up for Snapi'}
          </h3>
          <p className="text-xs text-zinc-400">
            {isLogin
              ? 'Manage your account, check notifications, comment on videos'
              : 'Create a profile, follow creators, make your own videos'}
          </p>
        </div>

        {/* Demo Accounts Quick Login */}
        <div className="space-y-2 pt-1">
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider text-center">
            One-Click Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-2">
            {users.slice(0, 4).map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  setCurrentUser(u)
                  closeAuthModal()
                }}
                className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all ${
                  currentUser.id === u.id
                    ? 'border-[#FE2C55] bg-[#FE2C55]/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <img src={u.avatar} alt={u.name} className="size-7 rounded-full object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate flex items-center gap-1">
                    {u.name}
                    {u.role === 'admin' && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-400 font-mono">
                        ADMIN
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate">@{u.username}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-800 w-full" />
          <span className="absolute bg-zinc-950 px-3 text-[11px] uppercase tracking-wider text-zinc-500">
            Or continue with email
          </span>
        </div>

        {/* Custom Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm text-zinc-500">@</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="alex_creator"
                    className="w-full h-10 pl-8 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 size-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 size-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-white text-sm transition-transform active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-[#FE2C55]/20 mt-2"
          >
            <span>{isLogin ? 'Log In' : 'Create Account'}</span>
            <ArrowRight className="size-4" />
          </button>
        </form>

        {/* Switch Login/Signup */}
        <div className="pt-2 text-center text-xs text-zinc-400">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => openAuthModal('signup')}
                className="text-[#FE2C55] font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => openAuthModal('login')}
                className="text-[#FE2C55] font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
