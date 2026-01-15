import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import {
    Flame, TrendingUp, TrendingDown, Globe, Clock, Sparkles, Zap,
    ArrowRight, Bell, BellOff, Filter, RefreshCw, MessageSquare,
    FileText, Twitter, Youtube, Search, Newspaper
} from 'lucide-react'

const trendingTopics = [
    {
        id: 1,
        topic: 'AI Productivity Tools',
        category: 'Technology',
        growth: 340,
        volume: 125000,
        trending: true,
        sources: ['google', 'twitter', 'reddit'],
        sentiment: 'positive',
        data: [
            { time: '12h', value: 20 }, { time: '10h', value: 35 }, { time: '8h', value: 45 },
            { time: '6h', value: 60 }, { time: '4h', value: 85 }, { time: '2h', value: 120 }, { time: 'Now', value: 145 }
        ]
    },
    {
        id: 2,
        topic: 'Bitcoin ETF Approval',
        category: 'Finance',
        growth: 520,
        volume: 890000,
        trending: true,
        sources: ['google', 'twitter', 'news'],
        sentiment: 'positive',
        data: [
            { time: '12h', value: 100 }, { time: '10h', value: 180 }, { time: '8h', value: 250 },
            { time: '6h', value: 320 }, { time: '4h', value: 480 }, { time: '2h', value: 650 }, { time: 'Now', value: 890 }
        ]
    },
    {
        id: 3,
        topic: 'Remote Work Statistics 2024',
        category: 'Business',
        growth: 180,
        volume: 45000,
        trending: true,
        sources: ['linkedin', 'google'],
        sentiment: 'neutral',
        data: [
            { time: '12h', value: 15 }, { time: '10h', value: 22 }, { time: '8h', value: 28 },
            { time: '6h', value: 32 }, { time: '4h', value: 38 }, { time: '2h', value: 42 }, { time: 'Now', value: 45 }
        ]
    },
    {
        id: 4,
        topic: 'Sustainable Fashion Brands',
        category: 'Lifestyle',
        growth: 95,
        volume: 28000,
        trending: false,
        sources: ['instagram', 'pinterest'],
        sentiment: 'positive',
        data: [
            { time: '12h', value: 12 }, { time: '10h', value: 15 }, { time: '8h', value: 18 },
            { time: '6h', value: 21 }, { time: '4h', value: 24 }, { time: '2h', value: 26 }, { time: 'Now', value: 28 }
        ]
    },
    {
        id: 5,
        topic: 'ChatGPT Alternatives',
        category: 'Technology',
        growth: 275,
        volume: 67000,
        trending: true,
        sources: ['google', 'reddit', 'youtube'],
        sentiment: 'neutral',
        data: [
            { time: '12h', value: 25 }, { time: '10h', value: 35 }, { time: '8h', value: 42 },
            { time: '6h', value: 48 }, { time: '4h', value: 55 }, { time: '2h', value: 62 }, { time: 'Now', value: 67 }
        ]
    }
]

const contentSuggestions = [
    {
        type: 'blog',
        title: '10 AI Productivity Tools That Will Transform Your Workflow in 2024',
        difficulty: 'Medium',
        estimatedTraffic: '15K-25K',
        keywords: ['AI productivity', 'workflow automation', 'AI tools']
    },
    {
        type: 'listicle',
        title: 'ChatGPT vs Claude vs Gemini: Complete Comparison Guide',
        difficulty: 'High',
        estimatedTraffic: '30K-50K',
        keywords: ['ChatGPT alternatives', 'AI comparison', 'best AI']
    },
    {
        type: 'how-to',
        title: 'How to Use AI Tools for Maximum Productivity',
        difficulty: 'Low',
        estimatedTraffic: '8K-12K',
        keywords: ['AI tutorial', 'productivity tips', 'AI guide']
    }
]

