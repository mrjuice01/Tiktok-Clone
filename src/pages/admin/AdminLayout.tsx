import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  ShieldAlert,
  LayoutDashboard,
  Film,
  Users,
  Scale,
  Activity,
  ChevronLeft
} from 'lucide-react'

export const AdminLayout: React.FC = () => {
  const menuItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Post Moderation', path: '/admin/posts', icon: Film },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Appeals Queue', path: '/admin/appeals', icon: Scale },
    { label: 'Activity Logs', path: '/admin/activity', icon: Activity }
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-zinc-950 text-white">
      {/* Admin Sidebar */}
      <aside className="w-16 md:w-60 border-r border-zinc-800 bg-zinc-900/40 p-3 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="px-2 hidden md:block">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
            >
              <ChevronLeft className="size-3.5" />
              Exit Admin
            </Link>
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-5 text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-tight">Admin Console</h2>
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5">Trust & Safety Platform</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-400 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`
                }
              >
                <item.icon className="size-4.5 shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden md:block p-3 rounded-2xl bg-amber-400/5 border border-amber-400/10 text-xs text-zinc-400 space-y-1">
          <p className="font-semibold text-amber-400">Strict Moderation Mode</p>
          <p className="text-[10px] text-zinc-500">
            Real-time automated content filtering is active.
          </p>
        </div>
      </aside>

      {/* Main Admin View */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
