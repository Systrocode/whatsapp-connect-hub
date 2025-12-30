import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Handshake, Code2, Megaphone, CheckCircle2, Globe2, TrendingUp, Users } from "lucide-react";

export default function PartnerProgram() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <LandingHeader />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 bg-slate-50 dark:bg-slate-900/50">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-6">
                            <Handshake className="w-4 h-4" />
                            <span>WA Business Partner Program</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                            Grow with us in the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">WhatsApp Ecosystem</span>
                        </h1>

                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Join 150+ partners worldwide helping businesses grow with the world's most popular messaging platform. Earn recurring commissions and build your business.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <Button size="lg" className="rounded-full bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-8 shadow-xl shadow-green-500/20" asChild>
                                <a href="#apply">Apply Now</a>
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-2" asChild>
                                <Link to="/">Contact Sales</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-background">
                    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-slate-900 dark:text-white">
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">8,000+</div>
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Customers</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">100+</div>
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Countries</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">150+</div>
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Partners</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">24/7</div>
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Support</div>
                        </div>
                    </div>
                </div>

                {/* Partner Tracks */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Choose your Partner Track</h2>
                            <p className="text-slate-500 dark:text-slate-400">We have a program tailored to your business model.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Solution Partner */}
                            <div className="bg-white dark:bg-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all hover:border-blue-500/50 group">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Globe2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Solution Partner</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                    For agencies and consultancies. Sell, implement, and customize WA Business for your clients.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" /> Recurring commissions
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" /> Sales & Tech support
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" /> Verified Partner Badge
                                    </li>
                                </ul>
                            </div>

                            {/* Technology Partner */}
                            <div className="bg-white dark:bg-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all hover:border-purple-500/50 group">
                                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Code2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Technology Partner</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                    For ISVs and SaaS platforms. Integrate your solution with our API to deliver value.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-purple-500" /> Deep API Integration
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-purple-500" /> Co-marketing opportunities
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-purple-500" /> Marketplace listing
                                    </li>
                                </ul>
                            </div>

                            {/* Affiliate Partner */}
                            <div className="bg-white dark:bg-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all hover:border-green-500/50 group">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Megaphone className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Affiliate Partner</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                    For influencers and content creators. Refer WA Business and earn for every signup.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> 20% commission
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> No setup required
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> 60-day cookie life
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-900/20 to-transparent pointer-events-none" />
                    <div className="max-w-6xl mx-auto relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Why Partner with WA Business?</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold">Recurring Revenue</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">Earn generous commissions to build a sustainable revenue stream.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold">Dedicated Support</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">Get access to priority partner support and dedicated account managers.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                    <Globe2 className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold">Global Reach</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">Partner with a global brand and access customers in 100+ countries.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-6 h-6 text-yellow-400" />
                                </div>
                                <h3 className="text-xl font-bold">Easy Onboarding</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">We provide all the training and assets you need to succeed quickly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section id="apply" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30">
                    <div className="max-w-xl mx-auto bg-white dark:bg-card p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Become a Partner</h2>
                            <p className="text-slate-500 dark:text-slate-400">Fill out the form and we'll be in touch shortly.</p>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const subject = `Partner Application: ${formData.get('company')} - ${formData.get('type')}`;
                            const body = `Name: ${formData.get('first_name')} ${formData.get('last_name')}\nEmail: ${formData.get('email')}\nCompany: ${formData.get('company')}\nType: ${formData.get('type')}`;
                            window.location.href = `mailto:partners@wabusiness.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">First Name</label>
                                    <input name="first_name" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-green-500 outline-none" placeholder="John" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last Name</label>
                                    <input name="last_name" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Work Email</label>
                                <input name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-green-500 outline-none" placeholder="john@company.com" required />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company Name</label>
                                <input name="company" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Acme Inc." required />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Partner Type</label>
                                <select name="type" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-green-500 outline-none text-slate-600 cursor-pointer">
                                    <option>Solution Partner (Agency/Consultancy)</option>
                                    <option>Technology Partner (ISV/SaaS)</option>
                                    <option>Affiliate Partner (Individual)</option>
                                </select>
                            </div>

                            <Button type="submit" className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-green-500/25 transition-all mt-4">
                                Submit Application
                            </Button>
                        </form>
                    </div>
                </section>

            </main>

            <LandingFooter />
        </div>
    );
}
