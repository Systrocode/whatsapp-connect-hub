import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, User } from "lucide-react";
import { BLOG_POSTS, BlogPost as BlogPostType } from "@/data/blog-data";
import { motion } from "framer-motion";

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for better UX feel
        const timer = setTimeout(() => {
            if (slug) {
                const foundPost = BLOG_POSTS.find(p => p.slug === slug);
                setPost(foundPost || null);
            }
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
                <LandingHeader />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            <div className="dark:bg-slate-950">
                {/* Progress Bar (Visual only for now) */}
                <div className="fixed top-0 left-0 h-1 bg-green-500 z-50 w-full origin-left scale-x-0 animate-[grow_1s_ease-out_forwards]" style={{ width: '100%' }}></div>
            </div>

            <main className="flex-1 pt-32 pb-20 px-6">
                <article className="container mx-auto max-w-4xl">
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Blog
                    </Link>

                    <header className="mb-12 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 mb-6 font-medium">
                            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 leading-tight text-slate-900 dark:text-white tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center md:justify-start gap-4 border-t border-b border-slate-100 dark:border-slate-800 py-6">
                            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
                            <div className="text-left">
                                <div className="font-bold text-slate-900 dark:text-white">{post.author.name}</div>
                                <div className="text-sm text-slate-500">{post.author.role}</div>
                            </div>
                            <div className="flex-1"></div>
                            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </Button>
                        </div>
                    </header>

                    <div className="aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-2xl relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-3xl mx-auto prose-headings:font-bold prose-headings:tracking-tight prose-a:text-green-600 hover:prose-a:text-green-500 transition-colors">
                        {/* 
                           In a real app, use a markdown library like react-markdown 
                           For now, we render the raw text with whitespace pre-wrap which handles newlines 
                        */}
                        <div className="whitespace-pre-wrap font-sans leading-relaxed text-slate-700 dark:text-slate-300">
                            {post.content}
                        </div>
                    </div>


                    {/* Related / Next Article Logic could go here */}
                    <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Enjoyed this article?</h3>
                        <div className="flex gap-4 justify-center">

                            <Link to="/blog">
                                <Button variant="outline" size="lg" className="rounded-full border-slate-200 dark:border-slate-700">
                                    Read More Articles
                                </Button>
                            </Link>
                        </div>
                    </div>

                </article>
            </main>

            <LandingFooter />
        </div>
    );
};

export default BlogPost;
