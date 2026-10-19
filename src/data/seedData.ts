import { User, Post, Comment, WellnessRule, Appeal, AdminActivityLog } from '../types'

export const CURRENT_USER: User = {
  id: 'usr_me',
  username: 'creative_sarah',
  name: 'Sarah Jenkins',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  bio: '✨ Content creator & UI designer | Sharing tech, motion & daily inspiration 🎬 #TechTok',
  verified: true,
  followers_count: 148200,
  following_count: 324,
  likes_count: 2400000,
  role: 'admin',
  status: 'active',
  email: 'sarah.jenkins@snapi.app',
  joined_date: 'March 2024'
}

export const DEMO_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'usr_alex',
    username: 'alex_cooks',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: 'Chef & recipe wizard 🍜 Street food to fine dining in 60s.',
    verified: true,
    followers_count: 89400,
    following_count: 112,
    likes_count: 1200000,
    role: 'user',
    status: 'active',
    email: 'alex@chef.io',
    is_following: true
  },
  {
    id: 'usr_maya',
    username: 'maya_travels',
    name: 'Maya Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'Traveling all 7 continents ✈️ Currently: Tokyo 🇯🇵',
    verified: true,
    followers_count: 320500,
    following_count: 450,
    likes_count: 5100000,
    role: 'user',
    status: 'active',
    email: 'maya@globe.co',
    is_following: true
  },
  {
    id: 'usr_leo',
    username: 'dev_leo',
    name: 'Leo V.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    bio: 'Fullstack builder | React, Vite & AI tricks you didn\'t know 💻⚡',
    verified: false,
    followers_count: 45200,
    following_count: 85,
    likes_count: 620000,
    role: 'user',
    status: 'active',
    email: 'leo@builds.dev',
    is_following: false
  },
  {
    id: 'usr_elena',
    username: 'soundwave_elena',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Producer & DJ 🎧 Lo-fi beats to code and chill to.',
    verified: true,
    followers_count: 12400,
    following_count: 210,
    likes_count: 340000,
    role: 'user',
    status: 'active',
    email: 'elena@beats.fm',
    is_following: false
  }
]

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    author: CURRENT_USER,
    video_url: '/videos/video2.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    content: 'Building the next generation of creative apps with fast, fluid animations ⚡ What do you think of this motion design? #webdev #creative #react #ui',
    hashtags: ['webdev', 'creative', 'react', 'ui'],
    music_title: 'Original Sound - creative_sarah',
    music_author: 'Sarah Jenkins',
    likes_count: 12430,
    comments_count: 482,
    bookmarks_count: 1890,
    shares_count: 312,
    views_count: 85400,
    is_liked: false,
    is_bookmarked: false,
    created_at: '2026-10-18T10:00:00Z',
    status: 'active',
    visibility: 'public'
  },
  {
    id: 'post_2',
    author: DEMO_USERS[1], // alex_cooks
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    content: 'Crispy Garlic Butter Noodles in 8 minutes flat! 🧄🥢 Recipe in the comments! #foodtok #quickrecipes #noodles #cooking',
    hashtags: ['foodtok', 'quickrecipes', 'noodles', 'cooking'],
    music_title: 'Lo-Fi Chill Hop Beats',
    music_author: 'Elena Rostova',
    likes_count: 48900,
    comments_count: 1240,
    bookmarks_count: 9840,
    shares_count: 2450,
    views_count: 210000,
    is_liked: true,
    is_bookmarked: true,
    created_at: '2026-10-17T14:30:00Z',
    status: 'active',
    visibility: 'public'
  },
  {
    id: 'post_3',
    author: DEMO_USERS[2], // maya_travels
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
    content: 'Midnight walk through Shibuya crossing in the rain 🌧️ Tokyo nights hit differently! #tokyo #travel #japan #nightvibes',
    hashtags: ['tokyo', 'travel', 'japan', 'nightvibes'],
    music_title: 'Tokyo City Lights Instrumental',
    music_author: 'Tokyo Drift Vibe',
    likes_count: 92300,
    comments_count: 2180,
    bookmarks_count: 14200,
    shares_count: 3890,
    views_count: 450000,
    is_liked: false,
    is_bookmarked: false,
    created_at: '2026-10-16T18:20:00Z',
    status: 'active',
    visibility: 'public'
  },
  {
    id: 'post_4',
    author: DEMO_USERS[3], // dev_leo
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    content: 'Stop using useEffect for everything! Here is how to write clean reactive code in 2026 🔥 #coding #javascript #react #programming',
    hashtags: ['coding', 'javascript', 'react', 'programming'],
    music_title: 'Cyberpunk Synthwave',
    music_author: 'SynthLab',
    likes_count: 31200,
    comments_count: 890,
    bookmarks_count: 7300,
    shares_count: 1120,
    views_count: 142000,
    is_liked: false,
    is_bookmarked: true,
    created_at: '2026-10-15T09:15:00Z',
    status: 'active',
    visibility: 'public'
  },
  {
    id: 'post_5',
    author: DEMO_USERS[4], // soundwave_elena
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    content: 'Sampling vintage coffee machine sounds into an ambient track ☕🎶 Drops this Friday! #musicproducer #beats #sounddesign',
    hashtags: ['musicproducer', 'beats', 'sounddesign'],
    music_title: 'Espresso Dreams (Snippet)',
    music_author: 'Elena Rostova',
    likes_count: 18400,
    comments_count: 340,
    bookmarks_count: 2900,
    shares_count: 420,
    views_count: 98000,
    is_liked: false,
    is_bookmarked: false,
    created_at: '2026-10-14T21:00:00Z',
    status: 'active',
    visibility: 'public'
  }
]

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  post_1: [
    {
      id: 'c_101',
      post_id: 'post_1',
      author: DEMO_USERS[3], // dev_leo
      content: 'The transitions are buttery smooth! Are you using Framer Motion or pure CSS animations here?',
      created_at: '2 hours ago',
      likes_count: 42,
      is_liked: false,
      replies: [
        {
          id: 'c_101_1',
          post_id: 'post_1',
          author: CURRENT_USER,
          content: 'Pure CSS keyframes for the primary glow and React Spring for the drag physics! ✨',
          created_at: '1 hour ago',
          likes_count: 18,
          is_liked: true
        }
      ]
    },
    {
      id: 'c_102',
      post_id: 'post_1',
      author: DEMO_USERS[2], // maya_travels
      content: 'Obsessed with the aesthetics of this! Keep it coming! 🔥',
      created_at: '3 hours ago',
      likes_count: 25,
      is_liked: true
    },
    {
      id: 'c_103',
      post_id: 'post_1',
      author: DEMO_USERS[1], // alex_cooks
      content: 'Clean design inspiration. Makes me want to redo my whole recipe website.',
      created_at: '4 hours ago',
      likes_count: 12,
      is_liked: false
    }
  ],
  post_2: [
    {
      id: 'c_201',
      post_id: 'post_2',
      author: CURRENT_USER,
      content: 'Made this tonight and it was incredible!! The chili oil addition was genius 🤤',
      created_at: '5 hours ago',
      likes_count: 89,
      is_liked: true
    },
    {
      id: 'c_202',
      post_id: 'post_2',
      author: DEMO_USERS[4],
      content: 'Can you do a vegan version next please?',
      created_at: '6 hours ago',
      likes_count: 34,
      is_liked: false
    }
  ]
}

