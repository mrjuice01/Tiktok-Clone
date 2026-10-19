import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { WellnessAlertModal } from './components/wellness/WellnessAlertModal'
import { AuthModal } from './components/auth/AuthModal'

// Public Pages
import { HomePage, FollowingPage, FriendsPage } from './pages/FeedPages'
import { ProfilePage } from './pages/ProfilePage'
import { SearchPage } from './pages/SearchPage'
import { VideoDetailPage } from './pages/VideoDetailPage'
import { TermsPage, PrivacyPage } from './pages/LegalPages'

// Creator Studio Pages
import { StudioLayout } from './pages/studio/StudioLayout'
import { StudioDashboard } from './pages/studio/StudioDashboard'
import { StudioUpload } from './pages/studio/StudioUpload'
import { StudioContent } from './pages/studio/StudioContent'
import { StudioScheduled } from './pages/studio/StudioScheduled'
import { StudioWellness } from './pages/studio/StudioWellness'
import { StudioAppeals } from './pages/studio/StudioAppeals'
import { StudioSettings } from './pages/studio/StudioSettings'

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminPosts } from './pages/admin/AdminPosts'
import { AdminUsers } from './pages/admin/AdminUsers'
import { AdminAppeals } from './pages/admin/AdminAppeals'
import { AdminActivity } from './pages/admin/AdminActivity'

// Main App Layout with Navbar & Sidebar
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// Studio Base Layout (Navbar + Studio sidebar)
const StudioAppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-1">
        <StudioLayout />
      </div>
    </div>
  )
}

// Admin Base Layout (Navbar + Admin sidebar)
const AdminAppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-1">
        <AdminLayout />
      </div>
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Feed & Public User Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/video/:id" element={<VideoDetailPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/help" element={<TermsPage />} />
          </Route>

          {/* Creator Studio Routes */}
          <Route path="/snapistudio" element={<StudioAppLayout />}>
            <Route index element={<StudioDashboard />} />
            <Route path="upload" element={<StudioUpload />} />
            <Route path="content" element={<StudioContent />} />
            <Route path="scheduled-posts" element={<StudioScheduled />} />
            <Route path="wellness" element={<StudioWellness />} />
            <Route path="appeals" element={<StudioAppeals />} />
            <Route path="settings" element={<StudioSettings />} />
          </Route>

          {/* Admin Platform Governance Routes */}
          <Route path="/admin" element={<AdminAppLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="appeals" element={<AdminAppeals />} />
            <Route path="activity" element={<AdminActivity />} />
          </Route>
        </Routes>

        {/* Global Modals */}
        <WellnessAlertModal />
        <AuthModal />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
