import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Globe, Loader2, Image as ImageIcon } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image_url: string;
    published: boolean;
    created_at: string;
}

const AdminBlog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image_url: "",
        published: false
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error: any) {
            toast.error('Failed to load posts');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async () => {
        try {
            if (!formData.title || !formData.slug) {
                toast.error("Title and Slug are required");
                return;
            }

            const postData = {
                title: formData.title,
                slug: formData.slug,
                content: formData.content,
                excerpt: formData.excerpt,
                image_url: formData.image_url,
                published: formData.published,
            };

            if (editingPost) {
                const { error } = await supabase
                    .from('posts')
                    .update(postData)
                    .eq('id', editingPost.id);
                if (error) throw error;
                toast.success("Post updated successfully");
            } else {
                const { error } = await supabase
                    .from('posts')
                    .insert([postData]);
                if (error) throw error;
                toast.success("Post created successfully");
            }

            setIsDialogOpen(false);
            resetForm();
            fetchPosts();
        } catch (error: any) {
            toast.error(error.message || "Operation failed");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const { error } = await supabase.from('posts').delete().eq('id', id);
            if (error) throw error;
            toast.success("Post deleted");
            fetchPosts();
        } catch (error: any) {
            toast.error("Failed to delete post");
        }
    };

    const resetForm = () => {
        setEditingPost(null);
        setFormData({
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            image_url: "",
            published: false
        });
    };

    const openEdit = (post: Post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            content: post.content || "",
            excerpt: post.excerpt || "",
            image_url: post.image_url || "",
            published: post.published
        });
        setIsDialogOpen(true);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        // Only auto-generate slug if we are creating a new post
        if (!editingPost) {
            setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
        } else {
            setFormData(prev => ({ ...prev, title }));
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Blog Manager</h1>
                        <p className="text-muted-foreground">Manage your content and posts</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) resetForm();
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                New Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        placeholder="Enter post title"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Slug</Label>
                                    <Input
                                        value={formData.slug}
                                        onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))}
                                        placeholder="post-url-slug"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={formData.image_url}
                                            onChange={(e) => setFormData(p => ({ ...p, image_url: e.target.value }))}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Excerpt (Short description)</Label>
                                    <Textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                                        placeholder="Brief summary for the card..."
                                        className="h-20"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Content (Markdown supported)</Label>
                                    <Textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                                        placeholder="# Hello World..."
                                        className="h-64 font-mono text-sm"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Published Status</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Visible to public if enabled
                                        </p>
                                    </div>
                                    <Switch
                                        checked={formData.published}
                                        onCheckedChange={(c) => setFormData(p => ({ ...p, published: c }))}
                                    />
                                </div>

                                <Button onClick={handleCreateOrUpdate} className="w-full">
                                    {editingPost ? 'Update Post' : 'Create Post'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Posts Table */}
                <div className="rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                                    </TableCell>
                                </TableRow>
                            ) : posts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No posts found. Create your first one!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                            {post.published ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                    Draft
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{post.title}</TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs">{post.slug}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(post.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminBlog;
