import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, UserCheck, Play, Heart, BadgeCheck, Users, Film } from 'lucide-react'
import { useApp } from '../context/AppContext'

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const { posts, users, toggleFollowUser } = useApp()
  const [activeTab, setActiveTab] = useState<'all' | 'users' | 'videos'>('all')

  const query = q.toLowerCase().trim()

  const matchedUsers = users.filter((u) => {
    if (!query) return true
    return (
      u.name.toLowerCase().includes(query) ||
      u.username.toLowerCase().includes(query) ||
      (u.bio && u.bio.toLowerCase().includes(query))
    )
  })

  const matchedPosts = posts.filter((p) => {
    if (!query) return true
    return (
      p.content.toLowerCase().includes(query) ||
      p.hashtags.some((h) => h.toLowerCase().includes(query)) ||
      p.author.username.toLowerCase().includes(query) ||
      p.author.name.toLowerCase().includes(query)
    )
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Search className="size-6 text-[#FE2C55]" />
          {q ? `Results for "${q}"` : 'Explore Trending Content'}
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          {matchedPosts.length} videos and {matchedUsers.length} accounts found
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 gap-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-[#FE2C55] text-[#FE2C55]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          Top Results
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'border-[#FE2C55] text-[#FE2C55]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Users className="size-4" />
          Accounts ({matchedUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'videos'
              ? 'border-[#FE2C55] text-[#FE2C55]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Film className="size-4" />
          Videos ({matchedPosts.length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {(activeTab === 'all' || activeTab === 'users') && matchedUsers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Creators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-colors"
                >
                  <Link to={`/@${user.username}`} className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="size-12 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-white truncate flex items-center gap-1">
                        {user.name}
                        {user.verified && <BadgeCheck className="size-3.5 text-sky-400" />}
                      </p>
                      <p className="text-xs text-zinc-400 truncate">@{user.username}</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                        {(user.followers_count / 1000).toFixed(1)}k followers
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => toggleFollowUser(user.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                      user.is_following
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-[#FE2C55] text-white hover:bg-[#e02449]'
                    }`}
                  >
                    {user.is_following ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'videos') && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Videos</h3>
            {matchedPosts.length === 0 ? (
              <p className="text-sm text-zinc-500 py-6 text-center">No matching videos found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {matchedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/video/${post.id}`}
                    className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 transition-all shadow-md"
                  >
                    <img
                      src={post.thumbnail_url}
                      alt={post.content}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <p className="text-xs line-clamp-1 font-medium mb-1 drop-shadow">{post.content}</p>
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="flex items-center gap-1">
                          <Play className="size-3 fill-white" />
                          {post.views_count.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="size-3 fill-white" />
                          {post.likes_count.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
