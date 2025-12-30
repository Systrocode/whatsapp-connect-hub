
import React from 'react';
import {
    Heart,
    Globe,
    Zap,
    Coffee,
    Laptop,
    Users,
    Rocket,
    Smile,
    ArrowRight,
    Code,
    LineChart,
    Headphones,
    PenTool
} from 'lucide-react';
import { LandingFooter } from '../components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-purple-100 dark:selection:bg-purple-900/30">
            <LandingHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-slate-950 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm mb-6">
                        <Rocket className="w-4 h-4" />
                        <span>We're Hiring!</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8">
                        Build the Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Global Communication</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join a passionate team of builders, dreamers, and doers. We're on a mission to empower businesses to connect with their customers on WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12">
                            View Open Roles
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 rounded-full px-8 h-12">
                            Read Our Story
                        </Button>
                    </div>
                </div>
            </section>

            {/* Culture/Values Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4 text-pink-600">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Customer Obsession</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">We start with the customer and work backward. Their success is our success.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Move Fast & Ship</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">We believe in rapid iteration and learning. Done is better than perfect.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 text-green-600">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Global Mindset</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">We build for the world. Our team works from 10+ countries across 4 continents.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">One Team</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">We leave egos at the door. We support each other and win together.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Teams Section (Instead of Jobs) */}
            <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Where You Can Make an Impact
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            We hire exceptional talent across these key departments. Find where you fit in.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Team Card 1 */}
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-200 dark:hover:border-purple-800 transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                                    <Code className="w-8 h-8" />
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Engineering & Product</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Build scalable systems that handle millions of messages daily. Work with React, Node.js, and AI technologies to create seamless experiences.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">Backend</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">Frontend</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">DevOps</span>
                            </div>
                        </div>

                        {/* Team Card 2 */}
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-200 dark:hover:border-purple-800 transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl text-green-600">
                                    <LineChart className="w-8 h-8" />
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-green-600 transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Growth & Marketing</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Tell our story to the world. Drive user acquisition through creative campaigns, content marketing, and data-driven experiments.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">SEO</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">Content</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">Performance</span>
                            </div>
                        </div>

                        {/* Team Card 3 */}
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-200 dark:hover:border-purple-800 transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600">
                                    <Headphones className="w-8 h-8" />
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-purple-600 transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Customer Success</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Be the face of WA Business. Help our clients succeed by providing world-class support, onboarding, and strategic advice.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">Support</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">Account Mgmt</span>
                            </div>
                        </div>

                        {/* Team Card 4 */}
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-200 dark:hover:border-purple-800 transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600">
                                    <PenTool className="w-8 h-8" />
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-orange-600 transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Design & Creative</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Craft beautiful, intuitive interfaces. From product UI to marketing assets, define the visual language of our brand.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">UI/UX</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">Graphic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Perks Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16">
                        Perks of the Job
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-700 dark:text-slate-300">
                                <Laptop className="w-8 h-8" />
                            </div>
                            <div className="font-bold mb-1">Remote-First</div>
                            <div className="text-sm text-slate-500">Work from anywhere</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-700 dark:text-slate-300">
                                <Heart className="w-8 h-8" />
                            </div>
                            <div className="font-bold mb-1">Health & Wellness</div>
                            <div className="text-sm text-slate-500">Comprehensive coverage</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-700 dark:text-slate-300">
                                <Coffee className="w-8 h-8" />
                            </div>
                            <div className="font-bold mb-1">Unlimited PTO</div>
                            <div className="text-sm text-slate-500">Rest & recharge</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-700 dark:text-slate-300">
                                <Smile className="w-8 h-8" />
                            </div>
                            <div className="font-bold mb-1">Team Retreats</div>
                            <div className="text-sm text-slate-500">Twice a year offsites</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 bg-purple-900 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to do your best work?</h2>
                    <p className="text-purple-200 text-lg mb-8">
                        We are always looking for talented individuals to join our team. Even if you don't see an open role, we'd love to hear from you.
                    </p>
                    <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-100 rounded-full px-8 h-14 font-bold text-lg">
                        Email Us: careers@wabusiness.com
                    </Button>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
