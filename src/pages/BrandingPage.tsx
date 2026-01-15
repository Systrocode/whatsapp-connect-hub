import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Download, Check, X, MessageSquare, Palette, Type, Shield, FileImage, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";

const BrandingPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                            Brand Assets
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Avelo <span className="text-green-600">Brand Kit</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Our brand is our story. Here are the tools, guidelines, and assets you need to communicate our identity effectively and consistently.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 px-8 h-12 shadow-lg hover:shadow-xl transition-all">
                                <Download className="w-5 h-5 mr-2" />
                                Download Full Kit (ZIP)
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Colors Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/3 sticky top-24">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <Palette className="w-8 h-8 text-slate-400" />
                                Our Colors
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Our color palette is rooted in nature and technology. Our primary green represents growth and reliability, while our slate grays provide a solid, modern foundation.
                            </p>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">Usage Tips</div>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Use Primary Green for primary actions.</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Use Slate 900 for headings.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            {/* Primary Green */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-slate-800 group">
                                <div className="h-40 bg-[#00E785] rounded-xl mb-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                </div>
                                <div className="px-2 pb-2">
                                    <div className="font-bold text-slate-900 dark:text-white mb-1">Primary Green</div>
                                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                                        <span>#00E785</span>
                                        <span>RGB 0, 231, 133</span>
                                    </div>
                                </div>
                            </div>

                            {/* Slate 900 */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-slate-800 group">
                                <div className="h-40 bg-[#0f172a] rounded-xl mb-4 relative overflow-hidden"></div>
                                <div className="px-2 pb-2">
                                    <div className="font-bold text-slate-900 dark:text-white mb-1">Slate 900</div>
                                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                                        <span>#0f172a</span>
                                        <span>RGB 15, 23, 42</span>
                                    </div>
                                </div>
                            </div>

                            {/* Accent Blue */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-slate-800 group">
                                <div className="h-40 bg-[#3b82f6] rounded-xl mb-4 relative overflow-hidden"></div>
                                <div className="px-2 pb-2">
                                    <div className="font-bold text-slate-900 dark:text-white mb-1">Accent Blue</div>
                                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                                        <span>#3b82f6</span>
                                        <span>RGB 59, 130, 246</span>
                                    </div>
                                </div>
                            </div>

                            {/* Surface White */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-slate-800 group">
                                <div className="h-40 bg-white border border-slate-100 rounded-xl mb-4 relative overflow-hidden grid">
                                    <div className="place-self-center text-slate-300 text-xs uppercase font-bold tracking-widest">White</div>
                                </div>
                                <div className="px-2 pb-2">
                                    <div className="font-bold text-slate-900 dark:text-white mb-1">Pure White</div>
                                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                                        <span>#FFFFFF</span>
                                        <span>RGB 255, 255, 255</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Section */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/3 sticky top-24">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <FileImage className="w-8 h-8 text-slate-400" />
                                Our Logo
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                The Avelo logo represents connection and simplicity. Please ensure you use the logo with ample whitespace and avoid modifying its colors or proportions.
                            </p>
                            <Button variant="outline" className="w-full justify-between group">
                                Download Assets <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                            </Button>
                        </div>

                        <div className="md:w-2/3 space-y-8">
                            {/* Logo Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="bg-white dark:bg-slate-950 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                    <div className="flex items-center gap-3 scale-150">
                                        <div className="w-10 h-10 bg-[#00E785] rounded-xl flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-slate-900 fill-current" />
                                        </div>
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Avelo</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-slate-900 p-8 rounded-2xl flex items-center justify-center">
                                        {/* Dark Mode Version */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-[#00E785] rounded-lg flex items-center justify-center">
                                                <MessageSquare className="w-4 h-4 text-slate-900 fill-current" />
                                            </div>
                                            <span className="text-lg font-bold text-white tracking-tight">Avelo</span>
                                        </div>
                                    </div>
                                    <div className="bg-white border p-8 rounded-2xl flex items-center justify-center">
                                        {/* Mark Only */}
                                        <div className="w-12 h-12 bg-[#00E785] rounded-xl flex items-center justify-center shadow-lg">
                                            <MessageSquare className="w-6 h-6 text-slate-900 fill-current" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Clear Space Guide */}
                            <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/30">
                                <div className="absolute top-2 left-2 text-xs font-mono text-slate-400">CLEAR SPACE</div>
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="absolute -inset-6 border border-blue-400/30 bg-blue-400/5 rounded-lg"></div>
                                    <div className="w-10 h-10 bg-[#00E785] rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-slate-900 fill-current" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Avelo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Typography Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <Type className="w-8 h-8 text-slate-400" />
                                Typography
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We use <strong>Inter</strong> for all our digital interfaces and marketing materials. It is clean, modern, and highly legible across all sizes and devices.
                            </p>
                        </div>
                        <div className="md:w-2/3 bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                            <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                                <div className="text-6xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Aa</div>
                                <div className="text-2xl font-bold text-slate-500">Inter</div>
                            </div>

                            <div className="grid gap-6">
                                <div>
                                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Headings (Black / Bold)</div>
                                    <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                        Boost your sales with WhatsApp
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Body (Regular / Medium)</div>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                        The quick brown fox jumps over the lazy dog. Our platform helps you reach customers where they are.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dos and Donts */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center md:justify-start gap-3">
                            <Shield className="w-8 h-8 text-slate-400" />
                            Logo Guidelines
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Correct Usage */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                <Check className="w-5 h-5" /> DO
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border-l-4 border-green-500 shadow-sm h-64 flex items-center justify-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#00E785] rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-slate-900 fill-current" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Avelo</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 pl-1">
                                Use the standard full logo on white or light backgrounds.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                <Check className="w-5 h-5" /> DO
                            </div>
                            <div className="bg-slate-900 p-8 rounded-xl border-l-4 border-green-500 shadow-sm h-64 flex items-center justify-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#00E785] rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-slate-900 fill-current" />
                                    </div>
                                    <span className="text-2xl font-bold text-white tracking-tight">Avelo</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 pl-1">
                                Use the white text version on dark or photo backgrounds.
                            </p>
                        </div>


                        {/* Incorrect Usage */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-red-500 font-bold">
                                <X className="w-5 h-5" /> DON'T
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border-l-4 border-red-500 shadow-sm h-64 flex items-center justify-center relative overflow-hidden">
                                <div className="flex items-center gap-3 transform rotate-12 opacity-50">
                                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-white fill-current" />
                                    </div>
                                    <span className="text-2xl font-bold text-red-500 tracking-tight">Avelo</span>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Never change colors</div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 pl-1">
                                Do not change the logo colors or apply gradients.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-red-500 font-bold">
                                <X className="w-5 h-5" /> DON'T
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border-l-4 border-red-500 shadow-sm h-64 flex items-center justify-center relative overflow-hidden">
                                <div className="flex items-center gap-3 transform scale-x-50 opacity-50">
                                    <div className="w-10 h-10 bg-[#00E785] rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-slate-900 fill-current" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Avelo</span>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Do not stretch</div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 pl-1">
                                Do not stretch, skew, or distort the logo in any way.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download CTA */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6">Start Building with Avelo</h2>
                            <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
                                Download all the logos, fonts, and assets in one organized ZIP file.
                            </p>
                            <Button size="xl" className="rounded-full bg-[#00E785] text-slate-900 hover:bg-[#00c974] px-10 h-14 font-bold">
                                <Download className="w-5 h-5 mr-2" />
                                Download Complete Kit
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default BrandingPage;
