import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import {
    Wand2, Search, Filter, Download, Star, TrendingUp, TrendingDown,
    ArrowUpDown, ChevronDown, Eye, Copy, ExternalLink, Sparkles,
    ChevronLeft, ChevronRight
} from 'lucide-react'

const mockKeywords = [
    { id: 1, keyword: 'AI content generator', volume: 33100, kd: 67, cpc: 4.50, trend: 'up', intent: 'commercial', starred: true },
    { id: 2, keyword: 'AI writing assistant', volume: 22400, kd: 58, cpc: 3.80, trend: 'up', intent: 'informational', starred: false },
    { id: 3, keyword: 'best AI copywriting tools', volume: 8200, kd: 45, cpc: 5.20, trend: 'up', intent: 'commercial', starred: true },
    { id: 4, keyword: 'free AI content writer', volume: 12800, kd: 42, cpc: 2.10, trend: 'stable', intent: 'transactional', starred: false },
    { id: 5, keyword: 'AI blog post generator', volume: 6500, kd: 38, cpc: 3.20, trend: 'up', intent: 'commercial', starred: false },
    { id: 6, keyword: 'ChatGPT alternatives', volume: 45000, kd: 72, cpc: 4.80, trend: 'up', intent: 'informational', starred: true },
    { id: 7, keyword: 'AI SEO content', volume: 4200, kd: 35, cpc: 2.90, trend: 'up', intent: 'commercial', starred: false },
    { id: 8, keyword: 'automated article writer', volume: 3100, kd: 31, cpc: 2.40, trend: 'down', intent: 'commercial', starred: false }
]

const volumeDistribution = [
    { range: '0-1K', count: 45 },
    { range: '1K-5K', count: 89 },
    { range: '5K-10K', count: 34 },
    { range: '10K-50K', count: 23 },
    { range: '50K+', count: 9 }
]

const keywordGroups = [
    { name: 'AI Writing', count: 156, color: '#6366f1' },
    { name: 'Content Tools', count: 89, color: '#22d3ee' },
    { name: 'SEO Related', count: 67, color: '#10b981' },
    { name: 'Copywriting', count: 45, color: '#f59e0b' },
    { name: 'Automation', count: 34, color: '#a855f7' }
]

