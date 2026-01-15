import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts'
import {
    Link2, Search, Filter, Download, ExternalLink, Shield, AlertTriangle,
    CheckCircle, Plus, Trash2, ArrowRight, RefreshCw, Mail
} from 'lucide-react'

const backlinkData = [
    { name: 'Mar', total: 12500, lost: 120, new: 450 },
    { name: 'Apr', total: 12830, lost: 85, new: 415 },
    { name: 'May', total: 13200, lost: 140, new: 510 },
    { name: 'Jun', total: 13800, lost: 95, new: 695 },
    { name: 'Jul', total: 14500, lost: 110, new: 810 },
    { name: 'Aug', total: 15200, lost: 75, new: 775 }
]

const linkTypes = [
    { name: 'Text', value: 65, color: '#6366f1' },
    { name: 'Image', value: 20, color: '#22d3ee' },
    { name: 'Redirect', value: 10, color: '#10b981' },
    { name: 'Frame', value: 5, color: '#f59e0b' }
]

const backlinks = [
    { id: 1, source: 'techcrunch.com/article-ai', dr: 92, status: 'active', anchor: 'AI tools', type: 'dofollow', date: '2 days ago' },
    { id: 2, source: 'medium.com/seo-tips', dr: 88, status: 'active', anchor: 'best seo software', type: 'nofollow', date: '5 days ago' },
    { id: 3, source: 'searchenginejournal.com', dr: 85, status: 'lost', anchor: 'rank tracking', type: 'dofollow', date: '1 week ago' },
    { id: 4, source: 'marketingland.com/trends', dr: 79, status: 'active', anchor: 'viral loops', type: 'dofollow', date: '1 week ago' },
    { id: 5, source: 'hubspot.com/blog', dr: 93, status: 'active', anchor: 'content strategy', type: 'dofollow', date: '2 weeks ago' }
]

const lostLinks = [
    { id: 1, domain: 'searchenginejournal.com', dr: 85, contact: 'editor@sej.com', subject: 'Broken link replacement' },
    { id: 2, domain: 'moz.com/blog', dr: 89, contact: 'content@moz.com', subject: 'Link reclamation' }
]

