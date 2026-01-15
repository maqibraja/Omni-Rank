import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    RadialBarChart, RadialBar, ResponsiveContainer
} from 'recharts'
import {
    Bot, Sparkles, CheckCircle, XCircle, AlertTriangle, Lightbulb,
    ExternalLink, Copy, RefreshCw, Target, MessageSquare, Globe,
    Zap, ArrowRight, BookOpen, Code, Search
} from 'lucide-react'

const aeoScoreData = [
    { name: 'AEO Score', value: 68, fill: '#6366f1' }
]

const optimizationChecks = [
    {
        category: 'Content Structure',
        items: [
            { check: 'Clear, direct answers to questions', status: 'pass', tip: null },
            { check: 'FAQ schema markup implemented', status: 'pass', tip: null },
            { check: 'Content organized in Q&A format', status: 'warning', tip: 'Add more FAQ sections' },
            { check: 'Concise paragraphs (2-3 sentences)', status: 'pass', tip: null }
        ]
    },
    {
        category: 'Authority Signals',
        items: [
            { check: 'E-E-A-T signals present', status: 'pass', tip: null },
            { check: 'Author credentials displayed', status: 'fail', tip: 'Add author bio with credentials' },
            { check: 'Citations and sources included', status: 'warning', tip: 'Add more external citations' },
            { check: 'Updated date visible', status: 'pass', tip: null }
        ]
    },
    {
        category: 'Technical Optimization',
        items: [
            { check: 'Structured data implemented', status: 'pass', tip: null },
            { check: 'Fast page load speed', status: 'pass', tip: null },
            { check: 'Mobile-friendly design', status: 'pass', tip: null },
            { check: 'HTTPS enabled', status: 'pass', tip: null }
        ]
    },
    {
        category: 'AI-Specific Factors',
        items: [
            { check: 'Content easily extractable', status: 'pass', tip: null },
            { check: 'No paywalls blocking content', status: 'pass', tip: null },
            { check: 'Natural language used', status: 'warning', tip: 'Simplify complex sentences' },
            { check: 'Factual, verifiable information', status: 'pass', tip: null }
        ]
    }
]

const aiPlatforms = [
    { name: 'ChatGPT', logo: '🤖', score: 72, trend: '+5', citations: 23 },
    { name: 'Perplexity', logo: '🔮', score: 68, trend: '+12', citations: 45 },
    { name: 'Claude', logo: '🧠', score: 65, trend: '+8', citations: 18 },
    { name: 'Gemini', logo: '✨', score: 58, trend: '+3', citations: 12 }
]

const contentSuggestions = [
    {
        title: 'Add FAQ Section',
        priority: 'High',
        impact: 'Major',
        description: 'Create a comprehensive FAQ section with direct answers to common questions about your topic.',
        example: 'Q: What is the best AI content generator?\nA: The best AI content generators in 2024 include...'
    },
    {
        title: 'Include Author Credentials',
        priority: 'High',
        impact: 'Moderate',
        description: 'Add author bio boxes with credentials, experience, and expertise signals.',
        example: 'Written by [Name], [Title] with 10+ years of experience in...'
    },
    {
        title: 'Add More Citations',
        priority: 'Medium',
        impact: 'Moderate',
        description: 'Reference authoritative sources to increase trustworthiness.',
        example: 'According to a study by [Source], 78% of businesses...'
    }
]

