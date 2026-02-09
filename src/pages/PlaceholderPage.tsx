import { useParams, useLocation, Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Handshake, BookOpen, Scale, Wrench, Code2, Users, Construction, Sparkles, Megaphone, ShieldCheck } from "lucide-react";

export default function PlaceholderPage() {
    const location = useLocation();
    const slug = location.pathname.split('/').filter(Boolean).pop() || "";

    // Custom title mapping
    const TITLE_MAP: Record<string, string> = {
        'become': 'Become a Partner',
        'affiliate': 'Affiliate Program',
        'ebooks': 'Ebooks & Guides',
        'docs': 'Developer Documentation',
        'stories': 'Client Stories',
        'reviews': 'Customer Reviews',
        'case-studies': 'Case Studies',
        'whatsapp-link-generator': 'WhatsApp Link Generator',
        'qr-code-generator': 'QR Code Generator',
        'chat-button-generator': 'Chat Button Generator',
        'roi-calculator': 'ROI Calculator',
        'legal': 'Terms & Privacy',
        'branding': 'Brand Guidelines',
        'privacy': 'Privacy Policy',
        'terms': 'Terms of Service'
    };

    // Icon mapping based on slug keywords
    const getIcon = () => {
        if (slug.includes('partner') || slug.includes('affiliate') || slug.includes('become')) return Handshake;
        if (slug.includes('ebook') || slug.includes('guide') || slug.includes('stories') || slug.includes('case')) return BookOpen;
        if (slug.includes('legal') || slug.includes('term') || slug.includes('privacy') || slug.includes('brand')) return Scale;
        if (slug.includes('docs') || slug.includes('developer') || slug.includes('api')) return Code2;
        if (slug.includes('tool') || slug.includes('generator') || slug.includes('calc')) return Wrench;
        if (slug.includes('community') || slug.includes('review') || slug.includes('help')) return Users;
        if (slug.includes('market') || slug.includes('blog')) return Megaphone;

        return Construction;
    };

    const IconComponent = getIcon();
    const title = TITLE_MAP[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <LandingHeader />

            <main className="flex-grow flex flex-col items-center justify-center py-32 px-6 text-center">
                <div className="max-w-2xl w-full space-y-12">

                    {/* Hero State */}
                    <div className="space-y-6">
                        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto transform rotate-6 shadow-2xl border-4 ${IconComponent === Construction ? 'bg-yellow-100 border-yellow-200 text-yellow-600' :
                            IconComponent === Handshake ? 'bg-blue-100 border-blue-200 text-blue-600' :
                                IconComponent === Scale ? 'bg-slate-100 border-slate-200 text-slate-600' :
                                    'bg-green-100 border-green-200 text-green-600'
                            }`}>
                            <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {title}
                        </h1>

                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                            We are working hard to build this resource for you.<br />
                            Check back soon for updates.
                        </p>

                        <Button asChild className="mt-8 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" variant="default">
                            <Link to="/">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>


                    {/* Conditional Form for Partners/Affiliate */}
                    {(slug.includes('partner') || slug.includes('affiliate') || slug.includes('become')) && (
                        <div className="max-w-md mx-auto bg-white dark:bg-card p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-left">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Apply for {title}</h3>
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch."); }}>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Work Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@company.com" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company Website</label>
                                    <input type="url" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="https://company.com" />
                                </div>
                                <Button type="submit" className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all">
                                    Submit Application
                                </Button>
                            </form>
                        </div>
                    )}

                    {/* Value Props / Filler Content */}
                    <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-slate-200 dark:border-slate-800">
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="w-12 h-12 bg-white dark:bg-card rounded-xl shadow-sm flex items-center justify-center mb-4 mx-auto text-2xl">⚡</div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Coming Soon</h3>
                            <p className="text-sm text-slate-500">We're moving fast.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="w-12 h-12 bg-white dark:bg-card rounded-xl shadow-sm flex items-center justify-center mb-4 mx-auto text-2xl">🔔</div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Get Notified</h3>
                            <p className="text-sm text-slate-500">Subscribe for updates.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="w-12 h-12 bg-white dark:bg-card rounded-xl shadow-sm flex items-center justify-center mb-4 mx-auto text-2xl">✨</div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Premium Quality</h3>
                            <p className="text-sm text-slate-500">Worth the wait.</p>
                        </div>
                    </div>

                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
