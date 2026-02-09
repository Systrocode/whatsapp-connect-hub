import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import {
    ShoppingCart,
    ArrowRight,
    Zap,
    MessageSquare,
    DollarSign,
    BarChart3,
    ShoppingBag,
    CheckCircle2,
    Instagram,
    Facebook,
    Globe,
    MousePointerClick,
    Phone,
    Sparkles,
    Bot,
    TrendingUp,
    Store,
    Cloud,
    Briefcase,
    Share2,
    Database
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SalesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-green-100 selection:text-green-900">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium text-sm mb-6">
                                <DollarSign className="w-4 h-4" />
                                Accelerate Your Revenue
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                                Turn WhatsApp into your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Best Sales Channel</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Drive more sales with automated catalog sharing, abandoned cart recovery, and seamless checkout experiences directly on WhatsApp.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-green-500/25 transition-all">
                                    Start Selling Free
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-900">
                                    View Demo
                                </Button>
                            </div>
                            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    No credit card required
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    14-day free trial
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-orange-200 dark:from-green-900/20 dark:to-orange-900/20 rounded-full blur-3xl opacity-50 -z-10" />
                            {/* Hero Visual Mockup */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-2xl relative">
                                <div className="absolute -top-6 -right-6 lg:-right-12 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce-slow">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <ShoppingBag className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">New Order</p>
                                            <p className="font-bold text-slate-900 dark:text-white">$129.00</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                    {/* Chat Header */}
                                    <div className="bg-white dark:bg-slate-900 p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                                            F
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Fashion Store</h3>
                                            <p className="text-xs text-green-500 font-medium">Verified Business</p>
                                        </div>
                                    </div>

                                    {/* Chat Content */}
                                    <div className="p-6 space-y-4">
                                        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-800 max-w-[85%]">
                                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Hey Sarah! 👋 We noticed you left some items in your cart. Still interested?</p>
                                            <div className="flex gap-3 overflow-x-auto pb-2">
                                                <div className="shrink-0 w-24 bg-slate-50 dark:bg-slate-950 rounded-lg p-2 border border-slate-100 dark:border-slate-800">
                                                    <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-md mb-2" />
                                                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded mb-1" />
                                                    <div className="h-2 w-10 bg-green-200 dark:bg-green-900 rounded" />
                                                </div>
                                                <div className="shrink-0 w-24 bg-slate-50 dark:bg-slate-950 rounded-lg p-2 border border-slate-100 dark:border-slate-800">
                                                    <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-md mb-2" />
                                                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded mb-1" />
                                                    <div className="h-2 w-10 bg-green-200 dark:bg-green-900 rounded" />
                                                </div>
                                            </div>
                                            <Button size="sm" className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white">Checkout Now</Button>
                                        </div>

                                        <div className="flex justify-end">
                                            <div className="bg-green-500 text-white p-3 rounded-xl rounded-tr-none shadow-sm max-w-[85%]">
                                                <p className="text-sm">Yes! Can I get a discount code?</p>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-800 max-w-[85%]">
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Sure! Use code <span className="font-mono bg-orange-100 text-orange-700 px-1 rounded">WELCOME10</span> for 10% off your order! 🎉</p>
                                        </div>
                                    </div>

                                    {/* Input Placeholder */}
                                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                        <div className="h-10 bg-slate-100 dark:bg-slate-950 rounded-full w-full" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sales Flow Funnel */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            From Click to Customer
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Streamline the buying journey. Capture leads from ads or socials and guide them to purchase automatically on WhatsApp.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Desktop Connector Lines */}
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                {/* Left to Center */}
                                <path d="M280 100 C 400 100, 500 250, 600 250" fill="none" stroke="#22c55e" strokeWidth="3" strokeOpacity="0.3" strokeDasharray="8 4" />
                                <path d="M280 250 C 400 250, 500 250, 600 250" fill="none" stroke="#22c55e" strokeWidth="3" strokeOpacity="0.3" strokeDasharray="8 4" />
                                <path d="M280 400 C 400 400, 500 250, 600 250" fill="none" stroke="#22c55e" strokeWidth="3" strokeOpacity="0.3" strokeDasharray="8 4" />
                                {/* Center to Right */}
                                <path d="M800 250 C 900 250, 1000 250, 1100 250" fill="none" stroke="#22c55e" strokeWidth="3" strokeOpacity="0.3" strokeDasharray="8 4" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10">
                            {/* Step 1: Traffic Sources */}
                            <div className="space-y-6">
                                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center hover:border-green-400 transition-colors">
                                    <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Instagram className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Instagram Ads</h3>
                                    <p className="text-sm text-slate-500">Click-to-WhatsApp Ads</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center hover:border-blue-400 transition-colors">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Facebook className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Facebook</h3>
                                    <p className="text-sm text-slate-500">Page CTA Buttons</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center hover:border-orange-400 transition-colors">
                                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Website</h3>
                                    <p className="text-sm text-slate-500">Chat Widget</p>
                                </div>
                            </div>

                            {/* Step 2: The Machine */}
                            <div className="flex justify-center">
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-green-500 shadow-2xl relative w-full h-80 flex flex-col items-center justify-center text-center">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Conversion Engine
                                    </div>
                                    <Bot className="w-16 h-16 text-green-500 mb-6" />
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">WhatsApp Sales Bot</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        Qualifies leads, showcases catalogs, answers FAQs, and processes payments automatically 24/7.
                                    </p>
                                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
                                        <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-full border-4 border-green-500 shadow-sm flex items-center justify-center">
                                            <ArrowRight className="w-4 h-4 text-green-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: The Result */}
                            <div>
                                <div className="bg-gradient-to-br from-green-500 to-emerald-700 text-white p-10 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-transform duration-300">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                        <TrendingUp className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-6xl font-extrabold mb-2">3X</h3>
                                    <p className="text-xl font-medium opacity-90 mb-6">Increase in Conversion Rate</p>
                                    <div className="inline-block bg-white/10 px-4 py-2 rounded-lg text-sm">
                                        vs Traditional Website
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Categories */}
            <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Everything you need to sell on WhatsApp
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-7 h-7 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Native Catalog Integration</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Sync your Shopify or WooCommerce catalog instantly. Share product collections directly in chat without users leaving the app.
                            </p>
                            <div className="w-full h-40 bg-slate-100 dark:bg-slate-950/50 rounded-lg p-3 flex gap-3 overflow-hidden shadow-inner">
                                {[
                                    { icon: "👟", name: "Urban Kicks", price: "$89" },
                                    { icon: "🎧", name: "Bass Pro", price: "$129" },
                                    { icon: "⌚", name: "Watch 9", price: "$199" }
                                ].map((product, i) => (
                                    <div key={i} className="min-w-[100px] w-1/3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-2 flex flex-col transition-transform hover:-translate-y-1">
                                        <div className="w-full aspect-square bg-slate-50 dark:bg-slate-800 rounded-md mb-2 flex items-center justify-center text-3xl">
                                            {product.icon}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">{product.name}</div>
                                        <div className="text-[9px] text-slate-500 mb-2">{product.price}</div>
                                        <div className="mt-auto h-5 w-full bg-green-500 hover:bg-green-600 rounded text-[7px] text-white flex items-center justify-center font-bold tracking-wide cursor-pointer transition-colors">ADD TO CART</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShoppingCart className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Abandoned Cart Recovery</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Automatically nudge customers who leave items behind. Send personalized reminders with exclusive discount codes to close the deal.
                            </p>
                            <div className="w-full h-40 bg-slate-100 dark:bg-slate-950/50 rounded-lg p-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                                <div className="w-56 bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden transform rotate-1">
                                    <div className="h-1 bg-orange-500 w-full" />
                                    <div className="p-3">
                                        <div className="flex gap-2 mb-2 items-center">
                                            <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center shrink-0">
                                                <ShoppingCart className="w-4 h-4 text-orange-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-1.5 w-16 bg-slate-300 rounded mb-1" />
                                                <div className="h-1.5 w-8 bg-slate-200 rounded" />
                                            </div>
                                        </div>
                                        <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 text-[9px] p-2 rounded mb-2 leading-tight">
                                            You left items in your cart! 🛒 Grab them now with 5% OFF.
                                        </div>
                                        <div className="w-full h-5 bg-orange-500 text-white text-[8px] font-bold rounded flex items-center justify-center uppercase tracking-wider">
                                            Checkout Now
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Promotional Broadcasts</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Send bulk campaigns for Black Friday, New Arrivals, or Seasonal Sales. Achieve 98% open rates compared to 20% on email.
                            </p>
                            <div className="w-full h-40 bg-slate-100 dark:bg-slate-950/50 rounded-lg p-4 flex flex-col gap-3 overflow-hidden relative shadow-inner">
                                <div className="bg-white dark:bg-slate-900 p-3 rounded-tr-xl rounded-tl-xl rounded-bl-xl border border-purple-100 dark:border-purple-900/30 shadow-sm max-w-[90%] self-end">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[8px] font-bold text-slate-400 uppercase">Broadcast</span>
                                        <span className="text-[8px] text-slate-300">10:00 AM</span>
                                    </div>
                                    <div className="text-[10px] text-slate-800 dark:text-slate-200 font-bold mb-0.5">⚡ Flash Sale Alert!</div>
                                    <div className="text-[9px] text-slate-500 leading-tight">Get 50% off on all items. Valid for 24h only!</div>
                                </div>
                                <div className="bg-purple-600 p-2 rounded-tr-xl rounded-tl-xl rounded-bl-xl shadow-md max-w-[90%] self-end text-white flex items-center gap-2">
                                    <Zap size={10} className="fill-current" />
                                    <span className="text-[9px] font-bold">Claim Offer Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Automated Funnel Section */}
            <section className="py-24 px-4 bg-blue-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Speed up your entire sales funnel with seamless automation
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Respond instantly. Cut First Response Time by 3x.
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Drowning in leads? Reps stretched thin? Avelo AI bot engages prospects instantly, answers FAQs 24/7, and captures leads even when your team is offline.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Automatically qualify leads on WhatsApp.
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Focus only on high-quality prospects. Set up lead qualification chatbots based on your business needs. Filter out junk leads fast.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Distribute leads your way—automatically or manually
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Auto-distribute evenly between sales reps or match repeat customers with their preferred reps.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Automated 1:1 follow up reminders for reps
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Empower reps to stay organized & set up automated reminders for timely & personalized 1:1 follow up with every lead.
                                </p>
                            </div>
                        </div>

                        {/* Right Visual - Funnel Stack */}
                        <div className="relative flex flex-col items-center justify-center py-10">
                            {/* Stacked Trapezoids using Clip Path or Borders? Using simpler divs with skew/perspective or clip-path */}
                            {/* Funnel Step 1 */}
                            <div className="w-[80%] h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center text-center p-4 shadow-lg mb-4 relative z-40 transform hover:scale-105 transition-transform" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}>
                                <span className="font-bold text-sm text-white">Identify qualified leads with outreach</span>
                            </div>

                            {/* Funnel Step 2 */}
                            <div className="w-[70%] h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-center p-4 shadow-lg mb-4 relative z-30 transform hover:scale-105 transition-transform" style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}>
                                <span className="font-bold text-sm text-white">Qualify leads automatically</span>
                            </div>

                            {/* Funnel Step 3 */}
                            <div className="w-[60%] h-20 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center text-center p-4 shadow-lg mb-4 relative z-20 transform hover:scale-105 transition-transform" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}>
                                <span className="font-bold text-sm text-white">Smart Lead Distribution</span>
                            </div>

                            {/* Funnel Step 4 */}
                            <div className="w-[50%] h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center text-center p-4 shadow-lg mb-4 relative z-10 transform hover:scale-105 transition-transform" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}>
                                <span className="font-bold text-sm text-white">Automated lead follow up alerts</span>
                            </div>

                            {/* Funnel Step 5 */}
                            <div className="w-[40%] h-20 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center text-center p-4 shadow-lg relative z-0 transform hover:scale-105 transition-transform" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}>
                                <span className="font-bold text-sm text-white">Drive ROI post-purchase</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visibility Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Complete Visibility from Click to Close
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Track every interaction and optimize your sales pipeline with precision.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#FFF5FF] dark:bg-purple-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#f8fafc] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Centralized Conversation Oversight</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Keep a pulse on every chat. Oversee your team's interactions and sync important context directly to your CRM, ensuring quality control without micromanagement.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Coming soon
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#FFF5FF] dark:bg-purple-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#f8fafc] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Sales Rep Performance Analytics</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Identify your top performers. Analyze key metrics like response times and resolution rates. Coming soon: Advanced ROI attribution to see who drives the most revenue.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Coming soon
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#FFF5FF] dark:bg-purple-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#f8fafc] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Pipeline Health Monitoring</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Visualize your deal flow in real-time. Spot bottlenecks in your funnel and understand exactly where prospects are dropping off to improve conversion rates.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Coming soon
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium text-xs uppercase tracking-wider mb-4">
                            Seamless Connections
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Connects with your favorite tools
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Sync contacts, orders, and conversations automatically. No coding required.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: "Shopify", color: "#95BF47", logo: "/logos/shopify-logo.svg" },
                            { name: "WooCommerce", color: "#96588a", logo: "/logos/woocommerce.svg" },
                            { name: "HubSpot", color: "#FF7A59", logo: "/logos/hubspot.svg" },
                            { name: "Salesforce", color: "#00A1E0", logo: "/logos/salesforce.svg" },
                            { name: "Zoho", color: "#D20000", logo: "/logos/zoho.svg" },
                            { name: "Zapier", color: "#FF4F00", logo: "/logos/zapier.svg" },
                        ].map((tool, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-default group">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform p-3"
                                    style={{ backgroundColor: `${tool.color}15` }}
                                >
                                    <img
                                        src={tool.logo}
                                        alt={`${tool.name} logo`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial / Social Proof */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <MessageSquare className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-center mb-8">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Sparkles key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                            "Since switching to Avelo for our sales outreach, our abandoned cart recovery rate has jumped by 45%. It's a game changer for our Q4 strategy."
                        </blockquote>
                        <div>
                            <div className="font-bold text-lg">Alex Johnson</div>
                            <div className="text-slate-400">Head of Digital Growth, StyleUp Inc.</div>
                        </div>
                    </div>
                </div>
            </section>



            <LandingFooter />
        </div>
    );
}
