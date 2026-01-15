import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Mic, Code, Copy, Check, RefreshCw, Sparkles, FileCode,
    ChevronDown, ChevronRight, Eye, Download, Globe, Zap,
    Volume2, Smartphone, HelpCircle, Star
} from 'lucide-react'

const schemaTypes = [
    { id: 'faq', label: 'FAQ', desc: 'Answer common questions', icon: '❓' },
    { id: 'howto', label: 'How-To', desc: 'Step-by-step guides', icon: '📝' },
    { id: 'product', label: 'Product', desc: 'E-commerce items', icon: '🛍️' },
    { id: 'article', label: 'Article', desc: 'Blog posts & news', icon: '📰' },
    { id: 'localBusiness', label: 'Local Business', desc: 'Local SEO', icon: '📍' },
    { id: 'recipe', label: 'Recipe', desc: 'Cooking content', icon: '🍳' },
    { id: 'event', label: 'Event', desc: 'Webinars & events', icon: '📅' },
    { id: 'review', label: 'Review', desc: 'Product reviews', icon: '⭐' }
]

const voiceSearchStats = [
    { label: 'Voice Searches Monthly', value: '8.4B', trend: '+15%' },
    { label: 'Smart Speaker Users', value: '157M', trend: '+8%' },
    { label: 'Featured Snippets', value: '40%', desc: 'Used for voice answers' }
]

