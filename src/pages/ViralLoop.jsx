import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles, RefreshCw, Copy, Share2, Twitter, Linkedin, Instagram,
    MessageSquare, ThumbsUp, TrendingUp, Zap, ChevronRight, Check,
    Target, Users, BarChart3, Heart, MessageCircle, Repeat2
} from 'lucide-react'

const postTypes = [
    { id: 'controversy', label: 'Controversy', icon: '🔥', desc: 'Polarizing takes that spark debate' },
    { id: 'poll', label: 'Poll/Question', icon: '📊', desc: 'Interactive engagement boosters' },
    { id: 'challenge', label: 'Challenge', icon: '🎯', desc: 'Viral challenge content' },
    { id: 'listicle', label: 'Listicle', icon: '📝', desc: 'Numbered list posts' },
    { id: 'story', label: 'Story', icon: '📖', desc: 'Personal narrative hooks' },
    { id: 'tips', label: 'Quick Tips', icon: '💡', desc: 'Actionable advice threads' }
]

const platforms = [
    { id: 'twitter', label: 'Twitter/X', icon: Twitter, color: '#1DA1F2' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'threads', label: 'Threads', icon: MessageSquare, color: '#000000' }
]

const generatedPosts = [
    {
        id: 1,
        platform: 'twitter',
        type: 'controversy',
        content: `Hot take: 90% of "productivity tips" are just procrastination in disguise.

We don't need more tools.
We don't need more systems.
We need to START.

The best productivity hack? Close this app and do ONE thing on your list right now.

Agree or disagree? 👇`,
        metrics: { likes: '12K+', comments: '2.4K+', shares: '890+' },
        engagement: 'Very High'
    },
    {
        id: 2,
        platform: 'linkedin',
        type: 'poll',
        content: `🤔 Quick poll for my network:

What's your biggest challenge with AI tools right now?

🔴 Too many options, analysis paralysis
🟡 Learning curve is too steep
🟢 Integration with existing workflow
🔵 Privacy/security concerns

Drop your answer below! I'll share insights from 500+ responses next week.`,
        metrics: { likes: '3.2K+', comments: '450+', shares: '120+' },
        engagement: 'High'
    },
    {
        id: 3,
        platform: 'instagram',
        type: 'challenge',
        content: `🚀 7-DAY SEO CHALLENGE 🚀

Day 1: Audit your top 5 pages
Day 2: Fix all broken links
Day 3: Optimize meta descriptions
Day 4: Add schema markup
Day 5: Speed up your slowest page
Day 6: Build 3 internal links
Day 7: Create one skyscraper post

Screenshot your progress → Tag us
Best transformation wins $500! 💰

#SEOChallenge #DigitalMarketing`,
        metrics: { likes: '8.5K+', comments: '1.2K+', shares: '2.1K+' },
        engagement: 'Very High'
    }
]

const viralFormulas = [
    { name: 'Hook → Story → CTA', success: 89, description: 'Start with attention grabber, tell your story, end with action' },
    { name: 'Controversial Take', success: 92, description: 'Bold opinion that sparks debate and comments' },
    { name: 'Value Thread', success: 78, description: 'Numbered tips that people save and share' },
    { name: 'Before/After', success: 85, description: 'Transformation content with visual proof' },
    { name: 'Behind the Scenes', success: 75, description: 'Authentic look at your process' }
]

