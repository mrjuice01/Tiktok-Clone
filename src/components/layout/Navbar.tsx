import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Plus, Bell, Shield, Video, User as UserIcon, Clock, ChevronDown, Check, LogOut, Flame } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const Navbar: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    searchQuery,
    setSearchQuery,
    openAuthModal,
    screenTimeSeconds
  } = useApp()
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim())
      navigate(`/search?q=${encodeURIComponent(localSearch.trim())}`)
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    return `${m}m`
  }

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-white/10 bg-black/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center size-9 rounded-xl bg-gradient-to-tr from-[#25F4EE] via-[#000000] to-[#FE2C55] p-[2px] transition-transform group-hover:scale-105">
            <div className="flex items-center justify-center size-full bg-black rounded-[10px]">
              <span className="font-extrabold text-white text-lg tracking-tighter">S</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Snapi
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#FE2C55]/20 text-[#FE2C55] border border-[#FE2C55]/30">
                Live
              </span>
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Global Search */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search creators, videos, hashtags..."
            className="w-full h-10 pl-10 pr-12 rounded-full bg-white/10 hover:bg-white/15 focus:bg-white/15 text-sm text-white placeholder-zinc-400 border border-transparent focus:border-[#FE2C55]/50 focus:outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-2.5 size-4 text-zinc-400" />
          {localSearch && (
            <button
              type="submit"
              className="absolute right-2 top-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#FE2C55] text-white hover:bg-[#e02449] transition-colors"
            >
              Search
            </button>
          )}
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Screen time tracker pill */}
        <Link
          to="/snapistudio/wellness"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          title="Daily Wellness & Screen Time"
        >
          <Clock className="size-3.5 text-emerald-400 animate-pulse" />
          <span className="font-medium tabular-nums">{formatTime(screenTimeSeconds)}</span>
        </Link>

        {/* Upload Button */}
        <Link
          to="/snapistudio/upload"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-semibold text-white border border-white/10 transition-transform active:scale-95"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Upload</span>
        </Link>

        {/* Studio Button */}
        <Link
          to="/snapistudio"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Video className="size-4 text-[#25F4EE]" />
          <span>Studio</span>
        </Link>

        {/* Admin Link (Sarah is admin) */}
        {currentUser.role === 'admin' && (
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 transition-colors"
          >
            <Shield className="size-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        )}

        {/* User Profile / Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#FE2C55]/50 transition-all"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="size-8 rounded-full object-cover border border-white/20"
            />
            <ChevronDown className="size-3 text-zinc-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <div className="p-2 border-b border-zinc-800/80 mb-1">
                <p className="font-semibold text-white text-sm truncate">{currentUser.name}</p>
                <p className="text-xs text-zinc-400 truncate">@{currentUser.username}</p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-1">
                <Link
                  to={`/@${currentUser.username}`}
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-colors"
                >
                  <UserIcon className="size-4 text-zinc-400" />
                  View Profile
                </Link>

                <Link
                  to="/snapistudio"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-colors"
                >
                  <Video className="size-4 text-zinc-400" />
                  Creator Studio
                </Link>

                <Link
                  to="/snapistudio/wellness"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-colors"
                >
                  <Clock className="size-4 text-zinc-400" />
                  Wellness Center
                </Link>

                {currentUser.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-amber-300 hover:bg-amber-400/10 transition-colors"
                  >
                    <Shield className="size-4 text-amber-400" />
                    Admin Dashboard
                  </Link>
                )}
              </div>

              {/* Demo User Quick Switcher */}
              <div className="pt-2 border-t border-zinc-800">
                <p className="px-3 py-1 text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  Switch Demo Account
                </p>
                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUser(u)
                      setShowUserMenu(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                      currentUser.id === u.id ? 'bg-[#FE2C55]/20 text-[#FE2C55]' : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img src={u.avatar} alt={u.name} className="size-5 rounded-full object-cover" />
                      <span className="truncate">@{u.username}</span>
                    </div>
                    {currentUser.id === u.id && <Check className="size-3.5" />}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-800 mt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    openAuthModal('login')
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <LogOut className="size-3.5" />
                  Sign In / Switch Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
