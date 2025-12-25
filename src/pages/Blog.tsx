import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image_url: string;
    created_at: string;
    read_time?: string; // We can calculate this
}

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await (supabase as any)
                    .from('posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPosts(data as Post[] || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <LandingHeader />

            <main className="flex-1 pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Blog</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Latest updates, tips, and insights about WhatsApp Business automation and growth.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                            <p className="text-muted-foreground">No posts published yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-primary/50"
                                >
                                    <div className="aspect-video bg-muted relative overflow-hidden">
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-secondary">
                                                <span className="text-muted-foreground text-sm">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {Math.ceil((post.excerpt?.length || 100) / 200)} min read
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-primary">
                                            Read Article
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Blog;
