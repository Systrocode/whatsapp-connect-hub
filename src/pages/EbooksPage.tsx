import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Download, ArrowRight, TrendingUp, MessageSquare, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EbooksPage = () => {
    const topics = [
        {
            icon: "https://img.icons8.com/color/48/combo-chart--v1.png",
            color: "text-green-600",
            bg: "bg-green-50 dark:bg-green-900/20",
            title: "WhatsApp Marketing Playbook",
            description: "A complete guide to running high-conversion broadcast campaigns on WhatsApp. Learn segmentation, message templates, timing strategies, and how to achieve the industry-benchmark 96% open rate.",
            pages: "48 pages",
            level: "All levels",
            link: "/solutions/marketing"
        },
        {
            icon: "https://img.icons8.com/color/48/chat.png",
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            title: "AI Chatbot Setup Blueprint",
            description: "Step-by-step instructions for building and deploying AI chatbots that resolve 60–80% of customer queries without human intervention. Covers flows, fallbacks, and handoff rules.",
            pages: "36 pages",
            level: "Intermediate",
            link: "/product/flow-builder"
        },
        {
            icon: "https://img.icons8.com/color/48/people-working-together.png",
            color: "text-purple-600",
            bg: "bg-purple-50 dark:bg-purple-900/20",
            title: "Customer Support at Scale",
            description: "How leading e-commerce and SaaS brands use WhatsApp Team Inbox to cut response times by 40% and improve CSAT scores. Real case studies included with frameworks you can apply immediately.",
            pages: "52 pages",
            level: "Advanced",
            link: "/solutions/support"
        },
        {
            icon: "https://img.icons8.com/color/48/launched-rocket.png",
            color: "text-orange-600",
            bg: "bg-orange-50 dark:bg-orange-900/20",
            title: "WhatsApp for E-Commerce",
            description: "Learn how to recover abandoned carts, send order updates, run flash sales via broadcasts, and integrate directly with Shopify. Includes ROI simulation templates for your specific business size.",
            pages: "44 pages",
            level: "All levels",
            link: "/solutions/ecommerce"
        },
    ];

    const relatedLinks = [
        { label: "Read Customer Success Stories", to: "/customers/stories" },
        { label: "View Real Customer Reviews", to: "/customers/reviews" },
        { label: "See Detailed Case Studies", to: "/customers/case-studies" },
        { label: "Watch Live Webinars", to: "/webinars" },
        { label: "Browse Developer Docs", to: "/docs" },
        { label: "Try Our Free Tools", to: "/tools/whatsapp-link-generator" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                            Knowledge Center
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Ebooks &amp; <span className="text-green-600">Guides</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-4 max-w-2xl mx-auto">
                            Free, expert-written guides to help you master WhatsApp marketing, automate customer support, and grow your business faster. No fluff — just battle-tested strategies from teams running million-message campaigns on Avelo.
                        </p>
                        <p className="text-base text-slate-500 dark:text-slate-500 max-w-xl mx-auto mb-10">
                            Trusted by over 10,000 businesses across e-commerce, education, healthcare, retail, and SaaS. Download any guide for free.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-lg mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search for guides..."
                                className="pl-12 h-14 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-full shadow-sm text-lg"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Guides Grid */}
            <main className="flex-1 py-20 px-6 bg-white dark:bg-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Most Popular Guides
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                            Begin with these four essential guides covering the core pillars of WhatsApp business growth — marketing, automation, support, and e-commerce.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {topics.map((topic, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-green-400 hover:shadow-xl transition-all group"
                            >
                                <div className={`w-14 h-14 ${topic.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                    <img src={topic.icon} alt={topic.title} className="w-7 h-7 object-contain" />
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{topic.pages}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{topic.level}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors">
                                    {topic.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                    {topic.description}
                                </p>
                                <div className="flex items-center gap-4">
                                    <Button size="sm" className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 gap-2">
                                        <Download className="w-4 h-4" />
                                        Download Free
                                    </Button>
                                    <Link
                                        to={topic.link}
                                        className="text-sm font-medium text-green-600 hover:underline flex items-center gap-1"
                                    >
                                        Learn more <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Why Avelo Guides Section — adds word count & text-HTML ratio */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-10 md:p-16 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Why download our free WhatsApp guides?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Written by practitioners, not theorists</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Every guide is crafted by our team of WhatsApp marketing specialists who manage real campaigns for clients across India, Southeast Asia, and beyond. You'll find real numbers, real strategies, and zero filler.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Backed by 10,000+ business outcomes</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Our recommendations are derived from anonymised data across thousands of campaigns — so what we suggest actually works. Whether you're a startup or an enterprise, you'll find tactics that scale to your size and budget.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Actionable templates and scripts included</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Don't start from scratch. Each guide includes copy-paste message templates, flow diagrams, tracking spreadsheets, and checklists. You can implement the strategies the same day you download.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Always free, always current</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    WhatsApp's policies and the platform's features evolve constantly. Avelo keeps guides updated in line with Meta's official API changes and our own platform updates — so you're never working with stale advice.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Internal Linking — Related Resources */}
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-14">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Explore more resources</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">Looking for live training, case studies, or ready-to-use tools?</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {relatedLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="flex items-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 group"
                                >
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Newsletter Section */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6">
                            <img src="https://img.icons8.com/color/48/download.png" alt="download" className="w-8 h-8 object-contain" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                            Don't miss the next release
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8">
                            Join 10,000+ marketers getting expert WhatsApp guides delivered straight to their inbox. New resources drop every month — completely free.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input placeholder="Enter your work email" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700" />
                            <Button size="lg" className="h-12 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-8">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default EbooksPage;
