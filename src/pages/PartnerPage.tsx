import { useState } from "react";
import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";

export default function PartnerPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        partnerType: "solution",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Partner application:", formData);
    };

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
                        Grow with us as part of<br />
                        <span className="text-green-500">WhatsApp's ecosystem</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12"
                    >
                        Avelo is the world's favourite WhatsApp Business platform, with over 8000+ customers across 100+ countries.
                        With 165+ active partners worldwide, we help businesses grow with our state-of-the-art customer engagement
                        software built on WhatsApp's API.
                    </motion.p>
                </div>
            </section>

            {/* Partner Types */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Solution Partner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                Solution Partner: Sell, Implement, Customize
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Earn recurring commissions and add revenue channels with Avelo products. Leverage your technical
                                sales capabilities to delight businesses globally.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">
                                        Recurring revenue from every customer you bring
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">
                                        Dedicated partner success manager
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">
                                        Sales and technical training resources
                                    </span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Technology Partner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                Technology Partner: Integrate Avelo
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Build with us. Grow with us. Accelerate your business success by integrating your solution
                                with the Avelo platform.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">
                                        Access to comprehensive API documentation
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">
                                        Co-marketing opportunities
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">
                                        Technical support from our engineering team
                                    </span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Partner With Us */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center mb-16"
                    >
                        Why partner with us?
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Benefit 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                                <TrendingUp className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Grow Your Business
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Leverage WhatsApp's popularity and presence in developing markets to accelerate growth of your business.
                            </p>
                        </motion.div>

                        {/* Benefit 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                                <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Solve Customer Problems
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Why refer your customers to untrusted third parties when you can add value and solve problems
                                as part of our ecosystem?
                            </p>
                        </motion.div>

                        {/* Benefit 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Get Rewarded for Success
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                We succeed together. Our success is your success. Share in our highly rewarding commission structure.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Become a partner today
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Join our partner network and unlock new opportunities to grow your business with us. Whether you're
                            looking to resell our solution, integrate with our platform, or collaborate in a unique way, we're
                            here to support you.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                                    placeholder="john@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                                placeholder="Your Company Ltd."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Partner Type *
                            </label>
                            <select
                                required
                                value={formData.partnerType}
                                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                            >
                                <option value="solution">Solution Partner</option>
                                <option value="technology">Technology Partner</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Tell us about your business
                            </label>
                            <textarea
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-slate-900 dark:text-white resize-none"
                                placeholder="Tell us about your business and how you'd like to partner with us..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 group"
                        >
                            Submit Application
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.form>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
