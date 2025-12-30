import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Quote, TrendingUp, Users, MessageSquare, ShoppingCart, GraduationCap, Heart, Calendar } from "lucide-react";

export default function ClientStoriesPage() {
    const stats = [
        { value: "8,000+", label: "Happy Customers" },
        { value: "100+", label: "Countries" },
        { value: "98%", label: "Satisfaction Rate" },
        { value: "50M+", label: "Messages Sent" }
    ];

    const stories = [
        {
            company: "UrbanStyle Fashion",
            industry: "E-commerce",
            icon: ShoppingCart,
            logo: "US",
            color: "purple",
            challenge: "UrbanStyle was struggling with 65% cart abandonment rate and low customer engagement through traditional email marketing.",
            solution: "Implemented WA Business for automated cart recovery messages, order updates, and personalized product recommendations via WhatsApp.",
            results: [
                { metric: "Cart Recovery", value: "+42%" },
                { metric: "Customer Engagement", value: "+85%" },
                { metric: "Repeat Purchases", value: "+60%" }
            ],
            quote: "WA Business transformed our customer communication. We recovered thousands in abandoned carts and our customers love the instant WhatsApp updates.",
            author: "Sarah Chen",
            role: "Head of E-commerce",
            image: "👩‍💼"
        },
        {
            company: "EduPro Academy",
            industry: "Education",
            icon: GraduationCap,
            logo: "EP",
            color: "blue",
            challenge: "Managing communication with 5,000+ students and parents across multiple courses was overwhelming their support team.",
            solution: "Deployed AI-powered chatbots for instant query resolution, automated class reminders, and personalized course recommendations.",
            results: [
                { metric: "Support Tickets", value: "-70%" },
                { metric: "Enrollment Rate", value: "+45%" },
                { metric: "Student Satisfaction", value: "4.9/5" }
            ],
            quote: "Our support team can now focus on complex queries while the AI handles routine questions 24/7. Parents appreciate the instant responses.",
            author: "Dr. Rajesh Kumar",
            role: "Director",
            image: "👨‍🏫"
        },
        {
            company: "HealthFirst Clinic",
            industry: "Healthcare",
            icon: Heart,
            logo: "HF",
            color: "red",
            challenge: "Appointment no-shows were costing the clinic significant revenue, and phone-based booking was inefficient.",
            solution: "Integrated WhatsApp-based appointment booking, automated reminders, and prescription delivery updates.",
            results: [
                { metric: "No-show Rate", value: "-80%" },
                { metric: "Booking Efficiency", value: "+90%" },
                { metric: "Patient Satisfaction", value: "+95%" }
            ],
            quote: "Patients love booking appointments via WhatsApp. Our no-show rate dropped dramatically, and our staff saves hours every day.",
            author: "Dr. Priya Sharma",
            role: "Chief Medical Officer",
            image: "👩‍⚕️"
        },
        {
            company: "TechHub Solutions",
            industry: "SaaS",
            icon: MessageSquare,
            logo: "TH",
            color: "green",
            challenge: "High customer churn due to slow support response times and lack of proactive engagement.",
            solution: "Implemented broadcast campaigns for product updates, AI support for technical queries, and personalized onboarding flows.",
            results: [
                { metric: "Response Time", value: "-92%" },
                { metric: "Customer Churn", value: "-35%" },
                { metric: "NPS Score", value: "+40 points" }
            ],
            quote: "WA Business helped us build stronger relationships with our customers. The instant support and proactive updates made all the difference.",
            author: "Michael Rodriguez",
            role: "VP of Customer Success",
            image: "👨‍💼"
        },
        {
            company: "FreshMart Groceries",
            industry: "Retail",
            icon: ShoppingCart,
            logo: "FM",
            color: "orange",
            challenge: "Competing with large e-commerce platforms while maintaining personal touch with local customers.",
            solution: "Created WhatsApp catalog for easy browsing, order placement, and delivery tracking with personalized offers.",
            results: [
                { metric: "Online Orders", value: "+120%" },
                { metric: "Customer Retention", value: "+75%" },
                { metric: "Average Order Value", value: "+55%" }
            ],
            quote: "Our customers appreciate the convenience of ordering via WhatsApp. It feels personal, and our sales have doubled.",
            author: "Amit Patel",
            role: "Owner",
            image: "👨‍🍳"
        },
        {
            company: "FitLife Gym",
            industry: "Fitness",
            icon: TrendingUp,
            logo: "FL",
            color: "indigo",
            challenge: "Low member engagement and difficulty in promoting new classes and personal training sessions.",
            solution: "Launched WhatsApp broadcast campaigns for class schedules, fitness tips, and personalized workout reminders.",
            results: [
                { metric: "Class Attendance", value: "+65%" },
                { metric: "PT Session Bookings", value: "+80%" },
                { metric: "Member Retention", value: "+50%" }
            ],
            quote: "Members love getting workout reminders and class updates on WhatsApp. Our community has never been more engaged.",
            author: "Jessica Thompson",
            role: "Fitness Director",
            image: "👩‍🏋️"
        }
    ];

    const testimonials = [
        {
            quote: "The ROI we've seen from WA Business is incredible. Our customer engagement metrics are through the roof.",
            author: "David Kim",
            role: "CEO, TechStart Inc",
            image: "👨‍💻"
        },
        {
            quote: "Best decision we made this year. The platform is intuitive and the results speak for themselves.",
            author: "Maria Garcia",
            role: "Marketing Director, StyleHub",
            image: "👩‍💼"
        },
        {
            quote: "Our customers prefer WhatsApp over email. WA Business made it easy to meet them where they are.",
            author: "James Wilson",
            role: "Founder, LocalBiz",
            image: "👨‍🚀"
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
            blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
            red: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
            green: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
            orange: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
            indigo: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
        };
        return colors[color] || colors.green;
    };

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
                        Real Stories,<br />
                        <span className="text-green-500">Real Results</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16"
                    >
                        Discover how businesses across industries are transforming customer engagement with WA Business
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2">
                                <div className="text-4xl md:text-5xl font-bold text-green-500">{stat.value}</div>
                                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-32">
                    {stories.map((story, index) => {
                        const Icon = story.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content */}
                                <div className={`space-y-6 ${!isEven ? 'md:order-2' : ''}`}>
                                    {/* Company Header */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${getColorClasses(story.color)}`}>
                                            {story.logo}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {story.company}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">{story.industry}</p>
                                        </div>
                                    </div>

                                    {/* Challenge */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                            The Challenge
                                        </h4>
                                        <p className="text-slate-700 dark:text-slate-300">
                                            {story.challenge}
                                        </p>
                                    </div>

                                    {/* Solution */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                            The Solution
                                        </h4>
                                        <p className="text-slate-700 dark:text-slate-300">
                                            {story.solution}
                                        </p>
                                    </div>

                                    {/* Results */}
                                    <div className="grid grid-cols-3 gap-4 pt-4">
                                        {story.results.map((result, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="text-2xl font-bold text-green-500 mb-1">
                                                    {result.value}
                                                </div>
                                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                                    {result.metric}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quote Card */}
                                <div className={`${!isEven ? 'md:order-1' : ''}`}>
                                    <div className="relative p-8 bg-slate-50 dark:bg-slate-900/50">
                                        <Quote className="w-12 h-12 text-green-500/20 absolute top-4 left-4" />
                                        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 relative z-10 italic">
                                            "{story.quote}"
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl">{story.image}</div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">
                                                    {story.author}
                                                </div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    {story.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Quick Testimonials */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center mb-16"
                    >
                        What Our Customers Say
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-4"
                            >
                                <Quote className="w-10 h-10 text-green-500/30" />
                                <p className="text-slate-700 dark:text-slate-300 italic">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-3 pt-4">
                                    <div className="text-3xl">{testimonial.image}</div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            <LandingFooter />
        </div>
    );
}
