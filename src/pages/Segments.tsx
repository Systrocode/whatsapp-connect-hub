
import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSegments, SegmentCriteria } from '@/hooks/useSegments';
import { useContacts } from '@/hooks/useContacts';
import { Plus, Users, Filter, Trash2, Calendar, Clock } from 'lucide-react';
import { format, subDays, isBefore, isAfter, parseISO } from 'date-fns';

export default function Segments() {
    const { segments, isLoading, createSegment, deleteSegment } = useSegments();
    const { contacts } = useContacts();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // New Segment State
    const [name, setName] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [lastActiveDays, setLastActiveDays] = useState<string>(''); // empty = any time
    const [newTag, setNewTag] = useState('');

    // Derived: Available Tags from Contacts
    const allAvailableTags = useMemo(() => {
        const s = new Set<string>();
        contacts.forEach(c => c.tags?.forEach(t => s.add(t)));
        return Array.from(s);
    }, [contacts]);

    // Derived: Preview Recipient Count
    const previewCount = useMemo(() => {
        return contacts.filter(contact => {
            // 1. Tag Filter
            if (tags.length > 0) {
                const contactTags = contact.tags || [];
                const hasAllTags = tags.every(t => contactTags.includes(t));
                if (!hasAllTags) return false;
            }

            // 2. Last Active Filter (Simplistic check against created_at since we don't track 'last_active' perfectly yet)
            // In a real app, use contact.last_message_at
            if (lastActiveDays) {
                const days = parseInt(lastActiveDays);
                if (!isNaN(days) && contact.created_at) {
                    const cutoffDate = subDays(new Date(), days);
                    // "Not active in x days" means last activity was BEFORE the cutoff ?? 
                    // Actually usually implies "Old contacts" or "Active recently".
                    // Let's implement "Contacts joined BEFORE x days ago" (Old leads)
                    if (isAfter(parseISO(contact.created_at), cutoffDate)) return false;
                }
            }

            return true;
        }).length;
    }, [contacts, tags, lastActiveDays]);

    const handleCreate = () => {
        if (!name) return;

        const criteria: SegmentCriteria = {};
        if (tags.length > 0) criteria.tags = tags;
        if (lastActiveDays) criteria.last_active_days = parseInt(lastActiveDays);

        createSegment.mutate({ name, criteria }, {
            onSuccess: () => {
                setIsCreateOpen(false);
                setName('');
                setTags([]);
                setLastActiveDays('');
            }
        });
    };

    const getRecipientCountForSegment = (criteria: SegmentCriteria) => {
        // Logic duplicated from preview, usually ideally shared helper
        return contacts.filter(contact => {
            if (criteria.tags && criteria.tags.length > 0) {
                const contactTags = contact.tags || [];
                if (!criteria.tags.every(t => contactTags.includes(t))) return false;
            }
            if (criteria.last_active_days) {
                const cutoffDate = subDays(new Date(), criteria.last_active_days);
                // Same logic as preview: joined before X days
                if (contact.created_at && isAfter(parseISO(contact.created_at), cutoffDate)) return false;
            }
            return true;
        }).length;
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Smart Segments</h1>
                        <p className="text-muted-foreground">
                            Create dynamic lists for targeted retargeting
                        </p>
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Segment
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Create New Segment</DialogTitle>
                                <DialogDescription>
                                    Define rules to automatically filter your contacts.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Segment Name</Label>
                                    <Input
                                        placeholder="e.g. Inactive Leads (> 30 days)"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Must have tags</Label>
                                    <div className="flex gap-2">
                                        <Select value={newTag} onValueChange={(val) => {
                                            if (val && !tags.includes(val)) setTags([...tags, val]);
                                            setNewTag('');
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select tags..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {allAvailableTags.map(t => (
                                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="gap-1">
                                                {tag}
                                                <span
                                                    className="cursor-pointer ml-1 hover:text-destructive"
                                                    onClick={() => setTags(tags.filter(t => t !== tag))}
                                                >&times;</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Leads older than (days)</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="e.g. 7"
                                            value={lastActiveDays}
                                            onChange={e => setLastActiveDays(e.target.value)}
                                        />
                                        <span className="text-sm text-muted-foreground whitespace-nowrap">days ago</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                        Targets users who joined the platform more than X days ago.
                                    </p>
                                </div>

                                <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between border">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                        Matching Contacts
                                    </div>
                                    <div className="text-2xl font-bold">{previewCount}</div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreate} disabled={!name}>Save Segment</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? <div>Loading segments...</div> : (segments || []).map(segment => (
                        <Card key={segment.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{segment.name}</CardTitle>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteSegment.mutate(segment.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardDescription>Created {format(new Date(segment.created_at), 'MMM d, yyyy')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-1">
                                        {segment.criteria.tags?.map(t => (
                                            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                                        ))}
                                        {segment.criteria.last_active_days && (
                                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> &gt; {segment.criteria.last_active_days} days old
                                            </Badge>
                                        )}
                                        {!segment.criteria.tags?.length && !segment.criteria.last_active_days && (
                                            <span className="text-xs text-muted-foreground italic">No filters (All contacts)</span>
                                        )}
                                    </div>

                                    <div className="pt-2 border-t flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Est. Audience</span>
                                        <strong className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {getRecipientCountForSegment(segment.criteria)}
                                        </strong>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {!isLoading && (segments || []).length === 0 && (
                        <div className="col-span-full text-center py-12 border-2 border-dashed rounded-lg bg-slate-50">
                            <Filter className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="font-semibold text-lg text-muted-foreground">No segments yet</h3>
                            <p className="text-sm text-muted-foreground mb-4">Create a segment to group your contacts dynamically.</p>
                            <Button onClick={() => setIsCreateOpen(true)}>Create First Segment</Button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
