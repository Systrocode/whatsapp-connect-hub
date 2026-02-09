import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Calendar, Mail, Bell } from "lucide-react";
import { motion } from "framer-motion";

const WebinarsPage = () => {
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
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Join live sessions with product experts, industry leaders, and successful customers. Learn how to scale your business with WhatsApp.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section (Empty State) */}
            <main className="flex-1 py-24 px-6 bg-white dark:bg-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center relative z-10">
                                <Video className="w-10 h-10 text-slate-400" />
                            </div>
                            <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
                                LIVE SOON
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Upcoming Sessions
                        </h2>
                        <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                            We are finalizing our webinar schedule for the next quarter. Expect deep dives into API features and marketing automation masterclasses.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <Button size="lg" className="w-full rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg hover:shadow-xl transition-all">
                                <Bell className="w-4 h-4 mr-2" />
                                Get Notified
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Newsletter Section */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                            Never miss a live event
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8">
                            Subscribe to our events calendar to get notified about upcoming webinars, workshops, and community meetups.
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
