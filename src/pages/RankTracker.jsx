import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import {
    TrendingUp, TrendingDown, Plus, Search, Filter, Download, Eye,
    Globe, Calendar, ArrowUp, ArrowDown, Minus, RefreshCw, Settings,
    Target, Award, ChevronDown, BarChart3
} from 'lucide-react'

const rankingData = [
    { date: 'Jan 1', pos1: 15, pos2: 8, pos3: 23 },
    { date: 'Jan 8', pos1: 12, pos2: 7, pos3: 21 },
    { date: 'Jan 15', pos1: 10, pos2: 6, pos3: 18 },
    { date: 'Jan 22', pos1: 8, pos2: 5, pos3: 15 },
    { date: 'Jan 29', pos1: 6, pos2: 4, pos3: 12 },
    { date: 'Feb 5', pos1: 5, pos2: 3, pos3: 10 },
    { date: 'Feb 12', pos1: 3, pos2: 3, pos3: 8 },
]

const trackedKeywords = [
    {
        id: 1,
        keyword: 'AI content generator',
        currentPos: 3,
        previousPos: 5,
        change: 2,
        bestPos: 3,
        volume: 33100,
        url: '/blog/ai-content-guide',
        engines: { google: 3, bing: 5, yahoo: 4 }
    },
    {
        id: 2,
        keyword: 'SEO automation tools',
        currentPos: 5,
        previousPos: 5,
        change: 0,
        bestPos: 4,
        volume: 12400,
        url: '/products/automation',
        engines: { google: 5, bing: 7, yahoo: 6 }
    },
    {
        id: 3,
        keyword: 'content writing software',
        currentPos: 8,
        previousPos: 12,
        change: 4,
        bestPos: 8,
        volume: 8200,
        url: '/features',
        engines: { google: 8, bing: 10, yahoo: 9 }
    },
    {
        id: 4,
        keyword: 'keyword research tool',
        currentPos: 12,
        previousPos: 10,
        change: -2,
        bestPos: 8,
        volume: 22500,
        url: '/tools/keyword-research',
        engines: { google: 12, bing: 15, yahoo: 14 }
    },
    {
        id: 5,
        keyword: 'backlink analyzer',
        currentPos: 6,
        previousPos: 9,
        change: 3,
        bestPos: 6,
        volume: 6800,
        url: '/tools/backlinks',
        engines: { google: 6, bing: 8, yahoo: 7 }
    },
    {
        id: 6,
        keyword: 'site audit tool',
        currentPos: 15,
        previousPos: 18,
        change: 3,
        bestPos: 12,
        volume: 5400,
        url: '/tools/audit',
        engines: { google: 15, bing: 18, yahoo: 17 }
    },
]

const distributionData = [
    { range: 'Top 3', count: 8, color: '#10b981' },
    { range: 'Top 10', count: 24, color: '#22d3ee' },
    { range: 'Top 20', count: 45, color: '#6366f1' },
    { range: 'Top 50', count: 89, color: '#f59e0b' },
    { range: '50+', count: 34, color: '#ef4444' },
]

