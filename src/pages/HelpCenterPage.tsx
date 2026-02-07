import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Book, Settings, CreditCard, MessageCircle, Users, Bot, Zap, Plug, Code, Shield, Phone, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HelpCenterPage = () => {
    const categories = [
        { icon: Book, title: "Getting Started", description: "Account setup and basics", count: "24 articles" },
        { icon: Phone, title: "Connect Number", description: "WhatsApp API onboarding", count: "15 articles" },
        { icon: CreditCard, title: "Billing & Payments", description: "Manage subscriptions", count: "19 articles" },
        { icon: MessageCircle, title: "Broadcasts", description: "Sending bulk campaigns", count: "46 articles" },
        { icon: Users, title: "Team Inbox", description: "Collaborate with agents", count: "24 articles" },
        { icon: Bot, title: "Chatbots", description: "Building automation flows", count: "24 articles" },
        { icon: Zap, title: "Automation", description: "Rules and triggers", count: "20 articles" },
        { icon: Plug, title: "Integrations", description: "Connect with CRM & tools", count: "66 articles" },
        { icon: Code, title: "API & Webhooks", description: "Developer documentation", count: "15 articles" },
        { icon: Shield, title: "Privacy & Security", description: "Data safety and compliance", count: "4 articles" },
        { icon: LifeBuoy, title: "Troubleshooting", description: "Common issues helper", count: "12 articles" },
        { icon: Settings, title: "Account Settings", description: "Profile and preferences", count: "8 articles" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader variant="dark" />

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 bg-[#091E42] relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                            How can we help you today?
                        </h1>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto shadow-2xl">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                            <Input
                                placeholder="Search for answers (e.g. 'how to verify number')"
                                className="pl-14 h-16 bg-white border-0 rounded-2xl text-lg placeholder:text-slate-400 text-slate-900 focus-visible:ring-2 focus-visible:ring-green-500"
                            />
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-300">
                            <span>Popular searches:</span>
                            <button className="hover:text-white hover:underline transition-colors">Pricing</button>
                            <button className="hover:text-white hover:underline transition-colors">API Keys</button>
                            <button className="hover:text-white hover:underline transition-colors">Templates</button>
                            <button className="hover:text-white hover:underline transition-colors">Green Tick</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories Grid */}
            <main className="flex-1 py-16 px-6 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {categories.map((category, index) => (
                            <Link
                                to="#"
                                key={index}
                                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 hover:shadow-lg transition-all group flex flex-col items-start text-left"
                            >
                                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                                    <category.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">
                                    {category.description}
                                </p>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    {category.count}
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </main>

            {/* Contact Support CTA */}
            <section className="py-20 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Still can't find what you're looking for?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Our support team is just a click away using the chat widget or email.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-8 hover:bg-slate-800">
                            Chat with Support
                        </Button>
                        <Button variant="outline" className="rounded-full px-8">
                            Email Us
                        </Button>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default HelpCenterPage;