export const INITIAL_WELLNESS_RULES: WellnessRule[] = [
  {
    id: 'rule_1',
    type: 'continuous_usage',
    title: 'Mindful Break Reminder',
    message: "You've been watching videos for 45 minutes straight. Take a breath and rest your eyes!",
    minutes: 45,
    action: 'warning',
    is_enabled: true,
    created_at: '2026-10-10'
  },
  {
    id: 'rule_2',
    type: 'daily_limit',
    title: 'Daily Screen Time Budget',
    message: "You have reached your 2-hour daily screen time target. Time to unplug!",
    minutes: 120,
    action: 'warning',
    is_enabled: true,
    created_at: '2026-10-12'
  },
  {
    id: 'rule_3',
    type: 'late_night',
    title: 'Bedtime Gentle Wind-Down',
    message: 'It is late! Getting quality sleep boosts your creative energy tomorrow.',
    minutes: 0,
    from_hour: 23,
    to_hour: 6,
    action: 'warning',
    is_enabled: true,
    created_at: '2026-10-15'
  }
]

export const INITIAL_APPEALS: Appeal[] = [
  {
    id: 'app_1',
    uuid: '8a7d1e-appeal-01',
    user_id: CURRENT_USER.id,
    author: CURRENT_USER,
    post_id: 'post_archived_99',
    post_title: 'Behind the Scenes Dance Reel with Original Beats',
    post_thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&auto=format&fit=crop&q=80',
    appeal_type: 'post_moderation',
    reason: 'Audio Flagged Incorrectly',
    details: 'I hold full commercial license and rights to this original beat authored by soundwave_elena.',
    status: 'approved',
    created_at: '2026-10-12T09:00:00Z',
    resolved_at: '2026-10-13T14:30:00Z',
    admin_note: 'Verified license document. Flag removed and post restored.'
  },
  {
    id: 'app_2',
    uuid: '4b9f2c-appeal-02',
    user_id: 'usr_guest_45',
    author: {
      id: 'usr_guest_45',
      username: 'urban_skater',
      name: 'Kyle Turner',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      followers_count: 4200,
      following_count: 180,
      likes_count: 52000,
      role: 'user'
    },
    appeal_type: 'post_moderation',
    reason: 'Safety Flag Contest',
    details: 'The skate trick was performed in a closed, controlled skatepark with helmet and gear.',
    status: 'pending',
    created_at: '2026-10-17T11:20:00Z'
  }
]

export const INITIAL_ACTIVITY_LOGS: AdminActivityLog[] = [
  {
    id: 'log_1',
    admin_name: 'Sarah Jenkins (Superadmin)',
    action: 'RESTORE_POST',
    target_type: 'post',
    target_name: 'Dance Reel #4102',
    details: 'Approved appeal #8a7d1e after verifying copyright certificate.',
    created_at: '2026-10-18T14:10:00Z'
  },
  {
    id: 'log_2',
    admin_name: 'System Moderator AI',
    action: 'FLAG_POST',
    target_type: 'post',
    target_name: 'Post #9124',
    details: 'Detected potential community guidelines violation (Spam filter threshold 0.88).',
    created_at: '2026-10-18T12:05:00Z'
  },
  {
    id: 'log_3',
    admin_name: 'Sarah Jenkins (Superadmin)',
    action: 'UPDATE_SETTINGS',
    target_type: 'setting',
    target_name: 'AI Moderation Strictness',
    details: 'Set toxicity sensitivity to 0.75 for community posts.',
    created_at: '2026-10-17T16:45:00Z'
  }
]
