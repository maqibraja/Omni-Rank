import { useContext } from 'react'
import { motion } from 'framer-motion'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, RadialBarChart, RadialBar, LineChart,
    Line, PieChart, Pie, Cell
} from 'recharts'
import {
    TrendingUp, TrendingDown, Globe, Link2, AlertTriangle,
    Search, Zap, FileText, BarChart3, ArrowRight, Flame,
    Users, Eye, Target
} from 'lucide-react'
import AuthContext from '../context/AuthContext'

const trafficData = [
    { name: 'Mar', organic: 4000, paid: 2400, direct: 1800 },
    { name: 'Apr', organic: 4500, paid: 2100, direct: 2000 },
    { name: 'May', organic: 5200, paid: 2800, direct: 2200 },
    { name: 'Jun', organic: 6100, paid: 2300, direct: 2400 },
    { name: 'Jul', organic: 7200, paid: 2900, direct: 2600 },
    { name: 'Aug', organic: 8500, paid: 3100, direct: 2800 }
]

const seoScoreData = [
    { name: 'Score', value: 78, fill: '#10b981' }
]

const keywordData = [
    { name: 'Week 1', position: 15 },
    { name: 'Week 2', position: 12 },
    { name: 'Week 3', position: 8 },
    { name: 'Week 4', position: 5 },
    { name: 'Week 5', position: 4 },
    { name: 'Week 6', position: 3 }
]

const trafficSources = [
    { name: 'Organic', value: 58, color: '#6366f1' },
    { name: 'Direct', value: 22, color: '#22d3ee' },
    { name: 'Referral', value: 12, color: '#10b981' },
    { name: 'Social', value: 8, color: '#f59e0b' }
]

