import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Newspaper, Sparkles, RefreshCw, Copy, Download, Edit3, Check,
    Building2, Calendar, Globe, Target, Mail, FileText, Send, Zap,
    ChevronDown, ChevronRight
} from 'lucide-react'

const pressReleaseTemplates = [
    { id: 'product', label: 'Product Launch', desc: 'New product or feature announcement' },
    { id: 'funding', label: 'Funding Round', desc: 'Investment or funding news' },
    { id: 'partnership', label: 'Partnership', desc: 'Strategic partnership announcement' },
    { id: 'milestone', label: 'Milestone', desc: 'Company achievement or milestone' },
    { id: 'event', label: 'Event', desc: 'Conference, webinar, or event' },
    { id: 'award', label: 'Award', desc: 'Recognition or award announcement' }
]

const mediaOutlets = [
    { name: 'TechCrunch', domain: 'techcrunch.com', type: 'Tech', match: 95 },
    { name: 'VentureBeat', domain: 'venturebeat.com', type: 'Tech', match: 92 },
    { name: 'Forbes', domain: 'forbes.com', type: 'Business', match: 88 },
    { name: 'Entrepreneur', domain: 'entrepreneur.com', type: 'Business', match: 85 },
    { name: 'Product Hunt', domain: 'producthunt.com', type: 'Startup', match: 90 },
    { name: 'Hacker News', domain: 'news.ycombinator.com', type: 'Tech', match: 78 }
]

const samplePressRelease = `FOR IMMEDIATE RELEASE

**OmniRank Launches Revolutionary AI-Powered SEO Platform to Democratize Search Rankings**

*New all-in-one solution combines the power of Semrush, Ahrefs, and Screaming Frog into a single, affordable platform*

**SAN FRANCISCO, CA – January 14, 2024** – OmniRank, a pioneering startup in the SEO technology space, today announced the launch of its groundbreaking AI-powered SEO platform designed to help businesses of all sizes achieve top search engine rankings.

The platform combines market intelligence, technical auditing, and viral growth features into a single unified dashboard, making enterprise-level SEO accessible to everyone from solo entrepreneurs to large agencies.

**Key Features Include:**
• Keyword Magic Tool with AI-powered suggestions
• Backlink analysis with lost link recovery
• Visual competitor gap analysis
• Real-time rank tracking across multiple search engines
• Automated site audits with actionable recommendations

"We built OmniRank because we saw a gap in the market for a truly comprehensive yet user-friendly SEO solution," said John Doe, Founder and CEO of OmniRank. "Small businesses shouldn't have to spend thousands of dollars on multiple tools just to compete in search."

The platform is available starting today with a free trial. For more information, visit www.omnirank.com.

**About OmniRank**
OmniRank is an AI-first SEO platform that helps businesses achieve sustainable organic growth. Founded in 2024, the company is backed by leading investors in the marketing technology space.

**Media Contact:**
Jane Smith
press@omnirank.com
(555) 123-4567

###`

