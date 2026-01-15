import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Target, Search, Download, Plus, X, ArrowRight,
    TrendingUp, Globe, BarChart3, Check, Filter, Layers
} from 'lucide-react'

// Simple Venn Diagram Component using CSS/SVG
const VennDiagram = ({ you, competitors }) => {
    return (
        <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
            {/* You Circle */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-indigo-500/30 border-2 border-indigo-500 flex items-center justify-center z-10 -translate-x-8 md:-translate-x-12 mix-blend-screen"
            >
                <div className="text-center">
                    <p className="text-xs md:text-sm font-bold text-white">You</p>
                    <p className="text-[10px] md:text-xs text-indigo-200">12.5K KW</p>
                </div>
            </motion.div>

            {/* Competitor 1 Circle */}
            {competitors.length > 0 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-cyan-500/30 border-2 border-cyan-500 flex items-center justify-center z-10 translate-x-8 md:translate-x-12 mix-blend-screen"
                >
                    <div className="text-center">
                        <p className="text-xs md:text-sm font-bold text-white">{competitors[0]}</p>
                        <p className="text-[10px] md:text-xs text-cyan-200">18.2K KW</p>
                    </div>
                </motion.div>
            )}

            {/* Competitor 2 Circle */}
            {competitors.length > 1 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-purple-500/30 border-2 border-purple-500 flex items-center justify-center z-10 translate-y-16 md:translate-y-24 mix-blend-screen"
                >
                    <div className="text-center">
                        <p className="text-xs md:text-sm font-bold text-white">{competitors[1]}</p>
                        <p className="text-[10px] md:text-xs text-purple-200">15.4K KW</p>
                    </div>
                </motion.div>
            )}

            {/* Overlap Labels (Keep simple for demo) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="text-center">
                    <p className="text-lg md:text-xl font-bold text-white drop-shadow-lg">2.4K</p>
                    <p className="text-[10px] text-white/80 drop-shadow-md">Shared</p>
                </div>
            </div>
        </div>
    )
}

const gapKeywords = [
    { id: 1, keyword: 'ai writing tools free', volume: 12500, kd: 45, cpc: 2.10, overlap: 2, opportunity: 85 },
    { id: 2, keyword: 'best essay writer ai', volume: 8200, kd: 52, cpc: 3.50, overlap: 3, opportunity: 78 },
    { id: 3, keyword: 'content automation software', volume: 5400, kd: 65, cpc: 8.20, overlap: 2, opportunity: 92 },
    { id: 4, keyword: 'seo content generator', volume: 15600, kd: 72, cpc: 5.40, overlap: 3, opportunity: 65 },
    { id: 5, keyword: 'blog post outline generator', volume: 3200, kd: 28, cpc: 1.20, overlap: 1, opportunity: 95 }
]

export default function CompetitorGap() {
    const [yourDomain, setYourDomain] = useState('')
    const [competitors, setCompetitors] = useState([])
    const [newCompetitor, setNewCompetitor] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [hasAnalyzed, setHasAnalyzed] = useState(false)

    const addCompetitor = () => {
        if (newCompetitor && competitors.length < 3) {
            setCompetitors([...competitors, newCompetitor])
            setNewCompetitor('')
        }
    }

    const removeCompetitor = (index) => {
        setCompetitors(competitors.filter((_, i) => i !== index))
    }

    const handleAnalyze = () => {
        if (!yourDomain || competitors.length === 0) return
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setHasAnalyzed(true)
        }, 2000)
    }

    const getOpportunityColor = (score) => {
        if (score >= 80) return 'text-emerald-400'
        if (score >= 60) return 'text-amber-400'
        return 'text-slate-400'
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
                    <div className="module-icon bg-gradient-to-br from-indigo-500 to-purple-600">
                        <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">Competitor Gap</h1>
                        <p className="text-xs md:text-sm text-slate-400">Find keywords you are missing</p>
                    </div>
                </div>
            </motion.div>

            {/* Configuration Panel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-4 md:p-6"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Your Domain */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">You (Your Domain)</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="example.com"
                                value={yourDomain}
                                onChange={(e) => setYourDomain(e.target.value)}
                                className="input-dark pl-12"
                            />
                        </div>
                    </div>

                    {/* Competitors */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Competitors (Max 3)
                        </label>
                        <div className="space-y-3">
                            {competitors.map((comp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex-1 relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                            style={{ background: index === 0 ? '#22d3ee' : index === 1 ? '#a855f7' : '#f59e0b' }}
                                        />
                                        <input
                                            type="text"
                                            value={comp}
                                            disabled
                                            className="input-dark pl-8 bg-[#1a1a25]"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeCompetitor(index)}
                                        className="p-3 rounded-xl bg-[#1a1a25] hover:bg-[#2e2e3a] text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}

                            {competitors.length < 3 && (
                                <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Add competitor domain"
                                            value={newCompetitor}
                                            onChange={(e) => setNewCompetitor(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
                                            className="input-dark"
                                        />
                                    </div>
                                    <button
                                        onClick={addCompetitor}
                                        disabled={!newCompetitor}
                                        className="p-3 rounded-xl btn-secondary text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 md:mt-8 pt-6 border-t border-[#2e2e3a]">
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !yourDomain || competitors.length === 0}
                        className="w-full btn-primary h-12 md:h-14 flex items-center justify-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                <span>Analyzing Gap...</span>
                            </>
                        ) : (
                            <>
                                <Target className="w-5 h-5" />
                                <span>Find Keyword Gaps</span>
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Results */}
            <AnimatePresence>
                {hasAnalyzed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4 md:space-y-6"
                    >
                        {/* Visual Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                            {/* Venn Diagram */}
                            <div className="lg:col-span-2 glass-card rounded-xl p-4 md:p-6 overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-white">Keyword Overlap</h3>
                                    <button className="text-slate-400 hover:text-white">
                                        <Download className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>
                                <VennDiagram you={yourDomain} competitors={competitors} />
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-4">
                                <div className="glass-card rounded-xl p-4 md:p-6">
                                    <h3 className="font-semibold text-white mb-2 md:mb-4 text-sm md:text-base">Opportunity Size</h3>
                                    <div className="text-center py-4">
                                        <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">12.4K</p>
                                        <p className="text-sm text-slate-400">Missing Keywords</p>
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center justify-between text-xs md:text-sm">
                                            <span className="text-emerald-400">Easy Wins (KD &lt; 30)</span>
                                            <span className="font-medium text-white">2.1K</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs md:text-sm">
                                            <span className="text-amber-400">Value Gaps (CPC &gt; $5)</span>
                                            <span className="font-medium text-white">845</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card rounded-xl p-4 md:p-6">
                                    <h3 className="font-semibold text-white mb-2 md:mb-4 text-sm md:text-base">Top Competitor</h3>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">
                                            {competitors[0]?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-white truncate">{competitors[0]}</p>
                                            <p className="text-xs text-slate-400">5.2K Unique Keywords</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gap Keywords Table */}
                        <div className="glass-card rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-[#2e2e3a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-indigo-400" />
                                    <h3 className="font-semibold text-white">Gap Keywords</h3>
                                    <span className="bg-[#1a1a25] text-slate-400 px-2 py-0.5 rounded text-xs">
                                        {(gapKeywords.length).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="btn-secondary text-xs md:text-sm py-2 px-3">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filters
                                    </button>
                                    <button className="btn-primary text-xs md:text-sm py-2 px-3">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-[#2e2e3a]">
                                {gapKeywords.map((kw) => (
                                    <div key={kw.id} className="p-4">
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <div>
                                                <p className="font-medium text-white text-sm">{kw.keyword}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded">
                                                        Missing
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-[#1a1a25] px-2 py-1 rounded text-center min-w-[60px]">
                                                <p className={`font-bold text-sm ${getOpportunityColor(kw.opportunity)}`}>{kw.opportunity}</p>
                                                <p className="text-[10px] text-slate-500">Score</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                            <div className="bg-[#1a1a25] p-2 rounded-lg">
                                                <span className="block font-medium text-white">{kw.volume.toLocaleString()}</span>
                                                <span className="text-slate-500 text-[10px]">Vol</span>
                                            </div>
                                            <div className="bg-[#1a1a25] p-2 rounded-lg">
                                                <span className="block font-medium text-white">${kw.cpc.toFixed(2)}</span>
                                                <span className="text-slate-500 text-[10px]">CPC</span>
                                            </div>
                                            <div className="bg-[#1a1a25] p-2 rounded-lg">
                                                <span className="block font-medium text-white">{kw.kd}%</span>
                                                <span className="text-slate-500 text-[10px]">KD</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="table-dark">
                                    <thead>
                                        <tr>
                                            <th className="w-40">Keyword</th>
                                            <th className="text-right">Volume</th>
                                            <th className="text-right">KD%</th>
                                            <th className="text-right">CPC</th>
                                            <th className="text-center">Overlap</th>
                                            <th className="text-center">Opportunity Score</th>
                                            <th className="w-20"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gapKeywords.map((kw) => (
                                            <tr key={kw.id} className="group">
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-white">{kw.keyword}</span>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <span className="text-slate-300">{kw.volume.toLocaleString()}</span>
                                                </td>
                                                <td className="text-right">
                                                    <span className={`${kw.kd > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                        {kw.kd}%
                                                    </span>
                                                </td>
                                                <td className="text-right">
                                                    <span className="text-slate-300">${kw.cpc.toFixed(2)}</span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="flex items-center justify-center -space-x-2">
                                                        {Array.from({ length: kw.overlap }).map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="w-6 h-6 rounded-full border-2 border-[#12121a] flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                                                                style={{ background: i === 0 ? '#22d3ee' : '#a855f7' }}
                                                            >
                                                                {i === 0 ? 'C1' : 'C2'}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="w-full max-w-[100px] mx-auto">
                                                        <div className="flex items-center justify-between text-xs mb-1">
                                                            <span className={`font-bold ${getOpportunityColor(kw.opportunity)}`}>
                                                                {kw.opportunity}
                                                            </span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-[#1a1a25] rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full transition-all duration-500"
                                                                style={{
                                                                    width: `${kw.opportunity}%`,
                                                                    backgroundColor: kw.opportunity >= 80 ? '#34d399' : kw.opportunity >= 60 ? '#fbbf24' : '#94a3b8'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <button className="p-1.5 rounded-lg hover:bg-[#1a1a25] text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
