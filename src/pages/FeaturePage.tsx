import { useParams, Navigate, Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Bot, ShoppingCart, Zap, CreditCard, FileText, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

// Configuration for all dynamic pages
interface PageData {
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    benefits: string[];
}

const pages: Record<string, PageData> = {
    // Features
    "whatsapp-broadcasting": {
        title: "WhatsApp Broadcasting",
        subtitle: "Reach thousands in one click",
        description: "Send personalized campaigns to unlimited users. Get up to 98% open rates and boost your sales instantly.",
        icon: Megaphone,
        benefits: ["Detailed Analytics", "Media Support", "Button Messages", "Scheduling"]
    },
    "ai-whatsapp-chatbot": {
        title: "AI WhatsApp Chatbot",
        subtitle: "Automate support 24/7",
        description: "Train your custom AI agent on your business data. Answer queries, collect leads, and book appointments automatically.",
        icon: Bot,
        benefits: ["Custom Knowledge Base", "Context Awareness", "Instant Responses", "Human Handoff"]
    },
    "click-to-whatsapp-ads": {
        title: "Click to WhatsApp Ads",
        subtitle: "3X Your Leads from Facebook",
        description: "Direct traffic from FB & Instagram ads straight to WhatsApp. Qualify leads instantly with automated flows.",
        icon: Zap,
        benefits: ["High Conversion Rate", "Instant Lead Qualification", "Automated Retargeting", "Ad Analytics"]
    },
    "whatsapp-payments": {
        title: "WhatsApp Payments",
        subtitle: "Collect Payments Natively",
        description: "Allow customers to pay you without leaving the chat. Supports UPI, Cards, and Netbanking in select regions.",
        icon: CreditCard,
        benefits: ["Native Checkout", "Secure Transactions", "Order Tracking", "Instant Confirmations"]
    },
    "whatsapp-forms": {
        title: "WhatsApp Forms",
        subtitle: "Collect Data Seamlessly",
        description: "Replace external forms with native WhatsApp Flows. Capture logic-based inputs for appointments, feedback, and leads.",
        icon: FileText,
        benefits: ["Native UI", "Logic Branching", "Higher Completion Rate", "No Redirects"]
    },
    "whatsapp-catalog": {
        title: "WhatsApp Catalog",
        subtitle: "Your Store on WhatsApp",
        description: "Sync your inventory and let customers browse and shop directly within the app.",
        icon: ShoppingCart,
        benefits: ["Product Sync", "Cart Management", "Automated Orders", "Inventory Updates"]
    },

    // Integrations
    "shopify": {
        title: "Shopify Integration",
        subtitle: "Recover Abandoned Carts",
        description: "Automatically sync orders and trigger messages for abandoned carts, order confirmations, and COD verification.",
        icon: ShoppingCart,
        benefits: ["Auto-sync Orders", "Abandoned Cart Recovery", "COD Confirmation", "Delivery Updates"]
    },
    "razorpay": {
        title: "Razorpay Integration",
        subtitle: "Automated Payment Alerts",
        description: "Send instant payment receipts and failed payment reminders on WhatsApp automatically.",
        icon: CreditCard,
        benefits: ["Payment Receipts", "Failed Payment Recovery", "Subscription Alerts", "Invoice Sharing"]
    }
};

const FeaturePage = () => {
    const { slug } = useParams();

    // Normalize slug to handle different URL structures if needed
    const pageId = slug?.toLowerCase();
    const data = pageId ? pages[pageId] : null;

    if (!data) {
        return <Navigate to="/" replace />;
    }

    const Icon = data.icon;

    return (
        <div className="min-h-screen bg-background">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                                <Icon className="w-4 h-4" />
                                {data.title}
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                {data.subtitle}
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                {data.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <Link to="/auth?mode=signup">
                                    <Button size="xl" variant="whatsapp">
                                        Get Started Free
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Link to="/auth">
                                    <Button size="xl" variant="outline">
                                        Book Demo
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-4">
                                {data.benefits.map((benefit) => (
                                    <div key={benefit} className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-whatsapp" />
                                        <span className="font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Visual Represenation Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-muted/30 rounded-3xl border border-border p-8 flex items-center justify-center overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background z-0" />

                            {/* Abstract Visual based on Icon */}
                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div className="w-32 h-32 rounded-3xl bg-card border shadow-xl flex items-center justify-center">
                                    <Icon className="w-16 h-16 text-primary" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 rounded-2xl bg-card/80 border shadow-lg flex items-center justify-center animate-bounce duration-3000">
                                        <div className="w-12 h-2 bg-muted rounded-full" />
                                    </div>
                                    <div className="w-24 h-24 rounded-2xl bg-card/80 border shadow-lg flex items-center justify-center animate-bounce delay-100" style={{ animationDelay: '0.1s' }}>
                                        <div className="w-12 h-2 bg-muted rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default FeaturePage;
