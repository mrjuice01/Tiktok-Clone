import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Film, Eye, Heart, MessageCircle, MoreVertical, Edit2, Trash2, ExternalLink, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Post } from '../../types'

export const StudioContent: React.FC = () => {
  const { posts, deletePost, updatePost, currentUser } = useApp()
  const [filter, setFilter] = useState<'all' | 'public' | 'friends' | 'private'>('all')
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [editCaption, setEditCaption] = useState('')

  const myPosts = posts.filter((p) => p.author.username === currentUser.username)
  const filteredPosts = myPosts.filter((p) => (filter === 'all' ? true : p.visibility === filter))

  const handleStartEdit = (post: Post) => {
    setEditingPost(post)
    setEditCaption(post.content)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return
    updatePost(editingPost.id, { content: editCaption.trim() })
    setEditingPost(null)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Manager</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your published reels, privacy settings, and video performance.
          </p>
        </div>

        <Link
          to="/snapistudio/upload"
          className="px-4 py-2 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-xs text-white transition-colors"
        >
          + Upload Video
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3">
        {(['all', 'public', 'friends', 'private'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === tab
                ? 'bg-white/10 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Table / Cards */}
      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <Film className="size-12 mx-auto mb-3 stroke-1 opacity-50" />
            <p className="text-sm font-semibold text-zinc-300">No content found</p>
            <p className="text-xs text-zinc-500 mt-1">Upload a video to see it in your manager.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden bg-black shrink-0">
                    <img
                      src={post.thumbnail_url}
                      alt={post.content}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-white line-clamp-2">{post.content}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="capitalize px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-300">
                        {post.visibility}
                      </span>
                      <span>•</span>
                      <span className="capitalize px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px]">
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800">
                  <div className="flex items-center gap-4 text-xs text-zinc-300">
                    <span className="flex items-center gap-1" title="Views">
                      <Eye className="size-3.5 text-zinc-400" />
                      {post.views_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1" title="Likes">
                      <Heart className="size-3.5 text-zinc-400" />
                      {post.likes_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1" title="Comments">
                      <MessageCircle className="size-3.5 text-zinc-400" />
                      {post.comments_count.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/video/${post.id}`}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                      title="View reel"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                    <button
                      onClick={() => handleStartEdit(post)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                      title="Edit caption"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this video from your channel?')) {
                          deletePost(post.id)
                        }
                      }}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete video"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="font-bold text-white text-base">Edit Video Caption</h3>
              <button onClick={() => setEditingPost(null)} className="text-zinc-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <textarea
                rows={4}
                required
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white focus:outline-none resize-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FE2C55] text-xs font-semibold text-white hover:bg-[#e02449]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
