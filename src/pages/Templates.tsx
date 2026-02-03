import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useTemplates } from '@/hooks/useTemplates';
import { Plus, MessageSquare, Trash2, CheckCircle, Smartphone, Image as ImageIcon, RefreshCw } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';

export default function Templates() {
    const { templates, isLoading, createTemplate, deleteTemplate, syncTemplates } = useTemplates();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        category: 'MARKETING',
        content: '',
        headerType: 'NONE' as 'NONE' | 'IMAGE' | 'TEXT',
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!newTemplate.name || !newTemplate.content) return;

        // In a real app, we would structure this JSON object for Meta API
        // For now, we save the text content and image flag.
        await createTemplate.mutateAsync({
            name: newTemplate.name.toLowerCase().replace(/ /g, '_'),
            category: newTemplate.category,
            content: newTemplate.content,
            variables: newTemplate.headerType === 'IMAGE' ? ['has_image'] : [],
            headerType: newTemplate.headerType,
        });

        setIsCreateOpen(false);
        setNewTemplate({ name: '', category: 'MARKETING', content: '', headerType: 'NONE' });
        setPreviewImage(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Message Templates</h1>
                        <p className="text-muted-foreground">
                            Create and manage WhatsApp templates
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => syncTemplates.mutate()} disabled={syncTemplates.isPending}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${syncTemplates.isPending ? 'animate-spin' : ''}`} />
                            Sync from Meta
                        </Button>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Template
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                                <DialogHeader className="px-6 py-4 border-b">
                                    <DialogTitle>Create WhatsApp Template</DialogTitle>
                                    <DialogDescription>
                                        Design your message template with headers, body, and buttons.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-1 overflow-hidden">
                                    {/* Form Side */}
                                    <div className="flex-1 p-6 space-y-6 overflow-y-auto border-r">
                                        <div className="space-y-2">
                                            <Label>Template Name</Label>
                                            <Input
                                                placeholder="e.g. welcome_offer"
                                                value={newTemplate.name}
                                                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                                            />
                                            <p className="text-xs text-muted-foreground">Lowercase only, use underscores.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <Select
                                                value={newTemplate.category}
                                                onValueChange={(val) => {
                                                    setNewTemplate(prev => ({
                                                        ...prev,
                                                        category: val,
                                                        // Reset header to NONE if switching to AUTHENTICATION
                                                        headerType: val === 'AUTHENTICATION' ? 'NONE' : prev.headerType
                                                    }))
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="MARKETING">Marketing</SelectItem>
                                                    <SelectItem value="UTILITY">Utility</SelectItem>
                                                    <SelectItem value="AUTHENTICATION">Authentication</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {/* Meta Policy Tips */}
                                            <div className="mt-2 p-3 bg-blue-50 text-blue-800 rounded-md text-xs space-y-1">
                                                <p className="font-semibold flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" /> Meta Policy Tip:
                                                </p>
                                                {newTemplate.category === 'MARKETING' && (
                                                    <p>Use for promotions, offers, or newsletters. Avoid overly aggressive language to prevent blocking.</p>
                                                )}
                                                {newTemplate.category === 'UTILITY' && (
                                                    <p>Strictly for transactional updates (orders, account alerts). <strong>No promotional content allowed</strong> or it will be rejected.</p>
                                                )}
                                                {newTemplate.category === 'AUTHENTICATION' && (
                                                    <p>Only for OTP/Verification codes. <span className="font-semibold">Media/Images are NOT allowed</span> for this category.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Header (Optional)</Label>
                                            <Select
                                                value={newTemplate.headerType}
                                                onValueChange={(val: any) => setNewTemplate({ ...newTemplate, headerType: val })}
                                                disabled={newTemplate.category === 'AUTHENTICATION'}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="NONE">None</SelectItem>
                                                    <SelectItem value="IMAGE" disabled={newTemplate.category === 'AUTHENTICATION'}>Image / Media</SelectItem>
                                                    <SelectItem value="TEXT" disabled={newTemplate.category === 'AUTHENTICATION'}>Text Header</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {newTemplate.headerType === 'IMAGE' && (
                                                <div className="p-4 bg-muted/30 rounded-lg space-y-2 border border-dashed">
                                                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <ImageIcon className="w-4 h-4" /> Upload Sample Image (Preview)
                                                    </Label>
                                                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="bg-background" />
                                                    <p className="text-[10px] text-muted-foreground">
                                                        This image is for preview only. You will need to upload the actual campaign image when sending.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Body Text</Label>
                                            <Textarea
                                                rows={5}
                                                placeholder="Hello {{1}}, check out our new offers!"
                                                value={newTemplate.content}
                                                onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                                            />
                                            <p className="text-xs text-muted-foreground">Use {'{{1}}'}, {'{{2}}'} for variables.</p>
                                        </div>
                                    </div>

                                    {/* Preview Side */}
                                    <div className="w-[350px] bg-slate-50 p-6 flex flex-col items-center justify-center border-l bg-muted/10">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                            <Smartphone className="w-3 h-3" /> Live Preview
                                        </h3>
                                        <PhoneMockup
                                            message={newTemplate.content || "Your message text..."}
                                            image={newTemplate.headerType === 'IMAGE' ? (previewImage || "https://placehold.co/600x400/png?text=Header+Image") : undefined}
                                        />
                                    </div>
                                </div>

                                <DialogFooter className="px-6 py-4 border-t bg-background">
                                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                    <Button onClick={handleCreate} disabled={createTemplate.isPending || !newTemplate.name}>Submit for Approval</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* List of Templates */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading && <div>Loading templates...</div>}

                    {!isLoading && templates.length === 0 && (
                        <Card className="col-span-full py-12 text-center">
                            <CardContent>
                                <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                                <p className="text-muted-foreground">No templates found. Sync from Meta to get started!</p>
                            </CardContent>
                        </Card>
                    )}

                    {templates.map((template) => (
                        <Card key={template.id} className="relative group">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="font-semibold">{template.name}</div>
                                    {template.is_approved ? (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Approved</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending</Badge>
                                    )}
                                </div>
                                <div className="text-xs text-muted-foreground">{template.category}</div>
                            </CardHeader>
                            <CardContent className="text-sm">
                                {template.variables?.includes('has_image') && (
                                    <div className="mb-2 h-24 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                )}
                                <p className="line-clamp-3 whitespace-pre-wrap">{template.content}</p>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                                    onClick={() => deleteTemplate.mutate(template.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout >
    );
}
