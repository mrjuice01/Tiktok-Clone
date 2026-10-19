import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Upload,
  Film,
  Calendar,
  HeartPulse,
  Scale,
  Settings,
  ChevronLeft
} from 'lucide-react'

export const StudioLayout: React.FC = () => {
  const menuItems = [
    { label: 'Overview', path: '/snapistudio', icon: LayoutDashboard, end: true },
    { label: 'Upload Video', path: '/snapistudio/upload', icon: Upload },
    { label: 'Content Manager', path: '/snapistudio/content', icon: Film },
    { label: 'Scheduled Posts', path: '/snapistudio/scheduled-posts', icon: Calendar },
    { label: 'Wellness & Rules', path: '/snapistudio/wellness', icon: HeartPulse },
    { label: 'Appeals', path: '/snapistudio/appeals', icon: Scale },
    { label: 'Settings', path: '/snapistudio/settings', icon: Settings }
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-zinc-950 text-white">
      {/* Studio Sidebar */}
      <aside className="w-16 md:w-60 border-r border-zinc-800 bg-zinc-900/40 p-3 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="px-2 hidden md:block">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
            >
              <ChevronLeft className="size-3.5" />
              Back to Snapi
            </Link>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#FE2C55]" />
              Creator Studio
            </h2>
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
                      ? 'bg-[#FE2C55]/15 text-[#FE2C55] font-semibold'
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

        <div className="hidden md:block p-3 rounded-2xl bg-gradient-to-br from-zinc-800/80 to-zinc-900 border border-zinc-700/50 text-xs text-zinc-300 space-y-2">
          <p className="font-semibold text-white">Need Creative Help?</p>
          <p className="text-[11px] text-zinc-400">
            Check out viral video strategies in the Creator Knowledge Base.
          </p>
        </div>
      </aside>

      {/* Main Studio View */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
