import { useState } from "react";
import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ArrowRight, DollarSign, Users, TrendingUp, Gift, ChevronDown } from "lucide-react";

export default function AffiliatePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: "Are there any fees?",
            answer: "Nope! It is free to join the affiliate program"
        },
        {
            question: "How are referrals tracked?",
            answer: "When people click on your affiliate URL link, we will use cookies to track them for 90 days. Once your contact sign-ups and completes the payment, they'll be considered as your referrals."
        },
        {
            question: "How do I get paid?",
            answer: "We use Partnerstack to manage payouts. We will send payouts monthly, and then you can withdraw using PayPal or your Bank account."
        },
        {
            question: "How to promote WA Business?",
            answer: "You can promote WA Business through your website, blog, social media channels, email newsletters, or any other marketing channels you have access to. We provide marketing materials and resources to help you succeed."
        },
        {
            question: "Can affiliates use Google or Facebook ads to acquire customers?",
            answer: "Yes, affiliates can use paid advertising channels like Google Ads and Facebook Ads to promote WA Business and acquire customers. However, please ensure you follow our brand guidelines and advertising policies."
        },
        {
            question: "Do I get a commission on the usage?",
            answer: "Yes! You earn recurring commissions on the monthly subscription fees paid by customers you refer, as long as they remain active subscribers."
        }
    ];

    const benefits = [
        {
            icon: DollarSign,
            title: "Generous Commissions",
            description: "Earn up to 20% recurring commission on every customer you refer",
            color: "green"
        },
        {
            icon: Users,
            title: "Global Network",
            description: "Join 5,000+ affiliates promoting to 100+ countries worldwide",
            color: "blue"
        },
        {
            icon: TrendingUp,
            title: "High Conversion",
            description: "Promote a product that businesses love with proven conversion rates",
            color: "purple"
        },
        {
            icon: Gift,
            title: "Marketing Support",
            description: "Get access to banners, landing pages, and promotional materials",
            color: "orange"
        }
    ];

    const steps = [
        {
            number: "01",
            title: "Sign Up",
            description: "Join our affiliate program for free in minutes"
        },
        {
            number: "02",
            title: "Get Your Link",
            description: "Receive your unique affiliate tracking link"
        },
        {
            number: "03",
            title: "Promote",
            description: "Share WA Business with your audience using our resources"
        },
        {
            number: "04",
            title: "Earn",
            description: "Get paid monthly for every successful referral"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        The easiest way to<br />
                        <span className="text-green-500">partner with WA Business</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12"
                    >
                        partner with WA Business and earn a generous recurring commission.
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        href="https://dash.partnerstack.com/application?company=watiio&group=affiliatepartners"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors group"
                    >
                        Become an Affiliate
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center mb-4"
                    >
                        Know How to Become Our Affiliate
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 text-center mb-16"
                    >
                        Follow the step-by-step guide in this tutorial
                    </motion.p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center space-y-4"
                            >
                                <div className="text-6xl font-bold text-green-500/20 dark:text-green-500/10">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Become an Affiliate */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center mb-4"
                    >
                        Why become a WA Business affiliate?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 text-center mb-16 max-w-4xl mx-auto"
                    >
                        WA Business is the world's favourite WhatsApp Business API platform, serving over 8,000 customers across
                        more than 100 countries. Join our network of over 5,000 affiliates and help businesses thrive with
                        our advanced WhatsApp API platform.
                    </motion.p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            const colorClasses = {
                                green: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
                                blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                                purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
                                orange: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                            };

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center space-y-4"
                                >
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${colorClasses[benefit.color as keyof typeof colorClasses]}`}>
                                        <Icon className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
                    >
                        See Success Unfold: Amplify Your Reach
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 mb-16"
                    >
                        Join the ranks of successful WA Business affiliates
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid md:grid-cols-3 gap-8 text-center"
                    >
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-green-500">8,000+</div>
                            <div className="text-slate-600 dark:text-slate-400">Active Customers</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-green-500">100+</div>
                            <div className="text-slate-600 dark:text-slate-400">Countries Served</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-green-500">5,000+</div>
                            <div className="text-slate-600 dark:text-slate-400">Active Affiliates</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12"
                    >
                        Popular questions about the WA Business Affiliate Program
                    </motion.p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-slate-200 dark:border-slate-800"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full py-6 flex items-center justify-between text-left group"
                                >
                                    <span className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-green-500 transition-colors">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="pb-6"
                                    >
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-green-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Become a WA Business affiliate today!
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/90 mb-8"
                    >
                        Start earning recurring commissions by promoting the world's favorite WhatsApp Business platform
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        href="https://dash.partnerstack.com/application?company=watiio&group=affiliatepartners"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-green-600 font-bold py-4 px-8 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                        Join the Affiliate Program
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
