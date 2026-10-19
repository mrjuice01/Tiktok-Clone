export interface User {
  id: string
  username: string
  name: string
  avatar: string
  bio?: string
  verified?: boolean
  followers_count: number
  following_count: number
  likes_count: number
  is_following?: boolean
  role: 'user' | 'admin'
  status?: 'active' | 'banned'
  email?: string
  joined_date?: string
}

export interface Post {
  id: string
  author: User
  video_url: string
  thumbnail_url: string
  content: string
  hashtags: string[]
  music_title: string
  music_author: string
  likes_count: number
  comments_count: number
  bookmarks_count: number
  shares_count: number
  views_count: number
  is_liked: boolean
  is_bookmarked: boolean
  created_at: string
  status: 'active' | 'under_review' | 'flagged' | 'scheduled'
  visibility: 'public' | 'friends' | 'private'
  scheduled_at?: string
  moderation_reason?: string
}

export interface Comment {
  id: string
  post_id: string
  author: User
  content: string
  created_at: string
  likes_count: number
  is_liked: boolean
  replies?: Comment[]
}

export interface ScheduledPostItem {
  id: string
  post: Partial<Post>
  scheduled_time: string
  created_at: string
  status: 'pending' | 'published' | 'cancelled'
  thumbnail_url: string
  caption: string
}

export type WellnessRuleType = 'continuous_usage' | 'daily_limit' | 'video_watch_time' | 'late_night'
export type WellnessActionType = 'warning' | 'soft_block'

export interface WellnessRule {
  id: string
  type: WellnessRuleType
  title: string
  message: string
  minutes: number
  from_hour?: number
  to_hour?: number
  action: WellnessActionType
  is_enabled: boolean
  created_at: string
}

export interface Appeal {
  id: string
  uuid: string
  user_id: string
  author: User
  post_id?: string
  post_title?: string
  post_thumbnail?: string
  appeal_type: 'post_moderation' | 'account_ban' | 'comment_removal'
  reason: string
  details: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  resolved_at?: string
  admin_note?: string
  evidence_urls?: string[]
}

export interface AdminActivityLog {
  id: string
  admin_name: string
  action: string
  target_type: 'user' | 'post' | 'comment' | 'appeal' | 'setting'
  target_name: string
  details: string
  created_at: string
}