export default function BacklinkMiner() {
    const [url, setUrl] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [hasAnalyzed, setHasAnalyzed] = useState(false)

    const handleAnalyze = () => {
        if (!url.trim()) return
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setHasAnalyzed(true)
        }, 2000)
    }

    const getStatusColor = (status) => {
        return status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
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
                    <div className="module-icon bg-gradient-to-br from-cyan-500 to-blue-600">
                        <Link2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">Backlink Miner</h1>
                        <p className="text-xs md:text-sm text-slate-400">Analyze and recover backlinks</p>
                    </div>
                </div>
                <button className="btn-secondary text-sm py-2 px-3 md:px-4 flex items-center gap-2 self-start sm:self-auto">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export Report</span>
                </button>
            </motion.div>

            {/* Input Section */}
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
                            placeholder="Enter URL to analyze (e.g. apple.com)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="input-dark pl-12 text-base h-12 md:h-14"
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="btn-primary px-6 md:px-8 h-12 md:h-14 flex items-center justify-center gap-2 shrink-0"
                    >
                        {isAnalyzing ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Link2 className="w-5 h-5" />
                                <span>Analyze Links</span>
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Results Dashboard */}
            <AnimatePresence>
                {hasAnalyzed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4 md:space-y-6"
                    >
                        {/* Stats Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {[
                                { label: 'Total Backlinks', value: '15.2K', change: '+5.7%', color: '#6366f1' },
                                { label: 'Referring Domains', value: '842', change: '+12%', color: '#22d3ee' },
                                { label: 'Domain Rating', value: '76', change: '+2', color: '#10b981' },
                                { label: 'Toxic Score', value: 'Low', change: '-2%', color: '#f59e0b' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="stat-card"
                                >
                                    <p className="text-xl md:text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-xs md:text-sm text-slate-400">{stat.label}</p>
                                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                            {stat.change}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                            {/* Backlink Growth Chart */}
                            <div className="lg:col-span-2 chart-container">
                                <div className="mb-4 md:mb-6">
                                    <h3 className="text-lg font-semibold text-white">Backlink Growth</h3>
                                    <p className="text-xs text-slate-400">New vs Lost links over time</p>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={backlinkData}>
                                            <defs>
                                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3a" />
                                            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{
                                                    background: '#12121a',
                                                    border: '1px solid #2e2e3a',
                                                    borderRadius: '8px',
                                                    fontSize: '12px'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="total"
                                                stroke="#6366f1"
                                                strokeWidth={2}
                                                fillOpacity={1}
                                                fill="url(#colorTotal)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Link Types */}
                            <div className="chart-container">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-white">Link Attributes</h3>
                                    <p className="text-xs text-slate-400">Follow vs Nofollow distribution</p>
                                </div>
                                <div className="flex flex-col items-center justify-center h-full pb-6">
                                    <div className="w-36 h-36 md:w-44 md:h-44 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={linkTypes}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={70}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {linkTypes.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-xl md:text-2xl font-bold text-white">15.2K</span>
                                            <span className="text-xs text-slate-400">Total</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-xs md:text-sm">
                                        {linkTypes.map((type) => (
                                            <div key={type.name} className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full" style={{ background: type.color }} />
                                                <span className="text-slate-300">{type.name}</span>
                                                <span className="text-slate-500">{type.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Backlinks List */}
                        <div className="glass-card rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                                <h3 className="font-semibold text-white">Recent Backlinks</h3>
                                <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                    <Filter className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-[#2e2e3a]">
                                {backlinks.map((link) => (
                                    <div key={link.id} className="p-4 space-y-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <img
                                                        src={`https://www.google.com/s2/favicons?domain=${link.source.split('/')[0]}`}
                                                        alt=""
                                                        className="w-4 h-4 rounded-sm"
                                                    />
                                                    <p className="font-medium text-white text-sm truncate">{link.source}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${getStatusColor(link.status)}`}>
                                                        {link.status}
                                                    </span>
                                                    <span className="text-xs text-slate-400">DR {link.dr}</span>
                                                </div>
                                            </div>
                                            <button className="p-2 rounded-lg hover:bg-[#1a1a25] text-slate-400">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="bg-[#1a1a25] p-2 rounded-lg">
                                                <span className="text-slate-500 block mb-0.5">Anchor</span>
                                                <span className="text-white truncate block">{link.anchor}</span>
                                            </div>
                                            <div className="bg-[#1a1a25] p-2 rounded-lg">
                                                <span className="text-slate-500 block mb-0.5">Type</span>
                                                <span className="text-white capitalize">{link.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="table-dark">
                                    <thead>
                                        <tr>
                                            <th className="w-8"></th>
                                            <th>Source Page</th>
                                            <th>DR</th>
                                            <th>Status</th>
                                            <th>Anchor Text</th>
                                            <th>Type</th>
                                            <th>First Seen</th>
                                            <th className="w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {backlinks.map((link) => (
                                            <tr key={link.id} className="group">
                                                <td className="text-center">
                                                    <CheckCircle className="w-4 h-4 text-slate-600" />
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={`https://www.google.com/s2/favicons?domain=${link.source.split('/')[0]}`}
                                                            alt=""
                                                            className="w-4 h-4 rounded-sm opacity-70"
                                                        />
                                                        <span className="text-sm font-medium text-white truncate max-w-[200px]">{link.source}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-primary">DR {link.dr}</span>
                                                </td>
                                                <td>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getStatusColor(link.status)}`}>
                                                        {link.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-sm text-slate-300 truncate max-w-[150px] block">{link.anchor}</span>
                                                </td>
                                                <td>
                                                    <span className="text-xs text-slate-500 uppercase">{link.type}</span>
                                                </td>
                                                <td>
                                                    <span className="text-xs text-slate-500">{link.date}</span>
                                                </td>
                                                <td>
                                                    <button className="p-1.5 rounded-lg hover:bg-[#1a1a25] text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Lost Backlink Recovery Panel */}
                        <div className="glass-card rounded-xl p-4 md:p-6 border-l-4 border-red-500">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                        Lost Backlink Recovery
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-1">
                                        We found 2 high-value lost backlinks. Contact these sites to reclaim them.
                                    </p>
                                </div>
                                <button className="btn-primary text-sm whitespace-nowrap self-start md:self-auto">
                                    Start Recovery Campaign
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {lostLinks.map((site) => (
                                    <div key={site.id} className="bg-[#1a1a25] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                                                <Link2 className="w-5 h-5 text-red-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{site.domain}</p>
                                                <p className="text-xs text-slate-400">DR {site.dr} • Contact: {site.contact}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
                                            <button className="flex-1 md:flex-none btn-secondary text-xs md:text-sm py-2 px-3">
                                                <Trash2 className="w-4 h-4" />
                                                <span className="md:hidden">Ignore</span>
                                            </button>
                                            <button className="flex-1 md:flex-none btn-primary text-xs md:text-sm py-2 px-3 flex items-center justify-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                Email Template
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!hasAnalyzed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center py-12 md:py-20 px-4"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Link2 className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                        Analyze Any Website's Backlinks
                    </h2>
                    <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto mb-8">
                        Enter a domain to see its backlink profile, find lost link opportunities, and spy on competitors' link building strategies.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                        {[
                            { icon: Shield, title: 'Toxic Link Check', desc: 'Identify harmful links' },
                            { icon: Target, title: 'Competitor Intel', desc: 'Steal their best links' },
                            { icon: RefreshCw, title: 'Lost Link Recovery', desc: 'Reclaim broken links' }
                        ].map((feature, i) => (
                            <div key={i} className="bg-[#1a1a25] p-4 rounded-xl border border-[#2e2e3a]">
                                <feature.icon className="w-6 h-6 text-indigo-400 mb-3" />
                                <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                                <p className="text-xs text-slate-400 mt-1">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
