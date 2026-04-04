
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
import { Plus, Users, Filter, Trash2, Calendar, Clock, Share2, BarChart, RefreshCw } from 'lucide-react';
import { subDays, isAfter, parseISO } from 'date-fns';
import { formatToIST } from '@/lib/utils';

export default function Segments() {
    const { segments, isLoading, createSegment, deleteSegment, syncSegmentToMeta, getMetaSegmentInsights } = useSegments();
    const { contacts } = useContacts();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    
    // Insights State
    const [insightsOpen, setInsightsOpen] = useState(false);
    const [activeInsights, setActiveInsights] = useState<any>(null);
    const [loadingInsights, setLoadingInsights] = useState(false);

    const handleViewInsights = async (customAudienceId: string) => {
        setInsightsOpen(true);
        setLoadingInsights(true);
        setActiveInsights(null);
        try {
            const data = await getMetaSegmentInsights.mutateAsync(customAudienceId);
            setActiveInsights(data);
        } catch (error) {
            console.error("Failed to load insights", error);
        } finally {
            setLoadingInsights(false);
        }
    };


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
                                <CardDescription>Created {formatToIST(segment.created_at)}</CardDescription>
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

                                    <div className="pt-2 border-t flex flex-col gap-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Est. Audience</span>
                                            <strong className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {getRecipientCountForSegment(segment.criteria)}
                                            </strong>
                                        </div>

                                        <div className="flex border-t pt-2 gap-2 mt-2 pt-3 justify-end items-center">
                                            {segment.criteria.meta_custom_audience_id ? (
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                                                    onClick={() => handleViewInsights(segment.criteria.meta_custom_audience_id!)}
                                                >
                                                    <BarChart className="w-4 h-4 mr-2" />
                                                    View Meta Insights
                                                </Button>
                                            ) : (
                                                <Button 
                                                    variant="secondary" 
                                                    size="sm" 
                                                    className="w-full group"
                                                    onClick={() => syncSegmentToMeta.mutate({ segmentId: segment.id, name: segment.name })}
                                                    disabled={syncSegmentToMeta.isPending}
                                                >
                                                    {syncSegmentToMeta.isPending ? (
                                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <Share2 className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors" />
                                                    )}
                                                    Sync to Meta Ads
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Meta Insights Dialog */}
                    <Dialog open={insightsOpen} onOpenChange={setInsightsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <BarChart className="w-5 h-5 text-blue-600" />
                                    Meta Audience Insights
                                </DialogTitle>
                                <DialogDescription>
                                    Performance data from your synced Custom Audience
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-6 flex flex-col items-center justify-center min-h-[150px]">
                                {loadingInsights ? (
                                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                        <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
                                        <span>Fetching data from Meta...</span>
                                    </div>
                                ) : activeInsights ? (
                                    <div className="w-full space-y-4">
                                        <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
                                            <span className="font-medium text-sm">Meta Audience Name</span>
                                            <span className="text-sm">{activeInsights.name}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="border bg-card p-4 rounded-lg text-center">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {activeInsights.approximate_count_lower_bound > 0 ? activeInsights.approximate_count_lower_bound.toLocaleString() : '< 1000'}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-medium">Estimated Reach</div>
                                            </div>
                                            <div className="border bg-card p-4 rounded-lg text-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
                                                <div className="text-2xl font-bold text-green-600">Matched</div>
                                                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-medium">Sync Status</div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-center text-muted-foreground mt-4 italic">
                                            Note: Meta requires at least 1,000 matched users to display exact demographics or performance bounds.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-destructive font-medium border border-destructive/20 bg-destructive/10 p-4 rounded-lg">
                                        Failed to fetch insights. Custom Audience might have been deleted on Meta.
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>

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
