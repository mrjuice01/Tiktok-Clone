# Snapi - TikTok Clone (React SPA)

Snapi is a modern, responsive short-form video streaming and creator community web application rewritten in React 19, TypeScript, Vite, and Tailwind CSS.

## Features

- **For You, Following & Friends Feeds**: Immersive vertical video reel player with autoplay, sound volume controls, like animations with confetti, bookmarking, and share tools.
- **Interactive Comment Drawer**: Sliding comment panel supporting nested replies and comment likes.
- **Creator Studio (`/snapistudio`)**:
  - Analytics dashboard with weekly view charts and engagement metrics
  - Video upload pipeline with real-time preview, custom cover thumbnails, captions, hashtags, and audience visibility
  - Content manager for editing and deleting published reels
  - Scheduled posts manager for queueing upcoming content
  - Digital Wellness & Screen Time center with custom safeguard rules and mindful break alerts
  - Creator appeals center for contesting moderation flags
  - Creator account settings & privacy preferences
- **Search & Discovery (`/search`)**: Real-time filtering across creators, videos, and hashtags.
- **User Profiles (`/@username`)**: Video grid, liked videos, saved bookmarks, follower stats, and profile editing.
- **Admin Governance Console (`/admin`)**: Trust & Safety dashboard, flagged post moderation, user directory with account restriction controls, appeals review queue, and audit logs.
- **Fast Client State**: Instant reactivity with persistent storage in browser local storage and quick demo account switcher.

## Tech Stack

- **Framework**: React 19, React Router v7, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React icons
- **Charts**: Recharts
- **FX**: Canvas-confetti

## Getting Started

```bash
npm install
npm run dev
```

Runs on port 3000 (`http://localhost:3000`).
