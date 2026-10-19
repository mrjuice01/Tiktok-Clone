import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { VideoCard } from '../components/feed/VideoCard'

export const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { posts } = useApp()

  const post = posts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Video not found</h2>
        <p className="text-sm text-zinc-400">This video may have been deleted or made private.</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-[#FE2C55] text-white text-sm font-semibold hover:bg-[#e02449] transition-colors"
        >
          Back to Feed
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Feed
      </Link>

      <div className="flex justify-center">
        <VideoCard post={post} isActive={true} />
      </div>
    </div>
  )
}
