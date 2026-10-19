import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  Home,
  Users,
  UserCheck,
  Compass,
  Video,
  HeartPulse,
  Shield,
  HelpCircle,
  FileText,
  BadgeCheck
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const Sidebar: React.FC = () => {
  const { currentUser, users, toggleFollowUser } = useApp()

  const navItems = [
    { label: 'For You', path: '/', icon: Home },
    { label: 'Following', path: '/following', icon: Users },
    { label: 'Friends', path: '/friends', icon: UserCheck },
    { label: 'Explore', path: '/search', icon: Compass }
  ]

  const studioItems = [
    { label: 'Creator Studio', path: '/snapistudio', icon: Video },
    { label: 'Wellness Center', path: '/snapistudio/wellness', icon: HeartPulse }
  ]

  const suggestedUsers = users.filter((u) => u.id !== currentUser.id)

  return (
    <aside className="w-20 md:w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto no-scrollbar border-r border-white/10 bg-black/60 px-2 md:px-4 py-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Main Feed Links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3 py-3 rounded-2xl text-base font-semibold transition-all ${
                  isActive
                    ? 'text-[#FE2C55] bg-[#FE2C55]/10 font-bold'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="size-6 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-4 hidden md:block">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Creator Tools
          </p>
          <div className="space-y-1">
            {studioItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-400/10 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="size-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}

            {currentUser.role === 'admin' && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-amber-400 bg-amber-400/10 font-semibold'
                      : 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-400/5'
                  }`
                }
              >
                <Shield className="size-5 shrink-0 text-amber-400" />
                <span>Admin Panel</span>
              </NavLink>
            )}
          </div>
        </div>

        {/* Suggested Accounts */}
        <div className="border-t border-white/10 pt-4 hidden md:block">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            Suggested Accounts
          </p>
          <div className="space-y-2">
            {suggestedUsers.slice(0, 4).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <Link to={`/@${user.username}`} className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="size-8 rounded-full object-cover border border-white/10"
                    />
                    {user.verified && (
                      <BadgeCheck className="absolute -bottom-1 -right-1 size-3.5 text-sky-400 bg-black rounded-full" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate flex items-center gap-1">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">@{user.username}</p>
                  </div>
                </Link>

                <button
                  onClick={() => toggleFollowUser(user.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all shrink-0 ${
                    user.is_following
                      ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      : 'bg-[#FE2C55] text-white hover:bg-[#e02449]'
                  }`}
                >
                  {user.is_following ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="hidden md:block pt-4 border-t border-white/10 text-xs text-zinc-500 space-y-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <Link to="/terms-of-service" className="hover:text-zinc-300 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="hover:text-zinc-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/help" className="hover:text-zinc-300 transition-colors">
            Help
          </Link>
        </div>
        <p className="text-[11px] text-zinc-600">© 2026 Snapi, Inc. All rights reserved.</p>
      </div>
    </aside>
  )
}
