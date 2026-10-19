import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UploadCloud,
  Film,
  Image as ImageIcon,
  Check,
  Calendar,
  Eye,
  Hash,
  AlertCircle,
  Clock
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const SAMPLE_THUMBNAILS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'
]

export const StudioUpload: React.FC = () => {
  const { addPost, addScheduledPost } = useApp()
  const navigate = useNavigate()

  const [videoUrl, setVideoUrl] = useState<string>('/videos/video2.mp4')
  const [videoFileName, setVideoFileName] = useState<string>('video2.mp4 (Default Sample Reel)')
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>(SAMPLE_THUMBNAILS[0])
  const [caption, setCaption] = useState<string>('')
  const [visibility, setVisibility] = useState<'public' | 'friends' | 'private'>('public')
  const [isScheduled, setIsScheduled] = useState<boolean>(false)
  const [scheduledDateTime, setScheduledDateTime] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [allowComments, setAllowComments] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      setVideoFileName(file.name)
    }
  }

  const addHashtag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption((prev) => (prev ? `${prev} ${tag}` : tag))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!caption.trim()) return

    setIsSubmitting(true)

    // Extract hashtags
    const hashtags = caption
      .split(/\s+/)
      .filter((w) => w.startsWith('#'))
      .map((w) => w.slice(1))

    if (isScheduled) {
      addScheduledPost({
        post: {
          content: caption.trim(),
          hashtags,
          visibility,
          video_url: videoUrl,
          thumbnail_url: selectedThumbnail
        },
        scheduled_time: scheduledDateTime,
        status: 'pending',
        thumbnail_url: selectedThumbnail,
        caption: caption.trim()
      })
      setTimeout(() => {
        setIsSubmitting(false)
        navigate('/snapistudio/scheduled-posts')
      }, 500)
    } else {
      addPost({
        content: caption.trim(),
        hashtags,
        visibility,
        video_url: videoUrl,
        thumbnail_url: selectedThumbnail,
        status: 'active'
      })
      setTimeout(() => {
        setIsSubmitting(false)
        navigate('/snapistudio/content')
      }, 500)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Video</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Post a video to your account or schedule it for maximum audience engagement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dropzone & Video Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer aspect-[9/14] rounded-3xl border-2 border-dashed border-zinc-700 hover:border-[#FE2C55] bg-zinc-900/40 p-4 flex flex-col items-center justify-center text-center transition-all overflow-hidden"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
            />

            {videoUrl ? (
              <div className="relative size-full rounded-2xl overflow-hidden bg-black">
                <video
                  src={videoUrl}
                  controls
                  className="size-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/70 text-[10px] text-zinc-300 flex items-center gap-1">
                  <Film className="size-3 text-[#25F4EE]" />
                  <span>Preview</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 p-4">
                <div className="mx-auto size-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:text-[#FE2C55] transition-all">
                  <UploadCloud className="size-8" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Select video to upload</p>
                  <p className="text-xs text-zinc-400 mt-1">Or drag and drop a file</p>
                </div>
                <div className="text-[11px] text-zinc-500 space-y-0.5">
                  <p>MP4, WebM up to 30 minutes</p>
                  <p>Less than 2 GB, 720p or higher</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
            <span className="truncate max-w-[200px]">{videoFileName}</span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[#FE2C55] font-semibold hover:underline shrink-0"
            >
              Change Video
            </button>
          </div>
        </div>

        {/* Right Column: Form Settings */}
        <div className="lg:col-span-7 space-y-5 bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl">
          {/* Caption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                Caption & Details
              </label>
              <span className="text-[11px] text-zinc-500 tabular-nums">
                {caption.length} / 2200
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tell viewers what your video is about! Include relevant #hashtags and @mentions..."
              className="w-full p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-[#FE2C55] text-sm text-white focus:outline-none resize-none placeholder-zinc-500"
            />

            {/* Quick Hashtag suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['#fyp', '#creative', '#tech', '#viral', '#coding', '#ui', '#foodtok'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => addHashtag(tag)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 font-mono transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Cover / Thumbnail Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="size-3.5 text-zinc-400" />
              Cover Thumbnail
            </label>
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_THUMBNAILS.map((thumb, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedThumbnail(thumb)}
                  className={`relative aspect-[9/12] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedThumbnail === thumb
                      ? 'border-[#FE2C55] scale-[1.03]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt="cover preview" className="size-full object-cover" />
                  {selectedThumbnail === thumb && (
                    <div className="absolute top-1 right-1 size-4 rounded-full bg-[#FE2C55] flex items-center justify-center text-white">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Audience / Visibility */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="size-3.5 text-zinc-400" />
              Who Can Watch This Video
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'public', label: 'Public', desc: 'Everyone on Snapi' },
                { id: 'friends', label: 'Friends', desc: 'Mutual followers' },
                { id: 'private', label: 'Private', desc: 'Only you' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setVisibility(opt.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    visibility === opt.id
                      ? 'border-[#FE2C55] bg-[#FE2C55]/10 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <p className="text-xs font-bold text-white">{opt.label}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Video Toggle */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-[#25F4EE]" />
                <div>
                  <p className="text-xs font-bold text-white">Schedule Post</p>
                  <p className="text-[11px] text-zinc-400">
                    Pick a future date and time to auto-publish
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="size-4 accent-[#FE2C55] cursor-pointer"
              />
            </div>

            {isScheduled && (
              <div className="pt-2">
                <input
                  type="datetime-local"
                  value={scheduledDateTime}
                  onChange={(e) => setScheduledDateTime(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => navigate('/snapistudio')}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-semibold text-sm text-zinc-300"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !caption.trim()}
              className="px-6 py-2.5 rounded-xl bg-[#FE2C55] hover:bg-[#e02449] font-semibold text-sm text-white disabled:opacity-50 transition-transform active:scale-95 shadow-lg shadow-[#FE2C55]/20"
            >
              {isSubmitting ? 'Publishing...' : isScheduled ? 'Schedule Video' : 'Post Video'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
