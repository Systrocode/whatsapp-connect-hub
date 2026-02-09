import { useParams, Navigate, Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Puzzle, RefreshCw } from "lucide-react";
import { INTEGRATIONS_DATA } from "@/data/integrations-data";
import { motion } from "framer-motion";

const IntegrationPage = () => {
    const { slug } = useParams();
    const integrationId = slug?.toLowerCase();
    const data = integrationId ? INTEGRATIONS_DATA[integrationId] : null;

    if (!data) {
        return <Navigate to="/" replace />;
    }

    const Icon = data.icon;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden relative">
                {/* Background Blob */}
                <div
                    className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                    style={{ backgroundColor: data.color }}
                />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl mb-8 w-24 h-24"
                            >
                                {data.logo ? (
                                    <img src={data.logo} alt={data.title} className="w-16 h-16 object-contain" />
                                ) : (
                                    <Icon className="w-12 h-12" style={{ color: data.color }} />
                                )}
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                            >
                                WhatsApp + <span style={{ color: data.color }}>{data.title}</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl"
                            >
                                {data.description}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                            >
                                <Button disabled size="lg" className="h-14 px-8 rounded-full text-lg font-bold bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed opacity-100">
                                    Coming Soon
                                </Button>
                                <Link to="/docs">
                                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-slate-300 dark:border-slate-700">
                                        View Documentation
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                        <div className="flex-1 w-full max-w-[600px]">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-[4/3] w-full"
                            >
                                <img
                                    src={data.heroImage}
                                    alt={data.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <div className="flex items-center gap-2 mb-2 font-bold text-sm uppercase tracking-wider opacity-90">
                                            <Puzzle className="w-4 h-4" /> Integration
                                        </div>
                                        <div className="text-2xl font-bold">Seamless Sync</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-24 px-6 bg-white dark:bg-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            Why integrate {data.title}?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Unlock the full potential of your stack by connecting your favorite tools.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {data.features.map((feature, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-green-500/50 transition-all hover:shadow-lg">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-green-600">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits List */}
            <section className="py-20 px-6 bg-slate-900 text-white rounded-[3rem] mx-4 md:mx-6 mb-20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                                Transform your workflow with <span className="text-green-500">{data.title}</span>
                            </h2>
                            <ul className="space-y-6">
                                {data.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-lg">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-500">
                                            <Check className="w-5 h-5" />
                                        </div>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-6">How it works</h3>
                            <div className="space-y-8">
                                {data.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-green-500 text-slate-900 font-bold flex items-center justify-center text-sm">
                                                {idx + 1}
                                            </div>
                                            {idx !== data.steps.length - 1 && (
                                                <div className="w-0.5 h-full bg-slate-800 mx-auto mt-2 min-h-[40px]"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                                            <p className="text-slate-400 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-950 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Zap className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">
                        Ready to connect?
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                        We are working hard to bring this integration to you.
                    </p>
                    <Button disabled size="lg" className="h-14 px-10 rounded-full text-lg font-bold bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed opacity-100">
                        Coming Soon
                    </Button>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default IntegrationPage;
