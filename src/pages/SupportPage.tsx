import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import {
    Bot,
    MessageSquare,
    Inbox,
    Users,
    Clock,
    Filter,
    TrendingUp,
    Shield,
    Calendar,
    ArrowRight,
    Search,
    Send,
    MoreVertical,
    Phone,
    Smile,
    Paperclip,
    Instagram,
    Globe,
    MousePointerClick,
    QrCode,
    Sparkles,
    CheckSquare,
    Facebook,
    MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QuoteRequestDialog } from "@/components/landing/QuoteRequestDialog";

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-green-50/50 dark:bg-green-950/10 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium text-sm mb-6"
                    >
                        <Bot className="w-4 h-4" />
                        AI-Powered Support
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                    >
                        Turn WhatsApp into your <span className="text-green-500">#1 Support Channel</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        Stay connected with your customers 24/7. Drive customers from different channels to WhatsApp & manage ticket volumes smartly & efficiently with AI that scales effortlessly.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a
                            href="https://calendly.com/systrocode/new-meeting"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-colors inline-flex items-center gap-2"
                        >
                            <Calendar className="w-5 h-5" />
                            Book Demo
                        </a>
                        <QuoteRequestDialog>
                            <button
                                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 font-bold py-4 px-8 rounded-xl transition-colors"
                            >
                                Request a Quote
                            </button>
                        </QuoteRequestDialog>
                    </motion.div>
                </div>
            </section>

            {/* Funnel Section */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Make WhatsApp your go-to support channel
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Drive customers from different channels to WhatsApp & manage ticket volumes smartly & efficiently. Save up to 50% on your support costs.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Desktop SVG Connector Lines (Hidden on Mobile) */}
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                {/* Left to Center Lines */}
                                <path d="M250 80 C 350 80, 450 250, 550 250" fill="none" stroke="#A855F7" strokeWidth="2" strokeOpacity="0.5" />
                                <path d="M250 180 C 350 180, 450 250, 550 250" fill="none" stroke="#A855F7" strokeWidth="2" strokeOpacity="0.5" />
                                <path d="M250 320 C 350 320, 450 250, 550 250" fill="none" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                                <path d="M250 420 C 350 420, 450 250, 550 250" fill="none" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />

                                {/* Center to Right Lines */}
                                <path d="M720 250 C 800 250, 800 120, 900 120" fill="none" stroke="#A855F7" strokeWidth="2" strokeOpacity="0.5" />
                                <path d="M720 250 C 800 250, 800 380, 900 380" fill="none" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />

                                {/* Right to Far Right Lines */}
                                <path d="M1150 120 C 1180 120, 1180 250, 1200 250" fill="none" stroke="#A855F7" strokeWidth="2" strokeOpacity="0.5" />
                                <path d="M1150 380 C 1180 380, 1180 250, 1200 250" fill="none" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                            {/* Column 1: Sources */}
                            <div className="lg:col-span-3 space-y-6">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/20 flex flex-col gap-1 relative group hover:-translate-y-1 transition-transform">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-900 dark:text-white">Social Media</span>
                                        <Instagram className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400">wa.me short links</span>
                                    <div className="hidden lg:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-purple-500 translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/20 flex flex-col gap-1 relative group hover:-translate-y-1 transition-transform">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-900 dark:text-white">Website</span>
                                        <Globe className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400">WhatsApp Chat</span>
                                    <div className="hidden lg:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-purple-500 translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/20 flex flex-col gap-1 relative group hover:-translate-y-1 transition-transform">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-900 dark:text-white">Ads</span>
                                        <MousePointerClick className="w-5 h-5 text-green-500" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400">Click to WhatsApp</span>
                                    <div className="hidden lg:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-blue-500 translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/20 flex flex-col gap-1 relative group hover:-translate-y-1 transition-transform">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-900 dark:text-white">Packaging</span>
                                        <QrCode className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400">WhatsApp QR Codes</span>
                                    <div className="hidden lg:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-blue-500 translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                </div>
                            </div>

                            {/* Column 2: Center (WhatsApp) */}
                            <div className="lg:col-span-3 flex justify-center py-8 lg:py-0">
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-2 border-green-500 relative z-20 w-full max-w-xs text-center">
                                    <p className="font-medium text-slate-600 dark:text-slate-400 mb-2">Customer Queries on</p>
                                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                            <Phone className="w-6 h-6 fill-current" />
                                        </div>
                                        WhatsApp
                                    </div>
                                    {/* Connection Dots */}
                                    <div className="hidden lg:block absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-blue-500 -translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                    <div className="hidden lg:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-green-500 translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                </div>
                            </div>

                            {/* Column 3: Agents */}
                            <div className="lg:col-span-3 space-y-32 py-8 lg:py-0">
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-slate-700 relative text-center">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full border border-purple-100 flex items-center justify-center shadow-sm">
                                        <Sparkles className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mt-4">AI Support Agent</h4>
                                    <span className="text-[10px] uppercase font-bold text-slate-500">Automate Replies & Close Tickets</span>
                                    <div className="hidden lg:block absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-purple-500 -translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                    <div className="hidden lg:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-purple-500 translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-slate-700 relative text-center">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full border border-blue-100 flex items-center justify-center shadow-sm">
                                        <Bot className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mt-4">Custom Chatbots</h4>
                                    <span className="text-[10px] uppercase font-bold text-slate-500">Handle Specific Workflows</span>
                                    <div className="hidden lg:block absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-blue-500 -translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                    <div className="hidden lg:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-blue-500 translate-x-1/2 -translate-y-1/2 border-4 border-slate-50 dark:border-slate-900" />
                                </div>
                            </div>

                            {/* Column 4: Result */}
                            <div className="lg:col-span-3 flex justify-center py-8 lg:py-0">
                                <div className="bg-green-500 text-white p-8 rounded-2xl shadow-xl w-full text-center relative hover:scale-105 transition-transform duration-300">
                                    <h3 className="text-5xl font-extrabold mb-2">80%</h3>
                                    <p className="font-medium opacity-90">of queries replied automatically</p>
                                    <div className="hidden lg:block absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 border-4 border-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative"
                        >
                            <div className="absolute -inset-4 bg-green-100 dark:bg-green-900/20 rounded-3xl -z-10 blur-xl" />
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                        <Bot className="w-10 h-10 text-green-500 bg-green-100 dark:bg-green-900/30 p-2 rounded-lg" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Instant FAQ Resolution</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">AI automatically answers common queries instantly.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm opacity-80">
                                        <Users className="w-10 h-10 text-blue-500 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Smart Routing</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Complex issues routed to the right human agent.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm opacity-60">
                                        <TrendingUp className="w-10 h-10 text-purple-500 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Load Balancing</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Distributes tickets evenly across your team.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2"
                        >
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
                                <Bot className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Balancing AI with <span className="text-green-500">Human Touch</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                AI should enhance speed & efficiency of service organizations, not replace human connection. Avelo AI-support agent is trained to be empathetic, multilingual, and context-aware.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Instantly resolving FAQs and closing tickets",
                                    "Routing complex queries to the right agents",
                                    "Connecting customers to agents on request",
                                    "Distributing queries evenly across agents"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature 2: Unified Dashboard */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                                <Inbox className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                One Dashboard for <span className="text-blue-500">Global Support</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Get a consolidated view of your customer interactions on WhatsApp, Facebook, and Instagram messages effortlessly from one unified inbox.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800">
                                    <Filter className="w-8 h-8 text-slate-400 mb-4" />
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Smart Filters</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Stay organized with powerful conversation filters.</p>
                                </div>
                                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800">
                                    <Users className="w-8 h-8 text-slate-400 mb-4" />
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Team Assignment</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Assign chats to specific teams or members instantly.</p>
                                </div>
                                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800">
                                    <Clock className="w-8 h-8 text-slate-400 mb-4" />
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Auto-Workflows</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Welcome messages & Out-of-Office automations.</p>
                                </div>
                                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800">
                                    <Shield className="w-8 h-8 text-slate-400 mb-4" />
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Zero Missed Chats</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Say goodbye to ignored inquiries and frustrated customers.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/20 rounded-3xl -z-10 blur-xl" />
                            {/* Mockup of Unified Inbox - Simplified representation */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-300 dark:border-slate-800">
                                <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-300 dark:border-slate-700 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="p-6">
                                    <div className="flex mb-0 h-[450px] border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                                        <div className="w-1/3 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-300 dark:border-slate-800 flex flex-col">
                                            <div className="p-3">
                                                <div className="h-10 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg w-full flex items-center px-3 gap-2 text-slate-400">
                                                    <Search className="w-4 h-4" />
                                                    <div className="h-4 bg-transparent rounded text-xs leading-4 flex items-center w-full">Search...</div>
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden space-y-1 px-2 pb-2">
                                                {[
                                                    { name: "Sarah Miller", msg: "I need help connecting...", time: "Now", active: true, color: "bg-purple-100 text-purple-600" },
                                                    { name: "Tech Solutions", msg: "Integration is working now.", time: "2m", active: false, color: "bg-blue-100 text-blue-600" },
                                                    { name: "John Doe", msg: "Pricing for enterprise?", time: "1h", active: false, color: "bg-orange-100 text-orange-600" },
                                                    { name: "Marketing Team", msg: "Campaign results are in 🚀", time: "3h", active: false, color: "bg-pink-100 text-pink-600" },
                                                    { name: "Support Bot", msg: "Ticket #4291 closed", time: "1d", active: false, color: "bg-green-100 text-green-600" },
                                                ].map((chat, i) => (
                                                    <div key={i} className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${chat.active ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                                        <div className={`w-10 h-10 rounded-full ${chat.color} flex items-center justify-center font-bold text-sm shrink-0`}>
                                                            {chat.name.charAt(0)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start mb-0.5">
                                                                <span className="font-bold text-sm text-slate-900 dark:text-white truncate">{chat.name}</span>
                                                                <span className="text-[10px] text-slate-400 whitespace-nowrap">{chat.time}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{chat.msg}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col h-full bg-slate-50/30 dark:bg-slate-900/50">
                                            {/* Chat Header Mockup */}
                                            <div className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                                        S
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-none mb-1">Sarah Miller</h4>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                            <span className="text-[10px] text-slate-500 font-medium">Online</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 text-slate-400">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                                        <Phone className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Messages */}
                                            <div className="flex-1 p-6 space-y-6 overflow-hidden flex flex-col">
                                                <div className="flex justify-end">
                                                    <div className="bg-whatsapp hover:bg-green-600 transition-colors text-white p-4 rounded-xl rounded-tr-none max-w-[80%] text-sm shadow-md">
                                                        Hi! Thanks for contacting support. How can I help you today?
                                                    </div>
                                                </div>
                                                <div className="flex justify-start">
                                                    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-xl rounded-tl-none max-w-[80%] text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                                                        I need help connecting my Shopify store. I keep getting an API error.
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <div className="bg-whatsapp hover:bg-green-600 transition-colors text-white p-4 rounded-xl rounded-tr-none max-w-[80%] text-sm shadow-md">
                                                        Sure! It's usually a permissions issue. Go to <b>Integrations → Shopify</b> and click "Reconnect".
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Input Area Mockup */}
                                            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-300 dark:border-slate-800 flex gap-3 items-center">
                                                <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-slate-600">
                                                    <Smile className="w-5 h-5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-slate-600">
                                                    <Paperclip className="w-5 h-5" />
                                                </Button>
                                                <div className="h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex-1 px-4 text-sm text-slate-600 flex items-center focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                                                    Type a message...
                                                </div>
                                                <div className="h-11 w-11 bg-whatsapp hover:bg-green-600 rounded-full shrink-0 flex items-center justify-center cursor-pointer transition-all shadow-md active:scale-95 text-white">
                                                    <Send className="w-5 h-5 ml-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Unified Dashboard Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                            One dashboard to manage WhatsApp, Facebook & Instagram conversations
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <CheckSquare className="w-6 h-6 text-slate-900 dark:text-white fill-slate-100 dark:fill-slate-800" />
                                </div>
                                <div>
                                    <p className="text-lg text-slate-700 dark:text-slate-300">
                                        Get a consolidated view of your customer interactions on WhatsApp, Facebook and Instagram messages effortlessly from one unified inbox.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <CheckSquare className="w-6 h-6 text-slate-900 dark:text-white fill-slate-100 dark:fill-slate-800" />
                                </div>
                                <div>
                                    <p className="text-lg text-slate-700 dark:text-slate-300">
                                        Stay organized with conversation filters. Assign chats to specific teams or members. Say goodbye to ignored inquiries and frustrated customers!
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <CheckSquare className="w-6 h-6 text-slate-900 dark:text-white fill-slate-100 dark:fill-slate-800" />
                                </div>
                                <div>
                                    <p className="text-lg text-slate-700 dark:text-slate-300">
                                        Improve response time with Welcome messages & Out-of-Office workflows
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual - Mockup */}
                        <div className="relative">
                            {/* Base Dashboard */}
                            <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-xl p-2 shadow-2xl relative z-10">
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[300px] flex flex-col gap-4">
                                    {/* Tabs */}
                                    <div className="flex gap-2 mb-2 bg-white dark:bg-slate-900 p-2 rounded-lg border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] inline-flex self-start">
                                        <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">All</span>
                                        <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 text-green-600">
                                            <MessageCircle className="w-3 h-3 fill-current" /> WhatsApp
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 text-pink-600">
                                            <Instagram className="w-3 h-3" /> Instagram
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 text-blue-600">
                                            <Facebook className="w-3 h-3 fill-current" /> Messenger
                                        </div>
                                    </div>

                                    <div className="flex gap-4 flex-1">
                                        {/* Sidebar Card */}
                                        <div className="w-1/3 space-y-4">
                                            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                                                <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Assign</div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-slate-500">Agent</span>
                                                    <span className="text-xs font-bold">Amit V</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">Team</span>
                                                    <span className="text-xs font-bold">Delivery</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chat Area */}
                                        <div className="flex-1 space-y-4">
                                            <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg rounded-tl-none w-3/4 self-start">
                                                <p className="text-[10px] text-green-800 dark:text-green-300 leading-tight">
                                                    Hi! My package was supposed to arrive today but I haven't received it yet.
                                                </p>
                                            </div>
                                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-lg rounded-tr-none w-3/4 ml-auto">
                                                <p className="text-[10px] text-purple-800 dark:text-purple-300 leading-tight">
                                                    Let me check that for you right away. Do you have the order ID?
                                                </p>
                                            </div>
                                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg rounded-tl-none w-3/4 self-start">
                                                <p className="text-[10px] text-blue-800 dark:text-blue-300 leading-tight">
                                                    Yes, it's #ORD-38291. Thanks!
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Input Bar */}
                                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center justify-between mt-auto">
                                        <div className="flex gap-2">
                                            <Smile className="w-4 h-4 text-slate-400" />
                                            <Paperclip className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div className="w-8 h-4 bg-green-500 rounded text-[8px] text-white flex items-center justify-center font-bold">Send</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating "Settings" Card */}
                            <div className="absolute -bottom-12 -right-12 bg-white dark:bg-slate-900 p-4 rounded-xl border-2 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] z-20 w-64 hidden lg:block">
                                <h4 className="font-bold text-sm mb-3 border-b pb-2">Working hours setting</h4>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold">Holiday Mode</span>
                                    <div className="w-8 h-4 bg-slate-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full shadow border absolute left-0" /></div>
                                </div>
                                <div className="space-y-2 mt-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Monday</span>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300" /><span className="text-[10px] text-slate-400">Closed</span></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Tuesday</span>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300" /><span className="text-[10px] text-slate-400">Closed</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
