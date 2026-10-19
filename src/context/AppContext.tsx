import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, Post, Comment, WellnessRule, Appeal, ScheduledPostItem, AdminActivityLog } from '../types'
import {
  CURRENT_USER,
  DEMO_USERS,
  INITIAL_POSTS,
  INITIAL_COMMENTS,
  INITIAL_WELLNESS_RULES,
  INITIAL_APPEALS,
  INITIAL_ACTIVITY_LOGS
} from '../data/seedData'

interface AppContextType {
  currentUser: User
  setCurrentUser: (user: User) => void
  users: User[]
  posts: Post[]
  toggleLikePost: (postId: string) => void
  toggleBookmarkPost: (postId: string) => void
  toggleFollowUser: (userId: string) => void
  addPost: (newPostData: Partial<Post>) => Post
  updatePost: (id: string, updates: Partial<Post>) => void
  deletePost: (id: string) => void
  comments: Record<string, Comment[]>
  addComment: (postId: string, content: string, replyToCommentId?: string) => void
  toggleLikeComment: (postId: string, commentId: string) => void
  wellnessRules: WellnessRule[]
  addWellnessRule: (rule: Omit<WellnessRule, 'id' | 'created_at'>) => void
  toggleWellnessRule: (ruleId: string) => void
  deleteWellnessRule: (ruleId: string) => void
  activeAlert: WellnessRule | null
  dismissAlert: () => void
  screenTimeSeconds: number
  scheduledPosts: ScheduledPostItem[]
  addScheduledPost: (item: Omit<ScheduledPostItem, 'id' | 'created_at'>) => void
  deleteScheduledPost: (id: string) => void
  appeals: Appeal[]
  submitAppeal: (appeal: Omit<Appeal, 'id' | 'uuid' | 'created_at' | 'status' | 'author'>) => void
  updateAppealStatus: (appealId: string, status: 'approved' | 'rejected', adminNote?: string) => void
  activityLogs: AdminActivityLog[]
  addActivityLog: (action: string, targetType: AdminActivityLog['target_type'], targetName: string, details: string) => void
  authModalOpen: boolean
  openAuthModal: (mode?: 'login' | 'signup') => void
  closeAuthModal: () => void
  authModalMode: 'login' | 'signup'
  searchQuery: string
  setSearchQuery: (q: string) => void
  currentVolume: number
  setCurrentVolume: (v: number) => void
  isMuted: boolean
  setIsMuted: (m: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const STORAGE_KEYS = {
  POSTS: 'snapi_posts_v1',
  COMMENTS: 'snapi_comments_v1',
  WELLNESS: 'snapi_wellness_rules_v1',
  APPEALS: 'snapi_appeals_v1',
  LOGS: 'snapi_activity_logs_v1',
  CURRENT_USER: 'snapi_current_user_v1'
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return saved ? JSON.parse(saved) : CURRENT_USER
  })

