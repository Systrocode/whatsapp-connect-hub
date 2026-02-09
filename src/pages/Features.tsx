
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { pages } from "./FeaturePage";

export default function Features() {
    // Filter only feature pages from the shared config
    const features = Object.entries(pages).filter(([key, data]) => {
        // Simple heuristic: if it has an icon function or specific keys, it's a feature
        // Or if you have a way to distinguish solutions from features in your config
        // For now, let's include all entries that look like features
        return ["whatsapp-broadcasting", "ai-whatsapp-chatbot", "click-to-whatsapp-ads", "whatsapp-payments", "whatsapp-forms", "whatsapp-catalog"].includes(key);
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <LandingHeader />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-6">
                            Powerful Features for <br />
                            <span className="text-green-600">Growth</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Everything you need to automate, sell, and support on WhatsApp.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map(([slug, feature]) => (
                            <Link
                                key={slug}
                                to={`/features/${slug}`}
                                className="group bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300"
                            >
                                <div className="mb-6 w-16 h-16 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                    {/* Render icon if it's a component, or just a placeholder */}
                                    {typeof feature.icon === 'function' ? (
                                        <feature.icon className="w-8 h-8" />
                                    ) : (
                                        <div className="w-8 h-8 bg-green-500 rounded-full" />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                                    {feature.description}
                                </p>
                                <div className="flex items-center text-green-600 font-bold text-sm group-hover:gap-2 transition-all">
                                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