export default function ViralLoop() {
    const [selectedType, setSelectedType] = useState('controversy')
    const [selectedPlatform, setSelectedPlatform] = useState('twitter')
    const [topic, setTopic] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedContent, setGeneratedContent] = useState(null)
    const [copiedId, setCopiedId] = useState(null)

    const handleGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setGeneratedContent(generatedPosts)
        }, 2000)
    }

    const copyToClipboard = (id, content) => {
        navigator.clipboard.writeText(content)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const getEngagementColor = (engagement) => {
        if (engagement === 'Very High') return 'text-emerald-400'
        if (engagement === 'High') return 'text-cyan-400'
        return 'text-amber-400'
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
                    <div className="module-icon bg-gradient-to-br from-pink-500 to-purple-600">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Viral Loop Generator</h1>
                        <p className="text-slate-400">Create high-engagement social media content</p>
                    </div>
                </div>
            </motion.div>

            {/* Generator Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-6"
            >
                {/* Post Type Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-400 mb-3">
                        Select Post Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {postTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`p-4 rounded-xl text-center transition-all ${selectedType === type.id
                                        ? 'bg-indigo-500/20 border-2 border-indigo-500'
                                        : 'bg-[#1a1a25] border-2 border-transparent hover:border-[#2e2e3a]'
                                    }`}
                            >
                                <span className="text-2xl mb-2 block">{type.icon}</span>
                                <span className="text-sm font-medium text-white">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Platform Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-400 mb-3">
                        Target Platform
                    </label>
                    <div className="flex gap-3 flex-wrap">
                        {platforms.map((platform) => (
                            <button
                                key={platform.id}
                                onClick={() => setSelectedPlatform(platform.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${selectedPlatform === platform.id
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-[#1a1a25] text-slate-400 hover:text-white'
                                    }`}
                            >
                                <platform.icon className="w-4 h-4" />
                                <span>{platform.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Topic Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                        Your Topic/Niche
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., AI productivity, SEO marketing, startup growth..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="input-dark w-full"
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
                            Generating Viral Content...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Generate Viral Posts
                        </>
                    )}
                </button>
            </motion.div>

            {/* Generated Content */}
            <AnimatePresence>
                {generatedContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Results Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {generatedContent.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card rounded-xl overflow-hidden"
                                >
                                    {/* Post Header */}
                                    <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {platforms.find(p => p.id === post.platform)?.icon && (
                                                <div
                                                    className="p-1.5 rounded-lg"
                                                    style={{
                                                        background: `${platforms.find(p => p.id === post.platform)?.color}20`
                                                    }}
                                                >
                                                    {(() => {
                                                        const Icon = platforms.find(p => p.id === post.platform)?.icon
                                                        return Icon ? (
                                                            <Icon
                                                                className="w-4 h-4"
                                                                style={{ color: platforms.find(p => p.id === post.platform)?.color }}
                                                            />
                                                        ) : null
                                                    })()}
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-white capitalize">
                                                {post.platform}
                                            </span>
                                        </div>
                                        <span className={`text-sm font-medium ${getEngagementColor(post.engagement)}`}>
                                            {post.engagement} Engagement
                                        </span>
                                    </div>

                                    {/* Post Content */}
                                    <div className="p-4">
                                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                                            {post.content}
                                        </pre>
                                    </div>

                                    {/* Predicted Metrics */}
                                    <div className="p-4 bg-[#0d0d12] border-t border-[#2e2e3a]">
                                        <p className="text-xs text-slate-500 mb-2">Predicted Performance</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-sm">
                                                <Heart className="w-4 h-4 text-pink-400" />
                                                <span className="text-slate-300">{post.metrics.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm">
                                                <MessageCircle className="w-4 h-4 text-cyan-400" />
                                                <span className="text-slate-300">{post.metrics.comments}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm">
                                                <Repeat2 className="w-4 h-4 text-emerald-400" />
                                                <span className="text-slate-300">{post.metrics.shares}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 flex gap-2">
                                        <button
                                            onClick={() => copyToClipboard(post.id, post.content)}
                                            className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-2"
                                        >
                                            {copiedId === post.id ? (
                                                <>
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                        <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Viral Formulas */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card rounded-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-amber-500/20">
                                        <Zap className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Viral Content Formulas</h3>
                                        <p className="text-sm text-slate-400">Proven patterns for maximum engagement</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {viralFormulas.map((formula, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-[#1a1a25] rounded-xl hover:bg-[#22222f] transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-white text-sm">{formula.name}</span>
                                            <span className="text-emerald-400 font-bold text-sm">{formula.success}%</span>
                                        </div>
                                        <div className="h-2 bg-[#12121a] rounded-full overflow-hidden mb-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${formula.success}%` }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500">{formula.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State Tips */}
            {!generatedContent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        { icon: Target, title: 'High Engagement', desc: 'Posts designed to maximize likes, comments, and shares' },
                        { icon: Users, title: 'Audience Growth', desc: 'Content that attracts new followers organically' },
                        { icon: BarChart3, title: 'Data-Driven', desc: 'Formulas based on viral post analysis' }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="glass-card rounded-xl p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}