  const [users, setUsers] = useState<User[]>(DEMO_USERS)

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS)
    return saved ? JSON.parse(saved) : INITIAL_POSTS
  })

  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS)
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS
  })

  const [wellnessRules, setWellnessRules] = useState<WellnessRule[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WELLNESS)
    return saved ? JSON.parse(saved) : INITIAL_WELLNESS_RULES
  })

  const [appeals, setAppeals] = useState<Appeal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPEALS)
    return saved ? JSON.parse(saved) : INITIAL_APPEALS
  })

  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS)
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS
  })

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPostItem[]>([
    {
      id: 'sched_1',
      post: {
        content: 'Exclusive sneak peek into our new motion design system! 🚀 Drops at 6 PM! #sneakpeek #design #figma',
        hashtags: ['sneakpeek', 'design', 'figma'],
        visibility: 'public'
      },
      scheduled_time: new Date(Date.now() + 86400000).toISOString(),
      created_at: new Date().toISOString(),
      status: 'pending',
      thumbnail_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80',
      caption: 'Exclusive sneak peek into our new motion design system! 🚀'
    }
  ])

  // Screen time counter in seconds
  const [screenTimeSeconds, setScreenTimeSeconds] = useState(1320) // 22 minutes start
  const [activeAlert, setActiveAlert] = useState<WellnessRule | null>(null)

  // Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Global video player settings
  const [currentVolume, setCurrentVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments))
  }, [comments])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WELLNESS, JSON.stringify(wellnessRules))
  }, [wellnessRules])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPEALS, JSON.stringify(appeals))
  }, [appeals])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser))
  }, [currentUser])

  // Screen time ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setScreenTimeSeconds((prev) => {
        const next = prev + 1
        // Check continuous usage rules
        const activeContinuous = wellnessRules.find(
          (r) => r.is_enabled && r.type === 'continuous_usage' && next >= r.minutes * 60 && next % (r.minutes * 60) === 0
        )
        if (activeContinuous) {
          setActiveAlert(activeContinuous)
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [wellnessRules])

  const dismissAlert = () => setActiveAlert(null)

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const wasLiked = post.is_liked
          return {
            ...post,
            is_liked: !wasLiked,
            likes_count: wasLiked ? post.likes_count - 1 : post.likes_count + 1
          }
        }
        return post
      })
    )
  }

  const toggleBookmarkPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const wasBookmarked = post.is_bookmarked
          return {
            ...post,
            is_bookmarked: !wasBookmarked,
            bookmarks_count: wasBookmarked ? post.bookmarks_count - 1 : post.bookmarks_count + 1
          }
        }
        return post
      })
    )
  }

  const toggleFollowUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const isF = !!u.is_following
          return {
            ...u,
            is_following: !isF,
            followers_count: isF ? u.followers_count - 1 : u.followers_count + 1
          }
        }
        return u
      })
    )
    setPosts((prev) =>
      prev.map((p) => {
        if (p.author.id === userId) {
          const isF = !!p.author.is_following
          return {
            ...p,
            author: {
              ...p.author,
              is_following: !isF,
              followers_count: isF ? p.author.followers_count - 1 : p.author.followers_count + 1
            }
          }
        }
        return p
      })
    )
  }

  const addPost = (newPostData: Partial<Post>): Post => {
    const post: Post = {
      id: `post_${Date.now()}`,
      author: currentUser,
      video_url: newPostData.video_url || '/videos/video2.mp4',
      thumbnail_url:
        newPostData.thumbnail_url ||
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      content: newPostData.content || '',
      hashtags: newPostData.hashtags || [],
      music_title: newPostData.music_title || `Original Sound - ${currentUser.username}`,
      music_author: currentUser.name,
      likes_count: 0,
      comments_count: 0,
      bookmarks_count: 0,
      shares_count: 0,
      views_count: 1,
      is_liked: false,
      is_bookmarked: false,
      created_at: new Date().toISOString(),
      status: (newPostData.status as Post['status']) || 'active',
      visibility: newPostData.visibility || 'public'
    }

    setPosts((prev) => [post, ...prev])
    addActivityLog('CREATE_POST', 'post', post.content.slice(0, 30), 'User published a new short video.')
    return post
  }

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
    addActivityLog('DELETE_POST', 'post', id, 'Deleted post from creator studio.')
  }

  const addComment = (postId: string, content: string, replyToCommentId?: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      post_id: postId,
      author: currentUser,
      content,
      created_at: 'Just now',
      likes_count: 0,
      is_liked: false
    }

    setComments((prev) => {
      const postComments = prev[postId] || []
      if (replyToCommentId) {
        return {
          ...prev,
          [postId]: postComments.map((c) => {
            if (c.id === replyToCommentId) {
              return {
                ...c,
                replies: [...(c.replies || []), newComment]
              }
            }
            return c
          })
        }
      }
      return {
        ...prev,
        [postId]: [newComment, ...postComments]
      }
    })

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p))
    )
  }

  const toggleLikeComment = (postId: string, commentId: string) => {
    setComments((prev) => {
      const list = prev[postId] || []
      const updated = list.map((c) => {
        if (c.id === commentId) {
          const liked = c.is_liked
          return {
            ...c,
            is_liked: !liked,
            likes_count: liked ? c.likes_count - 1 : c.likes_count + 1
          }
        }
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === commentId
                ? {
                    ...r,
                    is_liked: !r.is_liked,
                    likes_count: r.is_liked ? r.likes_count - 1 : r.likes_count + 1
                  }
                : r
            )
          }
        }
        return c
      })
      return { ...prev, [postId]: updated }
    })
  }

  const addWellnessRule = (ruleData: Omit<WellnessRule, 'id' | 'created_at'>) => {
    const newRule: WellnessRule = {
      ...ruleData,
      id: `rule_${Date.now()}`,
      created_at: new Date().toISOString()
    }
    setWellnessRules((prev) => [...prev, newRule])
  }

  const toggleWellnessRule = (ruleId: string) => {
    setWellnessRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, is_enabled: !r.is_enabled } : r))
    )
  }

  const deleteWellnessRule = (ruleId: string) => {
    setWellnessRules((prev) => prev.filter((r) => r.id !== ruleId))
  }

  const addScheduledPost = (item: Omit<ScheduledPostItem, 'id' | 'created_at'>) => {
    const newItem: ScheduledPostItem = {
      ...item,
      id: `sched_${Date.now()}`,
      created_at: new Date().toISOString()
    }
    setScheduledPosts((prev) => [...prev, newItem])
  }

  const deleteScheduledPost = (id: string) => {
    setScheduledPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const submitAppeal = (appealData: Omit<Appeal, 'id' | 'uuid' | 'created_at' | 'status' | 'author'>) => {
    const newAppeal: Appeal = {
      ...appealData,
      id: `app_${Date.now()}`,
      uuid: `${Math.random().toString(36).substring(2, 8)}-appeal`,
      author: currentUser,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    setAppeals((prev) => [newAppeal, ...prev])
    addActivityLog('SUBMIT_APPEAL', 'appeal', newAppeal.uuid, `User filed appeal for ${newAppeal.reason}`)
  }

  const updateAppealStatus = (appealId: string, status: 'approved' | 'rejected', adminNote?: string) => {
    setAppeals((prev) =>
      prev.map((a) =>
        a.id === appealId
          ? {
              ...a,
              status,
              admin_note: adminNote || a.admin_note,
              resolved_at: new Date().toISOString()
            }
          : a
      )
    )
    addActivityLog(
      status === 'approved' ? 'APPROVE_APPEAL' : 'REJECT_APPEAL',
      'appeal',
      appealId,
      adminNote || `Decision: ${status}`
    )
  }

  const addActivityLog = (
    action: string,
    targetType: AdminActivityLog['target_type'],
    targetName: string,
    details: string
  ) => {
    const newLog: AdminActivityLog = {
      id: `log_${Date.now()}`,
      admin_name: `${currentUser.name} (${currentUser.role})`,
      action,
      target_type: targetType,
      target_name: targetName,
      details,
      created_at: new Date().toISOString()
    }
    setActivityLogs((prev) => [newLog, ...prev])
  }

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode)
    setAuthModalOpen(true)
  }

  const closeAuthModal = () => setAuthModalOpen(false)

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        posts,
        toggleLikePost,
        toggleBookmarkPost,
        toggleFollowUser,
        addPost,
        updatePost,
        deletePost,
        comments,
        addComment,
        toggleLikeComment,
        wellnessRules,
        addWellnessRule,
        toggleWellnessRule,
        deleteWellnessRule,
        activeAlert,
        dismissAlert,
        screenTimeSeconds,
        scheduledPosts,
        addScheduledPost,
        deleteScheduledPost,
        appeals,
        submitAppeal,
        updateAppealStatus,
        activityLogs,
        addActivityLog,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        searchQuery,
        setSearchQuery,
        currentVolume,
        setCurrentVolume,
        isMuted,
        setIsMuted
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
