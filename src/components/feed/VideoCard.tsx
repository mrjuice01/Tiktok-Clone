import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music,
  Plus,
  Check,
  Volume2,
  VolumeX,
  Play,
  Pause,
  BadgeCheck
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { Post } from '../../types'
import { useApp } from '../../context/AppContext'
import { CommentsDrawer } from './CommentsDrawer'

interface VideoCardProps {
  post: Post
  isActive?: boolean
}

export const VideoCard: React.FC<VideoCardProps> = ({ post, isActive = true }) => {
  const {
    toggleLikePost,
    toggleBookmarkPost,
    toggleFollowUser,
    isMuted,
    setIsMuted,
    currentVolume,
    setCurrentVolume
  } = useApp()

  const [isPlaying, setIsPlaying] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.muted = isMuted
    videoRef.current.volume = currentVolume

    if (isActive) {
      videoRef.current.play().catch(() => {
        // Autoplay policy might require mute
        setIsMuted(true)
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play().catch(() => {})
        }
      })
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isActive, isMuted, currentVolume, setIsMuted])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(pct || 0)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLikePost(post.id)
    if (!post.is_liked) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 }
      })
    }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${window.location.origin}/video/${post.id}`
    navigator.clipboard?.writeText(url)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="relative w-full max-w-[460px] mx-auto h-[84vh] max-h-[760px] min-h-[520px] bg-zinc-950 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center select-none group/player my-4">
      {/* Background blur video/poster */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-xl scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${post.thumbnail_url})` }}
      />

      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={post.video_url}
        poster={post.thumbnail_url}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        className="relative z-10 w-full h-full object-cover cursor-pointer"
      />

      {/* Play/Pause Overlay indicator on click */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 cursor-pointer"
        >
          <div className="size-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-white/20 animate-in zoom-in duration-200">
            <Play className="size-8 fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Progress timeline bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/20">
        <div
          className="h-full bg-[#FE2C55] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between text-white pointer-events-auto">
        <div className="flex items-center gap-2">
          {post.visibility !== 'public' && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300">
              {post.visibility}
            </span>
          )}
        </div>

        {/* Mute/Volume Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsMuted(!isMuted)
          }}
          className="size-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"
        >
          {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
      </div>

      {/* Right Side Social Action Buttons */}
      <div className="absolute right-3 bottom-14 z-30 flex flex-col items-center gap-4 text-white">
        {/* Creator Avatar with Follow button */}
        <div className="relative mb-2">
          <Link
            to={`/@${post.author.username}`}
            className="block size-11 rounded-full p-[2px] bg-gradient-to-tr from-[#FE2C55] to-[#25F4EE] hover:scale-105 transition-transform"
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="size-full rounded-full object-cover"
            />
          </Link>
          {!post.author.is_following && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFollowUser(post.author.id)
              }}
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-5 rounded-full bg-[#FE2C55] hover:bg-[#e02449] flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
              title="Follow creator"
            >
              <Plus className="size-3 stroke-[3]" />
            </button>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group/btn transition-transform active:scale-125"
        >
          <div
            className={`size-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors ${
              post.is_liked
                ? 'bg-[#FE2C55]/20 border-[#FE2C55]/40 text-[#FE2C55]'
                : 'hover:bg-black/60 text-white'
            }`}
          >
            <Heart
              className={`size-6 transition-transform group-hover/btn:scale-110 ${
                post.is_liked ? 'fill-[#FE2C55] text-[#FE2C55]' : ''
              }`}
            />
          </div>
          <span className="text-xs font-semibold drop-shadow">{formatNumber(post.likes_count)}</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowComments(true)
          }}
          className="flex flex-col items-center gap-1 group/btn transition-transform active:scale-110"
        >
          <div className="size-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors">
            <MessageCircle className="size-6 transition-transform group-hover/btn:scale-110" />
          </div>
          <span className="text-xs font-semibold drop-shadow">{formatNumber(post.comments_count)}</span>
        </button>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleBookmarkPost(post.id)
          }}
          className="flex flex-col items-center gap-1 group/btn transition-transform active:scale-110"
        >
          <div
            className={`size-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors ${
              post.is_bookmarked
                ? 'bg-amber-400/20 border-amber-400/40 text-amber-400'
                : 'hover:bg-black/60 text-white'
            }`}
          >
            <Bookmark
              className={`size-5 transition-transform group-hover/btn:scale-110 ${
                post.is_bookmarked ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
          </div>
          <span className="text-xs font-semibold drop-shadow">{formatNumber(post.bookmarks_count)}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group/btn transition-transform active:scale-110"
          title="Share link"
        >
          <div className="size-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors">
            {copySuccess ? (
              <Check className="size-5 text-emerald-400" />
            ) : (
              <Share2 className="size-5 transition-transform group-hover/btn:scale-110" />
            )}
          </div>
          <span className="text-xs font-semibold drop-shadow">
            {copySuccess ? 'Copied!' : formatNumber(post.shares_count)}
          </span>
        </button>

        {/* Spinning Music Disc */}
        <div className="mt-1 size-10 rounded-full border-2 border-white/20 bg-zinc-900 p-1 flex items-center justify-center animate-spin-slow">
          <img
            src={post.author.avatar}
            alt="disc"
            className="size-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute left-0 right-16 bottom-0 z-30 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2">
        {/* Author Line */}
        <div className="flex items-center gap-2">
          <Link
            to={`/@${post.author.username}`}
            className="font-bold text-white text-base hover:underline flex items-center gap-1.5"
          >
            @{post.author.username}
            {post.author.verified && <BadgeCheck className="size-4 text-sky-400 fill-sky-400/20" />}
          </Link>
          <span className="text-xs text-zinc-400">· {post.author.name}</span>
        </div>

        {/* Caption */}
        <p className="text-sm text-zinc-100 line-clamp-2 leading-snug drop-shadow-sm">
          {post.content.split(' ').map((word, i) => {
            if (word.startsWith('#')) {
              return (
                <Link
                  key={i}
                  to={`/search?q=${encodeURIComponent(word.slice(1))}`}
                  className="font-semibold text-white hover:underline mr-1"
                >
                  {word}
                </Link>
              )
            }
            if (word.startsWith('@')) {
              return (
                <Link
                  key={i}
                  to={`/${word}`}
                  className="font-semibold text-[#25F4EE] hover:underline mr-1"
                >
                  {word}
                </Link>
              )
            }
            return word + ' '
          })}
        </p>

        {/* Music Sound Pill */}
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <Music className="size-3.5 text-zinc-300 shrink-0" />
          <span className="truncate hover:underline cursor-pointer">
            {post.music_title} - {post.music_author}
          </span>
        </div>
      </div>

      {/* Comments Drawer */}
      <CommentsDrawer
        post={post}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </div>
  )
}
