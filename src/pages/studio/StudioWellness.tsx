import React, { useState } from 'react'
import {
  HeartPulse,
  Clock,
  Coffee,
  Moon,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  BarChart2
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { WellnessRule, WellnessRuleType, WellnessActionType } from '../../types'

const SCREEN_TIME_WEEKLY = [
  { day: 'Mon', minutes: 54 },
  { day: 'Tue', minutes: 78 },
  { day: 'Wed', minutes: 62 },
  { day: 'Thu', minutes: 90 },
  { day: 'Fri', minutes: 110 },
  { day: 'Sat', minutes: 85 },
  { day: 'Sun', minutes: 42 }
]

export const StudioWellness: React.FC = () => {
  const {
    wellnessRules,
    addWellnessRule,
    toggleWellnessRule,
    deleteWellnessRule,
    screenTimeSeconds
  } = useApp()

  const [showAddForm, setShowAddForm] = useState(false)
  const [ruleType, setRuleType] = useState<WellnessRuleType>('continuous_usage')
  const [minutes, setMinutes] = useState(45)
  const [actionType, setActionType] = useState<WellnessActionType>('warning')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const hours = Math.floor(screenTimeSeconds / 3600)
  const mins = Math.floor((screenTimeSeconds % 3600) / 60)

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault()
    const defaultTitle =
      ruleType === 'continuous_usage'
        ? `Break Reminder (${minutes}m)`
        : ruleType === 'daily_limit'
        ? `Daily Limit (${minutes}m)`
        : 'Late Night Wind-Down'

    const defaultMsg =
      ruleType === 'continuous_usage'
        ? `You have been watching videos for ${minutes} minutes continuously. Time for a quick break!`
        : ruleType === 'daily_limit'
        ? `You have reached your daily budget of ${minutes} minutes.`
        : 'It is late at night. Unplug and recharge for tomorrow.'

    addWellnessRule({
      type: ruleType,
      title: title.trim() || defaultTitle,
      message: message.trim() || defaultMsg,
      minutes,
      action: actionType,
      is_enabled: true
    })

    setShowAddForm(false)
    setTitle('')
    setMessage('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <HeartPulse className="size-6 text-[#FE2C55]" />
            Digital Wellness & Screen Time
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Build mindful digital habits with customized watch time reminders and sleep guards.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-xs text-white flex items-center gap-1.5 transition-colors"
        >
          <Plus className="size-4" />
          Add Wellness Rule
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Today's Screen Time</span>
            <Clock className="size-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">
            {hours > 0 ? `${hours}h ` : ''}
            {mins}m
          </p>
          <p className="text-[11px] text-emerald-400">Mindful pace - 32% below daily limit</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Active Safeguards</span>
            <CheckCircle2 className="size-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">
            {wellnessRules.filter((r) => r.is_enabled).length} active
          </p>
          <p className="text-[11px] text-zinc-400">Total rules configured: {wellnessRules.length}</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Healthy Sleep Score</span>
            <Moon className="size-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">94/100</p>
          <p className="text-[11px] text-indigo-400">No late-night scrolling detected</p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Daily Usage Breakdown</h3>
            <p className="text-xs text-zinc-400">Minutes spent on video feed this week</p>
          </div>
          <BarChart2 className="size-4 text-zinc-400" />
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SCREEN_TIME_WEEKLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              <Bar dataKey="minutes" fill="#FE2C55" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Rules List */}
      <div className="space-y-4">
        <h3 className="font-bold text-white text-base">Configured Safeguard Rules</h3>
        <div className="space-y-3">
          {wellnessRules.map((rule) => (
            <div
              key={rule.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-zinc-800 text-[#FE2C55] shrink-0">
                  {rule.type === 'late_night' ? (
                    <Moon className="size-5" />
                  ) : rule.type === 'continuous_usage' ? (
                    <Coffee className="size-5" />
                  ) : (
                    <Clock className="size-5" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{rule.title}</h4>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                      {rule.type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{rule.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.is_enabled}
                    onChange={() => toggleWellnessRule(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FE2C55]"></div>
                </label>

                <button
                  onClick={() => deleteWellnessRule(rule.id)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                  title="Delete rule"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Rule Dialog */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="font-bold text-white text-base">New Wellness Safeguard</h3>
              <button onClick={() => setShowAddForm(false)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Rule Type</label>
                <select
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none"
                >
                  <option value="continuous_usage">Continuous Usage Reminder</option>
                  <option value="daily_limit">Daily Screen Time Budget</option>
                  <option value="late_night">Late Night Sleep Guard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Threshold (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="360"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Rule Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Afternoon Stretch Break"
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Custom Reminder Message
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Take a breather and grab some water!"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FE2C55] text-xs font-semibold text-white hover:bg-[#e02449]"
                >
                  Create Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