export default function KeywordMagic() {
    const [searchQuery, setSearchQuery] = useState('')
    const [keywords, setKeywords] = useState(mockKeywords)
    const [hasSearched, setHasSearched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sortBy, setSortBy] = useState('volume')
    const [sortOrder, setSortOrder] = useState('desc')

    const { token } = useContext(AuthContext)

    const handleSearch = async () => {
        if (!searchQuery.trim()) return
        setIsLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/tools/keywords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ query: searchQuery })
            })
            const data = await res.json()
            if (res.ok) {
                setKeywords(data)
                setHasSearched(true)
            } else {
                alert('Error fetching keywords')
            }
        } catch (error) {
            console.error(error)
            alert('Server error')
        } finally {
            setIsLoading(false)
        }
    }

    const toggleStar = (id) => {
        setKeywords(keywords.map(kw =>
            kw.id === id ? { ...kw, starred: !kw.starred } : kw
        ))
    }

    const getKdColor = (kd) => {
        if (kd >= 70) return 'text-red-400'
        if (kd >= 40) return 'text-amber-400'
        return 'text-emerald-400'
    }

    const getKdBg = (kd) => {
        if (kd >= 70) return 'bg-red-500/20'
        if (kd >= 40) return 'bg-amber-500/20'
        return 'bg-emerald-500/20'
    }

    const getIntentBadge = (intent) => {
        const styles = {
            commercial: 'badge-primary',
            informational: 'badge-info',
            transactional: 'badge-success',
            navigational: 'badge-warning'
        }
        return styles[intent] || 'badge-info'
    }

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div className="module-header">
                    <div className="module-icon bg-gradient-to-br from-purple-500 to-pink-600">
                        <Wand2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">Keyword Magic Tool</h1>
                        <p className="text-xs md:text-sm text-slate-400">Find keyword opportunities</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="btn-secondary text-sm py-2 px-3 md:px-4 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button className="btn-primary text-sm py-2 px-3 md:px-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="hidden sm:inline">Generate</span>
                    </button>
                </div>
            </motion.div>

            {/* Search Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-4 md:p-6"
            >
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Enter a seed keyword (e.g., AI content generator)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="input-dark pl-12 text-base md:text-lg h-12 md:h-14"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="btn-primary px-6 md:px-8 h-12 md:h-14 flex items-center justify-center gap-2 shrink-0"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5" />
                                <span>Discover</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4 text-xs md:text-sm text-slate-400">
                    <span>Try:</span>
                    {['AI writing', 'content marketing', 'social media'].map((term) => (
                        <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-2 py-1 rounded-lg bg-[#1a1a25] hover:bg-[#22222f] transition-colors"
                        >
                            {term}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Results */}
            <AnimatePresence>
                {hasSearched && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4 md:space-y-6"
                    >
                        {/* Stats Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {[
                                { label: 'Keywords Found', value: '1,247', color: '#6366f1' },
                                { label: 'Total Volume', value: '892K', color: '#22d3ee' },
                                { label: 'Avg. KD', value: '45%', color: '#f59e0b' },
                                { label: 'Avg. CPC', value: '$3.40', color: '#10b981' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="stat-card"
                                >
                                    <p className="text-xl md:text-2xl font-bold" style={{ color: stat.color }}>
                                        {stat.value}
                                    </p>
                                    <p className="text-xs md:text-sm text-slate-400 mt-0.5">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
                            {/* Sidebar - Groups & Chart */}
                            <div className="lg:col-span-1 space-y-4 md:space-y-6">
                                {/* Keyword Groups */}
                                <div className="chart-container">
                                    <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Keyword Groups</h3>
                                    <div className="space-y-2">
                                        {keywordGroups.map((group) => (
                                            <button
                                                key={group.name}
                                                className="w-full flex items-center justify-between p-2.5 md:p-3 rounded-xl hover:bg-[#1a1a25] transition-colors group"
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span
                                                        className="w-2 h-2 rounded-full shrink-0"
                                                        style={{ background: group.color }}
                                                    />
                                                    <span className="text-xs md:text-sm text-slate-300 group-hover:text-white truncate">
                                                        {group.name}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-slate-500 shrink-0">{group.count}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Volume Distribution - Hide on mobile */}
                                <div className="chart-container hidden md:block">
                                    <h3 className="font-semibold text-white mb-4 text-sm">Volume Distribution</h3>
                                    <div className="h-40">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={volumeDistribution} layout="vertical">
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="range" type="category" width={50} fontSize={10} stroke="#64748b" />
                                                <Tooltip
                                                    contentStyle={{
                                                        background: '#12121a',
                                                        border: '1px solid #2e2e3a',
                                                        borderRadius: '8px',
                                                        fontSize: '12px'
                                                    }}
                                                />
                                                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Keywords Table */}
                            <div className="lg:col-span-3 glass-card rounded-xl overflow-hidden">
                                {/* Table Header */}
                                <div className="p-3 md:p-4 border-b border-[#2e2e3a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {['All', 'Starred', 'Easy KD'].map((tab) => (
                                            <button
                                                key={tab}
                                                className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-slate-400 hover:text-white hover:bg-[#1a1a25] transition-colors"
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white self-end sm:self-auto">
                                        <Filter className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>

                                {/* Mobile: Card View */}
                                <div className="md:hidden divide-y divide-[#2e2e3a]">
                                    {keywords.map((kw) => (
                                        <div key={kw.id} className="p-4">
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => toggleStar(kw.id)}
                                                            className="shrink-0"
                                                        >
                                                            <Star
                                                                className={`w-4 h-4 ${kw.starred ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`}
                                                            />
                                                        </button>
                                                        <span className="font-medium text-white text-sm truncate">{kw.keyword}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`badge ${getIntentBadge(kw.intent)}`}>{kw.intent}</span>
                                                    </div>
                                                </div>
                                                {kw.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />}
                                                {kw.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400 shrink-0" />}
                                            </div>
                                            <div className="grid grid-cols-3 gap-3 text-center">
                                                <div className="p-2 rounded-lg bg-[#1a1a25]">
                                                    <p className="text-white font-semibold text-sm">{kw.volume.toLocaleString()}</p>
                                                    <p className="text-[10px] text-slate-500">Volume</p>
                                                </div>
                                                <div className={`p-2 rounded-lg ${getKdBg(kw.kd)}`}>
                                                    <p className={`font-semibold text-sm ${getKdColor(kw.kd)}`}>{kw.kd}%</p>
                                                    <p className="text-[10px] text-slate-500">KD</p>
                                                </div>
                                                <div className="p-2 rounded-lg bg-[#1a1a25]">
                                                    <p className="text-emerald-400 font-semibold text-sm">${kw.cpc.toFixed(2)}</p>
                                                    <p className="text-[10px] text-slate-500">CPC</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop: Table View */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="table-dark">
                                        <thead>
                                            <tr>
                                                <th className="w-10"></th>
                                                <th>Keyword</th>
                                                <th className="text-right cursor-pointer hover:text-white">
                                                    <div className="flex items-center justify-end gap-1">
                                                        Volume
                                                        <ArrowUpDown className="w-3 h-3" />
                                                    </div>
                                                </th>
                                                <th className="text-center">KD%</th>
                                                <th className="text-right">CPC</th>
                                                <th className="text-center">Trend</th>
                                                <th className="text-center">Intent</th>
                                                <th className="w-20"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {keywords.map((kw) => (
                                                <tr key={kw.id} className="group">
                                                    <td>
                                                        <button onClick={() => toggleStar(kw.id)}>
                                                            <Star
                                                                className={`w-4 h-4 ${kw.starred ? 'text-amber-400 fill-amber-400' : 'text-slate-500 group-hover:text-slate-400'}`}
                                                            />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <span className="font-medium text-white">{kw.keyword}</span>
                                                    </td>
                                                    <td className="text-right">
                                                        <span className="text-slate-300">{kw.volume.toLocaleString()}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className={`font-medium ${getKdColor(kw.kd)}`}>
                                                            {kw.kd}%
                                                        </span>
                                                    </td>
                                                    <td className="text-right">
                                                        <span className="text-emerald-400">${kw.cpc.toFixed(2)}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        {kw.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto" />}
                                                        {kw.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400 mx-auto" />}
                                                        {kw.trend === 'stable' && <span className="text-slate-400">—</span>}
                                                    </td>
                                                    <td className="text-center">
                                                        <span className={`badge ${getIntentBadge(kw.intent)}`}>
                                                            {kw.intent}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-1.5 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                                                <Copy className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button className="p-1.5 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                                                <ExternalLink className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="p-3 md:p-4 border-t border-[#2e2e3a] flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <p className="text-xs md:text-sm text-slate-400">
                                        Showing <span className="text-white">1-8</span> of <span className="text-white">1,247</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg bg-[#1a1a25] text-slate-400 hover:text-white transition-colors">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-sm">1</button>
                                        <button className="px-3 py-1.5 rounded-lg bg-[#1a1a25] text-slate-400 hover:text-white transition-colors text-sm">2</button>
                                        <button className="px-3 py-1.5 rounded-lg bg-[#1a1a25] text-slate-400 hover:text-white transition-colors text-sm">3</button>
                                        <button className="p-2 rounded-lg bg-[#1a1a25] text-slate-400 hover:text-white transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {!hasSearched && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center py-12 md:py-20"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Wand2 className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                        Discover Your Perfect Keywords
                    </h2>
                    <p className="text-sm md:text-base text-slate-400 max-w-md mx-auto mb-6">
                        Enter a seed keyword above to unlock thousands of keyword variations with volume, difficulty, and CPC data.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Eye className="w-4 h-4 text-indigo-400" />
                            <span>Search Volume</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span>Keyword Difficulty</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="text-amber-400">$</span>
                            <span>CPC Data</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
