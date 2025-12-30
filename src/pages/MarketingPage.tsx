import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ArrowRight, TrendingUp, DollarSign, Users, Zap, ShoppingCart, Heart, MessageSquare, Calendar } from "lucide-react";

export default function MarketingPage() {
    const stats = [
        { value: "98%", label: "Open Rate" },
        { value: "45%", label: "Click Rate" },
        { value: "3X", label: "Higher ROI" }
    ];

    const benefits = [
        { icon: TrendingUp, label: "Higher Response Rate" },
        { icon: DollarSign, label: "Higher ROI" },
        { icon: Users, label: "Lower Customer Acquisition" }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Turn Conversations into Revenue with{" "}
                                <span className="text-green-500">WhatsApp Marketing</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                Capture leads, automate engagement, and drive loyalty. WA Business makes WhatsApp Marketing work smarter for your business.
                            </p>
                            <div className="flex flex-wrap gap-4">

                                <a
                                    href="https://calendly.com/systrocode/new-meeting"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors inline-flex items-center gap-2 group"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Book Demo
                                </a>
                                <Link to="/auth" className="border-2 border-slate-300 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 text-slate-900 dark:text-white font-bold py-4 px-8 rounded-lg transition-colors">
                                    Request a Quote
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative h-96 rounded-2xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                                alt="Marketing Dashboard"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <p className="text-white text-sm font-medium p-6">
                                    Growth-focused marketing teams trust WA Business
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4"
                    >
                        Turn touchpoints from every channel into meaningful WhatsApp conversations
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-5xl font-bold text-green-500 mb-2">{stat.value}</div>
                                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
                            WhatsApp outperforms Email, SMS and other digital channels with…
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-lg"
                                    >
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="font-semibold text-slate-900 dark:text-white">{benefit.label}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Acquisition Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-sm font-bold">
                                ACQUISITION
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                Build your audience and drive engagement
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Cut acquisition costs by eliminating form drop-offs and capture verified phone numbers instead of unreliable form data.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            Drive higher engagement than email & SMS
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Reach thousands instantly with ready-to-use message templates across different languages.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MessageSquare className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            Click-to-WhatsApp Ads
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Convert ad clicks into WhatsApp conversations with pre-filled messages and instant engagement.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-96 rounded-2xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                                alt="Audience Building"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Conversion Section */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-96 rounded-2xl overflow-hidden lg:order-1"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                                alt="E-commerce Conversion"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 lg:order-2"
                        >
                            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm font-bold">
                                CONVERSION
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                Complete your checkout within WhatsApp
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Drive more sales by letting customers discover, select and buy products without ever leaving their WhatsApp conversation.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <ShoppingCart className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            Remove checkout friction or drop-offs
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Process payments directly within WhatsApp conversations, eliminating the need to switch between apps.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Zap className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            WhatsApp Catalog & Product Showcase
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Display your entire product catalog natively within WhatsApp for seamless browsing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Retention Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-block px-4 py-2 bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 rounded-full text-sm font-bold">
                                RETENTION
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                Turn one-time buyers into loyal advocates
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Create exceptional post-purchase experiences that reduce churn and increase lifetime value.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Heart className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            Set up automations to drive repeat sales
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Send personalized repurchase reminders for frequently purchased products, increasing repeat sales without manual effort.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            Build customer loyalty programs
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Reward repeat customers with exclusive offers and personalized experiences via WhatsApp.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-96 rounded-2xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
                                alt="Customer Retention"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Funnel Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Turn touchpoints from every channel into meaningful WhatsApp conversations
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Build your first-party audience. Engage both ready-to-buy prospects and on-the-fence browsers through real conversations, not just form fills.
                        </p>
                    </motion.div>

                    {/* Funnel Visualization */}
                    <div className="relative max-w-5xl mx-auto mb-20">
                        {/* Top Row - Channel Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            {/* Social Media */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-green-400 rounded-t-2xl p-3 text-center">
                                    <div className="text-sm font-bold text-slate-900">SOCIAL MEDIA</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/20 rounded-b-2xl p-6 min-h-[160px] flex flex-col items-center justify-center gap-3">
                                    <div className="flex gap-2 flex-wrap justify-center">
                                        <span className="text-2xl">📘</span>
                                        <span className="text-2xl">📷</span>
                                        <span className="text-2xl">🐦</span>
                                        <span className="text-2xl">💼</span>
                                    </div>
                                </div>
                                {/* Dashed line to center */}
                                <div className="hidden md:block absolute top-full left-1/2 w-0.5 h-16 border-l-2 border-dashed border-slate-400"></div>
                            </motion.div>

                            {/* Offline Collaterals */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative"
                            >
                                <div className="bg-green-400 rounded-t-2xl p-3 text-center">
                                    <div className="text-sm font-bold text-slate-900">OFFLINE COLLATERALS</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/20 rounded-b-2xl p-6 min-h-[160px] flex items-center justify-center">
                                    <div className="text-6xl">📱</div>
                                </div>
                                <div className="hidden md:block absolute top-full left-1/2 w-0.5 h-16 border-l-2 border-dashed border-slate-400"></div>
                            </motion.div>

                            {/* Ads */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="bg-green-400 rounded-t-2xl p-3 text-center">
                                    <div className="text-sm font-bold text-slate-900">ADS ON GOOGLE, FB, INSTAGRAM</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/20 rounded-b-2xl p-6 min-h-[160px] flex items-center justify-center">
                                    <div className="text-6xl">📢</div>
                                </div>
                                <div className="hidden md:block absolute top-full left-1/2 w-0.5 h-16 border-l-2 border-dashed border-slate-400"></div>
                            </motion.div>

                            {/* Web Experiences */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="relative"
                            >
                                <div className="bg-green-400 rounded-t-2xl p-3 text-center">
                                    <div className="text-sm font-bold text-slate-900">WEB EXPERIENCES</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/20 rounded-b-2xl p-6 min-h-[160px] flex items-center justify-center">
                                    <div className="text-6xl">💬</div>
                                </div>
                                <div className="hidden md:block absolute top-full left-1/2 w-0.5 h-16 border-l-2 border-dashed border-slate-400"></div>
                            </motion.div>
                        </div>

                        {/* Center - WA Business Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center mb-12"
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg flex items-center gap-3">
                                <img
                                    src="/logos/whatsapp-business.svg"
                                    alt="WhatsApp Business"
                                    className="w-12 h-12"
                                />
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">WA Business</span>
                            </div>
                        </motion.div>

                        {/* Bottom - Benefits */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Automatic lead capture</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Capture verified contacts automatically</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Two-way real-time engagement</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Instant conversations with prospects</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Reduced acquisition costs</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Lower CAC with higher conversion rates</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Use Cases Row */}
                    <div className="grid md:grid-cols-3 gap-8 mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Product Launches
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Build hype and drive instant sales with targeted broadcast campaigns to your subscriber base.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                                <span>98% Open Rate</span>
                                <span>•</span>
                                <span>45% CTR</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-5xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Flash Sales & Offers
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Create urgency with time-sensitive promotions delivered instantly to thousands of customers.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                                <span>3X Revenue</span>
                                <span>•</span>
                                <span>Instant Delivery</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-5xl mb-4">🔄</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Customer Re-engagement
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Win back inactive customers with personalized messages and exclusive comeback offers.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                                <span>40% Reactivation</span>
                                <span>•</span>
                                <span>2X LTV</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-5xl mb-4">🛒</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Cart Abandonment Recovery
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Recover lost sales with automated reminders and personalized incentives via WhatsApp.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                                <span>42% Recovery</span>
                                <span>•</span>
                                <span>$2.4M Saved</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Segment-Based Campaigns
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Target specific customer segments with tailored messages based on behavior and preferences.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                                <span>65% Higher ROI</span>
                                <span>•</span>
                                <span>Personalized</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-5xl mb-4">📅</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Event Promotions
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Drive attendance and engagement for webinars, sales events, and exclusive launches.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                                <span>80% Attendance</span>
                                <span>•</span>
                                <span>Real-time Updates</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        {[
                            { value: "500+", label: "Clients Served" },
                            { value: "10+", label: "Countries Served" },
                            { value: "50M+", label: "Monthly Messages" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-gradient-to-br from-green-400 to-green-500 rounded-3xl p-8 text-white"
                            >
                                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-green-50 uppercase text-sm tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 dark:text-slate-400 text-center mb-16"
                    >
                        Go further than just WhatsApp broadcasts with WA Business designed for Marketers
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "📊",
                                title: "Comprehensive Analytics Dashboard",
                                description: "Track opens, clicks, conversions and ROI with detailed metrics and insights"
                            },
                            {
                                icon: "📱",
                                title: "Mobile-First Management",
                                description: "Access your campaigns and conversations from any device, anywhere"
                            },
                            {
                                icon: "✅",
                                title: "Industry-Leading Delivery",
                                description: "99.9% message delivery rate ensures your campaigns reach every customer"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center space-y-4"
                            >
                                <div className="text-6xl">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}


            <LandingFooter />
        </div>
    );
}
