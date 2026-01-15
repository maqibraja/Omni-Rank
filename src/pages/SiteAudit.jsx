import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'
import {
    Bug, Search, Play, Pause, RefreshCw, AlertTriangle, CheckCircle,
    XCircle, Clock, FileText, Image, Link2, Zap, Globe, ChevronRight,
    ChevronDown, ExternalLink, Download, Filter, Gauge, AlertCircle,
    FileWarning, ImageOff, LinkIcon
} from 'lucide-react'

const issueCategories = [
    { name: 'Errors', count: 23, icon: XCircle, color: '#ef4444' },
    { name: 'Warnings', count: 57, icon: AlertTriangle, color: '#f59e0b' },
    { name: 'Notices', count: 89, icon: AlertCircle, color: '#22d3ee' },
    { name: 'Passed', count: 342, icon: CheckCircle, color: '#10b981' }
]

const healthScore = [
    { name: 'Score', value: 72, fill: '#10b981' },
    { name: 'Remaining', value: 28, fill: '#1a1a25' }
]

const crawlResults = [
    {
        id: 1,
        url: '/blog/ai-tools-guide',
        type: 'page',
        status: 200,
        issues: [
            { type: 'warning', message: 'Missing H1 tag' },
            { type: 'notice', message: 'Meta description is 165 chars (optimal: 155)' }
        ],
        pageSpeed: 78,
        wordCount: 2450
    },
    {
        id: 2,
        url: '/products',
        type: 'page',
        status: 200,
        issues: [],
        pageSpeed: 92,
        wordCount: 890
    },
    {
        id: 3,
        url: '/about',
        type: 'page',
        status: 200,
        issues: [
            { type: 'warning', message: 'Missing meta description' },
            { type: 'warning', message: 'Images without alt text: 3' }
        ],
        pageSpeed: 85,
        wordCount: 650
    },
    {
        id: 4,
        url: '/blog/old-post',
        type: 'page',
        status: 404,
        issues: [
            { type: 'error', message: '404 Page Not Found' }
        ],
        pageSpeed: 0,
        wordCount: 0
    },
    {
        id: 5,
        url: '/contact',
        type: 'page',
        status: 200,
        issues: [
            { type: 'error', message: 'Duplicate content detected' },
            { type: 'warning', message: 'Page load time > 3s' }
        ],
        pageSpeed: 45,
        wordCount: 320
    },
    {
        id: 6,
        url: '/services/consulting',
        type: 'page',
        status: 301,
        issues: [
            { type: 'notice', message: 'Redirect chain detected (2 hops)' }
        ],
        pageSpeed: 88,
        wordCount: 1200
    },
]

const siteMapNodes = [
    {
        name: 'Homepage',
        url: '/',
        children: [
            {
                name: 'Products',
                url: '/products',
                children: [
                    { name: 'Features', url: '/products/features' },
                    { name: 'Pricing', url: '/products/pricing' }
                ]
            },
            {
                name: 'Blog',
                url: '/blog',
                children: [
                    { name: 'AI Tools Guide', url: '/blog/ai-tools' },
                    { name: 'SEO Tips', url: '/blog/seo-tips' },
                    { name: 'Marketing', url: '/blog/marketing' }
                ]
            },
            {
                name: 'About',
                url: '/about',
                children: [
                    { name: 'Team', url: '/about/team' },
                    { name: 'Careers', url: '/about/careers' }
                ]
            },
            { name: 'Contact', url: '/contact' }
        ]
    }
]

