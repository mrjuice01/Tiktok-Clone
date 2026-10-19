import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Film, ShieldCheck, AlertTriangle, Eye, Trash2, CheckCircle2, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Post } from '../../types'

export const AdminPosts: React.FC = () => {
  const { posts, updatePost, deletePost, addActivityLog } = useApp()
  const [filter, setFilter] = useState<'all' | 'flagged' | 'active'>('all')
  const [previewPost, setPreviewPost] = useState<Post | null>(null)

  const filtered = posts.filter((p) => {
    if (filter === 'flagged') return p.status === 'flagged' || p.status === 'under_review'
    if (filter === 'active') return p.status === 'active'
    return true
  })

  const handleApprove = (postId: string) => {
    updatePost(postId, { status: 'active' })
    addActivityLog('APPROVE_POST', 'post', postId, 'Post cleared of policy flags by moderator.')
  }

  const handleFlag = (postId: string) => {
    updatePost(postId, { status: 'flagged' })
    addActivityLog('FLAG_POST', 'post', postId, 'Post restricted due to safety review.')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Post Moderation</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review reported reels, apply content filters, and enforce Snapi community guidelines.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3">
        {(['all', 'flagged', 'active'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === tab
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'flagged' ? 'Needs Attention (Flagged)' : tab}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase">
                <th className="p-4">Post & Creator</th>
                <th className="p-4">Safety Status</th>
                <th className="p-4">Stats</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.thumbnail_url}
                        alt="thumb"
                        className="size-14 rounded-xl object-cover shrink-0 cursor-pointer"
                        onClick={() => setPreviewPost(post)}
                      />
                      <div className="min-w-0 max-w-sm">
                        <p className="text-xs font-semibold text-white truncate">{post.content}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          By <span className="text-white font-medium">@{post.author.username}</span> ·{' '}
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        post.status === 'active'
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                          : 'bg-red-400/10 text-red-400 border border-red-400/20'
                      }`}
                    >
                      {post.status === 'active' ? (
                        <ShieldCheck className="size-3" />
                      ) : (
                        <AlertTriangle className="size-3" />
                      )}
                      {post.status}
                    </span>
                  </td>

                  <td className="p-4 text-xs text-zinc-400 space-y-0.5">
                    <p>{post.views_count.toLocaleString()} views</p>
                    <p>{post.likes_count.toLocaleString()} likes</p>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setPreviewPost(post)}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200"
                    >
                      Preview
                    </button>

                    {post.status !== 'active' ? (
                      <button
                        onClick={() => handleApprove(post.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-semibold text-emerald-300 transition-colors"
                      >
                        Clear Flag
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFlag(post.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold text-red-300 transition-colors"
                      >
                        Flag Content
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm('Permanently remove this video from platform?')) {
                          deletePost(post.id)
                        }
                      }}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete video"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Video Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-3xl bg-zinc-950 border border-zinc-800 p-4 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-white">Previewing Post #{previewPost.id}</span>
              <button onClick={() => setPreviewPost(null)} className="text-zinc-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black">
              <video
                src={previewPost.video_url}
                controls
                autoPlay
                loop
                className="size-full object-cover"
              />
            </div>

            <p className="text-xs text-zinc-300">{previewPost.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}
