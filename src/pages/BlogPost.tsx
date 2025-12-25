import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Loader2, Share2 } from "lucide-react";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    image_url: string;
    created_at: string;
    excerpt: string;
}

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!slug) return;
                const { data, error } = await (supabase as any)
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data as Post);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <LandingHeader />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <LandingHeader />

            <main className="flex-1 pt-32 pb-20 px-6">
                <article className="container mx-auto max-w-3xl">
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>

                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.created_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {Math.ceil((post.content?.length || 100) / 1000)} min read
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>
                    </header>

                    {post.image_url && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-12 border border-border bg-muted">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {/* Simple content rendering. In production, use a Markdown renderer */}
                        <div className="whitespace-pre-wrap font-sans leading-relaxed text-foreground/90">
                            {post.content}
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-border">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Share this article</h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                }}>
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Copy Link
                                </Button>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <LandingFooter />
        </div>
    );
};

export default BlogPost;