export default function RankTracker() {
    const [selectedEngine, setSelectedEngine] = useState('google')
    const [dateRange, setDateRange] = useState('30d')
    const [showAddKeyword, setShowAddKeyword] = useState(false)

    const getChangeIcon = (change) => {
        if (change > 0) return <ArrowUp className="w-4 h-4 text-emerald-400" />
        if (change < 0) return <ArrowDown className="w-4 h-4 text-red-400" />
        return <Minus className="w-4 h-4 text-slate-400" />
    }

    const getChangeColor = (change) => {
        if (change > 0) return 'text-emerald-400'
        if (change < 0) return 'text-red-400'
        return 'text-slate-400'
    }

    const getPositionColor = (pos) => {
        if (pos <= 3) return 'text-emerald-400'
        if (pos <= 10) return 'text-cyan-400'
        if (pos <= 20) return 'text-amber-400'
        return 'text-red-400'
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
                    <div className="module-icon bg-gradient-to-br from-emerald-500 to-teal-600">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Rank Tracker</h1>
                        <p className="text-slate-400">Monitor keyword positions across search engines</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAddKeyword(!showAddKeyword)}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Keywords
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Update Rankings
                    </button>
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between flex-wrap gap-4"
            >
                {/* Search Engine Tabs */}
                <div className="flex items-center gap-2 bg-[#12121a] p-1 rounded-xl">
                    {[
                        { id: 'google', label: 'Google', icon: '🔍' },
                        { id: 'bing', label: 'Bing', icon: '🅱️' },
                        { id: 'yahoo', label: 'Yahoo', icon: '🟣' }
                    ].map((engine) => (
                        <button
                            key={engine.id}
                            onClick={() => setSelectedEngine(engine.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${selectedEngine === engine.id
                                    ? 'bg-indigo-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <span>{engine.icon}</span>
                            {engine.label}
                        </button>
                    ))}
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#12121a] p-1 rounded-xl">
                        {['7d', '30d', '90d', '6m', '1y'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${dateRange === range
                                        ? 'bg-[#1a1a25] text-white'
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                        <Calendar className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="stat-card"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                            <Award className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">8</p>
                            <p className="text-sm text-slate-400">Top 3 Rankings</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="stat-card"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/20">
                            <Target className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">32</p>
                            <p className="text-sm text-slate-400">Top 10 Rankings</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="stat-card"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-500/20">
                            <TrendingUp className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-400">+47</p>
                            <p className="text-sm text-slate-400">Improved</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="stat-card"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-500/20">
                            <TrendingDown className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-400">-12</p>
                            <p className="text-sm text-slate-400">Declined</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Rankings Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 chart-container"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Position History</h2>
                            <p className="text-sm text-slate-400">Track keyword movements over time</p>
                        </div>
                        <select className="input-dark py-2 px-4 text-sm cursor-pointer">
                            <option>Top 5 Keywords</option>
                            <option>All Keywords</option>
                            <option>Top Movers</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={rankingData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3a" />
                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} reversed domain={[1, 'auto']} />
                            <Tooltip
                                contentStyle={{
                                    background: '#12121a',
                                    border: '1px solid #2e2e3a',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="pos1"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={{ fill: '#6366f1' }}
                                name="AI content generator"
                            />
                            <Line
                                type="monotone"
                                dataKey="pos2"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: '#10b981' }}
                                name="SEO tools"
                            />
                            <Line
                                type="monotone"
                                dataKey="pos3"
                                stroke="#22d3ee"
                                strokeWidth={2}
                                dot={{ fill: '#22d3ee' }}
                                name="Content writing"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Position Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="chart-container"
                >
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">Position Distribution</h2>
                        <p className="text-sm text-slate-400">Keywords by ranking range</p>
                    </div>
                    <div className="space-y-4">
                        {distributionData.map((item, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-400">{item.range}</span>
                                    <span className="text-sm font-medium text-white">{item.count}</span>
                                </div>
                                <div className="h-3 bg-[#1a1a25] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.count / 200) * 100}%` }}
                                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                        className="h-full rounded-full"
                                        style={{ background: item.color }}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 p-4 bg-[#1a1a25] rounded-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Total Tracked</span>
                            <span className="text-xl font-bold text-white">200</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Keywords Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-xl overflow-hidden"
            >
                <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search keywords..."
                                className="input-dark pl-10 py-2 w-64 text-sm"
                            />
                        </div>
                        <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-dark">
                        <thead>
                            <tr>
                                <th>Keyword</th>
                                <th className="text-center">Current</th>
                                <th className="text-center">Change</th>
                                <th className="text-center">Best</th>
                                <th className="text-right">Volume</th>
                                <th>URL</th>
                                <th className="text-center">Google</th>
                                <th className="text-center">Bing</th>
                                <th className="text-center">Yahoo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trackedKeywords.map((kw) => (
                                <tr key={kw.id} className="group">
                                    <td>
                                        <span className="font-medium text-white">{kw.keyword}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className={`text-lg font-bold ${getPositionColor(kw.currentPos)}`}>
                                            #{kw.currentPos}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className={`flex items-center justify-center gap-1 ${getChangeColor(kw.change)}`}>
                                            {getChangeIcon(kw.change)}
                                            <span className="font-medium">{Math.abs(kw.change)}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-emerald-400 font-medium">#{kw.bestPos}</span>
                                    </td>
                                    <td className="text-right">
                                        <span className="text-slate-300">{kw.volume.toLocaleString()}</span>
                                    </td>
                                    <td>
                                        <span className="text-slate-400 text-sm truncate max-w-[150px] block">
                                            {kw.url}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span className={getPositionColor(kw.engines.google)}>#{kw.engines.google}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className={getPositionColor(kw.engines.bing)}>#{kw.engines.bing}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className={getPositionColor(kw.engines.yahoo)}>#{kw.engines.yahoo}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-[#2e2e3a] flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                        Last updated: 2 hours ago
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-lg bg-[#1a1a25] text-slate-400 hover:text-white transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white">1</button>
                        <button className="px-4 py-2 rounded-lg bg-[#1a1a25] text-slate-400 hover:text-white transition-colors">
                            2
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-[#1a1a25] text-slate-400 hover:text-white transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
