import React, { useState } from 'react'
import { Activity, Shield, Filter, Search } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const AdminActivity: React.FC = () => {
  const { activityLogs } = useApp()
  const [filter, setFilter] = useState<string>('all')

  const filteredLogs = activityLogs.filter((log) => {
    if (filter === 'all') return true
    return log.target_type === filter
  })

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="size-6 text-amber-400" />
          System Activity & Audit Log
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Complete transparent history of administrative decisions, rule modifications, and enforcement events.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3">
        {['all', 'post', 'user', 'appeal', 'setting'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === type
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden divide-y divide-zinc-800/60">
        {filteredLogs.map((log) => (
          <div key={log.id} className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-800/20 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-300">
                  {log.action}
                </span>
                <span className="text-xs text-white font-medium">{log.target_name}</span>
              </div>
              <p className="text-xs text-zinc-300">{log.details}</p>
              <p className="text-[11px] text-zinc-500">Initiator: {log.admin_name}</p>
            </div>

            <span className="text-xs text-zinc-500 whitespace-nowrap">
              {new Date(log.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
