import React, { useState } from 'react'
import { User, Lock, Shield, Check, Bell } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const StudioSettings: React.FC = () => {
  const { currentUser, setCurrentUser } = useApp()

  const [name, setName] = useState(currentUser.name)
  const [bio, setBio] = useState(currentUser.bio || '')
  const [email, setEmail] = useState(currentUser.email || 'creator@snapi.app')
  const [isPrivate, setIsPrivate] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentUser({
      ...currentUser,
      name: name.trim(),
      bio: bio.trim(),
      email: email.trim()
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Creator Settings</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Update your channel information, privacy preferences, and notification channels.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
          <Check className="size-4" />
          Settings successfully saved!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <User className="size-4 text-[#FE2C55]" />
            Account Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Channel Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Shield className="size-4 text-cyan-400" />
            Privacy & Permissions
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Private Account</p>
                <p className="text-xs text-zinc-400">
                  Only approved followers can view your videos and profile.
                </p>
              </div>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="size-4 accent-[#FE2C55] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Push Notifications</p>
                <p className="text-xs text-zinc-400">
                  Receive alerts when other creators like, comment, or remix your videos.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="size-4 accent-[#FE2C55] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-sm text-white transition-transform active:scale-95 shadow-lg shadow-[#FE2C55]/20"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  )
}
