import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard, Wand2, Link2, Target, TrendingUp, Bug,
    Flame, Sparkles, Newspaper, Bot, Mic, Building2,
    ChevronLeft, ChevronRight, Crown, X
} from 'lucide-react'

const menuItems = [
    {
        section: 'Overview',
        items: [
            { path: '/', icon: LayoutDashboard, label: 'Dashboard' }
        ]
    },
    {
        section: 'Market Intelligence',
        items: [
            { path: '/keyword-magic', icon: Wand2, label: 'Keyword Magic Tool' },
            { path: '/backlink-miner', icon: Link2, label: 'Backlink Miner' },
            { path: '/competitor-gap', icon: Target, label: 'Competitor Gap' },
            { path: '/rank-tracker', icon: TrendingUp, label: 'Rank Tracker' }
        ]
    },
    {
        section: 'Technical Spider',
        items: [
            { path: '/site-audit', icon: Bug, label: 'Site Audit Spider' }
        ]
    },
    {
        section: 'Viral Growth',
        items: [
            { path: '/trend-surfer', icon: Flame, label: 'Trend Surfer' },
            { path: '/viral-loop', icon: Sparkles, label: 'Viral Loop Generator' },
            { path: '/press-release', icon: Newspaper, label: 'Press Release AI' }
        ]
    },
    {
        section: 'Multi-Engine',
        items: [
            { path: '/ai-optimization', icon: Bot, label: 'AI Search (AEO)' },
            { path: '/voice-search', icon: Mic, label: 'Voice Search Prep' }
        ]
    }
]

export default function Sidebar({ isOpen, setIsOpen, isMobile, onNavClick }) {
    const sidebarWidth = isOpen ? 280 : 72

    return (
        <>
            <motion.aside
                initial={false}
                animate={{
                    width: isMobile ? 280 : sidebarWidth,
                    x: isMobile && !isOpen ? -280 : 0
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={`fixed left-0 top-0 h-full z-50 glass-card flex flex-col ${isMobile ? 'shadow-2xl' : ''
                    }`}
                style={{
                    background: 'linear-gradient(180deg, rgba(18, 18, 26, 0.98) 0%, rgba(10, 10, 15, 0.99) 100%)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.06)'
                }}
            >
                {/* Logo Section */}
                <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <motion.div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-white text-lg font-bold">O</span>
                        </motion.div>
                        <AnimatePresence>
                            {(isOpen || isMobile) && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="overflow-hidden"
                                >
                                    <h1 className="text-lg font-bold text-white whitespace-nowrap">Omni Rank</h1>
                                    <p className="text-[10px] text-slate-500 whitespace-nowrap">SEO & Viral Growth</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Close button for mobile */}
                    {isMobile && isOpen && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
                    {menuItems.map((group, groupIndex) => (
                        <div key={group.section} className={groupIndex > 0 ? 'mt-4' : ''}>
                            <AnimatePresence>
                                {(isOpen || isMobile) && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="px-4 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider"
                                    >
                                        {group.section}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <div className="space-y-1 px-3">
                                {group.items.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={onNavClick}
                                        className={({ isActive }) =>
                                            `nav-item ${isActive ? 'active' : ''} ${!isOpen && !isMobile ? 'justify-center px-0' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : ''}`} />
                                                <AnimatePresence>
                                                    {(isOpen || isMobile) && (
                                                        <motion.span
                                                            initial={{ opacity: 0, width: 0 }}
                                                            animate={{ opacity: 1, width: 'auto' }}
                                                            exit={{ opacity: 0, width: 0 }}
                                                            className="overflow-hidden whitespace-nowrap text-sm"
                                                        >
                                                            {item.label}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Upgrade Section */}
                <div className="p-4 border-t border-[#2e2e3a] shrink-0">
                    <AnimatePresence>
                        {(isOpen || isMobile) ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Crown className="w-4 h-4 text-amber-400" />
                                    <span className="font-semibold text-white text-sm">Upgrade to Pro</span>
                                </div>
                                <p className="text-xs text-slate-400 mb-3">
                                    Unlimited audits, white-label reports & more
                                </p>
                                <button className="w-full btn-primary py-2.5 text-sm">
                                    Start Free Trial
                                </button>
                            </motion.div>
                        ) : (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center"
                            >
                                <Crown className="w-5 h-5 text-amber-400" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Collapse Button - Desktop only */}
                {!isMobile && (
                    <div className="p-3 border-t border-[#2e2e3a] shrink-0">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl hover:bg-[#1a1a25] text-slate-400 hover:text-white transition-colors"
                        >
                            {isOpen ? (
                                <>
                                    <ChevronLeft className="w-4 h-4" />
                                    <span className="text-sm">Collapse</span>
                                </>
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                )}
            </motion.aside>
        </>
    )
}
