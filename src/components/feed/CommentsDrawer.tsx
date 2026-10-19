import React, { useState } from 'react'
import { X, Heart, Send, CornerDownRight, MessageCircle } from 'lucide-react'
import { Post, Comment } from '../../types'
import { useApp } from '../../context/AppContext'

interface CommentsDrawerProps {
  post: Post
  isOpen: boolean
  onClose: () => void
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({ post, isOpen, onClose }) => {
  const { comments, addComment, toggleLikeComment, currentUser } = useApp()
  const [commentText, setCommentText] = useState('')
  const [replyingTo, setReplyingTo] = useState<{ id: string; author: string } | null>(null)

  if (!isOpen) return null

  const postComments: Comment[] = comments[post.id] || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    if (replyingTo) {
      addComment(post.id, `@${replyingTo.author} ${commentText.trim()}`, replyingTo.id)
      setReplyingTo(null)
    } else {
      addComment(post.id, commentText.trim())
    }
    setCommentText('')
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-5 text-[#FE2C55]" />
          <h3 className="font-bold text-white text-base">
            Comments <span className="text-zinc-400 font-normal">({post.comments_count})</span>
          </h3>
        </div>
        <button
          onClick={onClose}
          className="size-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {postComments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-zinc-500">
            <MessageCircle className="size-10 mb-2 stroke-1 opacity-50" />
            <p className="text-sm">Be the first to comment!</p>
          </div>
        ) : (
          postComments.map((c) => (
            <div key={c.id} className="space-y-2">
              <div className="flex items-start justify-between gap-3 group">
                <img
                  src={c.author.avatar}
                  alt={c.author.name}
                  className="size-8 rounded-full object-cover shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-xs text-white truncate">{c.author.name}</span>
                    <span className="text-[11px] text-zinc-400">@{c.author.username}</span>
                    <span className="text-[10px] text-zinc-500">{c.created_at}</span>
                  </div>
                  <p className="text-sm text-zinc-200 mt-1 break-words">{c.content}</p>

                  <div className="flex items-center gap-4 mt-1.5 text-xs text-zinc-400">
                    <button
                      onClick={() => setReplyingTo({ id: c.id, author: c.author.username })}
                      className="hover:text-white font-medium transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleLikeComment(post.id, c.id)}
                  className={`flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white transition-colors ${
                    c.is_liked ? 'text-[#FE2C55]' : ''
                  }`}
                >
                  <Heart className={`size-4 ${c.is_liked ? 'fill-[#FE2C55] text-[#FE2C55]' : ''}`} />
                  <span className="text-[10px] tabular-nums">{c.likes_count}</span>
                </button>
              </div>

              {/* Nested Replies */}
              {c.replies && c.replies.length > 0 && (
                <div className="pl-10 space-y-2 border-l border-white/5 ml-4 mt-2">
                  {c.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start justify-between gap-2.5">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="size-6 rounded-full object-cover shrink-0 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-[11px] text-white truncate">
                            {reply.author.name}
                          </span>
                          <span className="text-[10px] text-zinc-500">{reply.created_at}</span>
                        </div>
                        <p className="text-xs text-zinc-300 mt-0.5 break-words">{reply.content}</p>
                      </div>

                      <button
                        onClick={() => toggleLikeComment(post.id, reply.id)}
                        className={`flex flex-col items-center gap-0.5 text-zinc-500 hover:text-white transition-colors ${
                          reply.is_liked ? 'text-[#FE2C55]' : ''
                        }`}
                      >
                        <Heart className={`size-3.5 ${reply.is_liked ? 'fill-[#FE2C55] text-[#FE2C55]' : ''}`} />
                        <span className="text-[9px]">{reply.likes_count}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reply Banner if replying */}
      {replyingTo && (
        <div className="px-4 py-2 bg-zinc-900 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <CornerDownRight className="size-3.5 text-[#FE2C55]" />
            Replying to <span className="text-white font-medium">@{replyingTo.author}</span>
          </span>
          <button onClick={() => setReplyingTo(null)} className="hover:text-white">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Input box */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-zinc-900/60 flex items-center gap-2">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="size-8 rounded-full object-cover shrink-0"
        />
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={replyingTo ? `Reply to @${replyingTo.author}...` : 'Add comment...'}
          className="flex-1 bg-white/10 border border-transparent focus:border-[#FE2C55]/50 focus:bg-white/15 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!commentText.trim()}
          className="size-9 rounded-full bg-[#FE2C55] disabled:bg-zinc-800 disabled:text-zinc-600 text-white flex items-center justify-center shrink-0 hover:bg-[#e02449] transition-colors"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  )
}
