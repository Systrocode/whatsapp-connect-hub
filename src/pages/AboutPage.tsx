import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Heart, Users, Target, Zap, Globe, Shield } from "lucide-react";

export default function AboutPage() {
    const values = [
        {
            icon: Users,
            title: "Customer First",
            description: "We build everything with our customers in mind, ensuring their success is our success."
        },
        {
            icon: Target,
            title: "Innovation Driven",
            description: "We constantly push the boundaries of what's possible with WhatsApp API technology."
        },
        {
            icon: Heart,
            title: "Transparent & Honest",
            description: "We believe in building trust through transparency and honest communication."
        },
        {
            icon: Zap,
            title: "Fast & Reliable",
            description: "Speed matters. We build high-performance tools that you can rely on 24/7."
        },
        {
            icon: Globe,
            title: "Global Vision",
            description: "Connecting businesses and customers across borders and time zones."
        },
        {
            icon: Shield,
            title: "Privacy Focused",
            description: "Data security and privacy are at the core of our infrastructure."
        }
    ];

    const stats = [
        { label: "Active Businesses", value: "8,000+" },
        { label: "Messages Sent", value: "50M+" },
        { label: "Countries Served", value: "100+" },
        { label: "Team Members", value: "25+" }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.5))]" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium text-sm mb-8"
                    >
                        Establishment in 2024
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight"
                    >
                        About <span className="text-green-500">WA Business</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        We are on a mission to democratize WhatsApp marketing for businesses of all sizes, making enterprise-grade tools accessible to everyone.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">{stat.value}</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg dark:prose-invert mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">Our Story</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Founded in 2024, WA Business started with a simple observation: Customers prefer chatting over calling or emailing, but businesses lacked the tools to manage these conversations effectively at scale.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                            What began as a simple automated reply tool has grown into a comprehensive customer engagement platform. Today, we empower thousands of businesses to market, sell, and support their customers directly on WhatsApp, the world's most popular messaging app.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Values</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            The core principles that guide every decision we make.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{value.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
