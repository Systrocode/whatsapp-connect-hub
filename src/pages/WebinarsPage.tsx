import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Calendar, Bell, ArrowRight, Clock, Users, BookOpen, Zap, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WebinarsPage = () => {

    const pastTopics = [
        {
            icon: "https://img.icons8.com/color/48/chat.png",
            color: "text-green-600",
            bg: "bg-green-50 dark:bg-green-900/20",
            title: "WhatsApp Broadcast Masterclass",
            description: "In this 90-minute session, our product team walked through segmenting contact lists, personalising bulk messages, and creating interactive button flows. Attendees reported a 40% lift in campaign CTR within two weeks.",
            duration: "90 min",
            attendees: "1,200+",
        },
        {
            icon: "https://img.icons8.com/color/48/bot.png",
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            title: "Building Your First AI Chatbot",
            description: "A live coding session showing how to use Avelo's Flow Builder to build an AI-powered lead qualification bot. No technical background required — if you can draw a flowchart, you can build this bot.",
            duration: "60 min",
            attendees: "980+",
        },
        {
            icon: "https://img.icons8.com/color/48/people-working-together.png",
            color: "text-purple-600",
            bg: "bg-purple-50 dark:bg-purple-900/20",
            title: "Customer Support at Scale",
            description: "Three customer success leads from e-commerce, healthcare, and SaaS shared how they built 24/7 WhatsApp support workflows that reduced ticket volumes by 60–80%. Q&A with their teams included.",
            duration: "75 min",
            attendees: "1,450+",
        },
        {
            icon: "https://img.icons8.com/color/48/calculator--v1.png",
            color: "text-orange-600",
            bg: "bg-orange-50 dark:bg-orange-900/20",
            title: "WhatsApp ROI Calculation Workshop",
            description: "A hands-on workshop where attendees built their own ROI projection models using Avelo's calculator tool. We covered conversion attribution, cost per conversation, and benchmarking against email and SMS.",
            duration: "45 min",
            attendees: "760+",
        },
    ];

    const relatedLinks = [
        { label: "Download Free Ebooks & Guides", to: "/ebooks" },
        { label: "Read Customer Case Studies", to: "/customers/case-studies" },
        { label: "View All Customer Reviews", to: "/customers/reviews" },
        { label: "Explore Platform Features", to: "/features" },
        { label: "Try the ROI Calculator", to: "/tools/roi-calculator" },
        { label: "Browse Developer Docs", to: "/docs" },
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-6">
                            Live Training
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Expert <span className="text-green-600">Webinars</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-4 max-w-2xl mx-auto">
                            Join live sessions with Avelo product experts, industry leaders, and successful customers. Learn practical strategies for automating marketing, support, and sales on WhatsApp.
                        </p>
                        <p className="text-base text-slate-500 dark:text-slate-500 max-w-xl mx-auto">
                            All sessions are free to attend. Recordings are made available to registered subscribers after each event. Live Q&amp;A with our team included in every session.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Sessions */}
            <section className="py-20 px-6 bg-white dark:bg-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/50 mb-20">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center relative z-10">
                                <img src="https://img.icons8.com/color/48/video-call--v1.png" alt="webinar" className="w-12 h-12 object-contain" />
                            </div>
                            <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
                                LIVE SOON
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Next Sessions Coming Soon
                        </h2>
                        <p className="text-slate-500 max-w-md mx-auto mb-3 text-lg">
                            We are finalising our Q2 2026 schedule. Upcoming sessions include deep dives into Click-to-WhatsApp Ads, API analytics, and an advanced automation masterclass.
                        </p>
                        <p className="text-slate-400 max-w-sm mx-auto mb-8 text-sm">
                            Register your interest below and we'll send you the link as soon as dates are confirmed. Seats are limited to 500 live attendees per session.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <Button id="notify-webinars" size="lg" className="w-full rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg hover:shadow-xl transition-all">
                                <Bell className="w-4 h-4 mr-2" />
                                Get Notified
                            </Button>
                        </div>
                    </div>

                    {/* Past Session Replays */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Popular Replay Sessions
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                                Couldn't make it live? Access recordings of our most popular sessions below. Subscribe to unlock full-length replay access.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {pastTopics.map((session, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-purple-400 hover:shadow-xl transition-all group"
                                >
                                    <div className={`w-12 h-12 ${session.bg} rounded-2xl flex items-center justify-center mb-5`}>
                                        <img src={session.icon} alt={session.title} className="w-6 h-6 object-contain" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                                            <Clock className="w-3 h-3" /> {session.duration}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                                            <Users className="w-3 h-3" /> {session.attendees} attended
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">
                                        {session.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6">
                                        {session.description}
                                    </p>
                                    <Button variant="outline" size="sm" className="rounded-full border-purple-200 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 gap-2 transition-all">
                                        <Video className="w-3.5 h-3.5" />
                                        Watch Replay
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Internal Links */}
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-14">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">More learning resources</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">Ready to go deeper? Explore guides, reviews, and platform tools.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {relatedLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="flex items-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 group"
                                >
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12">
                            <img src="https://img.icons8.com/color/48/calendar--v1.png" alt="calendar" className="w-8 h-8 object-contain" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                            Never miss a live event
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8">
                            Subscribe to our events calendar to get notified about upcoming webinars, workshops, and community meetups. All events are free to attend for Avelo users and trial accounts.
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

export default WebinarsPage;
