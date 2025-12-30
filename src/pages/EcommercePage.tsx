
import React from 'react';
import {
    ShoppingBag,
    Zap,
    ArrowRight,
    CheckCircle2,
    Globe,
    Layout,
    MessageCircle,
    Users,
    CreditCard,
    Truck,
    RefreshCw,
    TrendingUp,
    Smartphone,
    Package
} from 'lucide-react';
import { LandingFooter } from '../components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';

export default function EcommercePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900/30">
            <LandingHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-slate-950 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-sm mb-6">
                                <ShoppingBag className="w-4 h-4" />
                                <span>#1 WhatsApp Solution for Retail</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                                Skyrocket Your <span className="text-emerald-600 dark:text-emerald-400">Store Sales</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Recover abandoned carts, automate order updates, and turn one-time shoppers into loyal customers with WhatsApp.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-12">
                                    Start Free Trial
                                </Button>
                                <Button size="lg" variant="outline" className="border-2 rounded-full px-8 h-12">
                                    View Demo Store
                                </Button>
                            </div>
                        </div>

                        {/* Hero Visual - Cart Recovery Mockup */}
                        <div className="flex-1 w-full max-w-lg lg:max-w-none">
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-200 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50" />
                                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl opacity-50" />

                                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative z-10 mx-auto max-w-sm">
                                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <Smartphone className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">StyleStore Bot</div>
                                                <div className="text-xs text-green-500 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                    Online
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 font-medium text-sm">
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-slate-700 dark:text-slate-200">
                                            Hi Sarah! You left some cool sneakers in your cart. 👟
                                        </div>
                                        {/* Product Card Mockup */}
                                        <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 max-w-[85%] shadow-sm">
                                            <div className="flex gap-3">
                                                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center text-2xl">👟</div>
                                                <div>
                                                    <div className="font-bold text-slate-800 dark:text-slate-200">Air Zoom Pegasus</div>
                                                    <div className="text-slate-500 text-xs mb-1">Size: 8, Color: White</div>
                                                    <div className="font-bold text-emerald-600">$120.00</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-600 p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-white">
                                            Grab them now with 5% OFF? Coupon: ZOOM5
                                        </div>
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-slate-700 dark:text-slate-200">
                                            <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-8 text-xs">Checkout Now</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Funnel Section */}
            <section className="py-24 px-4 bg-emerald-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            From Cart to Conversion
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Automate the friction points in your customer's shopping journey.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-emerald-200 dark:bg-emerald-900/50 -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {/* Step 1 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center shadow-lg hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    🛒
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Add to Cart</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Customer adds item but leaves without paying.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center shadow-lg hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    🔔
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Automated Nudge</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">WhatsApp message sent after 1 hour with image.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center shadow-lg hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    💳
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Instant Checkout</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Customer clicks link and completes purchase.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center shadow-lg hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    📦
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Order Updates</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Auto-updates for Packed, Shipped, and Delicate.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Categories */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Tools to Scale Your Store
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                                <RefreshCw className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Abandoned Cart Recovery</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Recover up to 45% of lost sales. Send automated, personalized reminders that get opened 98% of the time.
                            </p>
                            <div className="w-full bg-white dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
                                <div className="flex justify-between font-bold mb-2">
                                    <span>Recovery Rate</span>
                                    <span className="text-green-500">12.5%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                    <div className="bg-green-500 h-2 rounded-full w-[12%]"></div>
                                </div>
                                <div className="text-right text-slate-400 text-[10px]">Email (1.2%) vs WhatsApp (12.5%)</div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                <Truck className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">COD Confirmation</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Reduce Returns (RTO). Automatically verify Cash on Delivery orders to ensure customer intent before shipping.
                            </p>
                            <div className="w-full bg-white dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
                                <div className="bg-blue-50 text-blue-700 text-[10px] p-2 rounded">
                                    Please confirm your COD Order #8821
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-green-100 text-green-700 text-[10px] px-3 py-1 rounded font-bold">Confirm ✅</div>
                                    <div className="bg-red-100 text-red-700 text-[10px] px-3 py-1 rounded font-bold">Cancel ❌</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                                <Package className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Order Status Notifications</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Reduce "Where is my order?" tickets by 80%. Proactively engage customers at every step of fulfillment.
                            </p>
                            <div className="w-full bg-white dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-xs font-bold">Out for Delivery</span>
                                </div>
                                <div className="text-[10px] text-slate-500">Your package will arrive by 2 PM today!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategy Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Revenue Growth Engine
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Track the metrics that matter most to your bottom line.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#F0FFF4] dark:bg-emerald-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#059669] dark:shadow-[8px_8px_0px_0px_#10b981] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Live Revenue Tracking</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                See exactly how much revenue your WhatsApp campaigns are generating in real-time. Attribute every dollar to a message.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                <TrendingUp className="w-4 h-4 inline mr-2 text-green-500" /> +124% Growth
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#F0FFF4] dark:bg-emerald-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#059669] dark:shadow-[8px_8px_0px_0px_#10b981] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recovery Insights</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Identify which products are abandoned most often and which recovery templates perform best. Optimize for conversion.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Maximize ROI
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#F0FFF4] dark:bg-emerald-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#059669] dark:shadow-[8px_8px_0px_0px_#10b981] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Catalog Performance</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Understand what customers are browsing in your WhatsApp store. Use this data to create targeted broadcasts.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Behavior Analytics
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium text-xs uppercase tracking-wider mb-4">
                            Plug & Play
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Deep Integrations
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Shopify", logo: "/logos/shopify-logo.svg" },
                            { name: "WooCommerce", logo: "/logos/woocommerce.svg" },
                            { name: "BigCommerce", logo: "https://www.vectorlogo.zone/logos/bigcommerce/bigcommerce-ar21.svg" },
                            { name: "Zoho", logo: "/logos/zoho.svg" },
                        ].map((tool, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all cursor-default group">
                                <div className="w-24 h-12 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <img src={tool.logo} alt={`${tool.name} logo`} className="max-w-full max-h-full object-contain" />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <LandingFooter />
        </div>
    );
}
