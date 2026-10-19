import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Film,
  AlertTriangle,
  Scale,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useApp } from '../../context/AppContext'

const USER_GROWTH = [
  { month: 'May', users: 12000, posts: 4500 },
  { month: 'Jun', users: 18500, posts: 7200 },
  { month: 'Jul', users: 29000, posts: 11000 },
  { month: 'Aug', users: 48000, posts: 19500 },
  { month: 'Sep', users: 76000, posts: 32000 },
  { month: 'Oct', users: 114000, posts: 48500 }
]

const MODERATION_BREAKDOWN = [
  { category: 'Safe / Clean', count: 4820 },
  { category: 'AI Filtered', count: 320 },
  { category: 'Pending Review', count: 45 },
  { category: 'Removed Violations', count: 88 }
]

export const AdminDashboard: React.FC = () => {
  const { posts, users, appeals, activityLogs } = useApp()

  const pendingAppeals = appeals.filter((a) => a.status === 'pending').length
  const flaggedPosts = posts.filter((p) => p.status === 'flagged' || p.status === 'under_review').length

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Admin Title */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Platform Governance & Metrics
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Real-time oversight of platform safety, user growth, and automated AI moderation.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Registered Users</span>
            <Users className="size-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">114,820</p>
          <p className="text-xs text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="size-3" /> +14.6% this month
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Published Videos</span>
            <Film className="size-4 text-sky-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">48,520</p>
          <p className="text-xs text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="size-3" /> +2,100 this week
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Pending Appeals</span>
            <Scale className="size-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-300">{pendingAppeals}</p>
          <Link
            to="/admin/appeals"
            className="text-xs text-amber-400 hover:underline block"
          >
            Review tickets &rarr;
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Flagged Videos</span>
            <AlertTriangle className="size-4 text-red-400" />
          </div>
          <p className="text-2xl font-extrabold text-red-400">{flaggedPosts}</p>
          <Link
            to="/admin/posts"
            className="text-xs text-red-400 hover:underline block"
          >
            Audit violations &rarr;
          </Link>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h3 className="font-bold text-white text-base">User & Content Growth</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={USER_GROWTH} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25F4EE" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#25F4EE" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="users" stroke="#25F4EE" strokeWidth={2} fill="url(#userGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h3 className="font-bold text-white text-base">Safety Moderation Breakdown</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODERATION_BREAKDOWN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="category" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#FE2C55" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">Audit Trail</h3>
          <Link to="/admin/activity" className="text-xs text-amber-400 hover:underline">
            View All Activity
          </Link>
        </div>

        <div className="space-y-3">
          {activityLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-zinc-800/40 border border-white/5 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-semibold text-white">
                  {log.action} · <span className="text-zinc-400 font-normal">{log.details}</span>
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">By {log.admin_name}</p>
              </div>
              <span className="text-zinc-500 tabular-nums">
                {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
