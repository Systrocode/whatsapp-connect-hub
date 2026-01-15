
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Book,
    Settings,
    CreditCard,
    MessageCircle,
    Users,
    Bot,
    Zap,
    Plug,
    Code,
    Shield,
    Phone,
    LifeBuoy,
    ExternalLink,
    Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const HelpSupport = () => {
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
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-2xl font-bold text-foreground mb-1">Help & Support</h1>
                    <p className="text-muted-foreground">Find answers, documentation, and support for your business.</p>
                </motion.div>

                {/* Search & Hero */}
                <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden border border-primary/10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                            How can we help you today?
                        </h2>

                        <div className="relative shadow-lg max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Search knowledge base..."
                                className="pl-12 h-14 bg-background border-border text-lg"
                            />
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
                            <span>Popular:</span>
                            <button className="text-primary hover:underline">API Keys</button>
                            <button className="text-primary hover:underline">Templates</button>
                            <button className="text-primary hover:underline">Billing</button>
                            <button className="text-primary hover:underline">Verification</button>
                        </div>
                    </div>
                </div>

                {/* Quick Links Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card border border-border p-6 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Book className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Documentation</h3>
                            <p className="text-sm text-muted-foreground mb-3">Browse detailed guides and API references.</p>
                            <Link to="/docs" target="_blank" className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:underline">
                                View Docs <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-6 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Chat Support</h3>
                            <p className="text-sm text-muted-foreground mb-3">Talk to our support team directly via WhatsApp.</p>
                            <button className="text-sm font-medium text-green-600 flex items-center gap-1 hover:underline">
                                Start Chat <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-6 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                            <p className="text-sm text-muted-foreground mb-3">Get a response within 24 hours.</p>
                            <a href="mailto:support@avelo.in" className="text-sm font-medium text-purple-600 flex items-center gap-1 hover:underline">
                                support@avelo.in <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div>
                    <h3 className="text-xl font-bold mb-6">Browse by Category</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category, index) => (
                            <Link
                                to="#"
                                key={index}
                                className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-sm transition-all group flex items-start gap-4"
                            >
                                <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <category.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {category.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {category.description}
                                    </p>
                                    <span className="text-xs font-medium text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                                        {category.count}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact Footer */}
                <div className="bg-card border border-border rounded-xl p-8 text-center mt-8">
                    <h3 className="text-lg font-bold mb-2">Still need help?</h3>
                    <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                        Our support team is available Mon-Fri, 9am - 6pm EST. We typically respond to urgent issues within 1 hour.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button>Contact Support</Button>
                        <Button variant="outline">View Status Page</Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HelpSupport;
