import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Building2, FileText, Download, Palette, Upload, Eye, Settings,
    Check, Plus, Trash2, Image, Type, BarChart3, Target, Link2,
    Bug, TrendingUp, Mail, Save, RefreshCw
} from 'lucide-react'

const reportSections = [
    { id: 'overview', label: 'Executive Summary', icon: BarChart3, enabled: true },
    { id: 'keywords', label: 'Keyword Rankings', icon: Target, enabled: true },
    { id: 'backlinks', label: 'Backlink Analysis', icon: Link2, enabled: true },
    { id: 'siteAudit', label: 'Technical Audit', icon: Bug, enabled: true },
    { id: 'competitors', label: 'Competitor Analysis', icon: TrendingUp, enabled: false },
    { id: 'recommendations', label: 'Recommendations', icon: FileText, enabled: true }
]

const brandColors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b',
    '#10b981', '#06b6d4', '#3b82f6', '#000000', '#6b7280'
]

const savedTemplates = [
    { id: 1, name: 'Standard SEO Report', clients: 12, lastUsed: '2 days ago' },
    { id: 2, name: 'Enterprise Report', clients: 5, lastUsed: '1 week ago' },
    { id: 3, name: 'Quick Audit', clients: 28, lastUsed: '3 days ago' }
]

const clientsList = [
    { id: 1, name: 'Acme Corporation', domain: 'acmecorp.com', reports: 8, lastReport: 'Jan 10, 2024' },
    { id: 2, name: 'TechStart Inc', domain: 'techstart.io', reports: 12, lastReport: 'Jan 12, 2024' },
    { id: 3, name: 'GlobalRetail', domain: 'globalretail.com', reports: 4, lastReport: 'Jan 8, 2024' },
    { id: 4, name: 'HealthWise', domain: 'healthwise.org', reports: 6, lastReport: 'Jan 14, 2024' }
]

