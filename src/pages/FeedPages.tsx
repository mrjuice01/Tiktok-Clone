import React from 'react'
import { useApp } from '../context/AppContext'
import { FeedContainer } from '../components/feed/FeedContainer'

export const HomePage: React.FC = () => {
  const { posts } = useApp()
  // Active public posts
  const publicPosts = posts.filter((p) => p.status === 'active' && p.visibility === 'public')

  return <FeedContainer posts={publicPosts} emptyMessage="No videos on For You right now" />
}

export const FollowingPage: React.FC = () => {
  const { posts, users } = useApp()
  const followedUserIds = users.filter((u) => u.is_following).map((u) => u.id)
  const followingPosts = posts.filter(
    (p) => followedUserIds.includes(p.author.id) || p.author.is_following
  )

  return (
    <FeedContainer
      posts={followingPosts}
      emptyMessage="You aren't following anyone with new posts yet"
    />
  )
}

export const FriendsPage: React.FC = () => {
  const { posts } = useApp()
  // Friends posts (visibility 'friends' or from mutual creators)
  const friendsPosts = posts.filter((p) => p.visibility === 'friends' || p.author.is_following)

  return (
    <FeedContainer
      posts={friendsPosts}
      emptyMessage="No posts from mutual friends yet"
    />
  )
}
