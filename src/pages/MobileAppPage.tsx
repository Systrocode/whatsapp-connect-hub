import { useState } from 'react';
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Smartphone, Bell, Check, Apple, Play, MessageSquare, CircleDashed, Settings } from 'lucide-react';
import { toast } from 'sonner';

const MobileAppPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setEmail('');
            toast.success("Thanks! We'll notify you when the app launches.");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm mb-6"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                Coming Soon to iOS & Android
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                            >
                                Your business, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                                    in your pocket.
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                Manage WhatsApp conversations, track analytics, and run campaigns from anywhere. The WA Business mobile app is being built for speed and simplicity.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white dark:bg-slate-900 p-2 rounded-[20px] shadow-xl border border-slate-100 dark:border-slate-800 inline-block max-w-md w-full"
                            >
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-12 border-0 bg-transparent text-lg focus-visible:ring-0 px-4"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="h-12 px-6 rounded-xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity whitespace-nowrap"
                                    >
                                        {isSubmitting ? '...' : 'Notify Me'}
                                    </Button>
                                </form>
                            </motion.div>
                            <p className="mt-4 text-sm text-slate-500">Join 2,000+ others on the waitlist.</p>
                        </div>

                        {/* Phone Mockup Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex-1 relative"
                        >
                            <div className="relative w-[300px] h-[600px] border-[14px] border-slate-900 rounded-[3rem] bg-slate-900 shadow-2xl mx-auto overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-20 rounded-b-3xl w-1/2 mx-auto"></div>

                                {/* Screen Content */}
                                <div className="w-full h-full bg-slate-50 relative overflow-hidden flex flex-col">
                                    {/* App Header */}
                                    <div className="bg-[#075E54] h-20 pt-8 px-4 flex items-center justify-between text-white shadow-md z-10">
                                        <span className="font-bold text-lg">WA Business</span>
                                        <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    {/* Chat List Mockup */}
                                    <div className="flex-1 p-2 space-y-1 overflow-hidden bg-slate-100/50">
                                        {[
                                            { name: "Sarah Miller", msg: "Is the catalog updated?", time: "10:42 AM", count: 2, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
                                            { name: "+1 (555) 019-2834", msg: "I'm interested in the premium plan.", time: "10:38 AM", count: 1, color: "bg-blue-100 text-blue-600" },
                                            { name: "Tech Support", msg: "Ticket #4290 resolved ✅", time: "10:15 AM", count: 0, color: "bg-orange-100 text-orange-600" },
                                            { name: "Marketing Team", msg: "Campaign launch in 5 mins! 🚀", time: "9:54 AM", count: 5, color: "bg-pink-100 text-pink-600" },
                                            { name: "+91 98765 43210", msg: "Thanks for the quick reply.", time: "Yesterday", count: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
                                            { name: "John Doe", msg: "Can we schedule a demo call?", time: "Yesterday", count: 0, color: "bg-cyan-100 text-cyan-600" },
                                        ].map((chat: any, i) => (
                                            <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs overflow-hidden ${chat.avatar ? '' : chat.color}`}>
                                                    {chat.avatar ? (
                                                        <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        chat.name.charAt(0)
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-center mb-0.5">
                                                        <div className="font-bold text-slate-800 text-xs truncate pr-2">{chat.name}</div>
                                                        <div className="text-[10px] text-slate-400 whitespace-nowrap">{chat.time}</div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-xs text-slate-500 truncate pr-2">{chat.msg}</div>
                                                        {chat.count > 0 && (
                                                            <div className="w-4 h-4 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                                                                {chat.count}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Nav */}
                                    <div className="bg-white h-16 border-t flex items-center justify-around text-slate-400">
                                        <div className="flex flex-col items-center gap-1 text-[#075E54]">
                                            <MessageSquare className="w-6 h-6 fill-current" />
                                            <span className="text-[10px] font-medium">Chats</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 hover:text-[#075E54] transition-colors">
                                            <CircleDashed className="w-6 h-6" />
                                            <span className="text-[10px] font-medium">Updates</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 hover:text-[#075E54] transition-colors">
                                            <Settings className="w-6 h-6" />
                                            <span className="text-[10px] font-medium">Settings</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Blobs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/20 blur-3xl -z-10 rounded-full"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Preview */}
            <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Everything you need on the go</h2>
                        <p className="text-slate-500">Don't let your business stop when you step away from your desk.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <FeatureCard
                            icon={<img src="https://img.icons8.com/fluency/48/chat-message.png" alt="Chat" className="w-8 h-8" />}
                            title="Real-time Conversations"
                            desc="Reply to customers instantly with push notifications."
                        />
                        <FeatureCard
                            icon={<img src="https://img.icons8.com/fluency/48/appointment-reminders.png" alt="Bell" className="w-8 h-8" />}
                            title="Instant Alerts"
                            desc="Get notified about new high-value leads immediately."
                        />
                        <FeatureCard
                            icon={
                                <div className="flex gap-1 items-center justify-center w-full h-full">
                                    <img src="https://img.icons8.com/color/48/mac-os--v1.png" alt="iOS" className="w-6 h-6" />
                                    <img src="https://img.icons8.com/color/48/android-os.png" alt="Android" className="w-6 h-6" />
                                </div>
                            }
                            title="iOS & Android"
                            desc="Native apps built for performance on all devices."
                        />
                        <FeatureCard
                            icon={<img src="https://img.icons8.com/fluency/48/rocket.png" alt="Rocket" className="w-8 h-8" />}
                            title="Coming 2026"
                            desc="We are perfecting every pixel before launch."
                        />
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group">
        <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default MobileAppPage;
