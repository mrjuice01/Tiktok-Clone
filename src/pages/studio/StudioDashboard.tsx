import React from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Eye,
  Heart,
  Users,
  Video,
  ArrowUpRight,
  Sparkles,
  BarChart3
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

const ANALYTICS_DATA = [
  { day: 'Mon', views: 24000, likes: 3200, followers: 120 },
  { day: 'Tue', views: 32000, likes: 4100, followers: 180 },
  { day: 'Wed', views: 28000, likes: 3900, followers: 150 },
  { day: 'Thu', views: 45000, likes: 6200, followers: 310 },
  { day: 'Fri', views: 52000, likes: 7800, followers: 420 },
  { day: 'Sat', views: 68000, likes: 9400, followers: 580 },
  { day: 'Sun', views: 85400, likes: 12430, followers: 750 }
]

const POST_PERFORMANCE_DATA = [
  { name: 'Motion UI Reel', views: 85400, likes: 12430 },
  { name: 'Garlic Noodles', views: 210000, likes: 48900 },
  { name: 'Shibuya Rain', views: 450000, likes: 92300 },
  { name: 'React Tips', views: 142000, likes: 31200 },
  { name: 'Espresso Beats', views: 98000, likes: 18400 }
]

export const StudioDashboard: React.FC = () => {
  const { currentUser, posts } = useApp()
  const myPosts = posts.filter((p) => p.author.username === currentUser.username)

  const totalViews = myPosts.reduce((acc, p) => acc + p.views_count, 85400)
  const totalLikes = myPosts.reduce((acc, p) => acc + p.likes_count, 12430)

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-[#FE2C55]/15 border border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Welcome back, {currentUser.name}!</h1>
            <Sparkles className="size-5 text-amber-400" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Your channel impressions are up <span className="text-emerald-400 font-semibold">+24.8%</span> this week. Keep up the momentum!
          </p>
        </div>

        <Link
          to="/snapistudio/upload"
          className="px-5 py-2.5 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-sm text-white flex items-center gap-2 shadow-lg shadow-[#FE2C55]/20 transition-all shrink-0"
        >
          <Video className="size-4" />
          Upload New Video
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Views (7d)</span>
            <Eye className="size-4 text-sky-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalViews.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="size-3" /> +18.2% vs last week
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Video Likes</span>
            <Heart className="size-4 text-[#FE2C55]" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalLikes.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="size-3" /> +12.5% vs last week
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Followers</span>
            <Users className="size-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">
            {currentUser.followers_count.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="size-3" /> +840 new this week
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Engagement Rate</span>
            <TrendingUp className="size-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">8.4%</p>
          <p className="text-xs text-zinc-400">Industry benchmark: 4.5%</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Growth Trend */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Performance Over Time</h3>
              <p className="text-xs text-zinc-400">Daily video views across your channel</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-zinc-300">
              Last 7 Days
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FE2C55" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} tickLine={false} />
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
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#FE2C55"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#viewGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement by Post */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Top Performing Content</h3>
              <p className="text-xs text-zinc-400">Comparing views by video reel</p>
            </div>
            <BarChart3 className="size-4 text-zinc-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={POST_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} />
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
                <Bar dataKey="views" fill="#25F4EE" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Videos Table */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">Your Active Posts</h3>
          <Link
            to="/snapistudio/content"
            className="text-xs text-[#FE2C55] hover:underline font-semibold"
          >
            Manage All Content
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase">
                <th className="pb-3">Video</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Views</th>
                <th className="pb-3">Likes</th>
                <th className="pb-3">Comments</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {myPosts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={post.thumbnail_url}
                      alt={post.content}
                      className="size-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 max-w-xs">
                      <p className="text-xs font-semibold text-white truncate">{post.content}</p>
                      <p className="text-[11px] text-zinc-400">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs tabular-nums text-zinc-300">
                    {post.views_count.toLocaleString()}
                  </td>
                  <td className="py-3 text-xs tabular-nums text-zinc-300">
                    {post.likes_count.toLocaleString()}
                  </td>
                  <td className="py-3 text-xs tabular-nums text-zinc-300">
                    {post.comments_count.toLocaleString()}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to={`/video/${post.id}`}
                      className="text-xs font-medium text-cyan-400 hover:underline mr-3"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
