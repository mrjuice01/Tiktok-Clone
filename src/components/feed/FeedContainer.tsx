import React, { useState, useEffect, useRef } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Post } from '../../types'
import { VideoCard } from './VideoCard'

interface FeedContainerProps {
  posts: Post[]
  emptyMessage?: string
}

export const FeedContainer: React.FC<FeedContainerProps> = ({
  posts,
  emptyMessage = 'No videos to show'
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (activeIndex < posts.length - 1) {
      setActiveIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        handleNext()
      } else if (e.key === 'ArrowUp') {
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, posts.length])

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-8">
        <div className="size-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
          🎬
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{emptyMessage}</h3>
        <p className="text-sm text-zinc-400 max-w-sm">
          Follow more creators or check the For You feed to discover fresh trending videos!
        </p>
      </div>
    )
  }

  const currentPost = posts[activeIndex]

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] w-full py-2">
      {/* Active Video Card */}
      <div className="w-full max-w-md px-2 flex justify-center">
        {currentPost && <VideoCard key={currentPost.id} post={currentPost} isActive={true} />}
      </div>

      {/* Floating Prev/Next Reel Controls */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="size-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all shadow-xl"
          title="Previous video (Arrow Up)"
        >
          <ChevronUp className="size-6" />
        </button>

        <span className="text-[11px] font-mono text-zinc-500 text-center select-none">
          {activeIndex + 1}/{posts.length}
        </span>

        <button
          onClick={handleNext}
          disabled={activeIndex === posts.length - 1}
          className="size-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all shadow-xl"
          title="Next video (Arrow Down)"
        >
          <ChevronDown className="size-6" />
        </button>
      </div>
    </div>
  )
}
