import { Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Starter",
        price: "1,999",
        description: "Perfect for small businesses just starting out.",
        features: [
            "3 Users Included",
            "1,000 Free Conversations/mo",
            "Standard Support",
            "Broadcast Campaigns",
            "Basic Automation",
            "Unlimited Contacts"
        ],
        cta: "Get Started",
        variant: "outline"
    },
    {
        name: "Growth",
        price: "4,499",
        description: "For growing teams that need more power.",
        features: [
            "5 Users Included",
            "10,000 Conversations/mo",
            "Priority Support",
            "Advanced Flow Builder",
            "AI Chatbot Integration",
            "Team Inbox (5 Agents)"
        ],
        popular: true,
        cta: "Get Started",
        variant: "whatsapp"
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Custom solutions for large organizations.",
        features: [
            "10+ Users Included",
            "Unlimited Conversations",
            "Dedicated Account Manager",
            "Custom Import/Export",
            "SLA & Priority Support",
            "On-premise Deployment"
        ],
        cta: "Contact Sales",
        variant: "outline"
    }
];

const Pricing = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <LandingHeader />

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Simple, transparent pricing
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Choose the plan that fits your business needs. No hidden fees.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative rounded-2xl border p-8 bg-card flex flex-col ${plan.popular
                                    ? 'border-whatsapp shadow-lg shadow-whatsapp/10 ring-1 ring-whatsapp'
                                    : 'border-border'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-whatsapp text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold">
                                            {plan.price !== "Custom" && "₹"}{plan.price}
                                        </span>
                                        {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/auth" className="w-full">
                                    <Button
                                        variant={plan.variant as any}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* FAQ Preview */}
                    <div className="mt-24 text-center">
                        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                            <div className="p-6 rounded-xl bg-muted/30">
                                <h3 className="font-semibold mb-2">How can I see the platform in action?</h3>
                                <p className="text-muted-foreground text-sm">We recommend booking a personalized demo with our team to see how Avelo can work for you.</p>
                            </div>
                            <div className="p-6 rounded-xl bg-muted/30">
                                <h3 className="font-semibold mb-2">Can I change plans later?</h3>
                                <p className="text-muted-foreground text-sm">Absolutely. You can upgrade or downgrade your plan at any time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Pricing;
