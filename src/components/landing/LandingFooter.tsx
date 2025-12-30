import { Link } from "react-router-dom";
import { MessageSquare, Twitter, Linkedin, Facebook, Instagram, Apple, Play, ShieldCheck, Lock, Server, Calendar } from "lucide-react";

export function LandingFooter() {
    return (
        <div className="bg-white dark:bg-background pt-20 pb-4">
            {/* Top CTA Section */}
            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">
                    Grow Better with WA Business today
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://calendly.com/systrocode/new-meeting"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-full bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition-colors shadow-xl hover:shadow-green-500/25 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                    >
                        <Calendar className="w-5 h-5" />
                        Book Demo
                    </a>
                    <Link
                        to="/auth"
                        className="px-8 py-4 rounded-full border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors w-full sm:w-auto inline-block text-center"
                    >
                        Request a Quote
                    </Link>
                </div>
            </div>

            {/* Dark Footer Card */}
            <div className="container mx-auto px-2 md:px-4 mb-4">
                <footer className="bg-slate-950 rounded-[40px] md:rounded-[60px] p-8 md:p-16 text-slate-400 shadow-2xl">
                    {/* Link Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 mb-20">
                        {/* Column 1: Solutions & Company */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-green-500 font-bold mb-6 text-lg">Solutions</h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li><Link to="/solutions/marketing" className="text-slate-300 hover:text-green-400 transition-colors">Marketing</Link></li>
                                    <li><Link to="/solutions/support" className="text-slate-300 hover:text-green-400 transition-colors">Support</Link></li>
                                    <li><Link to="/solutions/sales" className="text-slate-300 hover:text-green-400 transition-colors">Sales</Link></li>
                                    <li><Link to="/solutions/education" className="text-slate-300 hover:text-green-400 transition-colors">Education</Link></li>
                                    <li><Link to="/solutions/ecommerce" className="text-slate-300 hover:text-green-400 transition-colors">E-Commerce</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-green-500 font-bold mb-6 text-lg">Company</h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li><Link to="/about" className="text-slate-300 hover:text-green-400 transition-colors">About Us</Link></li>
                                    <li><Link to="/careers" className="text-slate-300 hover:text-green-400 transition-colors">Careers</Link></li>
                                    <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Branding</Link></li>
                                    <li><Link to="/terms-privacy" className="text-slate-300 hover:text-green-400 transition-colors">Terms & Privacy</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 2: Customers & Partners */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-green-500 font-bold mb-6 text-lg">Customers</h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li><Link to="/customers/stories" className="text-slate-300 hover:text-green-400 transition-colors">Customer Stories</Link></li>
                                    <li><Link to="/customers/reviews" className="text-slate-300 hover:text-green-400 transition-colors">Reviews</Link></li>
                                    <li><Link to="/customers/case-studies" className="text-slate-300 hover:text-green-400 transition-colors">Case Studies</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-green-500 font-bold mb-6 text-lg">Partner</h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li><Link to="/partners/become" className="text-slate-300 hover:text-green-400 transition-colors">Become a Partner</Link></li>
                                    <li><Link to="/partners/affiliate" className="text-slate-300 hover:text-green-400 transition-colors">Affiliate Program</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: Resources */}
                        <div>
                            <h3 className="text-green-500 font-bold mb-6 text-lg">Resources</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Blog</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Ebooks & Guides</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Webinars</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Developer Docs</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Community</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Help Center</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Integrations */}
                        <div>
                            <h3 className="text-green-500 font-bold mb-6 text-lg">Integrations</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Salesforce</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">HubSpot</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Zoho CRM</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Shopify</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">WooCommerce</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Zapier</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Pipedrive</Link></li>
                                <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Google Sheets</Link></li>
                            </ul>
                        </div>

                        {/* Column 5: Free Tools & App */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-green-500 font-bold mb-6 text-lg">Free Tools</h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">WhatsApp Link Gen</Link></li>
                                    <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">QR Code Gen</Link></li>
                                    <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">Chat Button Gen</Link></li>
                                    <li><Link to="/" className="text-slate-300 hover:text-green-400 transition-colors">ROI Calculator</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-green-500 font-bold mb-6 text-lg">Get the app</h3>
                                <Link to="/" className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors text-slate-300 hover:text-white group">
                                    <span className="font-semibold">Coming Soon</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-12 border-t border-slate-900 flex flex-col lg:flex-row items-end justify-between gap-10">
                        <div className="w-full lg:w-auto">
                            <Link to="/" className="flex items-center gap-3 mb-6 text-white group">
                                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6 text-white fill-current" />
                                </div>
                                <span className="text-3xl font-bold tracking-tight">WA Business</span>
                            </Link>
                            <p className="text-slate-500 text-base mb-8 font-medium">Business Messaging made simple</p>

                            <div className="flex flex-wrap items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800">
                                    <img src="/logos/meta.svg" alt="Meta" className="h-6 w-auto brightness-0 invert" />
                                    <div className="h-8 w-px bg-slate-800"></div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-white font-bold text-xs leading-none mb-1">Meta</span>
                                        <span className="text-slate-400 font-medium text-[10px] leading-none uppercase tracking-wide">Tech Partner</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center lg:justify-end gap-6 opacity-70">
                            <div className="flex items-center gap-2 bg-slate-900/30 px-3 py-1.5 rounded-lg border border-slate-800/50">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                <span className="text-slate-400 font-medium text-xs">GDPR Compliant</span>
                            </div>

                            <div className="flex items-center gap-2 bg-slate-900/30 px-3 py-1.5 rounded-lg border border-slate-800/50">
                                <Server className="w-4 h-4 text-purple-500" />
                                <span className="text-slate-400 font-medium text-xs">SOC 2 Ready</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-600">
                        <p>© {new Date().getFullYear()} WA Business. All rights reserved.</p>
                        <div className="flex gap-6">
                            <SocialLink href="https://twitter.com" icon={Twitter} />
                            <SocialLink href="https://linkedin.com" icon={Linkedin} />
                            <SocialLink href="https://instagram.com" icon={Instagram} />
                            <SocialLink href="https://facebook.com" icon={Facebook} />
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-500 hover:text-green-500 transition-colors"
    >
        <Icon className="w-5 h-5" />
    </a>
);
