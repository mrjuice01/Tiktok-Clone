import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Shield, Ban, CheckCircle, Search, BadgeCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { User } from '../../types'

export const AdminUsers: React.FC = () => {
  const { users, currentUser, setCurrentUser, addActivityLog } = useApp()
  const [search, setSearch] = useState('')
  const [userList, setUserList] = useState<User[]>(users)

  const filteredUsers = userList.filter((u) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
  })

  const handleToggleBan = (user: User) => {
    const newStatus = user.status === 'banned' ? 'active' : 'banned'
    const updated = userList.map((u) => (u.id === user.id ? { ...u, status: newStatus as any } : u))
    setUserList(updated)

    if (currentUser.id === user.id) {
      setCurrentUser({ ...currentUser, status: newStatus as any })
    }

    addActivityLog(
      newStatus === 'banned' ? 'BAN_USER' : 'UNBAN_USER',
      'user',
      `@${user.username}`,
      `Moderator set user status to ${newStatus}.`
    )
  }

  const handleToggleRole = (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    const updated = userList.map((u) => (u.id === user.id ? { ...u, role: newRole as any } : u))
    setUserList(updated)

    if (currentUser.id === user.id) {
      setCurrentUser({ ...currentUser, role: newRole as any })
    }

    addActivityLog(
      'UPDATE_USER_ROLE',
      'user',
      `@${user.username}`,
      `Assigned role: ${newRole}.`
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Directory</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage creator permissions, apply account restrictions, and inspect accounts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accounts..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 size-3.5 text-zinc-500" />
        </div>
      </div>

      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase">
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Followers</th>
                <th className="p-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-10 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <Link
                          to={`/@${user.username}`}
                          className="font-semibold text-white text-xs hover:underline flex items-center gap-1"
                        >
                          {user.name}
                          {user.verified && <BadgeCheck className="size-3.5 text-sky-400" />}
                        </Link>
                        <p className="text-[11px] text-zinc-400">@{user.username}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin'
                          ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                        user.status === 'banned'
                          ? 'bg-red-400/10 text-red-400 border border-red-400/20'
                          : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                      }`}
                    >
                      {user.status || 'active'}
                    </span>
                  </td>

                  <td className="p-4 text-xs tabular-nums text-zinc-300">
                    {user.followers_count.toLocaleString()}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleRole(user)}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-medium"
                    >
                      {user.role === 'admin' ? 'Demote to User' : 'Make Admin'}
                    </button>

                    <button
                      onClick={() => handleToggleBan(user)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        user.status === 'banned'
                          ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300'
                          : 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
                      }`}
                    >
                      {user.status === 'banned' ? 'Unban Account' : 'Ban Account'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
