import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Globe, FileText, CheckCircle, Server } from "lucide-react";

export default function TermsAndPrivacy() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6"
                    >
                        <Shield className="w-4 h-4" />
                        GDPR & CCPA Compliant
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        Terms & Privacy Center
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        Your trust is our top priority. We are committed to protecting your data and adhering to global privacy standards including GDPR and CCPA.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Tabs defaultValue="privacy" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-12">
                            <TabsTrigger value="privacy" className="py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-green-600 data-[state=active]:shadow-sm transition-all font-medium">Privacy Policy</TabsTrigger>
                            <TabsTrigger value="terms" className="py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-green-600 data-[state=active]:shadow-sm transition-all font-medium">Terms of Service</TabsTrigger>
                            <TabsTrigger value="security" className="py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-green-600 data-[state=active]:shadow-sm transition-all font-medium">Security & Compliance</TabsTrigger>
                        </TabsList>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-sm">
                            <TabsContent value="privacy" className="mt-0 space-y-8 animate-in fade-in-50 duration-500">
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Lock className="w-8 h-8 text-green-500" />
                                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Privacy Policy</h2>
                                    </div>
                                    <p className="text-lg text-slate-600 dark:text-slate-300">
                                        At WA Business, we take your privacy seriously. This policy is designed to be clear, transparent, and strict about how we handle—and don't handle—your data.
                                    </p>

                                    <div className="my-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
                                        <h3 className="text-green-700 dark:text-green-400 font-bold text-lg mb-2 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5" />
                                            Our Data Promise
                                        </h3>
                                        <p className="mb-0 text-green-800 dark:text-green-300">
                                            We generally <span className="font-bold underline">DO NOT</span> sell, trade, or share your personal data with third parties for marketing purposes. Your data belongs to you.
                                        </p>
                                    </div>

                                    <h3>1. Data Collection</h3>
                                    <p>
                                        We collect only what is necessary to provide our services:
                                    </p>
                                    <ul>
                                        <li>Account information (Name, Email, Business details).</li>
                                        <li>WhatsApp Business API credentials (stored encrypted).</li>
                                        <li>Usage metrics to improve system performance.</li>
                                    </ul>

                                    <h3>2. Data Usage & Processing</h3>
                                    <p>
                                        We process your data exclusively to:
                                        Enable messaging functionalities via WhatsApp, provide analytics, and manage your subscription.
                                    </p>

                                    <h3>3. European Union (GDPR) Rights</h3>
                                    <p>
                                        If you are located in the EU, you have the right to access, correct, delete, and port your data. We act as a Data Processor while you are the Data Controller of your customer data. We fully support DPA (Data Processing Agreements) upon request.
                                    </p>

                                    <h3>4. USA (CCPA/CPRA)</h3>
                                    <p>
                                        We comply with US privacy laws. We provide mechanisms for you to opt-out of collection and request data deletion ("Right to be Forgotten").
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="terms" className="mt-0 space-y-8 animate-in fade-in-50 duration-500">
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FileText className="w-8 h-8 text-blue-500" />
                                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Terms of Service</h2>
                                    </div>
                                    <p className="text-lg text-slate-600 dark:text-slate-300">
                                        By using WA Business, you agree to these terms. We believe in fair usage and transparent pricing.
                                    </p>

                                    <h3>1. Acceptable Use</h3>
                                    <p>
                                        You agree to use our platform in compliance with WhatsApp's Commerce Policy and Business Policy. Spamming, scamming, or sending unsolicited bulk messages is strictly prohibited and results in immediate termination.
                                    </p>

                                    <h3>2. Service Availability</h3>
                                    <p>
                                        We strive for 99.9% uptime. Scheduled maintenance will be communicated in advance. We are not liable for Meta/WhatsApp downtime.
                                    </p>

                                    <h3>3. Subscription & Refunds</h3>
                                    <p>
                                        Services are billed in advance. You may cancel at any time. Refunds are processed according to our Refund Policy (typically pro-rated for unused time if cancelled within 7 days).
                                    </p>

                                    <h3>4. Liability</h3>
                                    <p>
                                        WA Business is provided "as is". We are not liable for lost profits or data resulting from the use of our service, to the extent permitted by law.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="security" className="mt-0 space-y-8 animate-in fade-in-50 duration-500">
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Shield className="w-8 h-8 text-purple-500" />
                                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Security & Compliance</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
                                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                            <Globe className="w-8 h-8 text-blue-500 mb-4" />
                                            <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Data Residency</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                We utilize top-tier cloud providers (AWS/Google Cloud) with servers located in the US and EU, ensuring low latency and strict data sovereignty compliance.
                                            </p>
                                        </div>
                                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                            <Server className="w-8 h-8 text-green-500 mb-4" />
                                            <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Encryption</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                All data in transit is encrypted via TLS 1.3. Data at rest is encrypted using AES-256 standards.
                                            </p>
                                        </div>
                                    </div>

                                    <h3>Compliance Standards</h3>
                                    <p>
                                        Our infrastructure and processes are designed to align with:
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-6 list-none pl-0 mt-6">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span>GDPR (General Data Protection Regulation)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span>CCPA (California Consumer Privacy Act)</span>
                                        </li>
                                    </ul>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
