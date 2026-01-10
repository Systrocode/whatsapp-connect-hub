import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Megaphone, DollarSign, Clock, Share2, CheckCircle2, TrendingUp, Gift } from "lucide-react";

export default function AffiliateProgram() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <LandingHeader />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 bg-slate-50 dark:bg-slate-900/50">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-semibold mb-6">
                            <Megaphone className="w-4 h-4" />
                            <span>Affiliate Program</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                            Earn money by promoting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">WA Business</span>
                        </h1>

                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Join our affiliate program and earn 20% recurring commission for every customer you refer. It's free to join and easy to start.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-14 px-8 shadow-xl shadow-purple-500/20" asChild>
                                <a href="#join">Become an Affiliate</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">How it Works</h2>

                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            <div className="space-y-6 relative">
                                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto text-purple-600 mb-6">
                                    <Share2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold">1. Join & Share</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Sign up for our affiliate program instantly. Get your unique referral link and share it with your audience.</p>
                            </div>

                            <div className="space-y-6 relative">
                                <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto text-pink-600 mb-6">
                                    <Clock className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold">2. Track & Convert</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">We use a 60-day cookie window. If your referral signs up within 60 days, you get qualified.</p>
                            </div>

                            <div className="space-y-6 relative">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
                                    <DollarSign className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold">3. Earn Recurringly</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Earn 20% commission on every payment your referral makes, for as long as they stay with us.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Join */}
                <section className="bg-slate-900 text-white py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Why become an Affiliate?</h2>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    We provide everything you need to succeed. Our high-converting landing pages and quality product make it easy to recommend us.
                                </p>

                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                                        <span className="font-medium">Industry-leading 20% recurring commission</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                                        <span className="font-medium">60-day cookie duration</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                                        <span className="font-medium">Monthly payouts via PayPal or Wise</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                                        <span className="font-medium">Dedicated Affiliate Manager</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-2xl bg-slate-800 p-8 border border-slate-700">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-xl">$</div>
                                    <div>
                                        <div className="text-sm text-slate-400">Potential Earnings</div>
                                        <div className="text-2xl font-bold">$1,500 / mo</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>10 Referrals</span>
                                        <span>Target: 20 Refs</span>
                                    </div>
                                </div>
                                <p className="mt-6 text-sm text-slate-400 italic">
                                    "Promoting WA Business is the easiest passive income I've ever made. The product sells itself!"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Frequently Asked Questions</h2>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is there a fee to join?</AccordionTrigger>
                                <AccordionContent>
                                    No, joining our affiliate program is completely free.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>How much can I earn?</AccordionTrigger>
                                <AccordionContent>
                                    There is no cap on earnings. You earn 20% of every payment made by customers you refer. If you refer a customer who pays $100/mo, you earn $20/mo passively.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>When do I get paid?</AccordionTrigger>
                                <AccordionContent>
                                    Payouts are processed monthly for all commissions earned in the previous month, provided you have reached the minimum payout threshold of $50.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Can I run ads?</AccordionTrigger>
                                <AccordionContent>
                                    You can run ads to your own content, but you are not permitted to bid on our brand keywords (WA Business, etc.) in search engines.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>

                {/* Join Program CTA */}
                <section id="join" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30">
                    <div className="max-w-xl mx-auto bg-white dark:bg-card p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600 mb-8">
                            <TrendingUp className="w-10 h-10" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Start Earning Today</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                            Join our affiliate program instantly. No approval wait time. Sign up, get your link, and start earning.
                        </p>

                        <div className="space-y-4">
                            <Button size="lg" className="w-full py-8 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all" asChild>
                                <Link to="/auth?tab=signup&redirect=/dashboard/affiliate">
                                    Join Affiliate Program Now
                                </Link>
                            </Button>

                            <p className="text-sm text-slate-400">
                                Already have an account? <Link to="/auth?redirect=/dashboard/affiliate" className="text-purple-600 hover:underline">Log in</Link>
                            </p>
                        </div>
                    </div>
                </section>

            </main>

            <LandingFooter />
        </div>
    );
}
