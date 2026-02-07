import { useState } from "react";
import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, Search, Mail } from "lucide-react";
import { BLOG_POSTS, CATEGORIES } from "@/data/blog-data";
import { motion } from "framer-motion";

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const regularPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Insights & <span className="text-green-600">Updates</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                            Expert advice, industry trends, and product updates to help you grow your business on WhatsApp.
                        </p>

                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="Search articles..."
                                    className="pl-10 h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <div className="sticky top-[72px] z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 px-6 overflow-x-auto no-scrollbar">
                <div className="container mx-auto max-w-6xl flex gap-2 min-w-max">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-1 py-16 px-6 bg-white dark:bg-slate-950">
                <div className="container mx-auto max-w-6xl">

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
                            <p className="text-slate-500">Try adjusting your search or category filter.</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post (only if on first page/general view) */}
                            {featuredPost && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-16 group"
                                >
                                    <Link to={`/blog/${featuredPost.slug}`} className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="aspect-[16/10] overflow-hidden rounded-3xl relative shadow-xl">
                                            <img
                                                src={featuredPost.image}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                Featured
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 text-sm text-green-600 font-bold uppercase tracking-wider">
                                                {featuredPost.category}
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-green-600 transition-colors">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-lg text-slate-600 dark:text-slate-400 line-clamp-3">
                                                {featuredPost.excerpt}
                                            </p>

                                            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-10 h-10 rounded-full" />
                                                <div className="text-sm">
                                                    <div className="font-bold text-slate-900 dark:text-white">{featuredPost.author.name}</div>
                                                    <div className="text-slate-500">{featuredPost.date} • {featuredPost.readTime}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}

                            {/* Post Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {regularPosts.map((post, idx) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group flex flex-col h-full"
                                    >
                                        <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl mb-4 aspect-[4/3] relative shadow-md">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                                {post.category}
                                            </div>
                                        </Link>
                                        <div className="flex flex-col flex-1">
                                            <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                                                <Calendar className="w-3 h-3" /> {post.date}
                                                <span>•</span>
                                                <Clock className="w-3 h-3" /> {post.readTime}
                                            </div>
                                            <Link to={`/blog/${post.slug}`} className="block">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white hover:text-green-600 transition-colors"
                                            >
                                                Read Article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Newsletter Section */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                            Subscribe to our newsletter
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8">
                            Get the latest updates, tips, and industry trends delivered straight to your inbox. No spam, we promise.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input placeholder="Enter your email" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700" />
                            <Button size="lg" className="h-12 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-8">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default Blog;
