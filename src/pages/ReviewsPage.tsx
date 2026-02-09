import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Star, ThumbsUp, Filter, Calendar } from "lucide-react";

export default function ReviewsPage() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedRating, setSelectedRating] = useState("all");

    const stats = {
        averageRating: 4.8,
        totalReviews: 2847,
        ratings: [
            { stars: 5, count: 2156, percentage: 76 },
            { stars: 4, count: 512, percentage: 18 },
            { stars: 3, count: 114, percentage: 4 },
            { stars: 2, count: 43, percentage: 1.5 },
            { stars: 1, count: 22, percentage: 0.5 }
        ]
    };

    const filters = [
        { id: "all", label: "All Reviews" },
        { id: "ecommerce", label: "E-commerce" },
        { id: "education", label: "Education" },
        { id: "healthcare", label: "Healthcare" },
        { id: "saas", label: "SaaS" },
        { id: "retail", label: "Retail" }
    ];

    const reviews = [
        {
            id: 1,
            author: "Sarah Mitchell",
            role: "CEO",
            company: "StyleHub Fashion",
            industry: "ecommerce",
            avatar: "👩‍💼",
            rating: 5,
            date: "2 days ago",
            verified: true,
            helpful: 47,
            title: "Game changer for our e-commerce business",
            content: "Avelo completely transformed how we engage with customers. The cart recovery feature alone recovered over $50K in the first month. The platform is intuitive, the support team is responsive, and the ROI is incredible. Highly recommend!",
            pros: ["Easy to use", "Excellent ROI", "Great support"],
            cons: []
        },
        {
            id: 2,
            author: "Dr. Rajesh Kumar",
            role: "Director",
            company: "EduPro Academy",
            industry: "education",
            avatar: "👨‍🏫",
            rating: 5,
            date: "5 days ago",
            verified: true,
            helpful: 38,
            title: "Perfect for educational institutions",
            content: "We manage 5,000+ students and the AI chatbot handles 70% of queries instantly. Parents love getting real-time updates about their children's progress. The automated reminders for fees and exams have significantly improved our operations.",
            pros: ["AI automation", "Scalable", "Parent engagement"],
            cons: ["Learning curve for advanced features"]
        },
        {
            id: 3,
            author: "Michael Chen",
            role: "Marketing Director",
            company: "TechStart Inc",
            industry: "saas",
            avatar: "👨‍💻",
            rating: 5,
            date: "1 week ago",
            verified: true,
            helpful: 52,
            title: "Best customer engagement platform we've used",
            content: "After trying 3 other platforms, Avelo is by far the best. The broadcast campaigns have 96% open rates compared to 18% with email. Customer support response time dropped from 6 hours to under 30 minutes. Worth every penny.",
            pros: ["High engagement rates", "Fast implementation", "Detailed analytics"],
            cons: []
        },
        {
            id: 4,
            author: "Dr. Priya Sharma",
            role: "Chief Medical Officer",
            company: "HealthFirst Clinic",
            industry: "healthcare",
            avatar: "👩‍⚕️",
            rating: 5,
            date: "1 week ago",
            verified: true,
            helpful: 41,
            title: "Reduced no-shows by 80%!",
            content: "The automated appointment reminders via WhatsApp have been a game-changer. Our no-show rate dropped from 25% to just 5%. Patients appreciate the convenience of confirming or rescheduling with one click. Highly recommended for healthcare providers.",
            pros: ["Appointment management", "Patient satisfaction", "Time savings"],
            cons: []
        },
        {
            id: 5,
            author: "James Wilson",
            role: "Owner",
            company: "FreshMart Groceries",
            industry: "retail",
            avatar: "👨‍🍳",
            rating: 4,
            date: "2 weeks ago",
            verified: true,
            helpful: 29,
            title: "Great platform with room for improvement",
            content: "Overall very satisfied with Avelo. The WhatsApp catalog feature made it easy for customers to browse and order. Sales increased by 120% in 3 months. Would love to see more customization options for the catalog layout.",
            pros: ["Catalog feature", "Sales growth", "Customer convenience"],
            cons: ["Limited catalog customization"]
        },
        {
            id: 6,
            author: "Lisa Anderson",
            role: "Marketing Manager",
            company: "BeautyGlow Cosmetics",
            industry: "ecommerce",
            avatar: "👩‍💄",
            rating: 5,
            date: "2 weeks ago",
            verified: true,
            helpful: 35,
            title: "Incredible ROI on broadcast campaigns",
            content: "We send weekly product launches and promotions via WhatsApp broadcasts. The engagement is phenomenal - 96% open rate and 45% click-through rate. Our email campaigns never came close to these numbers. The analytics dashboard is also very comprehensive.",
            pros: ["Broadcast campaigns", "Analytics", "High engagement"],
            cons: []
        },
        {
            id: 7,
            author: "David Park",
            role: "Founder",
            company: "FitLife Gym",
            industry: "retail",
            avatar: "👨‍🏋️",
            rating: 5,
            date: "3 weeks ago",
            verified: true,
            helpful: 44,
            title: "Member engagement has never been better",
            content: "We use Avelo to send class schedules, workout tips, and personalized training reminders. Member retention increased by 50% and class attendance is up 65%. The platform is easy to use and the support team helped us set everything up quickly.",
            pros: ["Member retention", "Easy setup", "Excellent support"],
            cons: []
        },
        {
            id: 8,
            author: "Emma Thompson",
            role: "Customer Success Lead",
            company: "CloudSync Solutions",
            industry: "saas",
            avatar: "👩‍💼",
            rating: 4,
            date: "3 weeks ago",
            verified: true,
            helpful: 31,
            title: "Solid platform for customer support",
            content: "We've been using Avelo for 6 months now. The AI chatbot handles technical queries well and the team inbox makes collaboration easy. Customer satisfaction scores improved significantly. Only wish there were more integrations with other tools.",
            pros: ["AI chatbot", "Team collaboration", "Customer satisfaction"],
            cons: ["Limited integrations"]
        },
        {
            id: 9,
            author: "Carlos Rodriguez",
            role: "Operations Manager",
            company: "QuickServe Restaurants",
            industry: "retail",
            avatar: "👨‍🍳",
            rating: 5,
            date: "1 month ago",
            verified: true,
            helpful: 38,
            title: "Perfect for restaurant ordering",
            content: "Our customers love ordering via WhatsApp. It's more personal than apps and faster than phone calls. We integrated the menu catalog and order tracking. Daily orders increased by 85% and customer complaints dropped by 60%.",
            pros: ["Order management", "Customer satisfaction", "Sales growth"],
            cons: []
        },
        {
            id: 10,
            author: "Sophie Martin",
            role: "Head of Marketing",
            company: "LuxuryStay Hotels",
            industry: "retail",
            avatar: "👩‍💼",
            rating: 5,
            date: "1 month ago",
            verified: true,
            helpful: 42,
            title: "Elevated our guest experience",
            content: "We use Avelo for booking confirmations, check-in reminders, and concierge services. Guests appreciate the instant communication and personalized service. Our guest satisfaction scores increased from 4.2 to 4.8 stars.",
            pros: ["Guest experience", "Personalization", "Satisfaction scores"],
            cons: []
        }
    ];

    const filteredReviews = reviews.filter(review => {
        const matchesIndustry = selectedFilter === "all" || review.industry === selectedFilter;
        const matchesRating = selectedRating === "all" || review.rating === parseInt(selectedRating);
        return matchesIndustry && matchesRating;
    });

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300 dark:text-slate-600"
                        }`}
                />
            ))}
        </div>
    );

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
                        Customer<br />
                        <span className="text-green-500">Reviews</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
                    >
                        See what our customers have to say about their experience with Avelo
                    </motion.p>
                </div>
            </section>

            {/* Rating Overview */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Average Rating */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-center md:text-left"
                        >
                            <div className="text-7xl font-bold text-slate-900 dark:text-white mb-4">
                                {stats.averageRating}
                            </div>
                            <StarRating rating={5} />
                            <p className="text-slate-600 dark:text-slate-400 mt-4">
                                Based on {stats.totalReviews.toLocaleString()} reviews
                            </p>
                        </motion.div>

                        {/* Rating Distribution */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-3"
                        >
                            {stats.ratings.map((rating) => (
                                <div key={rating.stars} className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-12">
                                        {rating.stars} star
                                    </span>
                                    <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400"
                                            style={{ width: `${rating.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-slate-400 w-16 text-right">
                                        {rating.percentage}%
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 px-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4">
                        <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setSelectedFilter(filter.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === filter.id
                                        ? "bg-green-500 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                        <select
                            value={selectedRating}
                            onChange={(e) => setSelectedRating(e.target.value)}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Reviews List */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    {filteredReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="pb-8 border-b border-slate-200 dark:border-slate-800 last:border-0"
                        >
                            {/* Review Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="text-4xl">{review.avatar}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white">
                                            {review.author}
                                        </h3>
                                        {review.verified && (
                                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded">
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {review.role} at {review.company}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <StarRating rating={review.rating} />
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {review.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="space-y-4 ml-16">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {review.title}
                                </h4>
                                <p className="text-slate-700 dark:text-slate-300">
                                    {review.content}
                                </p>

                                {/* Pros and Cons */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    {review.pros.length > 0 && (
                                        <div>
                                            <div className="text-sm font-bold text-green-600 dark:text-green-400 mb-2">
                                                Pros
                                            </div>
                                            <ul className="space-y-1">
                                                {review.pros.map((pro, idx) => (
                                                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                                        <span className="text-green-500">✓</span>
                                                        {pro}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {review.cons.length > 0 && (
                                        <div>
                                            <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                                                Cons
                                            </div>
                                            <ul className="space-y-1">
                                                {review.cons.map((con, idx) => (
                                                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                                        <span className="text-slate-400">−</span>
                                                        {con}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Helpful */}
                                <button className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-green-500 transition-colors">
                                    <ThumbsUp className="w-4 h-4" />
                                    Helpful ({review.helpful})
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
