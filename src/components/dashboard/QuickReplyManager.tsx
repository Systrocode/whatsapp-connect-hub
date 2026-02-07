
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCannedResponses } from '@/hooks/useCannedResponses';
import { Plus, Trash2, Zap } from 'lucide-react';

export function QuickReplyManager() {
    const { responses, createResponse, deleteResponse } = useCannedResponses();
    const [isOpen, setIsOpen] = useState(false);
    const [newShortcut, setNewShortcut] = useState('');
    const [newContent, setNewContent] = useState('');

    const handleAdd = () => {
        if (!newShortcut || !newContent) return;
        createResponse.mutate(
            { shortcut: newShortcut, content: newContent },
            {
                onSuccess: () => {
                    setNewShortcut('');
                    setNewContent('');
                }
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="Manage Quick Replies">
                    <Zap className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Quick Replies (Canned Responses)</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex gap-2 items-end bg-muted/30 p-4 rounded-lg border">
                        <div className="space-y-1 w-1/4">
                            <label className="text-xs font-medium">Shortcut</label>
                            <div className="relative">
                                <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">/</span>
                                <Input
                                    placeholder="hi"
                                    value={newShortcut}
                                    onChange={(e) => setNewShortcut(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                                    className="pl-5"
                                />
                            </div>
                        </div>
                        <div className="space-y-1 flex-1">
                            <label className="text-xs font-medium">Message Content</label>
                            <Textarea
                                placeholder="Hi there! How can I help you today?"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                rows={1}
                                className="min-h-[40px]"
                            />
                        </div>
                        <Button onClick={handleAdd} disabled={!newShortcut || !newContent || createResponse.isPending}>
                            <Plus className="w-4 h-4" /> Add
                        </Button>
                    </div>

                    <div className="border rounded-md max-h-[400px] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Shortcut</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {responses.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                            No quick replies yet. Add one above!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    responses.map((response) => (
                                        <TableRow key={response.id}>
                                            <TableCell className="font-mono text-xs">/{response.shortcut}</TableCell>
                                            <TableCell className="text-sm">{response.content}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => deleteResponse.mutate(response.id)}
                                                    className="h-8 w-8 text-destructive opacity-50 hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
