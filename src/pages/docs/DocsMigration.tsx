import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, XCircle, ArrowRight, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const DocsMigration = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
            <LandingHeader />

            <main className="pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/docs" className="hover:text-primary transition-colors">Docs</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium">Migration Guide</span>
                </div>

                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4 border-b border-border pb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Migration Center
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                            Migrating from Wati, Aisensy, or Interakt
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                            Moving your WhatsApp Business API number to our platform is simple and takes less than 5 minutes.
                            This guide covers what transfers, what doesn't, and the critical steps you must take to ensure a smooth switch.
                        </p>
                    </div>

                    {/* What Transfers Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6" /> What WILL Transfer
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Your Phone Number (unchanged)",
                                    "Display Name & Green Tick",
                                    "Quality Rating & Messaging Limits",
                                    "Official Business Account (OBA) Status",
                                    "Approved Message Templates",
                                    "WABA ID & Business Manager Association"
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                                        <span className="text-green-900 dark:text-green-100 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
                                <XCircle className="w-6 h-6" /> What will NOT Transfer
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Chat History / Old Messages",
                                    "Contacts stored in the previous dashboard",
                                    "Tags, Labels, and Attributes from old provider",
                                    "Automated Flow Analytics from old provider",
                                    "Team Member accounts from old provider"
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400" />
                                        <span className="text-red-900 dark:text-red-100 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-xs text-red-800 dark:text-red-200">
                                <strong>Why?</strong> This is a strict limitation by Meta's WhatsApp API. No provider can import old chat history.
                            </div>
                        </div>
                    </div>

                    {/* Critical Prerequisites */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-sm">
                        <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 flex items-center gap-2 mb-2">
                            <ShieldAlert className="w-5 h-5" />
                            CRITICAL: Before You Start
                        </h3>
                        <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                            Ignoring this step is the #1 reason for migration failure.
                        </p>
                        <div className="bg-white dark:bg-black/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                            <h4 className="font-bold text-base mb-1">Disable Two-Step Verification (2FA)</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                You MUST disable Two-Step Verification for this phone number in your current provider's dashboard (Wati/Aisensy) or in your Meta Business Manager before attempting to connect.
                                If 2FA is on, the migration will be rejected by Meta.
                            </p>
                        </div>
                    </div>

                    {/* Step by Step */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Migration Steps</h2>
                        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 space-y-12">
                            {[
                                {
                                    title: "Prepare your Account",
                                    desc: "Log in to your previous provider and disable Two-Step Verification (2FA). Ensure you have Admin access to your Facebook Business Manager."
                                },
                                {
                                    title: "Join with Facebook",
                                    desc: "Go to our Sign Up page and click 'Join with Facebook'. This starts the Unified Onboarding Flow."
                                },
                                {
                                    title: "Select Existing Portfolio",
                                    desc: "In the Meta popup, select your existing Facebook Business Account and the specific WhatsApp Business Account (WABA) you want to migrate."
                                },
                                {
                                    title: "Confirm Migration",
                                    desc: "When you select your existing phone number, Meta will detect it's live elsewhere. A prompt will appear: 'Move this number?'. Click Yes/Confirm."
                                },
                                {
                                    title: "OTP Verification",
                                    desc: "Meta will send a 6-digit SMS or Voice call OTP to your WhatsApp number. Enter it in the popup to verify ownership."
                                },
                                {
                                    title: "Migration Complete",
                                    desc: "Once verified, the popup closes. You will be redirected to your new Dashboard with the number connected and ready to send messages!"
                                }

                            ].map((step, idx) => (
                                <div key={idx} className="relative pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-950" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 bg-slate-900 dark:bg-slate-800 rounded-2xl text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12" />
                        <div className="absolute bottom-0 left-0 p-12 bg-green-500/10 rounded-full blur-3xl -ml-12 -mb-12" />

                        <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to make the switch?</h3>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
                            Join thousands of businesses who have upgraded their WhatsApp stack. It takes less than 5 minutes.
                        </p>
                        <div className="flex justify-center gap-4 relative z-10">
                            <Link to="/auth?mode=signup">
                                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-none">
                                    Start Migration Now <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/docs">
                                <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
                                    Read API Docs
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default DocsMigration;