export default function PressRelease() {
    const [selectedTemplate, setSelectedTemplate] = useState('product')
    const [companyName, setCompanyName] = useState('')
    const [headline, setHeadline] = useState('')
    const [keyPoints, setKeyPoints] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedRelease, setGeneratedRelease] = useState(null)
    const [activeSection, setActiveSection] = useState('generate')
    const [copied, setCopied] = useState(false)

    const handleGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setGeneratedRelease(samplePressRelease)
        }, 2500)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedRelease)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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
                    <div className="module-icon bg-gradient-to-br from-blue-500 to-indigo-600">
                        <Newspaper className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Press Release AI</h1>
                        <p className="text-slate-400">Generate professional press releases for media coverage</p>
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-2 bg-[#12121a] p-1 rounded-xl w-fit"
            >
                {[
                    { id: 'generate', label: 'Generate', icon: Sparkles },
                    { id: 'distribute', label: 'Distribute', icon: Send },
                    { id: 'history', label: 'History', icon: FileText }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === tab.id
                                ? 'bg-indigo-500 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {activeSection === 'generate' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-xl p-6 space-y-6"
                    >
                        {/* Template Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-3">
                                Press Release Type
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {pressReleaseTemplates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`p-3 rounded-xl text-left transition-all ${selectedTemplate === template.id
                                                ? 'bg-indigo-500/20 border-2 border-indigo-500'
                                                : 'bg-[#1a1a25] border-2 border-transparent hover:border-[#2e2e3a]'
                                            }`}
                                    >
                                        <span className="text-sm font-medium text-white">{template.label}</span>
                                        <p className="text-xs text-slate-500 mt-1">{template.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Company Name
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Your company name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="input-dark pl-12"
                                />
                            </div>
                        </div>

                        {/* Headline */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Main Headline
                            </label>
                            <input
                                type="text"
                                placeholder="What's the big news?"
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                className="input-dark"
                            />
                        </div>

                        {/* Key Points */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Key Points (one per line)
                            </label>
                            <textarea
                                placeholder="• First key point&#10;• Second key point&#10;• Third key point"
                                value={keyPoints}
                                onChange={(e) => setKeyPoints(e.target.value)}
                                className="input-dark min-h-[120px] resize-none"
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-3"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generating Press Release...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Press Release
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Preview / Output */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                            <h3 className="font-semibold text-white">Press Release Preview</h3>
                            {generatedRelease && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white"
                                    >
                                        {copied ? (
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-6 max-h-[600px] overflow-y-auto">
                            {generatedRelease ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="prose prose-invert prose-sm max-w-none"
                                >
                                    <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed">
                                        {generatedRelease}
                                    </pre>
                                </motion.div>
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <p className="text-slate-400">
                                        Fill in the details and click generate to create your press release
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {activeSection === 'distribute' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Media Outlets */}
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-cyan-500/20">
                                    <Globe className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Recommended Media Outlets</h3>
                                    <p className="text-sm text-slate-400">AI-matched based on your content</p>
                                </div>
                            </div>
                            <button className="btn-secondary text-sm py-2 px-4">
                                Find More
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mediaOutlets.map((outlet, index) => (
                                <motion.div
                                    key={outlet.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 bg-[#1a1a25] rounded-xl hover:bg-[#22222f] transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium text-white">{outlet.name}</h4>
                                            <p className="text-xs text-slate-500">{outlet.domain}</p>
                                        </div>
                                        <span className={`badge ${outlet.match >= 90 ? 'badge-success' :
                                                outlet.match >= 80 ? 'badge-info' :
                                                    'badge-warning'
                                            }`}>
                                            {outlet.match}% match
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400">{outlet.type}</span>
                                        <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            Pitch
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Distribution Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: Send, label: 'Send to Wire Services', desc: 'Distribute to major news wires', color: '#6366f1' },
                            { icon: Mail, label: 'Email Journalists', desc: 'Direct outreach to reporters', color: '#22d3ee' },
                            { icon: Calendar, label: 'Schedule Release', desc: 'Set embargo date and time', color: '#10b981' }
                        ].map((action, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="glass-card rounded-xl p-6 text-left hover:border-indigo-500/50 transition-colors group"
                            >
                                <div
                                    className="p-3 rounded-xl w-fit mb-4"
                                    style={{ background: `${action.color}20` }}
                                >
                                    <action.icon className="w-6 h-6" style={{ color: action.color }} />
                                </div>
                                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                                    {action.label}
                                </h3>
                                <p className="text-sm text-slate-400">{action.desc}</p>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeSection === 'history' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl overflow-hidden"
                >
                    <div className="p-4 border-b border-[#2e2e3a]">
                        <h3 className="font-semibold text-white">Recent Press Releases</h3>
                    </div>
                    <div className="p-6 text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-slate-500/20 flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-400 mb-4">No press releases generated yet</p>
                        <button
                            onClick={() => setActiveSection('generate')}
                            className="btn-primary text-sm py-2 px-6"
                        >
                            Create Your First Press Release
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
