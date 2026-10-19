import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  BadgeCheck,
  Edit3,
  Heart,
  Bookmark,
  Grid,
  Play,
  Lock,
  Share2,
  Check,
  X
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { User, Post } from '../types'

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>()
  const cleanUsername = username?.replace(/^@/, '') || ''
  const { currentUser, setCurrentUser, users, posts, toggleFollowUser } = useApp()

  const [activeTab, setActiveTab] = useState<'videos' | 'liked' | 'bookmarked'>('videos')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editName, setEditName] = useState(currentUser.name)
  const [editBio, setEditBio] = useState(currentUser.bio || '')
  const [copied, setCopied] = useState(false)

  // Find user
  const isMe = cleanUsername === currentUser.username || !cleanUsername
  const profileUser: User = isMe
    ? currentUser
    : users.find((u) => u.username.toLowerCase() === cleanUsername.toLowerCase()) || {
        id: 'usr_unknown',
        username: cleanUsername,
        name: cleanUsername,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
        followers_count: 0,
        following_count: 0,
        likes_count: 0,
        role: 'user',
        bio: 'No bio yet.'
      }

  // Filter posts
  const userVideos = posts.filter(
    (p) => p.author.username.toLowerCase() === profileUser.username.toLowerCase()
  )
  const likedVideos = posts.filter((p) => (isMe ? p.is_liked : false))
  const bookmarkedVideos = posts.filter((p) => (isMe ? p.is_bookmarked : false))

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentUser({
      ...currentUser,
      name: editName.trim() || currentUser.name,
      bio: editBio.trim()
    })
    setShowEditModal(false)
  }

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group">
          <img
            src={profileUser.avatar}
            alt={profileUser.name}
            className="size-28 sm:size-32 rounded-full object-cover border-4 border-zinc-800 shadow-xl"
          />
          {profileUser.verified && (
            <BadgeCheck className="absolute bottom-1 right-1 size-7 text-sky-400 fill-black rounded-full" />
          )}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
                {profileUser.name}
              </h1>
              <p className="text-sm font-semibold text-zinc-400">@{profileUser.username}</p>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 sm:mt-0">
              {isMe ? (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-semibold text-sm text-white flex items-center gap-2 transition-colors border border-zinc-700"
                >
                  <Edit3 className="size-4" />
                  Edit profile
                </button>
              ) : (
                <button
                  onClick={() => toggleFollowUser(profileUser.id)}
                  className={`px-6 py-2 rounded-xl font-semibold text-sm transition-transform active:scale-95 ${
                    profileUser.is_following
                      ? 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700'
                      : 'bg-[#FE2C55] text-white hover:bg-[#e02449]'
                  }`}
                >
                  {profileUser.is_following ? 'Following' : 'Follow'}
                </button>
              )}

              <button
                onClick={handleShareProfile}
                className="size-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                title="Share profile"
              >
                {copied ? <Check className="size-4 text-emerald-400" /> : <Share2 className="size-4" />}
              </button>
            </div>
          </div>

          {/* Followers / Following Counters */}
          <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base">
                {formatNumber(profileUser.following_count)}
              </span>
              <span className="text-zinc-400">Following</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base">
                {formatNumber(profileUser.followers_count)}
              </span>
              <span className="text-zinc-400">Followers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base">
                {formatNumber(profileUser.likes_count)}
              </span>
              <span className="text-zinc-400">Likes</span>
            </div>
          </div>

          {/* Bio */}
          {profileUser.bio && (
            <p className="text-sm text-zinc-200 max-w-lg leading-relaxed whitespace-pre-line">
              {profileUser.bio}
            </p>
          )}
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="border-b border-zinc-800">
        <div className="flex gap-8 justify-center sm:justify-start">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'videos'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Grid className="size-4" />
            <span>Videos ({userVideos.length})</span>
          </button>

          {isMe && (
            <>
              <button
                onClick={() => setActiveTab('liked')}
                className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'liked'
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Heart className="size-4" />
                <span>Liked ({likedVideos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('bookmarked')}
                className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'bookmarked'
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Bookmark className="size-4" />
                <span>Saved ({bookmarkedVideos.length})</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Videos Grid */}
      <div>
        {activeTab === 'videos' && (
          <VideoGrid
            videos={userVideos}
            emptyTitle="No videos uploaded yet"
            emptyDesc="Upload your first creative video to Snapi Studio!"
          />
        )}

        {activeTab === 'liked' && (
          <VideoGrid
            videos={likedVideos}
            emptyTitle="No liked videos yet"
            emptyDesc="Videos you like on the feed will appear here."
          />
        )}

        {activeTab === 'bookmarked' && (
          <VideoGrid
            videos={bookmarkedVideos}
            emptyTitle="No saved videos yet"
            emptyDesc="Save favorite reels and creative inspiration here."
          />
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white">Edit Profile</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Bio</label>
                <textarea
                  rows={4}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell the world about yourself..."
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-sm font-semibold text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FE2C55] text-sm font-semibold text-white hover:bg-[#e02449]"
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

const VideoGrid: React.FC<{ videos: Post[]; emptyTitle: string; emptyDesc: string }> = ({
  videos,
  emptyTitle,
  emptyDesc
}) => {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-500">
        <Grid className="size-12 mb-3 stroke-1 opacity-40" />
        <h4 className="text-base font-bold text-zinc-300 mb-1">{emptyTitle}</h4>
        <p className="text-xs text-zinc-500 max-w-xs">{emptyDesc}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/video/${video.id}`}
          className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 transition-all shadow-md"
        >
          <img
            src={video.thumbnail_url}
            alt={video.content}
            className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* View / Like count on thumbnail */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs font-semibold">
            <span className="flex items-center gap-1 drop-shadow">
              <Play className="size-3.5 fill-white" />
              {video.views_count.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 drop-shadow">
              <Heart className="size-3.5 fill-white" />
              {video.likes_count.toLocaleString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