export default function AgencyMode() {
    const [activeTab, setActiveTab] = useState('generate')
    const [brandColor, setBrandColor] = useState('#6366f1')
    const [companyName, setCompanyName] = useState('')
    const [sections, setSections] = useState(reportSections)
    const [isGenerating, setIsGenerating] = useState(false)
    const [logoPreview, setLogoPreview] = useState(null)
    const [showPreview, setShowPreview] = useState(false)

    const toggleSection = (id) => {
        setSections(sections.map(s =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
        ))
    }

    const handleLogoUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setLogoPreview(e.target?.result)
            reader.readAsDataURL(file)
        }
    }

    const handleGenerateReport = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setShowPreview(true)
        }, 2500)
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
                    <div className="module-icon bg-gradient-to-br from-amber-500 to-orange-600">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Agency Mode</h1>
                        <p className="text-slate-400">White-label PDF reports for your clients</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="badge badge-primary">Pro Feature</span>
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
                    { id: 'generate', label: 'Generate Report', icon: FileText },
                    { id: 'templates', label: 'Templates', icon: Settings },
                    { id: 'clients', label: 'Clients', icon: Building2 },
                    { id: 'branding', label: 'Branding', icon: Palette }
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

            {activeTab === 'generate' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Report Configuration */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Client Info */}
                        <div className="glass-card rounded-xl p-6">
                            <h3 className="font-semibold text-white mb-4">Report Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter client name"
                                        className="input-dark"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        Website URL
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com"
                                        className="input-dark"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        Report Period
                                    </label>
                                    <select className="input-dark cursor-pointer">
                                        <option>Last 30 Days</option>
                                        <option>Last 7 Days</option>
                                        <option>Last 90 Days</option>
                                        <option>Custom Range</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        Report Template
                                    </label>
                                    <select className="input-dark cursor-pointer">
                                        <option>Standard SEO Report</option>
                                        <option>Enterprise Report</option>
                                        <option>Quick Audit</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section Selection */}
                        <div className="glass-card rounded-xl p-6">
                            <h3 className="font-semibold text-white mb-4">Report Sections</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => toggleSection(section.id)}
                                        className={`p-4 rounded-xl flex items-center justify-between transition-all ${section.enabled
                                                ? 'bg-indigo-500/20 border-2 border-indigo-500'
                                                : 'bg-[#1a1a25] border-2 border-transparent hover:border-[#2e2e3a]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <section.icon className={`w-5 h-5 ${section.enabled ? 'text-indigo-400' : 'text-slate-500'
                                                }`} />
                                            <span className={section.enabled ? 'text-white' : 'text-slate-400'}>
                                                {section.label}
                                            </span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${section.enabled ? 'bg-indigo-500' : 'bg-[#2e2e3a]'
                                            }`}>
                                            {section.enabled && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Additional Options */}
                        <div className="glass-card rounded-xl p-6">
                            <h3 className="font-semibold text-white mb-4">Additional Options</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Include cover page with branding', checked: true },
                                    { label: 'Add table of contents', checked: true },
                                    { label: 'Include charts and visualizations', checked: true },
                                    { label: 'Add recommendations section', checked: true },
                                    { label: 'Include competitor comparison', checked: false },
                                    { label: 'Password protect PDF', checked: false }
                                ].map((option, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            className="w-4 h-4 rounded bg-[#1a1a25] border-[#2e2e3a] text-indigo-500 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-slate-300">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Preview & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Report Preview */}
                        <div className="glass-card rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-[#2e2e3a]">
                                <h3 className="font-semibold text-white">Preview</h3>
                            </div>
                            <div className="p-6 aspect-[3/4] bg-[#0d0d12] flex items-center justify-center">
                                {showPreview ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full h-full bg-white rounded-lg p-4 text-black"
                                    >
                                        <div
                                            className="h-2 rounded mb-4"
                                            style={{ background: brandColor }}
                                        ></div>
                                        <div className="flex items-center gap-3 mb-6">
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo" className="h-8 w-auto" />
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                            )}
                                            <span className="font-bold text-sm">
                                                {companyName || 'Your Agency'}
                                            </span>
                                        </div>
                                        <div className="text-center mb-4">
                                            <p className="text-lg font-bold">SEO Performance Report</p>
                                            <p className="text-xs text-gray-500">January 2024</p>
                                        </div>
                                        <div className="space-y-2">
                                            {sections.filter(s => s.enabled).slice(0, 4).map((s, i) => (
                                                <div key={i} className="h-3 bg-gray-100 rounded"></div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center">
                                        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                                        <p className="text-sm text-slate-500">
                                            Configure your report and click generate
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handleGenerateReport}
                                disabled={isGenerating}
                                className="w-full btn-primary py-4 flex items-center justify-center gap-3"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                        Generating Report...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-5 h-5" />
                                        Generate PDF Report
                                    </>
                                )}
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="btn-secondary py-3 flex items-center justify-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Preview
                                </button>
                                <button className="btn-secondary py-3 flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {activeTab === 'templates' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">Saved Templates</h2>
                        <button className="btn-primary flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Create Template
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedTemplates.map((template) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card rounded-xl p-6 hover:border-indigo-500/50 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-indigo-500/20">
                                        <FileText className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-red-400">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                                <p className="text-sm text-slate-400 mb-4">
                                    Used for {template.clients} clients • Last used {template.lastUsed}
                                </p>
                                <div className="flex gap-2">
                                    <button className="flex-1 btn-secondary text-sm py-2">
                                        Edit
                                    </button>
                                    <button className="flex-1 btn-primary text-sm py-2">
                                        Use
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'clients' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl overflow-hidden"
                >
                    <div className="p-4 border-b border-[#2e2e3a] flex items-center justify-between">
                        <h2 className="font-semibold text-white">Client List</h2>
                        <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Client
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-dark">
                            <thead>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Domain</th>
                                    <th className="text-center">Reports</th>
                                    <th>Last Report</th>
                                    <th className="w-32"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientsList.map((client) => (
                                    <tr key={client.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                                    {client.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-white">{client.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-slate-400">{client.domain}</span>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-white">{client.reports}</span>
                                        </td>
                                        <td>
                                            <span className="text-slate-400">{client.lastReport}</span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-[#1a1a25] transition-colors text-slate-400 hover:text-white">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {activeTab === 'branding' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {/* Branding Settings */}
                    <div className="glass-card rounded-xl p-6 space-y-6">
                        <h3 className="font-semibold text-white">White-Label Branding</h3>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Company Logo
                            </label>
                            <div className="border-2 border-dashed border-[#2e2e3a] rounded-xl p-6 text-center hover:border-indigo-500/50 transition-colors">
                                {logoPreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={logoPreview}
                                            alt="Logo preview"
                                            className="max-h-16 mx-auto"
                                        />
                                        <button
                                            onClick={() => setLogoPreview(null)}
                                            className="text-sm text-red-400 hover:text-red-300"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                        <p className="text-sm text-slate-400">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            PNG, JPG or SVG (max 2MB)
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Company Name
                            </label>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Your Agency Name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="input-dark pl-12"
                                />
                            </div>
                        </div>

                        {/* Brand Color */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Brand Color
                            </label>
                            <div className="flex items-center gap-3 flex-wrap">
                                {brandColors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setBrandColor(color)}
                                        className={`w-10 h-10 rounded-xl transition-transform hover:scale-110 ${brandColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#12121a]' : ''
                                            }`}
                                        style={{ background: color }}
                                    />
                                ))}
                                <div className="relative">
                                    <input
                                        type="color"
                                        value={brandColor}
                                        onChange={(e) => setBrandColor(e.target.value)}
                                        className="w-10 h-10 rounded-xl cursor-pointer bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Contact Information (for report footer)
                            </label>
                            <textarea
                                placeholder="Your Agency Name&#10;email@youragency.com&#10;+1 (555) 123-4567"
                                className="input-dark min-h-[100px] resize-none"
                            />
                        </div>

                        <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                            <Save className="w-5 h-5" />
                            Save Branding Settings
                        </button>
                    </div>

                    {/* Preview */}
                    <div className="glass-card rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-[#2e2e3a]">
                            <h3 className="font-semibold text-white">Report Preview</h3>
                        </div>
                        <div className="p-6 aspect-[3/4] bg-white rounded-b-xl flex flex-col">
                            {/* Header */}
                            <div
                                className="h-3 rounded-full mb-6"
                                style={{ background: brandColor }}
                            ></div>
                            <div className="flex items-center gap-4 mb-8">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Logo" className="h-10 w-auto" />
                                ) : (
                                    <div
                                        className="w-10 h-10 rounded-lg"
                                        style={{ background: brandColor }}
                                    ></div>
                                )}
                                <div>
                                    <p className="font-bold text-gray-800">
                                        {companyName || 'Your Agency Name'}
                                    </p>
                                    <p className="text-xs text-gray-500">Professional SEO Services</p>
                                </div>
                            </div>

                            {/* Cover */}
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                                <p className="text-2xl font-bold text-gray-800 mb-2">
                                    SEO Performance Report
                                </p>
                                <p className="text-gray-500 mb-1">Client: Acme Corporation</p>
                                <p className="text-sm text-gray-400">January 2024</p>
                            </div>

                            {/* Footer */}
                            <div
                                className="mt-auto pt-4 border-t text-center"
                                style={{ borderColor: brandColor }}
                            >
                                <p className="text-xs text-gray-400">
                                    Prepared by {companyName || 'Your Agency'}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
