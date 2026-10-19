import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, FileText, ArrowLeft } from 'lucide-react'

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 text-zinc-300">
      <Link to="/" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white">
        <ArrowLeft className="size-4" /> Back to Home
      </Link>

      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
          <FileText className="size-8 text-[#FE2C55]" />
          Terms of Service
        </h1>
        <p className="text-xs text-zinc-500 mt-1">Last updated: September 2026</p>
      </div>

      <div className="space-y-4 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Snapi, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not accept these terms, please do not use the service.
        </p>

        <h2 className="text-lg font-bold text-white">2. User Content & Licensing</h2>
        <p>
          Creators retain all ownership of their original videos, audio, and captions uploaded to Snapi. By publishing content, you grant Snapi a worldwide, royalty-free license to host, display, and stream your reels across our platform.
        </p>

        <h2 className="text-lg font-bold text-white">3. Community Guidelines & Safety</h2>
        <p>
          Users must not upload content that promotes harassment, copyright infringement, deceptive spam, or dangerous activities. Our automated safety systems and moderation team review reported content.
        </p>
      </div>
    </div>
  )
}

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 text-zinc-300">
      <Link to="/" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white">
        <ArrowLeft className="size-4" /> Back to Home
      </Link>

      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Shield className="size-8 text-[#25F4EE]" />
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-500 mt-1">Last updated: September 2026</p>
      </div>

      <div className="space-y-4 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
        <p>
          We collect account data such as username, email address, profile photo, and content interaction signals (likes, bookmarks, watch duration) to personalize your For You recommendation algorithm.
        </p>

        <h2 className="text-lg font-bold text-white">2. Digital Wellbeing & Analytics</h2>
        <p>
          Screen time session statistics and wellness rules configured in your Snapi Studio are stored securely to help you maintain healthy digital habits.
        </p>

        <h2 className="text-lg font-bold text-white">3. Data Protection</h2>
        <p>
          Your personal data is encrypted in transit and at rest. We never sell your personal information to third parties.
        </p>
      </div>
    </div>
  )
}