const sampleFAQSchema = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best AI content generator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best AI content generators in 2024 include tools like GPT-4, Claude, and specialized platforms that combine AI with SEO optimization features for maximum effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "How do AI writing tools work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI writing tools use large language models trained on billions of texts to understand context and generate human-like content based on your prompts and requirements."
      }
    }
  ]
}`

const sampleSpeakableSchema = `{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "AI Content Generator Guide",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".article-summary",
      ".key-points",
      ".conclusion"
    ]
  }
}`

const voiceOptimizationChecks = [
    { item: 'Speakable schema markup', status: 'missing', impact: 'High' },
    { item: 'FAQ schema implemented', status: 'pass', impact: 'High' },
    { item: 'Content in Q&A format', status: 'pass', impact: 'Medium' },
    { item: 'Natural language phrases', status: 'warning', impact: 'Medium' },
    { item: 'Featured snippet targeting', status: 'pass', impact: 'High' },
    { item: 'Mobile-optimized pages', status: 'pass', impact: 'Medium' },
    { item: 'Local business schema', status: 'missing', impact: 'Low' },
    { item: 'Fast page load speed', status: 'pass', impact: 'Medium' }
]

export default function VoiceSearch() {
    const [selectedSchema, setSelectedSchema] = useState('faq')
    const [generatedCode, setGeneratedCode] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [activeTab, setActiveTab] = useState('generator')

    // Form fields for FAQ schema
    const [faqItems, setFaqItems] = useState([
        { question: '', answer: '' }
    ])

    const handleGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setGeneratedCode(selectedSchema === 'faq' ? sampleFAQSchema : sampleSpeakableSchema)
        }, 1500)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const addFaqItem = () => {
        setFaqItems([...faqItems, { question: '', answer: '' }])
    }

    const removeFaqItem = (index) => {
        if (faqItems.length > 1) {
            setFaqItems(faqItems.filter((_, i) => i !== index))
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pass':
                return <Check className="w-4 h-4 text-emerald-400" />
            case 'warning':
                return <HelpCircle className="w-4 h-4 text-amber-400" />
            case 'missing':
                return <ChevronRight className="w-4 h-4 text-red-400" />
            default:
                return null
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
                    <div className="module-icon bg-gradient-to-br from-cyan-500 to-blue-600">
                        <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Voice Search Prep</h1>
                        <p className="text-slate-400">Schema markup generator for Siri, Alexa & Google Assistant</p>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {voiceSearchStats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                            {stat.trend && (
                                <span className="text-emerald-400 text-sm font-medium">{stat.trend}</span>
                            )}
                            {stat.desc && (
                                <span className="text-xs text-slate-500">{stat.desc}</span>
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 bg-[#12121a] p-1 rounded-xl w-fit"
            >
                {[
                    { id: 'generator', label: 'Schema Generator', icon: Code },
                    { id: 'audit', label: 'Voice SEO Audit', icon: Volume2 },
                    { id: 'speakable', label: 'Speakable Content', icon: Mic }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-indigo-500 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {activeTab === 'generator' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Schema Type Selection & Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-xl p-6 space-y-6"
                    >
                        {/* Schema Type */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-3">
                                Select Schema Type
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {schemaTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedSchema(type.id)}
                                        className={`p-3 rounded-xl text-center transition-all ${selectedSchema === type.id
                                                ? 'bg-indigo-500/20 border-2 border-indigo-500'
                                                : 'bg-[#1a1a25] border-2 border-transparent hover:border-[#2e2e3a]'
                                            }`}
                                    >
                                        <span className="text-xl mb-1 block">{type.icon}</span>
                                        <span className="text-xs font-medium text-white">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Form */}
                        {selectedSchema === 'faq' && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-medium text-slate-400">
                                        FAQ Items
                                    </label>
                                    <button
                                        onClick={addFaqItem}
                                        className="text-sm text-indigo-400 hover:text-indigo-300"
                                    >
                                        + Add Question
                                    </button>
                                </div>
                                <div className="space-y-4 max-h-80 overflow-y-auto">
                                    {faqItems.map((item, index) => (
                                        <div key={index} className="p-4 bg-[#1a1a25] rounded-xl">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium text-slate-400">
                                                    Question {index + 1}
                                                </span>
                                                {faqItems.length > 1 && (
                                                    <button
                                                        onClick={() => removeFaqItem(index)}
                                                        className="text-xs text-red-400 hover:text-red-300"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter your question..."
                                                value={item.question}
                                                onChange={(e) => {
                                                    const newItems = [...faqItems]
                                                    newItems[index].question = e.target.value
                                                    setFaqItems(newItems)
                                                }}
                                                className="input-dark mb-2"
                                            />
                                            <textarea
                                                placeholder="Enter the answer..."
                                                value={item.answer}
                                                onChange={(e) => {
                                                    const newItems = [...faqItems]
                                                    newItems[index].answer = e.target.value
                                                    setFaqItems(newItems)
                                                }}
                                                className="input-dark min-h-[80px] resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-3"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generating Schema...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Schema Markup
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Code Output */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileCode className="w-5 h-5 text-indigo-400" />
                                <span className="font-medium text-white">Generated Schema</span>
                            </div>
                            {generatedCode && (
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
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className={`p-2 rounded-lg transition-colors ${showPreview ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-[#1a1a25] text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-4 max-h-[500px] overflow-auto">
                            {generatedCode ? (
                                <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                                    <code>{generatedCode}</code>
                                </pre>
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                                        <Code className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <p className="text-slate-400">
                                        Select a schema type and fill in the details to generate markup
                                    </p>
                                </div>
                            )}
                        </div>
                        {generatedCode && (
                            <div className="p-4 border-t border-[#2e2e3a] bg-[#0d0d12]">
                                <p className="text-sm text-slate-400">
                                    💡 <span className="text-white">Pro Tip:</span> Add this JSON-LD to your page's {`<head>`} section
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}

            {activeTab === 'audit' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Voice SEO Checklist */}
                    <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-[#2e2e3a]">
                            <h2 className="font-semibold text-white">Voice Search Optimization Checklist</h2>
                            <p className="text-sm text-slate-400">Items to optimize for voice assistants</p>
                        </div>
                        <div className="divide-y divide-[#2e2e3a]">
                            {voiceOptimizationChecks.map((check, index) => (
                                <div
                                    key={index}
                                    className={`p-4 flex items-center justify-between ${check.status === 'missing' ? 'bg-red-500/5' :
                                            check.status === 'warning' ? 'bg-amber-500/5' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(check.status)}
                                        <span className="text-white">{check.item}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs ${check.impact === 'High' ? 'text-red-400' :
                                                check.impact === 'Medium' ? 'text-amber-400' :
                                                    'text-slate-400'
                                            }`}>
                                            {check.impact} Impact
                                        </span>
                                        {check.status !== 'pass' && (
                                            <button className="text-sm text-indigo-400 hover:text-indigo-300">
                                                Fix
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Voice Assistants */}
                    <div className="space-y-4">
                        {[
                            { name: 'Siri', icon: '🍎', optimized: 6, total: 8 },
                            { name: 'Alexa', icon: '🔵', optimized: 5, total: 8 },
                            { name: 'Google Assistant', icon: '🟢', optimized: 7, total: 8 }
                        ].map((assistant, index) => (
                            <motion.div
                                key={assistant.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="stat-card"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{assistant.icon}</span>
                                        <span className="font-medium text-white">{assistant.name}</span>
                                    </div>
                                    <span className="text-sm text-slate-400">
                                        {assistant.optimized}/{assistant.total}
                                    </span>
                                </div>
                                <div className="h-2 bg-[#1a1a25] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(assistant.optimized / assistant.total) * 100}%` }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'speakable' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-500/20">
                            <Volume2 className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Speakable Content Markup</h3>
                            <p className="text-sm text-slate-400">Define which parts of your content should be read aloud</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Page URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/article"
                                    className="input-dark"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    CSS Selectors for Speakable Content
                                </label>
                                <textarea
                                    placeholder=".article-summary&#10;.key-points&#10;.conclusion"
                                    className="input-dark min-h-[120px] resize-none font-mono text-sm"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Enter CSS selectors for content sections that should be read by voice assistants
                                </p>
                            </div>
                            <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Generate Speakable Schema
                            </button>
                        </div>

                        <div className="p-6 bg-[#1a1a25] rounded-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-amber-400" />
                                <span className="font-medium text-white">Best Practices</span>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Keep speakable content concise (20-30 seconds when read)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Focus on summaries and key takeaways</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Avoid complex sentences and jargon</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Use natural, conversational language</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Must be a complete, coherent statement</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
