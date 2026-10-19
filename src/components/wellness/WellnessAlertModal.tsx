import React from 'react'
import { HeartPulse, Coffee, Moon, Check, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const WellnessAlertModal: React.FC = () => {
  const { activeAlert, dismissAlert } = useApp()

  if (!activeAlert) return null

  const getIcon = () => {
    if (activeAlert.type === 'late_night') return <Moon className="size-8 text-indigo-400" />
    if (activeAlert.type === 'continuous_usage') return <Coffee className="size-8 text-amber-400" />
    return <HeartPulse className="size-8 text-[#FE2C55]" />
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
        <div className="mx-auto size-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          {getIcon()}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-white">{activeAlert.title}</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">{activeAlert.message}</p>
        </div>

        <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-400 text-left space-y-1.5">
          <p className="font-semibold text-zinc-200">Suggested Wellness Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Drink a glass of water</li>
            <li>Look away at something 20 feet away for 20 seconds</li>
            <li>Stretch your shoulders and neck</li>
          </ul>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            onClick={dismissAlert}
            className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold text-white transition-colors"
          >
            Snooze 10 mins
          </button>
          <button
            onClick={dismissAlert}
            className="flex-1 py-3 px-4 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] text-sm font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="size-4" />
            Taking a Break
          </button>
        </div>
      </div>
    </div>
  )
}