export default function TrendSurfer() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTrend, setSelectedTrend] = useState(trendingTopics[0])
    const [alertsEnabled, setAlertsEnabled] = useState({})

    const categories = ['all', 'technology', 'finance', 'business', 'lifestyle']

    const toggleAlert = (id) => {
        setAlertsEnabled(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const getSourceIcon = (source) => {
        switch (source) {
            case 'google': return <Search className="w-4 h-4" />
            case 'twitter': return <Twitter className="w-4 h-4" />
            case 'youtube': return <Youtube className="w-4 h-4" />
            case 'news': return <Newspaper className="w-4 h-4" />
            default: return <Globe className="w-4 h-4" />
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="module-header">
                    <div className="module-icon bg-gradient-to-br from-orange-500 to-amber-500">
                        <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Trend Surfer</h1>
                        <p className="text-slate-400">Real-time trending topics with content opportunities</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Refresh Trends
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Manage Alerts
                    </button>
                </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 bg-[#12121a] p-1 rounded-xl w-fit"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${selectedCategory === cat
                                ? 'bg-indigo-500 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trending Topics List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-xl overflow-hidden"
                >
                    <div className="p-4 border-b border-[#2e2e3a]">
                        <h2 className="font-semibold text-white">Trending Now</h2>
                        <p className="text-sm text-slate-400">Updated 5 minutes ago</p>
                    </div>
                    <div className="max-h-[600px] overflow-y-auto">
                        {trendingTopics.map((trend, index) => (
                            <motion.div
                                key={trend.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => setSelectedTrend(trend)}
                                className={`p-4 cursor-pointer transition-colors border-l-4 ${selectedTrend?.id === trend.id
                                        ? 'bg-indigo-500/10 border-indigo-500'
                                        : 'border-transparent hover:bg-[#1a1a25]'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            {trend.trending && (
                                                <Flame className="w-4 h-4 text-orange-400" />
                                            )}
                                            <span className="font-medium text-white">{trend.topic}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">{trend.category}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleAlert(trend.id)
                                        }}
                                        className="p-1 rounded hover:bg-[#2e2e3a] transition-colors"
                                    >
                                        {alertsEnabled[trend.id] ? (
                                            <Bell className="w-4 h-4 text-indigo-400" />
                                        ) : (
                                            <BellOff className="w-4 h-4 text-slate-500" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1 text-emerald-400">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>+{trend.growth}%</span>
                                    </div>
                                    <span className="text-slate-400">
                                        {(trend.volume / 1000).toFixed(0)}K searches
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {trend.sources.map((source, idx) => (
                                        <div
                                            key={idx}
                                            className="p-1 rounded bg-[#1a1a25] text-slate-400"
                                        >
                                            {getSourceIcon(source)}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Trend Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 space-y-6"
                >
                    {selectedTrend && (
                        <>
                            {/* Trend Chart */}
                            <div className="chart-container">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Flame className="w-5 h-5 text-orange-400" />
                                            <h2 className="text-xl font-semibold text-white">{selectedTrend.topic}</h2>
                                        </div>
                                        <p className="text-sm text-slate-400">Search interest over the last 12 hours</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`badge ${selectedTrend.sentiment === 'positive' ? 'badge-success' :
                                                selectedTrend.sentiment === 'negative' ? 'badge-danger' :
                                                    'badge-info'
                                            }`}>
                                            {selectedTrend.sentiment}
                                        </span>
                                        <span className="badge badge-primary">{selectedTrend.category}</span>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart data={selectedTrend.data}>
                                        <defs>
                                            <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3a" />
                                        <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                                        <YAxis stroke="#64748b" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                background: '#12121a',
                                                border: '1px solid #2e2e3a',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#f59e0b"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorTrend)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="text-center p-3 bg-[#1a1a25] rounded-xl">
                                        <p className="text-2xl font-bold text-emerald-400">+{selectedTrend.growth}%</p>
                                        <p className="text-xs text-slate-400">Growth Rate</p>
                                    </div>
                                    <div className="text-center p-3 bg-[#1a1a25] rounded-xl">
                                        <p className="text-2xl font-bold text-white">
                                            {(selectedTrend.volume / 1000).toFixed(0)}K
                                        </p>
                                        <p className="text-xs text-slate-400">Search Volume</p>
                                    </div>
                                    <div className="text-center p-3 bg-[#1a1a25] rounded-xl">
                                        <p className="text-2xl font-bold text-amber-400">High</p>
                                        <p className="text-xs text-slate-400">Competition</p>
                                    </div>
                                </div>
                            </div>

                            {/* AI Content Suggestions */}
                            <div className="glass-card rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-purple-500/20">
                                            <Sparkles className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">AI Content Suggestions</h3>
                                            <p className="text-sm text-slate-400">Capitalize on this trend today</p>
                                        </div>
                                    </div>
                                    <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Generate All
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {contentSuggestions.map((suggestion, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            className="p-4 bg-[#1a1a25] rounded-xl hover:bg-[#22222f] transition-colors group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="badge badge-info">{suggestion.type}</span>
                                                        <span className={`text-xs ${suggestion.difficulty === 'Low' ? 'text-emerald-400' :
                                                                suggestion.difficulty === 'Medium' ? 'text-amber-400' :
                                                                    'text-red-400'
                                                            }`}>
                                                            {suggestion.difficulty} difficulty
                                                        </span>
                                                    </div>
                                                    <h4 className="font-medium text-white mb-2">{suggestion.title}</h4>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span className="text-slate-400">
                                                            Est. traffic: <span className="text-emerald-400">{suggestion.estimatedTraffic}</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        {suggestion.keywords.map((kw, idx) => (
                                                            <span key={idx} className="px-2 py-1 text-xs bg-[#12121a] rounded text-slate-400">
                                                                {kw}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button className="p-2 rounded-lg hover:bg-indigo-500/20 transition-colors opacity-0 group-hover:opacity-100">
                                                    <ArrowRight className="w-5 h-5 text-indigo-400" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
