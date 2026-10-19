import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const StudioScheduled: React.FC = () => {
  const { scheduledPosts, deleteScheduledPost } = useApp()

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Scheduled Posts</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Videos queued to automatically publish at optimal viewer traffic windows.
          </p>
        </div>

        <Link
          to="/snapistudio/upload"
          className="px-4 py-2 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-xs text-white flex items-center gap-1.5 transition-colors"
        >
          <Plus className="size-4" />
          Schedule New Video
        </Link>
      </div>

      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden">
        {scheduledPosts.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 space-y-3">
            <Calendar className="size-12 mx-auto stroke-1 opacity-50" />
            <div>
              <p className="text-sm font-semibold text-zinc-300">No scheduled posts</p>
              <p className="text-xs text-zinc-500 mt-1">
                Queue up videos ahead of time to maintain steady daily engagement!
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {scheduledPosts.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.thumbnail_url}
                    alt="scheduled thumbnail"
                    className="size-16 rounded-xl object-cover bg-black shrink-0"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white line-clamp-1">{item.caption}</p>
                    <div className="flex items-center gap-2 text-xs text-amber-300">
                      <Clock className="size-3.5" />
                      <span>Publishes: {new Date(item.scheduled_time).toLocaleString()}</span>
                    </div>
                    <span className="inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (confirm('Cancel this scheduled post?')) {
                        deleteScheduledPost(item.id)
                      }
                    }}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="size-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
