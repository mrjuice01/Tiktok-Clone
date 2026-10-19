import React, { useState } from 'react'
import { Scale, CheckCircle2, XCircle, Clock, MessageSquare, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Appeal } from '../../types'

export const AdminAppeals: React.FC = () => {
  const { appeals, updateAppealStatus } = useApp()
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all')
  const [activeAppeal, setActiveAppeal] = useState<Appeal | null>(null)
  const [adminNote, setAdminNote] = useState('')

  const filtered = appeals.filter((a) => {
    if (filter === 'pending') return a.status === 'pending'
    if (filter === 'resolved') return a.status !== 'pending'
    return true
  })

  const handleResolve = (status: 'approved' | 'rejected') => {
    if (!activeAppeal) return
    updateAppealStatus(activeAppeal.id, status, adminNote.trim() || undefined)
    setActiveAppeal(null)
    setAdminNote('')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Appeals Queue</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review community disputes, copyright disputes, and policy exemption requests.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3">
        {(['all', 'pending', 'resolved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === tab
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'pending' ? 'Pending Review' : tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 rounded-3xl bg-zinc-900/40 border border-zinc-800">
            <Scale className="size-12 mx-auto mb-2 opacity-50 stroke-1" />
            <p className="text-sm font-semibold text-zinc-300">No appeals in this filter</p>
          </div>
        ) : (
          filtered.map((appeal) => (
            <div
              key={appeal.id}
              className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">#{appeal.uuid}</span>
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
                  <span className="text-xs text-zinc-400">
                    From <strong className="text-white">@{appeal.author.username}</strong>
                  </span>
                </div>

                <span className="text-xs text-zinc-500">
                  {new Date(appeal.created_at).toLocaleString()}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">{appeal.reason}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{appeal.details}</p>
              </div>

              {appeal.admin_note && (
                <div className="p-3 rounded-xl bg-zinc-800/40 text-xs text-zinc-400">
                  <span className="font-semibold text-zinc-200">Decision Note: </span>
                  {appeal.admin_note}
                </div>
              )}

              {appeal.status === 'pending' && (
                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800/60">
                  <button
                    onClick={() => {
                      setActiveAppeal(appeal)
                      setAdminNote('')
                    }}
                    className="px-4 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-semibold transition-colors"
                  >
                    Review & Decide
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Decision Modal */}
      {activeAppeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="font-bold text-white text-base">Resolve Appeal #{activeAppeal.uuid}</h3>
              <button onClick={() => setActiveAppeal(null)} className="text-zinc-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 text-xs text-zinc-300 space-y-1">
              <p className="font-semibold text-white">{activeAppeal.reason}</p>
              <p className="text-zinc-400">{activeAppeal.details}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Admin Explanation Note
              </label>
              <textarea
                rows={3}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="State reason for approval or rejection..."
                className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleResolve('rejected')}
                className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <XCircle className="size-4" />
                Reject Appeal
              </button>
              <button
                type="button"
                onClick={() => handleResolve('approved')}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="size-4" />
                Approve & Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
