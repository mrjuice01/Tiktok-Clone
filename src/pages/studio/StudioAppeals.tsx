import React, { useState } from 'react'
import { Scale, Plus, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Appeal } from '../../types'

export const StudioAppeals: React.FC = () => {
  const { appeals, submitAppeal, currentUser, posts } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [appealType, setAppealType] = useState<Appeal['appeal_type']>('post_moderation')
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [selectedPostId, setSelectedPostId] = useState('')

  const myAppeals = appeals.filter((a) => a.user_id === currentUser.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason.trim() || !details.trim()) return

    const relatedPost = posts.find((p) => p.id === selectedPostId)

    submitAppeal({
      user_id: currentUser.id,
      appeal_type: appealType,
      post_id: selectedPostId || undefined,
      post_title: relatedPost?.content.slice(0, 40) || undefined,
      post_thumbnail: relatedPost?.thumbnail_url || undefined,
      reason: reason.trim(),
      details: details.trim()
    })

    setShowForm(false)
    setReason('')
    setDetails('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Scale className="size-6 text-[#25F4EE]" />
            Creator Appeals Center
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Request reviews on policy flags, copyrighted sounds, or content restrictions.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-xs text-white flex items-center gap-1.5 transition-colors"
        >
          <Plus className="size-4" />
          File New Appeal
        </button>
      </div>

      {/* Appeals List */}
      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden">
        {myAppeals.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 space-y-2">
            <Scale className="size-12 mx-auto stroke-1 opacity-50" />
            <p className="text-sm font-semibold text-zinc-300">No active appeals</p>
            <p className="text-xs text-zinc-500">Your account and videos are in good standing!</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {myAppeals.map((appeal) => (
              <div key={appeal.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-400">ID: {appeal.uuid}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          appeal.status === 'approved'
                            ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                            : appeal.status === 'rejected'
                            ? 'bg-red-400/10 text-red-400 border border-red-400/20'
                            : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                        }`}
                      >
                        {appeal.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{appeal.reason}</h3>
                    <p className="text-xs text-zinc-300">{appeal.details}</p>
                  </div>

                  <span className="text-[11px] text-zinc-500 shrink-0">
                    {new Date(appeal.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Admin Note if resolved */}
                {appeal.admin_note && (
                  <div className="p-3 rounded-xl bg-zinc-800/60 border border-white/5 text-xs text-zinc-300 space-y-1">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      {appeal.status === 'approved' ? (
                        <CheckCircle2 className="size-3.5 text-emerald-400" />
                      ) : (
                        <XCircle className="size-3.5 text-red-400" />
                      )}
                      Moderator Feedback
                    </p>
                    <p className="text-zinc-400">{appeal.admin_note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Appeal Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="font-bold text-white text-base">Submit Appeal</h3>
              <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Appeal Type</label>
                <select
                  value={appealType}
                  onChange={(e) => setAppealType(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none"
                >
                  <option value="post_moderation">Video Moderation Flag</option>
                  <option value="account_ban">Account Status Review</option>
                  <option value="comment_removal">Comment Removal Contest</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Reason for Appeal
                </label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Authorized commercial audio license"
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Detailed Explanation & Evidence
                </label>
                <textarea
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Explain why this content adheres to community guidelines..."
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FE2C55] text-xs font-semibold text-white hover:bg-[#e02449]"
                >
                  Submit Appeal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
