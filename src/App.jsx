import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AuthContext from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import KeywordMagic from './pages/KeywordMagic'
import BacklinkMiner from './pages/BacklinkMiner'
import CompetitorGap from './pages/CompetitorGap'
import RankTracker from './pages/RankTracker'
import SiteAudit from './pages/SiteAudit'
import TrendSurfer from './pages/TrendSurfer'
import ViralLoop from './pages/ViralLoop'
import PressRelease from './pages/PressRelease'
import AIOptimization from './pages/AIOptimization'
import VoiceSearch from './pages/VoiceSearch'
import AgencyMode from './pages/AgencyMode'

// Protected Route Component
const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  )

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false) // Always start closed on mobile
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [location.pathname, isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-[#0a0a0f]">
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="sidebar-overlay active"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isMobile={isMobile}
          onNavClick={closeSidebar}
        />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-out ${!isMobile && sidebarOpen ? 'lg:ml-[280px]' : ''
            } ${!isMobile && !sidebarOpen ? 'lg:ml-[72px]' : ''
            }`}
        >
          <Header
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
            sidebarOpen={sidebarOpen}
          />

          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/keyword-magic" element={<KeywordMagic />} />
                <Route path="/backlink-miner" element={<BacklinkMiner />} />
                <Route path="/competitor-gap" element={<CompetitorGap />} />
                <Route path="/rank-tracker" element={<RankTracker />} />
                <Route path="/site-audit" element={<SiteAudit />} />
                <Route path="/trend-surfer" element={<TrendSurfer />} />
                <Route path="/viral-loop" element={<ViralLoop />} />
                <Route path="/press-release" element={<PressRelease />} />
                <Route path="/ai-optimization" element={<AIOptimization />} />
                <Route path="/voice-search" element={<VoiceSearch />} />
                <Route path="/agency-mode" element={<AgencyMode />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
