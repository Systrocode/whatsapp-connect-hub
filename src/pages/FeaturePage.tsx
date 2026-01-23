
import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { QuoteRequestDialog } from "@/components/landing/QuoteRequestDialog";
import {
    ArrowRight, CheckCircle, Bot, Play, MessageSquare, MessageCircle,
    BarChart3, Users, Zap, ShoppingCart, FileText,
    Globe, Shield, Smartphone, CreditCard,
    TrendingUp, Image as ImageIcon, Scale, Megaphone,
    PieChart, Activity, GripHorizontal, Instagram, Heart, Send, Calendar
} from "lucide-react";
import { motion } from "framer-motion";

// Configuration for all dynamic pages
interface Section {
    title: string;
    description: string;
    icon?: any;
    badge?: string;
    learnMoreUrl?: string;
    visual?: string;
    tabs?: {
        label: string;
        visualContent: string;
        contentTitle?: string;
        contentDescription?: string;
    }[];
}

export interface PageData {
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    benefits: string[];
    stats?: { label: string; value: string }[];
    sections?: Section[];
}

export const pages: Record<string, PageData> = {
    // Solutions



    // Features
    "whatsapp-broadcasting": {
        title: "WhatsApp Broadcasting",
        subtitle: "Reach thousands in one click",
        description: "Send personalized campaigns to unlimited users. Get up to 98% open rates and boost your sales instantly.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/megaphone.png" alt="Broadcast" {...props} />,
        benefits: ["Detailed Analytics", "Media Support", "Button Messages", "Scheduling"],
        stats: [
            { label: "Message Delivery", value: "99.9%" },
            { label: "Daily Volume", value: "Unlimited" },
            { label: "Open Rate", value: "98%" }
        ],
        sections: [
            {
                title: "Rich Media Support",
                description: "Send images, videos, and PDFs. Use interactive buttons to increase click-through rates.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/lightning-bolt.png" alt="Zap" {...props} />
            },
            {
                title: "Smart Scheduling",
                description: "Schedule campaigns for optimal delivery times. Manage time zones effortlessly.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/chart.png" alt="Chart" {...props} />
            }
        ]
    },
    "ai-whatsapp-chatbot": {
        title: "AI WhatsApp Chatbot",
        subtitle: "Automate support 24/7",
        description: "Train your custom AI agent on your business data. Answer queries, collect leads, and book appointments automatically.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/robot-2.png" alt="Bot" {...props} />,
        benefits: ["Custom Knowledge Base", "Context Awareness", "Instant Responses", "Human Handoff"],
        stats: [
            { label: "Automation Rate", value: "80%" },
            { label: "Setup Time", value: "5 mins" },
            { label: "24/7 Availability", value: "Yes" }
        ],
        sections: [
            {
                title: "No-Code Builder",
                description: "Build flows visually. Train the AI by simply uploading your PDF or URL.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/survey.png" alt="Builder" {...props} />
            },
            {
                title: "Seamless Human Handoff",
                description: "The AI knows when to escalate complex queries to a human agent.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/user-group-man-man.png" alt="Users" {...props} />
            }
        ]
    },
    "click-to-whatsapp-ads": {
        title: "Click to WhatsApp Ads",
        subtitle: "3X Your Leads from Facebook",
        description: "Direct traffic from FB & Instagram ads straight to WhatsApp. Qualify leads instantly with automated flows.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/lightning-bolt.png" alt="Ads" {...props} />,
        benefits: ["High Conversion Rate", "Instant Lead Qualification", "Automated Retargeting", "Ad Analytics"],
        sections: [
            {
                title: "Instant Qualification",
                description: "Start a chat immediately after the click. Ask qualifying questions automatically.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/checked-user-male.png" alt="Qualify" {...props} />
            }
        ]
    },
    "whatsapp-payments": {
        title: "WhatsApp Payments",
        subtitle: "Collect Payments Natively",
        description: "Allow customers to pay you without leaving the chat. Supports UPI, Cards, and Netbanking in select regions.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/bank-card-front-side.png" alt="Payments" {...props} />,
        benefits: ["Native Checkout", "Secure Transactions", "Order Tracking", "Instant Confirmations"],
        sections: [
            {
                title: "Frictionless Checkout",
                description: "Reduce drop-offs by keeping the entire payment flow within WhatsApp.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/fast-cart.png" alt="Checkout" {...props} />
            }
        ]
    },
    "whatsapp-forms": {
        title: "WhatsApp Forms",
        subtitle: "Collect Data Seamlessly",
        description: "Replace external forms with native WhatsApp Flows. Capture logic-based inputs for appointments, feedback, and leads.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/survey.png" alt="Forms" {...props} />,
        benefits: ["Native UI", "Logic Branching", "Higher Completion Rate", "No Redirects"],
        sections: [
            {
                title: "Logic Branching",
                description: "Show different questions based on previous answers. Create complex flows easily.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/flow-chart.png" alt="Logic" {...props} />
            }
        ]
    },
    "whatsapp-catalog": {
        title: "WhatsApp Catalog",
        subtitle: "Your Store on WhatsApp",
        description: "Sync your inventory and let customers browse and shop directly within the app.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/shopping-bag.png" alt="Catalog" {...props} />,
        benefits: ["Product Sync", "Cart Management", "Automated Orders", "Inventory Updates"],
        sections: [
            {
                title: "Auto-Sync",
                description: "Changes on your Shopify or WooCommerce store reflect on WhatsApp instantly.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/refresh.png" alt="Sync" {...props} />
            }
        ]
    },

    "official-api": {
        title: "Official WhatsApp API",
        subtitle: "Enterprise-Grade Infrastructure",
        description: "Scale your business with the reliable, secure, and official WhatsApp Business API. Verified green tick support included.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/approval.png" alt="API" {...props} />,
        benefits: ["Green Tick Verification", "High Throughput", "99.9% Uptime SLA", "Official Meta Partner"],
        stats: [{ label: "Uptime", value: "99.99%" }, { label: "Throughput", value: "500/sec" }, { label: "Scalability", value: "Unlimited" }],
        sections: [
            {
                title: "Scale Without Limits",
                description: "Seamlessly handle millions of messages. Our infrastructure auto-scales to meet your campaign demands.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/server.png" alt="Server" {...props} />
            }
        ]
    },
    "team-inbox": {
        title: "Shared Team Inbox",
        subtitle: "Collaborate on Support",
        description: "One number, multiple agents. Assign chats, leave internal notes, and resolve queries faster together.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/conference-call.png" alt="Inbox" {...props} />,
        benefits: ["Role-based Access", "Collision Detection", "Internal Notes", "Performance Metrics"],
        sections: [
            {
                title: "Zero Context Switching",
                description: "View customer history, orders, and tags right next to the chat window.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/dashboard.png" alt="Context" {...props} />
            }
        ]
    },
    "flow-builder": {
        title: "Visual Flow Builder",
        subtitle: "Automate Without Code",
        description: "Build robust chatbots and automation flows with a simple drag-and-drop interface. No coding skills required.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/flow-chart.png" alt="Flow" {...props} />,
        benefits: ["Drag & Drop", "Pre-built Templates", "Logic Branching", "A/B Testing"],
        sections: [
            {
                title: "Visual Logic",
                description: "See your entire automation at a glance. Connect blocks to create complex conversational journeys.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/mind-map.png" alt="Logic" {...props} />
            }
        ]
    },
    "analytics": {
        title: "Advanced Analytics",
        subtitle: "Data-Driven Decisions",
        description: "Get deep insights into your campaign performance, support team efficiency, and customer engagement metrics.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/positive-dynamic.png" alt="Analytics" {...props} />,
        benefits: ["Real-time Dashboards", "Exportable Reports", "Conversation Insights", "ROI Tracking"],
        sections: [
            {
                title: "Monitor Growth",
                description: "Track message delivery, read rates, and button clicks in real-time.",
                icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/bar-chart.png" alt="Growth" {...props} />
            }
        ]
    },

    // Integrations
    "shopify": {
        title: "Shopify Integration",
        subtitle: "Recover Abandoned Carts",
        description: "Automatically sync orders and trigger messages for abandoned carts, order confirmations, and COD verification.",
        icon: (props: any) => <img src="https://img.icons8.com/color/96/shopify.png" alt="Shopify" {...props} />,
        benefits: ["Auto-sync Orders", "Abandoned Cart Recovery", "COD Confirmation", "Delivery Updates"]
    },
    "razorpay": {
        title: "Razorpay Integration",
        subtitle: "Automated Payment Alerts",
        description: "Send instant payment receipts and failed payment reminders on WhatsApp automatically.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/bank-cards.png" alt="Razorpay" {...props} />,
        benefits: ["Payment Receipts", "Failed Payment Recovery", "Subscription Alerts", "Invoice Sharing"]
    },
    "webhooks": {
        title: "Webhooks Integration",
        subtitle: "Connect Any Stack",
        description: "Receive real-time events from WhatsApp directly to your server. Trigger actions in your own apps instantly.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/api-settings.png" alt="Webhooks" {...props} />,
        benefits: ["Real-time Events", "Secure Payload", "Custom Headers", "Retries"]
    },
    "crm-sync": {
        title: "CRM Synchronization",
        subtitle: "Unified Customer Data",
        description: "Keep your data in sync with bidirectional integration for Salesforce, HubSpot, Zoho, and more.",
        icon: (props: any) => <img src="https://img.icons8.com/3d-fluency/94/cloud-sync.png" alt="CRM" {...props} />,
        benefits: ["Two-way Sync", "Field Mapping", "Activity Logging", "Auto-Lead Gen"]
    }
};

