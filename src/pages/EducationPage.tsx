
import React from 'react';
import {
    MessageSquare,
    Zap,
    ArrowRight,
    CheckCircle2,
    Globe,
    Layout,
    MessageCircle,
    Users,
    BookOpen,
    GraduationCap,
    School,
    Calendar,
    FileText,
    Bell
} from 'lucide-react';
import { LandingFooter } from '../components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';

export default function EducationPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
            <LandingHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-950 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium text-sm mb-6">
                                <GraduationCap className="w-4 h-4" />
                                <span>WhatsApp for Education</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                                Transform <span className="text-indigo-600 dark:text-indigo-400">Student Engagement</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Automate admissions, support students 24/7, and send campus updates instantly on the app they use most.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12">
                                    Start Free Trial
                                </Button>
                                <Button size="lg" variant="outline" className="border-2 rounded-full px-8 h-12">
                                    Book a Demo
                                </Button>
                            </div>
                        </div>

                        {/* Hero Visual - Admission Bot Mockup */}
                        <div className="flex-1 w-full max-w-lg lg:max-w-none">
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50" />
                                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50" />

                                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative z-10 mx-auto max-w-sm">
                                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <School className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">Admission Bot</div>
                                                <div className="text-xs text-green-500 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                    Online
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 font-medium text-sm">
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-slate-700 dark:text-slate-200">
                                            Hi! 👋 Welcome to City University. How can I help you today?
                                        </div>
                                        <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-white">
                                            I want to check my application status.
                                        </div>
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-slate-700 dark:text-slate-200">
                                            Sure! Please enter your Application ID.
                                        </div>
                                        <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-white">
                                            APP-2024-8921
                                        </div>
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-slate-700 dark:text-slate-200 space-y-2">
                                            <div>ID Verified ✅</div>
                                            <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-700">
                                                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Status</div>
                                                <div className="text-green-600 font-bold">Shortlisted for Interview</div>
                                                <div className="text-xs text-slate-500 mt-1">Date: Dec 15, 2024</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Funnel Section */}
            <section className="py-24 px-4 bg-indigo-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            From Inquiry to Enrollment
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Streamline the entire student lifecycle with automated WhatsApp workflows.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-200 dark:bg-indigo-900/50 -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {/* Step 1 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-center shadow-lg transform hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    📢
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Awareness</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Ads on Instagram & Facebook click-to-WhatsApp</p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-center shadow-lg transform hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    🤖
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Inquiry Bot</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">24/7 FAQ answers, brochure distribution, and lead capture</p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-center shadow-lg transform hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    📝
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Application</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Document submission reminders and status updates</p>
                            </div>

                            {/* Step 4 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-center shadow-lg transform hover:-translate-y-2 transition-all">
                                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                                    🎓
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Enrollment</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Fee payment links and onboarding welcome kits</p>
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
                            Built for Modern Campuses
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1: Automated Admissions */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                                <FileText className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Automated Admissions</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Stop losing leads to slow responses. Qualify prospective students instantly and guide them through the application process.
                            </p>
                            {/* Mockup: Application Form */}
                            <div className="w-full bg-white dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg rounded-tl-none self-start max-w-[80%]">
                                        <div className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300">Application Helper</div>
                                        <div className="text-[9px] text-slate-600 dark:text-slate-300">Please select your preferred course stream:</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="bg-white border border-indigo-200 text-indigo-600 text-[9px] px-2 py-1 rounded-full font-medium">Engineering</div>
                                        <div className="bg-white border border-indigo-200 text-indigo-600 text-[9px] px-2 py-1 rounded-full font-medium">Medical</div>
                                        <div className="bg-white border border-indigo-200 text-indigo-600 text-[9px] px-2 py-1 rounded-full font-medium">Arts</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: Campus Alerts */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-6 text-red-600">
                                <Bell className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Campus Alerts</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Emergency notifications, exam schedule changes, or holiday announcements. Reach 100% of students in seconds.
                            </p>
                            {/* Mockup: Notification */}
                            <div className="w-full bg-white dark:bg-slate-950 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex items-center justify-center">
                                <div className="w-full bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-3 flex gap-3 items-start">
                                    <Bell className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-[10px] font-bold text-red-700 dark:text-red-400">URGENT: Exam Rescheduled</div>
                                        <div className="text-[9px] text-red-600/80 dark:text-red-400/80 mt-1">Math 101 moved to Hall B, 2:00 PM.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3: Student Support */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                <Users className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Student Support 24/7</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Reduce administrative burden. Let AI agents handle repetitive queries about fees, library hours, and hostel rules.
                            </p>
                            {/* Mockup: Support Chat */}
                            <div className="w-full bg-white dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col gap-2">
                                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg rounded-tl-none self-start text-[9px] text-slate-600 dark:text-slate-300 max-w-[80%]">
                                    When is the last date for fee payment?
                                </div>
                                <div className="bg-blue-600 p-2 rounded-lg rounded-tr-none self-end text-[9px] text-white max-w-[80%]">
                                    The deadline is Dec 31st. You can pay online here: [Link]
                                </div>
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
                            Strategic Insights for Campus Leaders
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Make data-backed decisions to boost enrollment and retention.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#F0F5FF] dark:bg-indigo-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#f8fafc] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Application Velocity Tracking</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Visualize the journey from inquiry to enrollment. Identify bottlenecks where students drop off and optimize your funnel instantly.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Live Analytics
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#F0F5FF] dark:bg-indigo-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#f8fafc] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Counselor Performance</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Monitor response times and conversion rates for each admissions counselor. Ensure every student gets the attention they deserve.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Team Reports
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#F0F5FF] dark:bg-indigo-900/10 p-8 rounded-2xl border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#f8fafc] flex flex-col items-start transition-transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Engagement ROI</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-8 flex-1 leading-relaxed">
                                Track the effectiveness of your campus broadcasts. See who opened, who clicked, and who applied after receiving an alert.
                            </p>
                            <div className="px-6 py-2 rounded-full border-2 border-slate-900 dark:border-slate-100 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                Campaign Insights
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
                            Seamless Connections
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Connects with your LMS & CRM
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "HubSpot", logo: "/logos/hubspot.svg" },
                            { name: "Moodle", logo: "https://cdn.worldvectorlogo.com/logos/moodle-1.svg" },
                            { name: "Canvas", logo: "https://cdn.worldvectorlogo.com/logos/canvas-1.svg" },
                            { name: "Salesforce", logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" },
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

            {/* Testimonial */}
            <section className="py-24 px-4 bg-indigo-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-8">
                        {[1, 2, 3, 4, 5].map(i => (
                            <Sparkles key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                    </div>
                    <blockquote className="text-2xl md:text-4xl font-medium leading-relaxed mb-8">
                        "We saw a 40% increase in completed applications after implementing the WhatsApp Admission Bot. It's transformed how we connect with Gen Z."
                    </blockquote>
                    <div>
                        <div className="font-bold text-xl">Dr. Sarah Thompson</div>
                        <div className="text-indigo-200">Dean of Admissions, Westlake University</div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
    );
}
