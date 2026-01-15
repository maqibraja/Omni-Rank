import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import {
    TrendingUp, TrendingDown, Plus, Search, Filter, Download, Eye,
    Globe, Calendar, ArrowUp, ArrowDown, Minus, RefreshCw, Settings,
    Target, Award, ChevronDown, BarChart3
} from 'lucide-react'
import AuthContext from '../context/AuthContext'

const rankingData = [
    { date: 'Jan 1', pos1: 15, pos2: 8, pos3: 23 },
    { date: 'Jan 8', pos1: 12, pos2: 7, pos3: 21 },
    { date: 'Jan 15', pos1: 10, pos2: 6, pos3: 18 },
    { date: 'Jan 22', pos1: 8, pos2: 5, pos3: 15 },
    { date: 'Jan 29', pos1: 6, pos2: 4, pos3: 12 },
    { date: 'Feb 5', pos1: 5, pos2: 3, pos3: 10 },
    { date: 'Feb 12', pos1: 3, pos2: 3, pos3: 8 },
]

const initialTrackedKeywords = [
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
    }
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
    const [keywords, setKeywords] = useState(initialTrackedKeywords)
    const [isUpdating, setIsUpdating] = useState(false)
    const { token } = useContext(AuthContext)

    const handleUpdateRankings = async () => {
        setIsUpdating(true)
        try {
            const res = await fetch('http://localhost:5000/api/tools/rank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    domain: 'example.com',
                    keyword: keywords[0].keyword
                })
            })
            const data = await res.json()
            if (res.ok) {
                setKeywords(prev => prev.map((kw, i) =>
                    i === 0 ? { ...kw, currentPos: data.position, engines: { ...kw.engines, google: data.position } } : kw
                ))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

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
                    <button
                        onClick={handleUpdateRankings}
                        disabled={isUpdating}
                        className="btn-primary flex items-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                        {isUpdating ? 'Updating...' : 'Update Rankings'}
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Top 3', value: '8', icon: Award, color: 'emerald' },
                    { label: 'Top 10', value: '32', icon: Target, color: 'cyan' },
                    { label: 'Improved', value: '+47', icon: TrendingUp, color: 'emerald', text: 'emerald' },
                    { label: 'Declined', value: '-12', icon: TrendingDown, color: 'red', text: 'red' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="stat-card"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${stat.text ? `text-${stat.text}-400` : 'text-white'}`}>{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 chart-container"
                >
                    <h2 className="text-xl font-semibold text-white mb-6">Position History</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={rankingData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3a" />
                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} reversed domain={[1, 'auto']} />
                            <Tooltip contentStyle={{ background: '#12121a', border: '1px solid #2e2e3a' }} />
                            <Line type="monotone" dataKey="pos1" stroke="#6366f1" strokeWidth={2} name="AI content" />
                            <Line type="monotone" dataKey="pos2" stroke="#10b981" strokeWidth={2} name="SEO tools" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                <div className="chart-container">
                    <h2 className="text-xl font-semibold text-white mb-6">Position Distribution</h2>
                    <div className="space-y-4">
                        {distributionData.map((item, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-400">{item.range}</span>
                                    <span className="text-sm font-medium text-white">{item.count}</span>
                                </div>
                                <div className="h-2 bg-[#1a1a25] rounded-full overflow-hidden">
                                    <div className="h-full" style={{ width: `${(item.count / 100) * 100}%`, background: item.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table-dark">
                        <thead>
                            <tr>
                                <th>Keyword</th>
                                <th className="text-center">Current</th>
                                <th className="text-center">Change</th>
                                <th className="text-right">Volume</th>
                                <th className="text-center">Google</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keywords.map((kw) => (
                                <tr key={kw.id}>
                                    <td><span className="font-medium text-white">{kw.keyword}</span></td>
                                    <td className="text-center">
                                        <span className={`text-lg font-bold ${getPositionColor(kw.currentPos)}`}>#{kw.currentPos}</span>
                                    </td>
                                    <td className="text-center">
                                        <div className={`flex items-center justify-center gap-1 ${getChangeColor(kw.change)}`}>
                                            {getChangeIcon(kw.change)}
                                            <span>{Math.abs(kw.change)}</span>
                                        </div>
                                    </td>
                                    <td className="text-right text-slate-300">{kw.volume.toLocaleString()}</td>
                                    <td className="text-center font-bold text-white">#{kw.engines.google}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
