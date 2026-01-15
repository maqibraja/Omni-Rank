import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu, Search, Bell, User, Settings, LogOut, Moon, Globe,
    ChevronDown, Zap, HelpCircle, X
} from 'lucide-react'

export default function Header({ toggleSidebar, isMobile, sidebarOpen }) {
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const notificationRef = useRef(null)
    const profileRef = useRef(null)
    const searchInputRef = useRef(null)

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Focus search input when opened
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [showSearch])

    const notifications = [
        { id: 1, type: 'success', title: 'Rank improved', message: '"AI tools" moved to position #3', time: '2m ago' },
        { id: 2, type: 'warning', title: 'Backlink lost', message: 'Lost backlink from techblog.com', time: '1h ago' },
        { id: 3, type: 'info', title: 'New trend', message: '"ChatGPT alternatives" is trending', time: '3h ago' }
    ]

    return (
        <header className="h-16 bg-[#0a0a0f]/90 backdrop-blur-lg border-b border-[#2e2e3a] px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
            {/* Left Section */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="p-2.5 rounded-xl hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Search - Desktop */}
                <div className="hidden md:block relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search keywords, pages..."
                        className="w-56 lg:w-72 input-dark pl-10 pr-16 py-2.5 text-sm"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-medium text-slate-500 bg-[#1a1a25] rounded border border-[#2e2e3a]">
                        ⌘K
                    </kbd>
                </div>

                {/* Search button - Mobile */}
                <button
                    onClick={() => setShowSearch(true)}
                    className="md:hidden p-2.5 rounded-xl hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 md:gap-2">
                {/* Live Tracking Indicator - Hide on small mobile */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mr-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-emerald-400 whitespace-nowrap">Live</span>
                </div>

                {/* Quick Actions - Hide some on mobile */}
                <button className="hidden lg:flex p-2.5 rounded-xl hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                    <Globe className="w-5 h-5" />
                </button>
                <button className="hidden md:flex p-2.5 rounded-xl hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                    <Moon className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications)
                            setShowProfile(false)
                        }}
                        className="relative p-2.5 rounded-xl hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0a0a0f]"></span>
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-14 w-80 max-w-[calc(100vw-2rem)] glass-card rounded-xl overflow-hidden shadow-2xl"
                            >
                                <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                                    <h3 className="font-semibold text-white">Notifications</h3>
                                    <button className="text-xs text-indigo-400 hover:text-indigo-300">
                                        Mark all read
                                    </button>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className="p-4 hover:bg-[#1a1a25] transition-colors cursor-pointer border-b border-[#2e2e3a] last:border-0"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notif.type === 'success' ? 'bg-emerald-500' :
                                                        notif.type === 'warning' ? 'bg-amber-500' :
                                                            'bg-cyan-500'
                                                    }`} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-medium text-white text-sm truncate">{notif.title}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5 truncate">{notif.message}</p>
                                                    <p className="text-[10px] text-slate-500 mt-1">{notif.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-[#2e2e3a]">
                                    <button className="w-full text-center text-sm text-indigo-400 hover:text-indigo-300 py-1">
                                        View all notifications
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => {
                            setShowProfile(!showProfile)
                            setShowNotifications(false)
                        }}
                        className="flex items-center gap-2 p-1.5 md:p-2 md:pr-3 rounded-xl hover:bg-[#1a1a25] transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                            J
                        </div>
                        <span className="hidden md:block text-sm font-medium text-white">John</span>
                        <ChevronDown className="hidden md:block w-4 h-4 text-slate-400" />
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-14 w-56 glass-card rounded-xl overflow-hidden shadow-2xl"
                            >
                                <div className="p-4 border-b border-[#2e2e3a]">
                                    <p className="font-semibold text-white">John Doe</p>
                                    <p className="text-xs text-slate-400 truncate">john@example.com</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="badge badge-primary">Pro Plan</span>
                                    </div>
                                </div>
                                <div className="py-2">
                                    {[
                                        { icon: User, label: 'Profile' },
                                        { icon: Settings, label: 'Settings' },
                                        { icon: HelpCircle, label: 'Help & Support' }
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-[#1a1a25] transition-colors"
                                        >
                                            <item.icon className="w-4 h-4 text-slate-500" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-2 border-t border-[#2e2e3a]">
                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Search Modal */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={() => setShowSearch(false)}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="bg-[#12121a] p-4 border-b border-[#2e2e3a]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search keywords, pages..."
                                    className="w-full input-dark pl-11 pr-11 py-3 text-base"
                                />
                                <button
                                    onClick={() => setShowSearch(false)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#1a1a25] rounded-lg transition-colors text-slate-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