function TreeNode({ node, depth = 0 }) {
    const [isOpen, setIsOpen] = useState(depth < 2)
    const hasChildren = node.children && node.children.length > 0

    return (
        <div className="ml-4">
            <div
                className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#1a1a25] transition-colors cursor-pointer ${depth === 0 ? 'ml-0' : ''
                    }`}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                {hasChildren ? (
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                    </motion.div>
                ) : (
                    <div className="w-4" />
                )}
                <div className={`w-2 h-2 rounded-full ${depth === 0 ? 'bg-indigo-500' :
                        depth === 1 ? 'bg-cyan-500' :
                            'bg-emerald-500'
                    }`} />
                <span className="text-sm text-slate-300">{node.name}</span>
                <span className="text-xs text-slate-500">{node.url}</span>
            </div>
            <AnimatePresence>
                {isOpen && hasChildren && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-l border-[#2e2e3a] ml-6"
                    >
                        {node.children.map((child, index) => (
                            <TreeNode key={index} node={child} depth={depth + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function SiteAudit() {
    const [siteUrl, setSiteUrl] = useState('')
    const [isCrawling, setIsCrawling] = useState(false)
    const [crawlProgress, setCrawlProgress] = useState(0)
    const [hasResults, setHasResults] = useState(false)
    const [selectedTab, setSelectedTab] = useState('all')
    const [expandedRow, setExpandedRow] = useState(null)

    useEffect(() => {
        if (isCrawling) {
            const interval = setInterval(() => {
                setCrawlProgress(prev => {
                    if (prev >= 100) {
                        setIsCrawling(false)
                        setHasResults(true)
                        return 100
                    }
                    return prev + Math.random() * 15
                })
            }, 500)
            return () => clearInterval(interval)
        }
    }, [isCrawling])

    const handleStartCrawl = () => {
        if (!siteUrl) return
        setCrawlProgress(0)
        setIsCrawling(true)
        setHasResults(false)
    }

    const getStatusColor = (status) => {
        if (status === 200) return 'text-emerald-400'
        if (status === 301 || status === 302) return 'text-amber-400'
        return 'text-red-400'
    }

    const getSpeedColor = (speed) => {
        if (speed >= 90) return 'text-emerald-400'
        if (speed >= 50) return 'text-amber-400'
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
                    <div className="module-icon bg-gradient-to-br from-orange-500 to-red-600">
                        <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Site Audit Spider</h1>
                        <p className="text-slate-400">Crawl and analyze your website for SEO issues</p>
                    </div>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Audit Report
                </button>
            </motion.div>

            {/* Search Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-6"
            >
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Enter your website URL (e.g., https://example.com)"
                            value={siteUrl}
                            onChange={(e) => setSiteUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleStartCrawl()}
                            className="input-dark pl-12 text-lg h-14"
                        />
                    </div>
                    <button
                        onClick={handleStartCrawl}
                        disabled={isCrawling}
                        className="btn-primary px-8 flex items-center gap-2 h-14"
                    >
                        {isCrawling ? (
                            <>
                                <Pause className="w-5 h-5" />
                                Crawling...
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5" />
                                Start Crawl
                            </>
                        )}
                    </button>
                </div>

                {/* Crawl Progress */}
                {isCrawling && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">Crawling in progress...</span>
                            <span className="text-sm font-medium text-indigo-400">
                                {Math.min(Math.round(crawlProgress), 100)}%
                            </span>
                        </div>
                        <div className="h-2 bg-[#1a1a25] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                style={{ width: `${Math.min(crawlProgress, 100)}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-3 text-sm text-slate-500">
                            <span>Pages crawled: {Math.round(crawlProgress / 10)}</span>
                            <span>Resources found: {Math.round(crawlProgress / 5)}</span>
                            <span>Issues detected: {Math.round(crawlProgress / 8)}</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <AnimatePresence>
                {hasResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {issueCategories.map((cat, index) => (
                                <motion.div
                                    key={cat.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="stat-card cursor-pointer hover:border-[color:var(--cat-color)] transition-colors"
                                    style={{ '--cat-color': cat.color }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="p-2 rounded-lg"
                                            style={{ background: `${cat.color}20` }}
                                        >
                                            <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">{cat.count}</p>
                                            <p className="text-sm text-slate-400">{cat.name}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Health Score Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="stat-card"
                            >
                                <div className="flex items-center gap-4">
                                    <ResponsiveContainer width={60} height={60}>
                                        <PieChart>
                                            <Pie
                                                data={healthScore}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={20}
                                                outerRadius={28}
                                                dataKey="value"
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                {healthScore.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div>
                                        <p className="text-2xl font-bold text-gradient">72/100</p>
                                        <p className="text-sm text-slate-400">Health Score</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Issues List */}
                            <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
                                {/* Tabs */}
                                <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {['all', 'errors', 'warnings', 'notices'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setSelectedTab(tab)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${selectedTab === tab
                                                        ? 'bg-indigo-500 text-white'
                                                        : 'text-slate-400 hover:text-white hover:bg-[#1a1a25]'
                                                    }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                        <Filter className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Results Table */}
                                <div className="overflow-x-auto">
                                    <table className="table-dark">
                                        <thead>
                                            <tr>
                                                <th className="w-8"></th>
                                                <th>URL</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Speed</th>
                                                <th className="text-center">Issues</th>
                                                <th className="w-12"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {crawlResults.map((result) => (
                                                <>
                                                    <tr
                                                        key={result.id}
                                                        className="cursor-pointer"
                                                        onClick={() => setExpandedRow(expandedRow === result.id ? null : result.id)}
                                                    >
                                                        <td>
                                                            <motion.div
                                                                animate={{ rotate: expandedRow === result.id ? 90 : 0 }}
                                                            >
                                                                <ChevronRight className="w-4 h-4 text-slate-500" />
                                                            </motion.div>
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="w-4 h-4 text-slate-500" />
                                                                <span className="font-medium text-white">{result.url}</span>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <span className={`font-bold ${getStatusColor(result.status)}`}>
                                                                {result.status}
                                                            </span>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Gauge className={`w-4 h-4 ${getSpeedColor(result.pageSpeed)}`} />
                                                                <span className={getSpeedColor(result.pageSpeed)}>
                                                                    {result.pageSpeed}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            {result.issues.length > 0 ? (
                                                                <div className="flex items-center justify-center gap-1">
                                                                    {result.issues.some(i => i.type === 'error') && (
                                                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                                    )}
                                                                    {result.issues.some(i => i.type === 'warning') && (
                                                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                                                    )}
                                                                    {result.issues.some(i => i.type === 'notice') && (
                                                                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                                                    )}
                                                                    <span className="ml-1 text-sm text-slate-400">
                                                                        {result.issues.length}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" />
                                                            )}
                                                        </td>
                                                        <td>
                                                            <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors opacity-0 group-hover:opacity-100">
                                                                <ExternalLink className="w-4 h-4 text-slate-400" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <AnimatePresence>
                                                        {expandedRow === result.id && result.issues.length > 0 && (
                                                            <motion.tr
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                            >
                                                                <td colSpan={6} className="!py-0">
                                                                    <div className="p-4 bg-[#0d0d12]">
                                                                        <div className="space-y-2">
                                                                            {result.issues.map((issue, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    className={`flex items-center gap-3 p-3 rounded-lg ${issue.type === 'error' ? 'bg-red-500/10' :
                                                                                            issue.type === 'warning' ? 'bg-amber-500/10' :
                                                                                                'bg-cyan-500/10'
                                                                                        }`}
                                                                                >
                                                                                    {issue.type === 'error' ? (
                                                                                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                                                                    ) : issue.type === 'warning' ? (
                                                                                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                                                                                    ) : (
                                                                                        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                                                                                    )}
                                                                                    <span className="text-sm text-slate-300">
                                                                                        {issue.message}
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </motion.tr>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Visual Site Map */}
                            <div className="chart-container">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Site Structure</h2>
                                        <p className="text-sm text-slate-400">Internal linking map</p>
                                    </div>
                                    <Link2 className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="max-h-[500px] overflow-y-auto">
                                    {siteMapNodes.map((node, index) => (
                                        <TreeNode key={index} node={node} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Issue Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: LinkIcon, label: 'Broken Links', count: 5, color: '#ef4444', desc: '404 errors found' },
                                { icon: FileWarning, label: 'Missing Meta', count: 12, color: '#f59e0b', desc: 'Pages without descriptions' },
                                { icon: ImageOff, label: 'Missing Alt Text', count: 23, color: '#22d3ee', desc: 'Images without alt' },
                                { icon: Clock, label: 'Slow Pages', count: 8, color: '#a855f7', desc: 'Load time > 3s' }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="glass-card rounded-xl p-4 cursor-pointer hover:border-indigo-500/50 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div
                                            className="p-2 rounded-lg"
                                            style={{ background: `${item.color}20` }}
                                        >
                                            <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                        </div>
                                        <span className="text-2xl font-bold text-white">{item.count}</span>
                                    </div>
                                    <p className="font-medium text-white">{item.label}</p>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {!hasResults && !isCrawling && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center py-20"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                        <Bug className="w-12 h-12 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Crawl Your Website for Issues
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto mb-6">
                        Our spider will analyze every page of your site to find broken links, missing tags, speed issues, and more.
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
                        <div className="flex items-center gap-2 text-slate-400">
                            <LinkIcon className="w-4 h-4 text-red-400" />
                            <span>Broken Links</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <FileText className="w-4 h-4 text-amber-400" />
                            <span>Meta Tags</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Gauge className="w-4 h-4 text-indigo-400" />
                            <span>Page Speed</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Image className="w-4 h-4 text-cyan-400" />
                            <span>Image Alt Text</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