// Component to handle image loading with fallback
const FeatureImageWithFallback = ({ title, className }: { title: string, className?: string }) => {
    const [error, setError] = useState(false);

    // Deterministic gradient as fallback
    const gradients = [
        "from-blue-400 to-indigo-500",
        "from-purple-400 to-pink-500",
        "from-emerald-400 to-cyan-500",
        "from-orange-400 to-red-500"
    ];
    const gradient = gradients[title.length % gradients.length];

    // Picsum URL (Random but seeded by title length for consistency per session or simple random)
    // Using simple hash of title to pick a seed
    const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const imgSrc = `https://picsum.photos/seed/${seed}/400/300`;

    if (error) {
        return (
            <div className={`relative w-full h-full ${className}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 transition-opacity`}></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 opacity-60">
                    <svg viewBox="0 0 100 40" className={`w-full h-full fill-current text-${gradient.split('-')[1]}-500 stroke-none`}>
                        <path d="M0,40 L0,20 Q25,10 50,25 T100,15 L100,40 Z" />
                    </svg>
                </div>
                <div className="absolute bottom-3 left-3 flex flex-col z-10">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Performance</span>
                    <span className="text-lg font-bold text-slate-800 dark:text-white">+24%</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full group ${className}`}>
            <img
                src={imgSrc}
                alt="Feature Preview"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={() => setError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-3 left-3 flex flex-col z-10">
                <span className="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    +24% Growth
                </span>
            </div>
        </div>
    );
};

// Main Helper
// Helper to render dynamic visuals based on content
const renderFeatureVisual = (title: string, Icon: any, visualType?: string, description?: string) => {
    // ... existing start of function
    const t = title.toLowerCase();

    // 0. Tab Visuals (Priority)
    if (visualType === 'tab_visual') {
        const contentKey = description; // We passed the content identifier in description arg
        let screenContent: any = null;

        if (contentKey === "broadcast_campaigns") {
            screenContent = (
                <div className="flex flex-col h-full bg-slate-50 relative overflow-y-auto no-scrollbar">
                    {/* App Header Mock */}
                    <div className="bg-white p-3 border-b flex items-center gap-3 sticky top-0 z-10">
                        <ArrowRight className="w-4 h-4 text-slate-400 rotate-180" />
                        <div className="font-bold text-slate-800 text-sm">New Broadcast</div>
                    </div>

                    <div className="p-4 space-y-4 pb-20">
                        {/* Step 1: Info */}
                        <div className="space-y-3">
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Campaign Details</div>
                                <div className="space-y-2">
                                    <div>
                                        <label className="text-[9px] font-medium text-slate-700 block mb-1">Broadcast Name</label>
                                        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-[10px] text-slate-800 shadow-sm">
                                            Winter Warmers - Campaign
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Content */}
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Message Content</div>
                                <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm space-y-2">
                                    <div className="text-[9px] text-slate-500 font-medium">Selected Template</div>
                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                                        <span className="text-[10px] font-bold text-slate-700">winter_warmers_launch</span>
                                        <div className="text-[8px] text-blue-600 font-bold">Edit</div>
                                    </div>

                                    {/* Inline Preview */}
                                    <div className="mt-2 border border-slate-100 rounded-lg overflow-hidden">
                                        <div className="h-24 bg-orange-100 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-amber-100"></div>
                                            <img
                                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
                                                className="w-full h-full object-cover mix-blend-overlay opacity-50"
                                                alt="Bg"
                                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                                            />
                                            <span className="relative z-10 text-orange-900/50 font-bold text-lg">IMAGE</span>
                                        </div>
                                        <div className="p-3 bg-white">
                                            <div className="text-[11px] font-bold text-slate-900 mb-1">Winter Warmers 🧣</div>
                                            <div className="text-[9px] text-slate-500 leading-relaxed mb-2">
                                                Hey {"{{1}}"}, the cold days are coming! ❄️ Check out our new collection to keep your furry friend warm.
                                            </div>
                                            <div className="bg-blue-50 text-blue-600 text-center py-1.5 rounded font-bold text-[9px] border border-blue-100">
                                                Visit Website
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Audience */}
                        <div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Recipients</div>
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <div className="flex bg-slate-50 p-2 border-b border-slate-100 font-bold text-slate-600 text-[9px]">
                                    <div className="w-8 text-center">Select</div>
                                    <div className="flex-1">Contact</div>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {[
                                        { name: "John Doe", phone: "+351...890", active: true },
                                        { name: "Jane Doe", phone: "+123...890", active: true },
                                        { name: "Thomas S.", phone: "+91...890", active: false }
                                    ].map((contact, i) => (
                                        <div key={i} className="p-2 flex items-center gap-3 hover:bg-slate-50">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${contact.active ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>
                                                {contact.active && <div className="text-white text-[8px]">✓</div>}
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-slate-800">{contact.name}</div>
                                                <div className="text-[8px] text-slate-400">{contact.phone}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-white border-t border-slate-100 shadow-lg">
                        <div className="bg-green-600 text-white text-center py-3 rounded-lg font-bold text-xs shadow-green-200 shadow-lg cursor-pointer hover:bg-green-700 transition">
                            Send Broadcast (2)
                        </div>
                    </div>
                </div>
            );
        } else if (contentKey === "click_to_whatsapp") {
            screenContent = (
                <div className="flex flex-col items-center justify-center h-full w-full px-6">
                    {/* Facebook Ad Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-sm border border-slate-200 w-full max-w-[320px] overflow-hidden"
                    >
                        {/* Ad Header */}
                        <div className="p-3 flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                A
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-800">Arabicana Coffee</div>
                                <div className="text-[10px] text-slate-500">Sponsored</div>
                            </div>
                            <div className="ml-auto text-slate-400">•••</div>
                        </div>

                        {/* Ad Content */}
                        <div className="px-3 pb-2 text-[10px] text-slate-700">
                            Brew perfection at home. ☕ Get 20% off your first order when you order via WhatsApp!
                        </div>

                        {/* Ad Image */}
                        <div className="aspect-[4/3] bg-amber-100 relative">
                            <img
                                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
                                className="w-full h-full object-cover"
                                alt="Coffee"
                            />
                        </div>

                        {/* Ad CTA Section */}
                        <div className="bg-slate-50 p-3 flex justify-between items-center border-t border-slate-100">
                            <div>
                                <div className="text-[9px] text-slate-500 uppercase font-bold">WhatsApp</div>
                                <div className="text-[11px] font-bold text-slate-800">Chat with us</div>
                            </div>
                            <div className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded text-[10px] font-bold shadow-sm uppercase">
                                Send Message
                            </div>
                        </div>
                    </motion.div>

                    {/* Connecting Arrow/Graphic (Optional) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -right-2 bottom-20 bg-[#25D366] text-white p-2 rounded-full shadow-lg z-10"
                    >
                        <MessageCircle className="w-6 h-6 fill-current" />
                    </motion.div>
                </div>
            );
        } else if (contentKey === "whatsapp_flows") {
            screenContent = (
                <div className="flex flex-col h-full bg-[#EFE7DE] relative">
                    {/* Chat Header Mock */}
                    <div className="bg-[#075E54] h-12 flex items-center px-4 gap-3 shadow-sm z-10">
                        <ArrowRight className="w-5 h-5 text-white rotate-180" />
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            B
                        </div>
                        <div className="text-white font-bold text-sm">Business Account</div>
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Trigger Message */}
                        <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start relative">
                            <div className="text-[10px] font-bold text-[#075E54] mb-1">Registration</div>
                            <div className="text-xs text-slate-800 leading-snug mb-2">
                                Hey! 👋 Fill out this quick form to get your personalized plan.
                            </div>
                            <div className="bg-slate-50 border-t border-slate-100 py-1.5 flex items-center justify-center gap-1.5 text-[#00A884] font-bold text-[10px] cursor-pointer">
                                <FileText className="w-3 h-3" /> Open Form
                            </div>
                        </div>
                    </div>

                    {/* Flow Sheet Overlay */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "15%" }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="absolute inset-x-0 bottom-0 top-0 bg-white rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col z-20 overflow-hidden"
                    >
                        {/* Flow Header */}
                        <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
                            <div className="font-bold text-slate-800 text-sm">Get Started</div>
                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                                <div className="w-3 h-3 border-b-2 border-l-2 border-slate-400 rotate-[-45deg] translate-y-[-2px]"></div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-5 space-y-5 flex-1 overflow-y-auto bg-slate-50">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Goal</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white border-2 border-green-500 text-green-700 p-2 rounded-lg text-xs font-bold text-center shadow-sm">
                                        Lose Weight
                                    </div>
                                    <div className="bg-white border border-slate-200 text-slate-500 p-2 rounded-lg text-xs font-medium text-center">
                                        Gain Muscle
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Availability</label>
                                <div className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center shadow-sm">
                                    <span className="text-xs font-medium text-slate-700">Weekdays (Mon-Fri)</span>
                                    <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center shadow-sm">
                                    <span className="text-xs font-medium text-slate-700">Weekends Only</span>
                                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</div>
                                </div>
                            </div>
                        </div>

                        {/* Flow Footer */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="bg-[#00A884] text-white rounded-full py-2.5 text-center font-bold text-sm shadow-lg shadow-green-100 active:scale-95 transition-transform">
                                Continue
                            </div>
                        </div>
                    </motion.div>
                </div>
            );
        } else if (contentKey === "instagram_automation") {
            screenContent = (
                <div className="flex flex-col h-full bg-black relative">
                    {/* Insta Story Background */}
                    <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        alt="Story"
                    />
                    <div className="absolute top-2 left-2 flex gap-1 z-10">
                        <div className="h-0.5 w-16 bg-white/40 rounded overflow-hidden">
                            <div className="h-full bg-white w-2/3"></div>
                        </div>
                        <div className="h-0.5 w-16 bg-white/40 rounded"></div>
                    </div>

                    <div className="absolute top-6 left-4 flex items-center gap-2 z-10">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                            <img src="https://github.com/shadcn.png" className="w-full h-full rounded-full border border-black" alt="User" />
                        </div>
                        <span className="text-white text-xs font-bold shadow-sm">FashionBrand</span>
                        <span className="text-white/60 text-[10px]">2h</span>
                    </div>

                    {/* Reply Interaction */}
                    <div className="absolute bottom-0 inset-x-0 p-4 pb-8 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-3">
                        <div className="flex-1 h-10 rounded-full border border-white/30 bg-white/10 flex items-center px-4 text-white/70 text-sm backdrop-blur-md">
                            Send message...
                        </div>
                        <Heart className="w-6 h-6 text-white" />
                        <Send className="w-6 h-6 text-white -rotate-12" />
                    </div>

                    {/* Automation Trigger Notification */}
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute top-20 inset-x-4 bg-white/95 backdrop-blur rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-30"
                    >
                        <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white shrink-0">
                            <MessageCircle className="w-6 h-6 fill-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-xs text-slate-800">Automated Reply Sent</div>
                            <div className="text-[10px] text-slate-500 truncate">Check your WhatsApp! We sent the link 🔗</div>
                        </div>
                    </motion.div>
                </div>
            );
        } else if (contentKey === "native_payments") {
            screenContent = (
                <div className="flex flex-col h-full bg-[#E5DDD5]">
                    <div className="bg-[#075E54] p-3 flex items-center gap-2 text-white shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">W</div>
                        <div className="text-sm font-medium">Checkout Store</div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="max-w-[85%] bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg p-2 shadow-sm">
                            <div className="text-xs text-slate-600 mb-2">Order #ORD-2024</div>
                            <div className="flex gap-2 mb-2">
                                <div className="w-12 h-12 bg-slate-100 rounded"></div>
                                <div>
                                    <div className="text-xs font-bold">Premium Plan</div>
                                    <div className="text-xs text-slate-500">Qty: 1</div>
                                </div>
                            </div>
                            <div className="text-sm font-bold border-t border-slate-100 pt-1 flex justify-between">
                                <span>Total</span>
                                <span>$49.00</span>
                            </div>
                            <div className="mt-2 bg-[#25D366] text-white text-center py-1.5 rounded text-xs font-bold shadow-sm">
                                Pay Now
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (contentKey === "product_catalog") {
            screenContent = (
                <div className="flex flex-col h-full bg-[#E5DDD5]">
                    <div className="bg-[#075E54] p-3 flex items-center gap-2 text-white shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-white/20"></div>
                        <div className="text-sm font-medium">Fashion Store</div>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="bg-white p-2 rounded-lg max-w-[90%] shadow-sm">
                            <div className="text-xs text-slate-500 mb-2">New Arrivals</div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="aspect-square bg-slate-100 rounded relative">
                                    <div className="absolute bottom-1 right-1 bg-white/80 px-1 rounded text-[8px] font-bold">$20</div>
                                </div>
                                <div className="aspect-square bg-slate-100 rounded relative">
                                    <div className="absolute bottom-1 right-1 bg-white/80 px-1 rounded text-[8px] font-bold">$35</div>
                                </div>
                            </div>
                            <div className="mt-2 text-center text-blue-500 text-xs font-bold border-t pt-1">
                                View Catalog
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (contentKey === "cart_recovery") {
            screenContent = (
                <div className="flex flex-col h-full bg-[#E5DDD5]">
                    <div className="p-4 space-y-4 pt-10">
                        <div className="bg-white p-3 rounded-tr-lg rounded-bl-lg rounded-br-lg shadow-sm">
                            <div className="text-xs font-bold text-slate-800 mb-1">Items left in cart 🛒</div>
                            <div className="text-[10px] text-slate-500 mb-2">Hey! You forgot your sneakers. Complete your order now and get 5% off.</div>
                            <div className="bg-slate-50 p-2 rounded flex gap-2 mb-2">
                                <div className="w-8 h-8 bg-slate-200 rounded"></div>
                                <div>
                                    <div className="text-[10px] font-bold">Nike Air</div>
                                    <div className="text-[9px] text-slate-400">$120.00</div>
                                </div>
                            </div>
                            <div className="text-center text-blue-600 text-xs font-bold">
                                Resume Checkout
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (contentKey === "repurchase_reminders") {
            screenContent = (
                <div className="flex flex-col h-full bg-[#E5DDD5]">
                    <div className="p-4 pt-8">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="text-xs mb-2">Time to restock? 🧴</div>
                            <div className="text-[10px] text-slate-500 mb-3">Hi Sarah, your moisturizer typically runs out in 30 days. Order now to keep your glow!</div>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-[#25D366] text-white text-center py-1.5 rounded text-[10px] font-bold">
                                    Re-order Now
                                </div>
                                <div className="flex-1 bg-slate-100 text-slate-600 text-center py-1.5 rounded text-[10px] font-bold">
                                    Snooze
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (contentKey === "support_automation") {
            screenContent = (
                <div className="flex flex-col h-full bg-[#E5DDD5] p-4 space-y-3">
                    <div className="self-end bg-[#DCF8C6] p-2 rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-[80%] shadow-sm">
                        <div className="text-xs text-slate-800">Where is my order?</div>
                        <div className="text-[9px] text-slate-400 text-right mt-0.5">10:05 AM</div>
                    </div>
                    <div className="self-start bg-white p-2 rounded-tr-lg rounded-bl-lg rounded-br-lg max-w-[80%] shadow-sm">
                        <div className="text-xs text-slate-800">Hi! It's out for delivery today 🚚</div>
                        <div className="text-[9px] text-slate-400 mt-1">Expected: 2:00 PM - 6:00 PM</div>
                    </div>
                    <div className="self-start bg-white p-2 rounded-tr-lg rounded-bl-lg rounded-br-lg max-w-[80%] shadow-sm">
                        <div className="text-xs text-slate-800">Track live: <span className="text-blue-500 underline">track.com/123</span></div>
                    </div>
                </div>
            );
        } else if (contentKey === "feedback_collection") {
            screenContent = (
                <div className="flex flex-col h-full bg-[#E5DDD5] p-4 pt-10">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <div className="text-xs font-bold mb-2">Rate your experience</div>
                        <div className="flex justify-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="text-yellow-400">★</div>)}
                        </div>
                        <div className="text-[10px] text-slate-500 italic">"Love the fast delivery!"</div>
                    </div>
                </div>
            );
        } else {
            // Fallback generic
            screenContent = (
                <div className="flex items-center justify-center h-full text-slate-400 text-xs text-center px-4">
                    Visual for {title}
                </div>
            );
        }

        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800 py-8">
                <div className="relative w-full max-w-[300px] sm:max-w-[380px] h-[600px] sm:h-[700px] bg-slate-900 rounded-[3.5rem] border-[14px] border-slate-900 shadow-2xl overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center gap-2">
                        <div className="w-14 h-1 bg-slate-800 rounded-full mt-1"></div>
                    </div>
                    {/* Status Bar */}
                    <div className="h-10 bg-slate-900 w-full flex items-center justify-between px-8 text-[11px] text-white font-medium absolute top-0 z-20">
                        <span>9:41</span>
                        <div className="flex gap-1 items-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                            <div className="w-6 h-3 border-2 border-white rounded-sm relative">
                                <div className="absolute inset-0.5 bg-white rounded-[1px]"></div>
                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white rounded-r"></div>
                            </div>
                        </div>
                    </div>
                    {/* Body */}
                    <div className="h-full pt-10 bg-white dark:bg-slate-950">
                        {screenContent}
                    </div>
                </div>
            </div>
        );
    }


    // 1. Explicit Visual Type
    if (visualType === 'funnel') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-between py-8 px-4 relative bg-white dark:bg-slate-950 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                {/* Top Row: Source Channels */}
                <div className="flex justify-between items-start w-full max-w-[550px] gap-2 md:gap-4 relative z-10 scale-[0.6] sm:scale-100 origin-top">

                    {/* Card 1: Social Media */}
                    <div className="flex flex-col items-center w-1/4">
                        <div className="w-full bg-green-100 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                            <div className="bg-[#00E785] py-1.5 border-b-2 border-slate-900 text-center">
                                <span className="text-[9px] font-black uppercase text-slate-900 tracking-tighter">Social Media</span>
                            </div>
                            <div className="bg-white p-2 h-20 relative flex flex-wrap justify-center content-center gap-1.5">
                                <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white"><Instagram className="w-3 h-3" /></div>
                                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white"><span className="font-bold text-[8px]">in</span></div>
                                <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center text-white"><span className="font-bold text-[8px]">Tw</span></div>
                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white"><Play className="w-3 h-3 fill-white" /></div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Offline */}
                    <div className="flex flex-col items-center w-1/4 mt-4">
                        <div className="w-full bg-green-100 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                            <div className="bg-[#00E785] py-1.5 border-b-2 border-slate-900 text-center">
                                <span className="text-[9px] font-black uppercase text-slate-900 tracking-tighter">Offline</span>
                            </div>
                            <div className="bg-white p-2 h-20 flex flex-col items-center justify-center gap-1">
                                <div className="w-10 h-10 bg-white border-2 border-slate-900 p-0.5 relative">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                                        <rect x="0" y="0" width="40" height="40" rx="4" />
                                        <rect x="60" y="0" width="40" height="40" rx="4" />
                                        <rect x="0" y="60" width="40" height="40" rx="4" />

                                        <rect x="10" y="10" width="20" height="20" fill="white" />
                                        <rect x="70" y="10" width="20" height="20" fill="white" />
                                        <rect x="10" y="70" width="20" height="20" fill="white" />

                                        <rect x="15" y="15" width="10" height="10" />
                                        <rect x="75" y="15" width="10" height="10" />
                                        <rect x="15" y="75" width="10" height="10" />

                                        <rect x="50" y="50" width="15" height="15" rx="2" />
                                        <rect x="70" y="60" width="10" height="10" />
                                        <rect x="60" y="80" width="30" height="10" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white border border-slate-900 rounded-full flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[6px] font-bold text-slate-500 uppercase tracking-wide">Scan Me</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Ads (Center/Largest) */}
                    <div className="flex flex-col items-center w-[30%] -mt-2">
                        <div className="w-full bg-green-100 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] overflow-hidden transform hover:scale-105 transition-transform">
                            <div className="bg-[#00E785] py-1.5 border-b-2 border-slate-900 text-center px-1">
                                <span className="text-[9px] font-black uppercase text-slate-900 tracking-tighter">Ads on Google, FB</span>
                            </div>
                            <div className="bg-white p-1.5 h-24 flex flex-col gap-1.5">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <div className="h-1 bg-slate-200 w-12 rounded"></div>
                                </div>
                                <div className="w-full h-10 bg-slate-100 rounded border border-slate-200 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover opacity-80" alt="Ad" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="h-1 bg-slate-200 w-8 rounded"></div>
                                    <div className="bg-green-500 text-[6px] text-white px-1.5 py-0.5 rounded font-bold">Msg</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Web */}
                    <div className="flex flex-col items-center w-1/4 mt-4">
                        <div className="w-full bg-green-100 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                            <div className="bg-[#00E785] py-1.5 border-b-2 border-slate-900 text-center">
                                <span className="text-[9px] font-black uppercase text-slate-900 tracking-tighter">Web EXP</span>
                            </div>
                            <div className="bg-white p-2 h-20 flex flex-col items-center justify-center gap-2">
                                <div className="bg-white border md:border-2 border-slate-900 rounded-full px-2 py-1 text-[8px] font-bold shadow-sm whitespace-nowrap">
                                    Chat with us
                                </div>
                                <div className="w-6 h-6 bg-[#00E785] border md:border-2 border-slate-900 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-3 h-3 text-slate-900" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connecting Lines (SVG) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                        {/* Lines converging to center bottom (approx x=300, y=300) from the card centers */}
                        <path d="M100,160 Q 150,280 300,300" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
                        <path d="M220,180 Q 250,260 300,300" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
                        <path d="M300,190 Q 300,250 300,300" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
                        <path d="M500,160 Q 450,280 300,300" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
                    </svg>
                </div>

                {/* Bottom Convergence: Logo + Benefits */}
                <div className="flex flex-col items-center gap-6 relative z-10 w-full mt-auto">
                    {/* Central Logo Node */}
                    <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2 transform translate-y-2">
                        <div className="w-8 h-8 bg-[#00E785] rounded-xl flex items-center justify-center">
                            <span className="font-bold text-slate-900 text-lg">W</span>
                        </div>
                        <span className="font-bold text-xl text-slate-900 tracking-tight">Avelo</span>
                    </div>

                    {/* Benefit Ticks */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 w-full px-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-[#00E785] border border-slate-900 flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-slate-900" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">Auto Lead Capture</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-[#00E785] border border-slate-900 flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-slate-900" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">2-Way Engagement</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-[#00E785] border border-slate-900 flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-slate-900" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">Lower Ads Cost</span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    // 2. Chatbot / Ad Flow Visual (Explicit)
    if (visualType === 'chatbot') {
        return (
            <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-xl overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 scale-90 sm:scale-100">
                    {/* Social Ad Card */}
                    <div className="w-40 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 transform -rotate-3 sm:-rotate-6 transition-transform hover:rotate-0 duration-500">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Instagram Logo */}
                            <div className="w-6 h-6 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                                <Instagram className="w-3.5 h-3.5" />
                            </div>
                            <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Fashion Brand</div>
                        </div>
                        <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg mb-2 overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
                                alt="Product Ad"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div className="bg-blue-500 text-white text-[10px] font-bold text-center py-1.5 rounded-md shadow-md shadow-blue-500/20">
                            Send Message
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="text-slate-300 dark:text-slate-600 rotate-90 sm:rotate-0">
                        <ArrowRight className="w-6 h-6 animate-pulse" />
                    </div>

                    {/* WhatsApp Chat */}
                    <div className="w-40 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 transform rotate-3 sm:rotate-6 transition-transform hover:rotate-0 duration-500">
                        <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">W</div>
                            <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Brand</div>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg rounded-tl-none text-[8px] text-slate-600 dark:text-slate-300">
                                Hey! I saw your ad on Instagram.
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg rounded-tr-none text-[8px] text-slate-600 dark:text-slate-300">
                                Hi! Here is your 20% discount code: SAVE20
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>
        )
    }

    // 2.4. Analytics Insights Visual
    if (visualType === 'analytics_insights') {
        return (
            <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-[600px] flex flex-col gap-4">

                    {/* Top Section: Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[440px]">

                        {/* Left: Tall Analytics Card - Pink */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#FFF0F5] dark:bg-pink-900/20 rounded-[2rem] p-6 flex flex-col justify-between border-2 border-slate-900 shadow-sm relative overflow-visible"
                        >
                            <div className="space-y-4 relative z-10">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                                    Analyze complete campaign performance with real-time analytics
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Get a granular view of your WhatsApp campaigns to understand engagement, optimize messaging, and improve ROI.
                                </p>
                            </div>

                            {/* Overlapping Stats Visual */}
                            <div className="relative z-10 mt-4">
                                <div className="bg-white/80 dark:bg-slate-900/60 rounded-2xl p-4 shadow-sm backdrop-blur-sm border border-slate-100">
                                    <div className="flex items-center justify-center translate-x-1">
                                        {/* Green Card */}
                                        <div className="w-16 h-16 bg-green-400 rounded-xl flex flex-col items-center justify-center text-white shadow-md z-30 -mr-3 border-2 border-white transform hover:-translate-y-1 transition-transform">
                                            <div className="text-[9px] font-bold">Sent</div>
                                            <div className="text-lg font-black leading-none">100</div>
                                        </div>
                                        {/* Blue Card */}
                                        <div className="w-16 h-16 bg-blue-400 rounded-xl flex flex-col items-center justify-center text-white shadow-md z-20 -mr-3 border-2 border-white transform hover:-translate-y-1 transition-transform">
                                            <div className="text-[9px] font-bold">Delivered</div>
                                            <div className="text-lg font-black leading-none">80</div>
                                        </div>
                                        {/* Purple Card */}
                                        <div className="w-16 h-16 bg-purple-400 rounded-xl flex flex-col items-center justify-center text-white shadow-md z-10 border-2 border-white transform hover:-translate-y-1 transition-transform">
                                            <div className="text-[9px] font-bold">Read</div>
                                            <div className="text-lg font-black leading-none">40</div>
                                        </div>
                                    </div>
                                    {/* Fake List Skeleton */}
                                    <div className="space-y-2 mt-4 opacity-50">
                                        <div className="h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full w-full"></div>
                                        <div className="h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full w-full"></div>
                                        <div className="h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Stacked Cards */}
                        <div className="flex flex-col gap-4">
                            {/* Top Right: Manage Card - Blueish */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex-1 bg-[#EEF2FF] dark:bg-indigo-900/20 rounded-[2rem] p-5 border-2 border-slate-900 flex flex-col justify-between shadow-sm"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                                        Manage WhatsApp marketing anywhere, anytime
                                    </h3>
                                    <p className="text-[10px] text-slate-500 line-clamp-3 font-medium">
                                        View messages, delegate chats, and respond to customers on the go.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-2.5 shadow-sm border border-slate-100 mt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                                            <MessageCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full w-3/4"></div>
                                            <div className="h-2 bg-slate-50 dark:bg-slate-700/50 rounded-full w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bottom Right: Delivery Card - Green */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 bg-[#F0FFF0] dark:bg-green-900/10 rounded-[2rem] p-5 border-2 border-slate-900 flex flex-col justify-between shadow-sm"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                                        Best WhatsApp delivery rates in the industry
                                    </h3>
                                </div>
                                <div className="flex justify-between items-end mt-2 bg-white/50 dark:bg-slate-800/20 p-3 rounded-2xl border border-green-100">
                                    <div>
                                        <div className="text-2xl font-black text-green-600">99.9%</div>
                                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Delivery</div>
                                    </div>
                                    <div className="h-8 w-px bg-green-200"></div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-blue-600">200</div>
                                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Msg/Sec</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Row: Stats grid - With Thick Borders */}
                    <div className="grid grid-cols-3 gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#E0FBE5] dark:bg-green-900/20 rounded-[1.5rem] p-3 text-center border-2 border-slate-900 shadow-sm"
                        >
                            <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">12K+</div>
                            <div className="text-[9px] font-bold text-slate-700 dark:text-slate-400 uppercase leading-tight mt-1">Clients<br />Served</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-[#E0F7FA] dark:bg-cyan-900/20 rounded-[1.5rem] p-3 text-center border-2 border-slate-900 shadow-sm"
                        >
                            <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">100+</div>
                            <div className="text-[9px] font-bold text-slate-700 dark:text-slate-400 uppercase leading-tight mt-1">Countries<br />Served</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#FFF0F5] dark:bg-pink-900/20 rounded-[1.5rem] p-3 text-center border-2 border-slate-900 shadow-sm"
                        >
                            <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">100M+</div>
                            <div className="text-[9px] font-bold text-slate-700 dark:text-slate-400 uppercase leading-tight mt-1">Monthly<br />Messages</div>
                        </motion.div>
                    </div>

                </div>
            </div>
        )
    }

    // 2.4. Analytics Insights Visual (WRONG)
    if (visualType === 'analytics_insights_WRONG') {
        return (
            <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 dark:border-slate-700 w-full max-w-[600px] flex flex-col gap-4">

                    {/* Top Section: Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[420px]">

                        {/* Left: Tall Analytics Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#FFF0F5] dark:bg-pink-900/20 rounded-[2rem] p-6 flex flex-col justify-between border border-pink-100 dark:border-pink-800/30"
                        >
                            <div className="space-y-3">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                                    Analyze complete campaign performance with real-time analytics
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Get a granular view of your WhatsApp campaigns to understand engagement, optimize messaging, and improve ROI.
                                </p>
                            </div>

                            {/* Stats Blocks Visual */}
                            <div className="bg-white/60 dark:bg-slate-900/40 rounded-2xl p-3 backdrop-blur-sm">
                                <div className="flex gap-2 mb-3">
                                    <div className="bg-green-400 rounded-xl p-2 flex-1 text-center text-white">
                                        <div className="text-[10px] font-bold opacity-90">Sent</div>
                                        <div className="text-xl font-black">100</div>
                                    </div>
                                    <div className="bg-blue-400 rounded-xl p-2 flex-1 text-center text-white">
                                        <div className="text-[10px] font-bold opacity-90">Delivered</div>
                                        <div className="text-xl font-black">80</div>
                                    </div>
                                    <div className="bg-purple-400 rounded-xl p-2 flex-1 text-center text-white">
                                        <div className="text-[10px] font-bold opacity-90">Read</div>
                                        <div className="text-xl font-black">40</div>
                                    </div>
                                </div>
                                {/* Fake List Lines */}
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full w-full"></div>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full w-full"></div>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full w-2/3"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Stacked Cards */}
                        <div className="flex flex-col gap-4">
                            {/* Top Right: Manage Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-5 border-2 border-slate-100 dark:border-slate-700 flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                                        Manage WhatsApp marketing anywhere, anytime
                                    </h3>
                                    <p className="text-[10px] text-slate-500 line-clamp-2">
                                        View messages, delegate chats, and respond to customers on the go.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-700 rounded-xl p-2 shadow-sm border border-slate-100 dark:border-slate-600 mt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <MessageCircle className="w-3 h-3 text-white" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="h-1.5 bg-slate-200 dark:bg-slate-600 rounded w-3/4"></div>
                                            <div className="h-1.5 bg-slate-100 dark:bg-slate-600/50 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bottom Right: Delivery Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 bg-[#F0FFF0] dark:bg-green-900/10 rounded-[2rem] p-5 border border-green-100 dark:border-green-800/30 flex flex-col justify-between"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                                        Best WhatsApp delivery rates in the industry
                                    </h3>
                                </div>
                                <div className="flex justify-between items-end mt-2">
                                    <div>
                                        <div className="text-2xl font-black text-green-600">99.9%</div>
                                        <div className="text-[10px] text-slate-500 font-bold">Delivery</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-blue-600">200</div>
                                        <div className="text-[10px] text-slate-500 font-bold">msg/sec</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Row: Stats grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#E0FBE5] dark:bg-green-900/20 rounded-[1.5rem] p-4 text-center border border-green-100 dark:border-green-800/30"
                        >
                            <div className="text-2xl font-black text-slate-900 dark:text-white">12K+</div>
                            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase leading-tight mt-1">Clients<br />Served</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-[#E0F7FA] dark:bg-cyan-900/20 rounded-[1.5rem] p-4 text-center border border-cyan-100 dark:border-cyan-800/30"
                        >
                            <div className="text-2xl font-black text-slate-900 dark:text-white">100+</div>
                            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase leading-tight mt-1">Countries<br />Served</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#FFF0F5] dark:bg-pink-900/20 rounded-[1.5rem] p-4 text-center border border-pink-100 dark:border-pink-800/30"
                        >
                            <div className="text-2xl font-black text-slate-900 dark:text-white">100M+</div>
                            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase leading-tight mt-1">Monthly<br />Messages</div>
                        </motion.div>
                    </div>

                </div>
            </div>
        )
    }

    // 2.4. Analytics Insights Visual (DASHBOARD)
    if (visualType === 'analytics_insights_DASHBOARD') {
        return (
            <div className="w-full h-full flex flex-col gap-6 p-2 md:p-6">
                {/* Top Large Card: Analytics Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full bg-[#FFF0F5] dark:bg-pink-900/10 rounded-[2.5rem] p-8 md:p-8 border border-pink-100 dark:border-pink-900/20 shadow-sm"
                >
                    <div className="flex flex-col xl:flex-row gap-8 items-center">
                        {/* Text Content */}
                        <div className="xl:w-2/5 space-y-4">
                            <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                Analyze complete campaign performance with real-time analytics
                            </h3>
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                Get a granular view of your WhatsApp campaigns to understand engagement, optimize messaging, and improve ROI.
                            </p>
                        </div>

                        {/* Dashboard Mockup - Right Side */}
                        <div className="xl:w-3/5 w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden text-[10px] md:text-xs">
                            {/* Dashboard Header */}
                            <div className="border-b border-slate-100 dark:border-slate-700 p-3 md:p-4 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                                <div className="font-bold text-slate-700 dark:text-slate-200">Broadcast analytics</div>
                                <div className="text-slate-400">Past 30 Days</div>
                            </div>

                            <div className="p-4 md:p-6 space-y-6">
                                {/* Key Metrics Row */}
                                <div className="grid grid-cols-5 gap-2 md:gap-4">
                                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                        <div className="text-slate-500 mb-1">Sent</div>
                                        <div className="text-lg md:text-xl font-black text-slate-800 dark:text-white">100%</div>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                        <div className="text-slate-500 mb-1">Delivered</div>
                                        <div className="text-lg md:text-xl font-black text-green-600">80%</div>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                        <div className="text-slate-500 mb-1">Read</div>
                                        <div className="text-lg md:text-xl font-black text-blue-600">40%</div>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                        <div className="text-slate-500 mb-1">Replied</div>
                                        <div className="text-lg md:text-xl font-black text-purple-600">20%</div>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                        <div className="text-slate-500 mb-1">Failed</div>
                                        <div className="text-lg md:text-xl font-black text-red-500">2%</div>
                                    </div>
                                </div>

                                {/* Charts Area */}
                                <div className="grid grid-cols-3 gap-4 md:gap-6">
                                    {/* Pie Chart Mockup */}
                                    <div className="col-span-1 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-2 md:p-4 flex flex-col items-center justify-center h-24 md:h-32 relative">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[6px] border-slate-200 dark:border-slate-600 border-t-green-500 border-r-green-500 border-b-blue-500 -rotate-45"></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">Total</div>
                                    </div>

                                    {/* Bar Chart Mockup */}
                                    <div className="col-span-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-2 md:p-4 flex items-end justify-between gap-2 h-24 md:h-32 px-4 md:px-6">
                                        {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                                            <div key={i} className="w-full bg-indigo-400 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.6 + (i * 0.05) }}></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Data Table Rows */}
                                <div className="space-y-2 md:space-y-3">
                                    {[
                                        { name: 'Winter Sale Promo', sent: '2.5k', status: 'Completed', color: 'bg-green-100 text-green-700' },
                                        { name: 'Product Update', sent: '1.2k', status: 'Sending', color: 'bg-blue-100 text-blue-700' },
                                        { name: 'Feedback Request', sent: '850', status: 'Draft', color: 'bg-slate-100 text-slate-700' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 md:p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <div className="font-bold text-slate-700 dark:text-slate-200">{row.name}</div>
                                            <div className="flex items-center gap-3 md:gap-6">
                                                <div className="hidden md:block text-slate-500">{row.sent} contacts</div>
                                                <div className={`px-2 py-1 rounded text-[10px] font-bold ${row.color}`}>{row.status}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Middle Row: Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    {/* Manage Anytime Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#FFF0F5] dark:bg-pink-900/10 rounded-[2.5rem] p-8 md:p-8 border border-pink-100 dark:border-pink-900/20 shadow-sm"
                    >
                        <div className="flex flex-col-reverse md:flex-row gap-6 items-center h-full">
                            <div className="flex-1 space-y-3">
                                <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                    Manage WhatsApp marketing anywhere, anytime
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                                    View messages, delegate chats, and respond to customers on the go.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 flex justify-center">
                                <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-3 shadow-xl border-4 border-slate-100 dark:border-slate-700 max-w-[140px] w-full transform rotate-3">
                                    <div className="h-1 w-8 bg-slate-200 mx-auto rounded-full mb-3"></div>
                                    <div className="space-y-3 mb-2">
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                                            <div className="space-y-1 flex-1">
                                                <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                                                <div className="h-1.5 bg-slate-100 rounded w-2/3"></div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-row-reverse">
                                            <div className="w-6 h-6 rounded-full bg-green-100"></div>
                                            <div className="space-y-1 flex-1">
                                                <div className="h-6 bg-green-50 rounded-lg w-full"></div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                                            <div className="space-y-1 flex-1">
                                                <div className="h-1.5 bg-slate-100 rounded w-3/4"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Delivery Rates Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-[#FFF0F5] dark:bg-pink-900/10 rounded-[2.5rem] p-8 md:p-8 border border-pink-100 dark:border-pink-900/20 shadow-sm"
                    >
                        <div className="flex flex-col gap-6 h-full">
                            <div className="space-y-3">
                                <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                    Best WhatsApp delivery rates in the industry
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                                    Deliver critical marketing messages with best in class delivery rates and speeds upto 200 msg/s.
                                </p>
                            </div>

                            <div className="flex gap-4 mt-auto">
                                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle className="text-green-500 w-5 h-5" />
                                        <span className="font-bold text-slate-700 dark:text-slate-200 text-xs md:text-sm">Delivery</span>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">99.9%</div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap className="text-blue-500 w-5 h-5" />
                                        <span className="font-bold text-slate-700 dark:text-slate-200 text-xs md:text-sm">Speed</span>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">200</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Green Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-[#E0FBE5] dark:bg-green-900/20 rounded-[2rem] p-8 md:p-10 text-center md:text-left shadow-sm border border-green-100 dark:border-green-900/20"
                    >
                        <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">12K+</div>
                        <div className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Clients Served</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-[#E0FBE5] dark:bg-green-900/20 rounded-[2rem] p-8 md:p-10 text-center md:text-left shadow-sm border border-green-100 dark:border-green-900/20"
                    >
                        <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">100+</div>
                        <div className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Countries Served</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-[#E0FBE5] dark:bg-green-900/20 rounded-[2rem] p-8 md:p-10 text-center md:text-left shadow-sm border border-green-100 dark:border-green-900/20"
                    >
                        <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">100M+</div>
                        <div className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Monthly Messages</div>
                    </motion.div>
                </div>
            </div>
        )
    }

    // 2.4. Analytics Insights Visual (OLD)
    if (visualType === 'analytics_insights_OLD') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6 py-8 px-6">
                {/* Top Large Card: Campaign Analytics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-[950px] bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-purple-900/30 rounded-3xl p-10 border-2 border-purple-200 dark:border-purple-800 shadow-2xl"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                        {/* Left: Text (2 columns) */}
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                                Analyze complete campaign performance with real-time analytics
                            </h3>
                            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                Get a granular view of your WhatsApp campaigns to understand engagement, optimize messaging, and improve ROI.
                            </p>
                        </div>

                        {/* Right: Dashboard Visual (3 columns) */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl">
                            {/* Top Stats Row */}
                            <div className="grid grid-cols-5 gap-3 mb-6">
                                <div className="col-span-1 text-center">
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">Sent</div>
                                    <div className="text-4xl font-black text-slate-900 dark:text-white">100</div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">Delivered</div>
                                    <div className="text-4xl font-black text-slate-900 dark:text-white">80</div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">Read</div>
                                    <div className="text-4xl font-black text-slate-900 dark:text-white">40</div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">Clicks</div>
                                    <div className="text-4xl font-black text-slate-900 dark:text-white">0</div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">Failed</div>
                                    <div className="text-4xl font-black text-slate-900 dark:text-white">20</div>
                                </div>
                            </div>

                            {/* Chart and Table Area */}
                            <div className="grid grid-cols-3 gap-4">
                                {/* Pie Chart Placeholder */}
                                <div className="col-span-1">
                                    <div className="w-full aspect-square bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-2xl"></div>
                                </div>

                                {/* Table Rows */}
                                <div className="col-span-2 space-y-3">
                                    {[
                                        { label: 'Broadcast analytics', value: '01-Jan-2024' },
                                        { label: 'Sent', value: '01-Jan-2024' },
                                        { label: 'Delivered', value: '01-Jan-2024' },
                                        { label: 'Performance campaign', value: '01-Jan-2024' }
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center justify-between gap-3">
                                            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">{row.label}</div>
                                            <div className="flex-1 h-2 bg-green-300 dark:bg-green-900/40 rounded-full"></div>
                                            <div className="text-xs text-slate-500 dark:text-slate-500">{row.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Middle Row: Two Medium Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-[950px]">
                    {/* Mobile Management Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-blue-900/30 rounded-3xl p-8 border-2 border-blue-200 dark:border-blue-800 shadow-xl"
                    >
                        <div className="grid grid-cols-2 gap-6 items-center">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                                    Manage WhatsApp marketing anywhere, anytime
                                </h3>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    View messages, delegate chats, and respond to customers on the go.
                                </p>
                            </div>

                            {/* Mobile Chat Mockup */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg">
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                                            <div className="flex-1 space-y-1">
                                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                                                <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Delivery Rates Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-100 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-green-900/30 rounded-3xl p-8 border-2 border-green-200 dark:border-green-800 shadow-xl"
                    >
                        <div className="grid grid-cols-2 gap-6 items-center">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                                    Best WhatsApp delivery rates in the industry
                                </h3>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    Deliver critical marketing messages with best in class delivery rates and speeds upto 200 messages/second for enterprise customers.
                                </p>
                            </div>

                            {/* Stats Display */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Delivery marketing</div>
                                        <div className="text-3xl font-black text-green-600">99.9%</div>
                                        <div className="text-[10px] text-slate-400">Reliability</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Messages/second</div>
                                        <div className="text-3xl font-black text-blue-600">200</div>
                                        <div className="text-[10px] text-slate-400">For enterprise</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Three Stats Cards */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[950px]"
                >
                    <div className="bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-900/40 dark:to-emerald-900/40 rounded-3xl p-8 border-2 border-green-300 dark:border-green-700 shadow-lg">
                        <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">12K+</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Clients<br />Served</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-3xl p-8 border-2 border-blue-300 dark:border-blue-700 shadow-lg">
                        <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">100+</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Countries<br />Served</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 rounded-3xl p-8 border-2 border-purple-300 dark:border-purple-700 shadow-lg">
                        <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">100M+</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Monthly<br />Messages</div>
                    </div>
                </motion.div>
            </div>
        )
    }

    // 2.5. Broadcast Popup Visual (Broadcast Flow Visualization)
    if (visualType === 'broadcast_popup') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6 py-8 px-4">
                {/* Top Row: Main Analytics Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-[900px]">
                    {/* Analytics Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-6 border-2 border-slate-900 dark:border-slate-700 shadow-xl"
                    >
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                            Analyze complete campaign performance<br />with real-time analytics
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Get a granular view of your WhatsApp campaigns to understand engagement, optimize messaging, and improve ROI.
                        </p>

                        {/* Mini Dashboard Mockup */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
                            <div className="flex gap-2 mb-3">
                                <div className="flex-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg p-3 text-white">
                                    <div className="text-xs font-bold mb-1">Sent</div>
                                    <div className="text-2xl font-black">100</div>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg p-3 text-white">
                                    <div className="text-xs font-bold mb-1">Delivered</div>
                                    <div className="text-2xl font-black">80</div>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-3 text-white">
                                    <div className="text-xs font-bold mb-1">Read</div>
                                    <div className="text-2xl font-black">40</div>
                                </div>
                            </div>

                            {/* Table Rows */}
                            <div className="space-y-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                        <div className="flex-1 h-2 bg-green-200 dark:bg-green-900/30 rounded"></div>
                                        <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Two Stacked Cards */}
                    <div className="flex flex-col gap-4">
                        {/* Mobile Management Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6 border-2 border-slate-900 dark:border-slate-700 shadow-xl"
                        >
                            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
                                Manage WhatsApp marketing<br />anywhere, anytime
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                View messages, delegate chats, and respond to customers on the go.
                            </p>

                            {/* Mobile Mockup */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                                        <div className="h-1.5 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                                    <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Rates Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6 border-2 border-slate-900 dark:border-slate-700 shadow-xl"
                        >
                            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
                                Best WhatsApp delivery rates<br />in the industry
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                Send critical transactional messages with best in class delivery rates and scale upto 200 messages/second for enterprise customers.
                            </p>

                            {/* Stats Display */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-green-600">99.9%</div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Delivery</div>
                                    </div>
                                    <div className="w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-blue-600">200</div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">msg/sec</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Row: Stats Cards */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[900px]"
                >
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border-2 border-slate-900 dark:border-slate-700 shadow-lg">
                        <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">12K+</div>
                        <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Clients Served</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border-2 border-slate-900 dark:border-slate-700 shadow-lg">
                        <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">100+</div>
                        <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Countries Served</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border-2 border-slate-900 dark:border-slate-700 shadow-lg">
                        <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">100M+</div>
                        <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Monthly Messages</div>
                    </div>
                </motion.div>
            </div>
        )
    }

    // 3. Phone / Message Preview (Broadcasting, Notifications, Recovery)
    if (t.includes('broadcast') || t.includes('message') || t.includes('notification') || t.includes('recovery') || t.includes('reminders')) {
        return (
            <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-br from-slate-50 to-blue-50/20 dark:from-slate-900 dark:to-slate-800 rounded-xl overflow-visible py-12 px-8">
                <div className="relative w-full h-full max-w-[850px] flex flex-col items-center justify-center gap-8">

                    {/* Top Row: Campaign Card + Recipient Cards */}
                    <div className="flex flex-col lg:flex-row items-center gap-6 w-full justify-center">
                        {/* Central Broadcast Card */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-4 border-slate-900 dark:border-slate-700 p-6 w-[380px]">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-slate-200 dark:border-slate-700">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Megaphone className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Campaign</div>
                                        <div className="text-lg font-black text-slate-900 dark:text-white">Winter Sale 2024</div>
                                    </div>
                                </div>

                                {/* Message Preview */}
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-3 mb-3">
                                    <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">🎉 New Winter Collection!</div>
                                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                                        Get 50% OFF on all items! Limited time offer.
                                    </div>
                                    <div className="bg-green-500 text-white text-center py-2 rounded-lg text-xs font-bold">
                                        Shop Now
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-2 text-center">
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Recipients</div>
                                        <div className="text-lg font-black text-green-600">2,847</div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-2 text-center">
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Status</div>
                                        <div className="text-xs font-black text-blue-600">● SENDING</div>
                                    </div>
                                </div>
                            </div>

                            {/* Pulse Animation */}
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-2xl animate-pulse"></div>
                            </div>
                        </motion.div>

                        {/* Arrow */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <ArrowRight className="w-8 h-8 text-green-500 rotate-90 lg:rotate-0" />
                        </motion.div>

                        {/* Recipient Cards Stack */}
                        <div className="flex flex-col gap-3">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-900 dark:border-slate-700 p-3 w-[180px]"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold">
                                        JD
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">John Doe</div>
                                        <div className="text-[9px] text-green-600 flex items-center gap-1">
                                            <CheckCircle className="w-2.5 h-2.5" /> Delivered
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-900 dark:border-slate-700 p-3 w-[180px]"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-xs font-bold">
                                        SM
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Sarah M.</div>
                                        <div className="text-[9px] text-purple-600 flex items-center gap-1">
                                            👁️ Read
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-900 dark:border-slate-700 p-3 w-[180px]"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-xs font-bold">
                                        MK
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Mike K.</div>
                                        <div className="text-[9px] text-blue-600 flex items-center gap-1">
                                            🎯 Clicked
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Row: Stats Cards */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex gap-4 justify-center w-full"
                    >
                        {/* Delivery Rate */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-4 min-w-[160px]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Delivery</div>
                                    <div className="text-2xl font-black text-green-600">98.5%</div>
                                </div>
                            </div>
                        </div>

                        {/* Read Rate */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-4 min-w-[160px]">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">👁️</div>
                                <div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Read Rate</div>
                                    <div className="text-2xl font-black text-purple-600">82%</div>
                                </div>
                            </div>
                        </div>

                        {/* Click Rate */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-4 min-w-[160px]">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">🎯</div>
                                <div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Clicks</div>
                                    <div className="text-2xl font-black text-blue-600">1,847</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background Decor */}
                    <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                </div>
            </div>
        )
    }

    // 3. Phone / Message Preview (Broadcasting, Notifications, Recovery)
    if (t.includes('broadcast') || t.includes('message') || t.includes('notification') || t.includes('recovery') || t.includes('reminders')) {
        return (
            <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-br from-slate-50 to-blue-50/20 dark:from-slate-900 dark:to-slate-800 rounded-xl overflow-hidden py-12 px-8">
                <div className="relative w-full h-full max-w-[700px] flex items-center justify-center">

                    {/* Central Broadcast Hub */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* Main Broadcast Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-4 border-slate-900 dark:border-slate-700 p-8 w-[320px]">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-200 dark:border-slate-700">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Megaphone className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Campaign</div>
                                        <div className="text-lg font-black text-slate-900 dark:text-white">Winter Sale 2024</div>
                                    </div>
                                </div>

                                {/* Message Preview */}
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 mb-4">
                                    <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">🎉 New Winter Collection!</div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Get 50% OFF on all items! Limited time offer.
                                    </div>
                                    <div className="mt-3 bg-green-500 text-white text-center py-2 rounded-lg text-xs font-bold">
                                        Shop Now
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Recipients</div>
                                        <div className="text-xl font-black text-green-600">2,847</div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Status</div>
                                        <div className="text-xs font-black text-blue-600 mt-1">● SENDING</div>
                                    </div>
                                </div>
                            </div>

                            {/* Pulse Animation */}
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-2xl animate-pulse"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Animated Message Cards Flying Out - Adjusted positions */}
                    {/* Top Right */}
                    <motion.div
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: 200, y: -160, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, type: "spring" }}
                        className="absolute left-1/2 top-1/2 w-[160px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-3 transform -rotate-6 z-30"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold">
                                JD
                            </div>
                            <div className="flex-1">
                                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">John Doe</div>
                                <div className="text-[9px] text-green-600 flex items-center gap-1">
                                    <CheckCircle className="w-2.5 h-2.5" /> Delivered
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: 230, y: -20, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5, type: "spring" }}
                        className="absolute left-1/2 top-1/2 w-[160px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-3 transform rotate-3 z-30"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-xs font-bold">
                                SM
                            </div>
                            <div className="flex-1">
                                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Sarah M.</div>
                                <div className="text-[9px] text-purple-600 flex items-center gap-1">
                                    👁️ Read
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Right */}
                    <motion.div
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: 200, y: 120, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.7, type: "spring" }}
                        className="absolute left-1/2 top-1/2 w-[160px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-3 transform -rotate-3 z-30"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-xs font-bold">
                                MK
                            </div>
                            <div className="flex-1">
                                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Mike K.</div>
                                <div className="text-[9px] text-blue-600 flex items-center gap-1">
                                    🎯 Clicked
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Cards - Floating Around */}
                    {/* Delivery Rate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="absolute left-[5%] top-[12%] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-3 transform -rotate-6 z-30"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Delivery</div>
                                <div className="text-xl font-black text-green-600">98.5%</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Read Rate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="absolute left-[5%] bottom-[18%] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-3 transform rotate-6 z-30"
                    >
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">👁️</div>
                            <div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Read Rate</div>
                                <div className="text-xl font-black text-purple-600">82%</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Click Rate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="absolute right-[8%] bottom-[12%] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-900 dark:border-slate-700 p-3 transform -rotate-3 z-30"
                    >
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">🎯</div>
                            <div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Clicks</div>
                                <div className="text-xl font-black text-blue-600">1,847</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background Decor */}
                    <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                        <motion.line
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            x1="50%" y1="50%" x2="65%" y2="25%"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="text-green-500"
                        />
                        <motion.line
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            x1="50%" y1="50%" x2="70%" y2="48%"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="text-purple-500"
                        />
                        <motion.line
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            x1="50%" y1="50%" x2="65%" y2="72%"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="text-blue-500"
                        />
                    </svg>
                </div>
            </div>
        )
    }

    // 3. Phone / Message Preview (Broadcasting, Notifications, Recovery)
    if (t.includes('broadcast') || t.includes('message') || t.includes('notification') || t.includes('recovery') || t.includes('reminders')) {
        return (
            <div className="w-[280px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden relative scale-90 sm:scale-100 transition-transform">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>
                {/* Status Bar */}
                <div className="h-8 bg-slate-800 w-full flex items-center justify-between px-6 text-[10px] text-white">
                    <span>9:41</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-3 h-2 bg-white rounded-sm"></div>
                    </div>
                </div>
                {/* Chat Header */}
                <div className="bg-slate-800 p-4 flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold">W</div>
                    <div className="text-sm font-medium">Avelo</div>
                </div>
                {/* Chat Area */}
                <div className="bg-[#e5ddd5] dark:bg-slate-800 inset-0 h-[400px] p-4 space-y-4 relative">
                    <div className="bg-white dark:bg-slate-700 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm max-w-[85%] text-xs text-slate-800 dark:text-slate-200">
                        Hello! 👋 Check out our summer collection with 50% OFF.
                    </div>
                    <div className="bg-white dark:bg-slate-700 p-2 rounded-xl shadow-sm max-w-[85%] overflow-hidden">
                        <div className="h-24 bg-slate-100 dark:bg-slate-600 rounded-lg mb-2 flex items-center justify-center">
                            <Megaphone className="w-8 h-8 text-slate-300" />
                        </div>
                        <div className="space-y-1 px-1">
                            <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded w-3/4"></div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded w-1/2"></div>
                        </div>
                        <div className="mt-3 text-center py-2 bg-green-50 dark:bg-slate-600 text-green-600 dark:text-green-400 text-xs font-bold rounded-lg cursor-pointer">
                            Shop Now
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 4. Analytics / Dashboard (Analytics, Insights, Reports, Engagement)
    if (t.includes('analytics') || t.includes('tracking') || t.includes('reports') || t.includes('monitor') || t.includes('engagement')) {
        return (
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Campaign Performance</div>
                    <div className="text-xs text-slate-400">Last 7 Days</div>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-end gap-2 h-32 justify-between px-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-6 bg-green-500 rounded-t-sm relative group cursor-pointer" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {h * 12} msgs
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                            <div className="text-xs text-slate-500">Delivered</div>
                            <div className="text-lg font-bold text-slate-700 dark:text-slate-300">98.5%</div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                            <div className="text-xs text-slate-500">Read Rate</div>
                            <div className="text-lg font-bold text-green-600">82.1%</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default: Generic Card (Enhanced)
    // Deterministic gradient selection
    const gradients = [
        "from-blue-400 to-indigo-500",
        "from-purple-400 to-pink-500",
        "from-emerald-400 to-cyan-500",
        "from-orange-400 to-red-500"
    ];
    const gradient = gradients[title.length % gradients.length];

    return (
        <div className="w-full h-full bg-white dark:bg-slate-950 rounded-2xl shadow-lg flex flex-col overflow-hidden relative max-w-[80%] mx-auto transition-transform hover:scale-[1.02] duration-500">
            <div className="h-10 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50 dark:bg-slate-900">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="p-6 space-y-6 flex-1 bg-white dark:bg-slate-950 relative">
                {/* Real Content Lines */}
                <div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3 mb-2 flex items-center px-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preview</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight mb-2">
                        {title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {description || "Experience the power of our platform with this feature."}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    {/* Box 1: Icon/Feature Highlight */}
                    <div className="h-32 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-4 gap-2 group relative overflow-hidden">
                        {/* CSS Pattern Background */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-slate-900/50 z-0"></div>

                        <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            {Icon ? <Icon className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                        </div>
                        <div className="relative z-10 text-[10px] font-medium text-slate-500 dark:text-slate-400">Active Feature</div>
                    </div>

                    {/* Box 2: Image / Mini Stats */}
                    <div className="h-32 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden relative group">
                        <FeatureImageWithFallback title={title} className="w-full h-full" />
                    </div>
                </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4000ms' }}>
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                    <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-[10px] text-slate-500">Growth</div>
                    <div className="font-bold text-sm text-green-600">+12%</div>
                </div>
            </div>
        </div>
    );
};

const TabbedFeatureSection = ({ section, isEven }: { section: Section, isEven: boolean }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="py-24 px-6 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                    {/* Content Side: Title + Tabs */}
                    <div className="flex-1 space-y-8 text-center lg:text-left w-full">
                        <div>
                            <div className={`inline-flex items-center justify-center lg:justify-start gap-3 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-bold text-xs uppercase mb-4`}>
                                <span>{section.badge}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                                {section.tabs?.[activeTab]?.contentTitle || section.title}
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                {section.tabs?.[activeTab]?.contentDescription || section.description}
                            </p>
                        </div>

                        {/* Interactive Vertical Tabs */}
                        <div className="flex flex-col gap-2 relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 w-full max-w-[400px] mx-auto lg:mx-0 shadow-sm">
                            {section.tabs?.map((tab, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`relative z-10 px-6 py-4 rounded-xl cursor-pointer transition-all duration-300 text-left font-bold text-lg select-none ${activeTab === idx ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    {tab.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Side: Dynamic Preview */}
                    <div className="flex-1 w-full flex items-center justify-center">
                        <div className="relative w-full min-h-[500px] lg:min-h-[750px] max-w-[600px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 lg:p-6">
                            {/* Render different visual based on activeTab */}
                            {renderFeatureVisual(section.tabs![activeTab].label, null, 'tab_visual', section.tabs![activeTab].visualContent)}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
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
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-24 lg:pt-32 pb-12 lg:pb-20 px-6 relative overflow-hidden bg-white dark:bg-background">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-2xl"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 font-semibold text-sm mb-8">
                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                {data.title}
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-bold mb-6 leading-[1.1] text-slate-900 dark:text-white tracking-tight">
                                {data.subtitle}
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
                                {data.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <a
                                    href="https://calendly.com/systrocode/new-meeting"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button size="xl" className="rounded-full px-8 h-14 text-lg bg-[#00E785] hover:bg-[#00c974] text-slate-900 font-bold shadow-lg hover:shadow-green-500/25 transition-all">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        Book Demo
                                    </Button>
                                </a>
                                <QuoteRequestDialog>
                                    <Button size="xl" variant="outline" className="rounded-full h-14 px-8 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-900">
                                        Request a Quote
                                    </Button>
                                </QuoteRequestDialog>
                            </div>
                        </motion.div>

                        {/* Hero Visual Composition */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px] w-full flex items-center justify-center"
                        >
                            {/* Background Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-yellow-100 rounded-full z-0" />

                            {/* Main Phone Frame */}
                            <div className="relative z-10 w-[300px] h-[550px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden flex items-end justify-center">
                                {/* Woman Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80"
                                    alt="Happy user"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Stats Cards */}
                            {/* Cost Card */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-12 left-0 lg:left-10 bg-white p-3 rounded-xl shadow-lg border border-slate-100 w-44 z-20 hidden md:block"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-1">
                                        <img src="/logos/meta.svg" className="w-4 h-4" alt="Meta" />
                                        <span className="font-bold text-slate-700 text-sm">Cost</span>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-[10px] px-1 rounded font-bold">$8.42</span>
                                </div>
                                <div className="h-8 w-full">
                                    <svg viewBox="0 0 100 40" className="w-full h-full stroke-blue-500 fill-none stroke-2">
                                        <path d="M0,30 Q25,35 50,10 T100,20" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Leads Card */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute top-4 right-0 lg:right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-100 w-40 z-20 hidden md:block"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-1">
                                        <img src="/logos/meta.svg" className="w-4 h-4" alt="Meta" />
                                        <span className="font-bold text-slate-700 text-sm">Leads</span>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-[10px] px-1 rounded font-bold">$1.24</span>
                                </div>
                                <div className="h-8 w-full">
                                    <svg viewBox="0 0 100 40" className="w-full h-full stroke-purple-500 fill-none stroke-2">
                                        <path d="M0,40 Q30,40 60,10 T100,5" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* ROI Card */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-48 left-[-20px] bg-white p-3 rounded-xl shadow-lg border border-slate-100 w-44 z-30 hidden md:block"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-1">
                                        <img src="/logos/meta.svg" className="w-4 h-4" alt="Meta" />
                                        <span className="font-bold text-slate-700 text-sm">ROI</span>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-[10px] px-1 rounded font-bold">$1.24</span>
                                </div>
                                <div className="h-8 w-full">
                                    <svg viewBox="0 0 100 40" className="w-full h-full stroke-green-500 fill-none stroke-2">
                                        <path d="M0,35 Q40,40 70,20 T100,5" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Floating App Icons */}
                            <motion.div className="absolute bottom-20 left-0 bg-white p-2 rounded-2xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '4000ms' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-10 h-10" alt="WA" />
                            </motion.div>
                            <motion.div className="absolute bottom-32 left-[-40px] bg-white p-2 rounded-2xl shadow-xl z-10 animate-pulse" style={{ animationDuration: '3000ms' }}>
                                <img src="/logos/instagram.svg" className="w-8 h-8" alt="Insta" />
                            </motion.div>
                            <motion.div className="absolute bottom-40 left-16 bg-white p-2 rounded-full shadow-xl z-30 animate-bounce delay-100" style={{ animationDuration: '5000ms' }}>
                                <img src="/logos/google-ads.svg" className="w-8 h-8" alt="Google Ads" />
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section (New) */}
            <section className="py-12 bg-pink-50/50 dark:bg-slate-900/50 border-y border-pink-100 dark:border-slate-800">
                <div className="container mx-auto text-center">
                    <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
                        Growth-focused marketing teams trust Avelo to unlock WhatsApp's potential
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 w-auto" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 w-auto" />
                        <img src="/logos/shopify-logo.svg" alt="Shopify" className="h-8 w-auto" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg" alt="Zomato" className="h-8 w-auto" />
                        <img src="/logos/hubspot.svg" alt="HubSpot" className="h-8 w-auto" />
                    </div>
                </div>
            </section>

            {/* Stats Section (Conditional) */}
            {data.stats && (
                <section className="bg-slate-900 text-white py-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex flex-wrap justify-center gap-8 px-4">
                            {data.stats.map((stat, i) => (
                                <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 w-full md:flex-1 md:max-w-sm mx-auto">
                                    <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-2">{stat.value}</div>
                                    <div className="text-sm md:text-base text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Feature Details Section (ZiG-ZAG Layout) */}
            {data.sections && (
                <div className="bg-slate-50 dark:bg-background">
                    {data.sections.map((section, i) => {
                        const SectionIcon = section.icon || Icon;
                        const isEven = i % 2 === 0;

                        // Check if this is a tabbed section
                        if (section.tabs) {
                            return <TabbedFeatureSection key={i} section={section} isEven={isEven} />;
                        }

                        return (
                            <section key={i} className="py-24 px-6 overflow-visible">
                                <div className="container mx-auto max-w-6xl">
                                    <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                                        {/* Content Side */}
                                        <div className="flex-1 space-y-6 text-center lg:text-left">
                                            <div className={`inline-flex items-center justify-center lg:justify-start gap-3 px-4 py-2 rounded-full ${section.badge ? 'bg-green-100 text-green-800' : (isEven ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')} dark:bg-slate-800 dark:text-white font-semibold text-sm mb-4`}>
                                                <SectionIcon className="w-5 h-5" />
                                                <span>{section.badge || "Key Feature"}</span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                                                {section.title}
                                            </h2>
                                            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                                {section.description}
                                            </p>

                                            {section.learnMoreUrl ? (
                                                <div className="pt-4">
                                                    <Link to={section.learnMoreUrl}>
                                                        <Button variant="outline" size="lg" className="rounded-full border-2 border-slate-200 dark:border-slate-700 px-8 hover:bg-slate-100 dark:hover:bg-slate-800">
                                                            Learn more <ArrowRight className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="pt-4">
                                                    {/* Default button if generic learn more is needed, or nothing */}
                                                </div>
                                            )}
                                        </div>

                                        {/* Visual Side */}
                                        <div className="flex-1 w-full flex items-center justify-center">
                                            {section.visual === 'funnel' ? (
                                                <div className="relative w-full aspect-[4/3] max-w-[600px] flex items-center justify-center p-0 lg:p-4">
                                                    {renderFeatureVisual(section.title, SectionIcon, section.visual, section.description)}
                                                </div>
                                            ) : section.visual === 'broadcast_popup' ? (
                                                <div className="relative w-full h-full min-h-[600px] max-w-[900px] rounded-3xl overflow-visible border border-slate-200 dark:border-slate-800 shadow-2xl bg-gradient-to-br from-slate-50 to-blue-50/20 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                                                    {renderFeatureVisual(section.title, SectionIcon, section.visual, section.description)}
                                                </div>
                                            ) : (
                                                <div className={`relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl ${section.badge === 'Key Feature' ? 'bg-[#e0fbe5]' : (isEven ? 'bg-gradient-to-br from-green-50 to-emerald-100' : 'bg-gradient-to-br from-blue-50 to-indigo-100')} dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-8 lg:p-12`}>
                                                    {renderFeatureVisual(section.title, SectionIcon, section.visual, section.description)}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}



            <LandingFooter />
        </div>
    );
};

export default FeaturePage;


