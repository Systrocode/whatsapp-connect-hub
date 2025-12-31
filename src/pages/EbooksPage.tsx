import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";

const EbooksPage = () => {
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
                            Ebooks & <span className="text-green-600">Guides</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Deep dive into WhatsApp marketing strategies, automation playbooks, and industry insights. Master the art of conversational business.
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

            {/* Content Section (Empty State as requested) */}
            <main className="flex-1 py-24 px-6 bg-white dark:bg-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <BookOpen className="w-10 h-10 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                            New Resources Coming Soon
                        </h2>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            We are currently curating a comprehensive library of expert guides. Check back shortly or subscribe to get notified when they drop.
                        </p>
                        <Button variant="outline" className="rounded-full">
                            Notify Me
                        </Button>
                    </div>
                </div>
            </main>

            {/* Newsletter Section */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6">
                            <Download className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                            Don't miss the next release
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8">
                            Join 10,000+ marketers getting expert guides delivered straight to their inbox.
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