export default function AIOptimization() {
    const [selectedPage, setSelectedPage] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [hasResults, setHasResults] = useState(false)
    const [expandedCategory, setExpandedCategory] = useState('Content Structure')

    const handleAnalyze = () => {
        if (!selectedPage) return
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setHasResults(true)
        }, 2000)
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pass':
                return <CheckCircle className="w-5 h-5 text-emerald-400" />
            case 'fail':
                return <XCircle className="w-5 h-5 text-red-400" />
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-amber-400" />
            default:
                return null
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'badge-danger'
            case 'Medium':
                return 'badge-warning'
            default:
                return 'badge-info'
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
                    <div className="module-icon bg-gradient-to-br from-violet-500 to-purple-600">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">AI Search Optimization (AEO)</h1>
                        <p className="text-slate-400">Get cited by ChatGPT, Perplexity, and other AI platforms</p>
                    </div>
                </div>
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
                            placeholder="Enter a page URL to analyze for AI optimization"
                            value={selectedPage}
                            onChange={(e) => setSelectedPage(e.target.value)}
                            className="input-dark pl-12 text-lg h-14"
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="btn-primary px-8 flex items-center gap-2 h-14"
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Bot className="w-5 h-5" />
                                Analyze for AEO
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            {hasResults && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Score Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* AEO Score */}
                        <div className="chart-container flex flex-col items-center justify-center">
                            <ResponsiveContainer width="100%" height={180}>
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%"
                                    outerRadius="100%"
                                    barSize={15}
                                    data={aeoScoreData}
                                    startAngle={180}
                                    endAngle={0}
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
                            <div className="text-center -mt-16">
                                <span className="text-4xl font-bold text-gradient">68</span>
                                <span className="text-lg text-slate-400">/100</span>
                                <p className="text-sm text-slate-400 mt-1">AEO Score</p>
                            </div>
                        </div>

                        {/* AI Platform Scores */}
                        {aiPlatforms.slice(0, 3).map((platform, index) => (
                            <motion.div
                                key={platform.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="stat-card"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{platform.logo}</span>
                                        <span className="font-medium text-white">{platform.name}</span>
                                    </div>
                                    <span className="text-sm text-emerald-400">{platform.trend}</span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-white">{platform.score}</p>
                                        <p className="text-xs text-slate-400">Visibility Score</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-cyan-400">{platform.citations}</p>
                                        <p className="text-xs text-slate-400">Citations</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Optimization Checklist */}
                        <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-[#2e2e3a]">
                                <h2 className="font-semibold text-white">AEO Optimization Checklist</h2>
                                <p className="text-sm text-slate-400">Items to improve AI visibility</p>
                            </div>
                            <div className="divide-y divide-[#2e2e3a]">
                                {optimizationChecks.map((category) => (
                                    <div key={category.category}>
                                        <button
                                            onClick={() => setExpandedCategory(
                                                expandedCategory === category.category ? null : category.category
                                            )}
                                            className="w-full p-4 flex items-center justify-between hover:bg-[#1a1a25] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-white">{category.category}</span>
                                                <span className="text-sm text-slate-500">
                                                    {category.items.filter(i => i.status === 'pass').length}/{category.items.length} passed
                                                </span>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: expandedCategory === category.category ? 90 : 0 }}
                                            >
                                                <ArrowRight className="w-4 h-4 text-slate-500" />
                                            </motion.div>
                                        </button>
                                        {expandedCategory === category.category && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="bg-[#0d0d12] p-4 space-y-3"
                                            >
                                                {category.items.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`flex items-start gap-3 p-3 rounded-lg ${item.status === 'fail' ? 'bg-red-500/10' :
                                                                item.status === 'warning' ? 'bg-amber-500/10' :
                                                                    'bg-emerald-500/5'
                                                            }`}
                                                    >
                                                        {getStatusIcon(item.status)}
                                                        <div className="flex-1">
                                                            <p className="text-sm text-white">{item.check}</p>
                                                            {item.tip && (
                                                                <p className="text-xs text-slate-400 mt-1">
                                                                    💡 {item.tip}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="space-y-6">
                            {/* AI Tips Card */}
                            <div className="chart-container">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-amber-500/20">
                                        <Lightbulb className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h3 className="font-semibold text-white">Quick Tips</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        'Use natural, conversational language',
                                        'Answer questions directly and concisely',
                                        'Include relevant statistics and data',
                                        'Add structured data markup',
                                        'Keep content updated regularly'
                                    ].map((tip, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <span className="text-sm text-slate-300">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Resources */}
                            <div className="chart-container">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-indigo-500/20">
                                        <BookOpen className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="font-semibold text-white">Resources</h3>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { label: 'AEO Guide', icon: FileText },
                                        { label: 'Schema Generator', icon: Code },
                                        { label: 'Content Analyzer', icon: Search }
                                    ].map((resource, index) => (
                                        <button
                                            key={index}
                                            className="w-full flex items-center justify-between p-3 rounded-lg bg-[#1a1a25] hover:bg-[#22222f] transition-colors group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <resource.icon className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm text-slate-300">{resource.label}</span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Suggestions */}
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/20">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Recommended Improvements</h3>
                                    <p className="text-sm text-slate-400">Actions to increase AI citations</p>
                                </div>
                            </div>
                            <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Auto-Fix All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {contentSuggestions.map((suggestion, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="p-4 bg-[#1a1a25] rounded-xl"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`badge ${getPriorityColor(suggestion.priority)}`}>
                                            {suggestion.priority}
                                        </span>
                                        <span className="text-xs text-slate-500">Impact: {suggestion.impact}</span>
                                    </div>
                                    <h4 className="font-medium text-white mb-2">{suggestion.title}</h4>
                                    <p className="text-sm text-slate-400 mb-3">{suggestion.description}</p>
                                    <div className="p-3 bg-[#12121a] rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">Example:</p>
                                        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
                                            {suggestion.example}
                                        </pre>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Empty State */}
            {!hasResults && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center py-20"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                        <Bot className="w-12 h-12 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Optimize for AI Search Engines
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto mb-6">
                        Enter a page URL to analyze how well it's optimized for being cited by AI platforms like ChatGPT and Perplexity.
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
                        {aiPlatforms.map((platform) => (
                            <div key={platform.name} className="flex items-center gap-2 text-slate-400">
                                <span className="text-lg">{platform.logo}</span>
                                <span>{platform.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