const topKeywords = [
    { keyword: 'AI content generator', position: 3, change: 2, volume: 33100 },
    { keyword: 'SEO automation tools', position: 5, change: 0, volume: 12400 },
    { keyword: 'Content writing software', position: 8, change: 4, volume: 8200 }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

function StatCard({ icon: Icon, label, value, change, changeType, color }) {
    return (
        <motion.div variants={itemVariants} className="stat-card card-hover">
            <div className="flex items-center justify-between">
                <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15` }}
                >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs md:text-sm ${changeType === 'up' ? 'text-emerald-400' :
                    changeType === 'down' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                    {changeType === 'up' && <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />}
                    {changeType === 'down' && <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />}
                    <span className="font-medium">{change}</span>
                </div>
            </div>
            <div className="mt-3 md:mt-4">
                <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">{label}</p>
            </div>
        </motion.div>
    )
}

export default function Dashboard() {
    const { user } = useContext(AuthContext)
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 md:space-y-6"
        >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 flex-wrap">
                        Welcome back, {user?.name || 'Member'}! <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base mt-1">
                        Here's your SEO performance today.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs md:text-sm font-medium border border-emerald-500/20 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        All systems operational
                    </span>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <StatCard
                    icon={TrendingUp}
                    label="Organic Traffic"
                    value="12.5K"
                    change="+12.5%"
                    changeType="up"
                    color="#10b981"
                />
                <StatCard
                    icon={Target}
                    label="Tracked Keywords"
                    value="2,847"
                    change="+8.2%"
                    changeType="up"
                    color="#6366f1"
                />
                <StatCard
                    icon={Link2}
                    label="Total Backlinks"
                    value="15.2K"
                    change="+5.7%"
                    changeType="up"
                    color="#22d3ee"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Site Issues"
                    value="23"
                    change="-15%"
                    changeType="down"
                    color="#f59e0b"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Traffic Overview */}
                <motion.div variants={itemVariants} className="lg:col-span-2 chart-container">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-white">Traffic Overview</h2>
                            <p className="text-xs md:text-sm text-slate-400">Compare traffic sources</p>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                                <span className="text-slate-400">Organic</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                                <span className="text-slate-400">Paid</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                                <span className="text-slate-400">Direct</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-56 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
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
                                    dataKey="organic"
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorOrganic)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="paid"
                                    stroke="#22d3ee"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPaid)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="direct"
                                    stroke="#a855f7"
                                    strokeWidth={2}
                                    fillOpacity={0}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* SEO Score */}
                <motion.div variants={itemVariants} className="chart-container flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-lg md:text-xl font-semibold text-white">SEO Health Score</h2>
                        <p className="text-xs md:text-sm text-slate-400">Overall site performance</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative w-36 h-36 md:w-44 md:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="70%"
                                    outerRadius="100%"
                                    barSize={12}
                                    data={seoScoreData}
                                    startAngle={180}
                                    endAngle={-180}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        background={{ fill: '#1a1a25' }}
                                        clockWise
                                        dataKey="value"
                                        cornerRadius={10}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl md:text-4xl font-bold text-gradient">78</span>
                                <span className="text-slate-400 text-xs md:text-sm">/100</span>
                            </div>
                        </div>
                        <p className="text-emerald-400 font-medium mt-3 text-sm md:text-base">Good Performance</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#2e2e3a]">
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-bold text-white">142</p>
                            <p className="text-xs text-slate-400">Passed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-bold text-amber-400">23</p>
                            <p className="text-xs text-slate-400">Issues</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Traffic Sources */}
                <motion.div variants={itemVariants} className="chart-container">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-white">Traffic Sources</h2>
                        <p className="text-xs text-slate-400">Distribution by channel</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 md:gap-6">
                        <div className="w-28 h-28 md:w-32 md:h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={trafficSources}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={50}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {trafficSources.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            {trafficSources.map((source) => (
                                <div key={source.name} className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: source.color }}></span>
                                    <span className="text-xs md:text-sm text-slate-400">{source.name}</span>
                                    <span className="text-xs md:text-sm font-medium text-white ml-auto">{source.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Top Keywords */}
                <motion.div variants={itemVariants} className="chart-container md:col-span-1 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Top Keywords</h2>
                            <p className="text-xs text-slate-400">Best performing keywords</p>
                        </div>
                        <button className="text-indigo-400 hover:text-indigo-300 text-xs md:text-sm font-medium flex items-center gap-1">
                            View All <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {topKeywords.map((kw, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-xl bg-[#1a1a25] hover:bg-[#22222f] transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-lg md:text-xl font-bold text-gradient shrink-0">#{kw.position}</span>
                                    <span className="text-sm text-white truncate">{kw.keyword}</span>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4 shrink-0">
                                    <span className="text-xs md:text-sm text-slate-400 hidden sm:block">
                                        {kw.volume.toLocaleString()}
                                    </span>
                                    {kw.change > 0 && (
                                        <span className="flex items-center gap-1 text-emerald-400 text-xs md:text-sm">
                                            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />+{kw.change}
                                        </span>
                                    )}
                                    {kw.change === 0 && (
                                        <span className="text-slate-400 text-xs md:text-sm">—</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { icon: Search, label: 'Keyword Research', color: '#6366f1', path: '/keyword-magic' },
                        { icon: Link2, label: 'Find Backlinks', color: '#22d3ee', path: '/backlink-miner' },
                        { icon: BarChart3, label: 'Check Rankings', color: '#10b981', path: '/rank-tracker' },
                        { icon: FileText, label: 'Site Audit', color: '#f59e0b', path: '/site-audit' }
                    ].map((action, index) => (
                        <motion.a
                            key={index}
                            href={action.path}
                            className="glass-card p-4 rounded-xl hover:border-indigo-500/50 transition-all group cursor-pointer"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div
                                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3"
                                style={{ background: `${action.color}15` }}
                            >
                                <action.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: action.color }} />
                            </div>
                            <p className="font-medium text-white text-sm md:text-base group-hover:text-indigo-400 transition-colors">
                                {action.label}
                            </p>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Trending Alert */}
            <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-4 md:p-6 border-l-4 border-amber-500"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                            <Flame className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white text-sm md:text-base">Trending: "AI Productivity Tools"</h3>
                            <p className="text-xs md:text-sm text-slate-400 mt-1">
                                This topic is surging +340% in your niche. Create content now to capture traffic!
                            </p>
                        </div>
                    </div>
                    <button className="btn-primary text-sm whitespace-nowrap self-start sm:self-center">
                        <Zap className="w-4 h-4" />
                        Explore Trend
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
