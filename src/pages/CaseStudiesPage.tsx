import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Download, ArrowRight, TrendingUp, Users, Clock, DollarSign, Calendar } from "lucide-react";

export default function CaseStudiesPage() {
    const caseStudies = [
        {
            title: "How UrbanStyle Recovered $2.4M in Abandoned Carts",
            company: "UrbanStyle Fashion",
            industry: "E-commerce",
            duration: "6 months",
            teamSize: "50-100 employees",
            thumbnail: "🛍️",
            overview: "UrbanStyle Fashion, a leading online fashion retailer, was losing millions in revenue due to cart abandonment. Traditional email recovery campaigns had a dismal 8% open rate.",
            challenge: [
                "65% cart abandonment rate costing $4M+ annually",
                "Email recovery campaigns with only 8% open rates",
                "No real-time customer engagement during shopping journey",
                "Limited personalization in follow-up communications"
            ],
            solution: [
                "Implemented automated WhatsApp cart recovery messages within 1 hour of abandonment",
                "Created personalized product recommendation flows based on browsing history",
                "Set up real-time order tracking and delivery updates",
                "Deployed AI chatbot for instant size and style queries"
            ],
            implementation: "3 weeks",
            results: [
                { label: "Cart Recovery Rate", value: "42%", change: "+34%" },
                { label: "Revenue Recovered", value: "$2.4M", change: "in 6 months" },
                { label: "Message Open Rate", value: "96%", change: "+88%" },
                { label: "Customer Satisfaction", value: "4.8/5", change: "+1.2 points" }
            ],
            keyTakeaway: "WhatsApp's high engagement rates and instant delivery made cart recovery messages 12x more effective than email campaigns.",
            downloadUrl: "#"
        },
        {
            title: "EduPro Academy: Scaling to 10,000 Students with AI",
            company: "EduPro Academy",
            industry: "Education",
            duration: "8 months",
            teamSize: "20-50 employees",
            thumbnail: "🎓",
            overview: "EduPro Academy needed to scale their student support without proportionally increasing staff costs. Their support team was overwhelmed with repetitive queries.",
            challenge: [
                "Support team handling 500+ queries daily",
                "80% of queries were repetitive (fees, schedules, admissions)",
                "Average response time of 4+ hours",
                "High student churn due to poor communication"
            ],
            solution: [
                "Deployed AI-powered chatbot trained on 1,000+ common queries",
                "Automated course enrollment and payment reminders",
                "Created personalized study material delivery via WhatsApp",
                "Implemented smart routing for complex queries to human agents"
            ],
            implementation: "4 weeks",
            results: [
                { label: "Support Tickets", value: "-70%", change: "automated" },
                { label: "Response Time", value: "<30 sec", change: "-3.5 hours" },
                { label: "Enrollment Rate", value: "+45%", change: "YoY growth" },
                { label: "Cost Savings", value: "$180K", change: "annually" }
            ],
            keyTakeaway: "AI automation handled 70% of queries instantly, allowing the support team to focus on high-value student interactions.",
            downloadUrl: "#"
        },
        {
            title: "HealthFirst Clinic: Reducing No-Shows by 80%",
            company: "HealthFirst Clinic",
            industry: "Healthcare",
            duration: "4 months",
            teamSize: "100-200 employees",
            thumbnail: "🏥",
            overview: "HealthFirst Clinic was losing $50K monthly due to appointment no-shows. Phone-based reminders were ineffective and time-consuming.",
            challenge: [
                "25% appointment no-show rate",
                "$50K monthly revenue loss",
                "Staff spending 3 hours daily on reminder calls",
                "No efficient way to reschedule missed appointments"
            ],
            solution: [
                "Automated WhatsApp appointment reminders 24 hours before",
                "One-click confirmation and rescheduling",
                "Real-time prescription and lab report delivery",
                "Post-visit follow-up and feedback collection"
            ],
            implementation: "2 weeks",
            results: [
                { label: "No-Show Rate", value: "5%", change: "-80%" },
                { label: "Revenue Recovered", value: "$40K", change: "per month" },
                { label: "Staff Time Saved", value: "15 hrs", change: "per week" },
                { label: "Patient Satisfaction", value: "4.9/5", change: "+0.8 points" }
            ],
            keyTakeaway: "Automated WhatsApp reminders with one-click actions reduced no-shows by 80%, recovering $480K annually.",
            downloadUrl: "#"
        },
        {
            title: "TechHub Solutions: Cutting Churn by 35%",
            company: "TechHub Solutions",
            industry: "SaaS",
            duration: "12 months",
            teamSize: "200-500 employees",
            thumbnail: "💻",
            overview: "TechHub Solutions faced high customer churn due to slow support response times and lack of proactive engagement during critical onboarding phases.",
            challenge: [
                "18% annual customer churn rate",
                "Average support response time of 6+ hours",
                "Poor onboarding completion rate (45%)",
                "Limited proactive customer engagement"
            ],
            solution: [
                "Implemented 24/7 AI support for technical queries",
                "Created personalized onboarding journeys via WhatsApp",
                "Set up proactive usage alerts and feature recommendations",
                "Deployed broadcast campaigns for product updates and tips"
            ],
            implementation: "6 weeks",
            results: [
                { label: "Customer Churn", value: "11.7%", change: "-35%" },
                { label: "Response Time", value: "28 min", change: "-92%" },
                { label: "Onboarding Completion", value: "82%", change: "+37%" },
                { label: "NPS Score", value: "68", change: "+40 points" }
            ],
            keyTakeaway: "Proactive WhatsApp engagement during onboarding and instant AI support transformed customer retention metrics.",
            downloadUrl: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        In-Depth<br />
                        <span className="text-green-500">Case Studies</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
                    >
                        Detailed analysis of how businesses transformed their customer engagement with Avelo
                    </motion.p>
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-24">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            {/* Header */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-6">
                                    <div className="text-6xl">{study.thumbnail}</div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                                            {study.title}
                                        </h2>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                            <span className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                {study.teamSize}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {study.duration}
                                            </span>
                                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
                                                {study.industry}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg text-slate-700 dark:text-slate-300">
                                    {study.overview}
                                </p>
                            </div>

                            {/* Challenge & Solution */}
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                        The Challenge
                                    </h3>
                                    <ul className="space-y-3">
                                        {study.challenge.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                        The Solution
                                    </h3>
                                    <ul className="space-y-3">
                                        {study.solution.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Results */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                                    Results After {study.implementation}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {study.results.map((result, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="text-3xl font-bold text-green-500">
                                                {result.value}
                                            </div>
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                                                {result.label}
                                            </div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                {result.change}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Takeaway */}
                            <div className="bg-green-50 dark:bg-green-900/10 p-6 border-l-4 border-green-500">
                                <div className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">
                                    Key Takeaway
                                </div>
                                <p className="text-slate-700 dark:text-slate-300">
                                    {study.keyTakeaway}
                                </p>
                            </div>

                            {/* Download CTA */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    Want the full case study?
                                </span>
                                <button className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all">
                                    Download PDF
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>



            <LandingFooter />
        </div>
    );
}
