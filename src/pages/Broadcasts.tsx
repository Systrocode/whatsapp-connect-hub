import { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBroadcasts, BroadcastCampaign } from '@/hooks/useBroadcasts';
import { useTemplates } from '@/hooks/useTemplates';
import { useContacts } from '@/hooks/useContacts';
import { useSegments } from '@/hooks/useSegments';
import { useWhatsAppAPI } from '@/hooks/useWhatsAppAPI';
import { Upload, Plus, Send, Calendar, Users, MessageSquare, Trash2, Eye, Clock, CheckCircle, XCircle, AlertCircle, Settings, Smartphone, Image as ImageIcon, Filter } from 'lucide-react';
import { format, subDays, isAfter, parseISO } from 'date-fns';
import PhoneMockup from '@/components/PhoneMockup';
import ImportContactsDialog from '@/components/contacts/ImportContactsDialog';

// ... existing imports ...

export default function Broadcasts() {
  const { campaigns, isLoading, createCampaign, addRecipients, deleteCampaign, sendCampaign } = useBroadcasts();
  const { templates } = useTemplates();
  const { contacts } = useContacts();
  const { segments } = useSegments();
  const { businessProfile } = useWhatsAppAPI();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('all');
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    template_id: '',
    message_content: '',
    scheduled_at: '',
    segment_filter: {} as Record<string, unknown>,
  });
  const [filterTag, setFilterTag] = useState('');
  const [optInConfirmed, setOptInConfirmed] = useState(false);

  const statusColors: Record<string, string> = {
    draft: 'bg-muted text-muted-foreground',
    scheduled: 'bg-blue-500/20 text-blue-500',
    sending: 'bg-yellow-500/20 text-yellow-500',
    completed: 'bg-green-500/20 text-green-500',
    failed: 'bg-destructive/20 text-destructive',
    cancelled: 'bg-muted text-muted-foreground',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    draft: <Clock className="h-3 w-3" />,
    scheduled: <Calendar className="h-3 w-3" />,
    sending: <Send className="h-3 w-3" />,
    completed: <CheckCircle className="h-3 w-3" />,
    failed: <XCircle className="h-3 w-3" />,
    cancelled: <AlertCircle className="h-3 w-3" />,
  };

  const handleImportSuccess = (importedIds: string[]) => {
    // Add the newly imported contact IDs to the selection
    setSelectedContacts(prev => [...new Set([...prev, ...importedIds])]);
    // Ensure segment is set to 'custom' so manual selection is preserved
    setSelectedSegmentId('custom');
  };

  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  // Handle Template Selection & Content Parsing (Basic)
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setNewCampaign(prev => ({
        ...prev,
        template_id: templateId,
        message_content: template.content,
      }));
      // Check if template has image header
      if (template.variables?.includes('has_image')) {
        setPreviewImage("https://placehold.co/600x400/png?text=Header+Image");
      } else {
        setPreviewImage(undefined);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleCreate = async () => {
    if (!newCampaign.name) return;

    const campaign = await createCampaign.mutateAsync({
      name: newCampaign.name,
      template_id: newCampaign.template_id || undefined,
      message_content: newCampaign.message_content || undefined,
      scheduled_at: newCampaign.scheduled_at || undefined,
      segment_filter: newCampaign.segment_filter,
    });

    if (selectedContacts.length > 0) {
      await addRecipients.mutateAsync({
        campaignId: campaign.id,
        contactIds: selectedContacts,
      });
    }

    // Trigger explicit send if not scheduled
    if (!newCampaign.scheduled_at) {
      await sendCampaign.mutateAsync(campaign.id);
    }

    setIsCreateOpen(false);
    setNewCampaign({ name: '', template_id: '', message_content: '', scheduled_at: '', segment_filter: {} });
    setSelectedContacts([]);
    setOptInConfirmed(false);
  };

  const filteredContacts = useMemo(() => {
    let result = contacts;

    // 1. Filter by Segment
    if (selectedSegmentId && selectedSegmentId !== 'all') {
      const segment = (segments || []).find(s => s.id === selectedSegmentId);
      if (segment) {
        result = result.filter(contact => {
          const criteria = segment.criteria;
          if (criteria.tags && criteria.tags.length > 0) {
            const contactTags = contact.tags || [];
            if (!criteria.tags.every(t => contactTags.includes(t))) return false;
          }
          if (criteria.last_active_days) {
            const cutoffDate = subDays(new Date(), criteria.last_active_days);
            if (contact.created_at && isAfter(parseISO(contact.created_at), cutoffDate)) return false;
          }
          return true;
        });
      }
    }

    // 2. Filter by Tag dropdown (Legacy)
    if (filterTag) {
      result = result.filter(c => c.tags?.includes(filterTag));
    }

    return result;
  }, [contacts, selectedSegmentId, segments, filterTag]);

  // Effect to auto-select filtered contacts when segment changes (optional, but convenient for "Broadcast to Segment")
  // For now, we just let user select ALL manually or auto-select if segment is chosen?
  // Let's AUTO-SELECT all matches when a segment is picked
  useEffect(() => {
    if (selectedSegmentId && selectedSegmentId !== 'all') {
      setSelectedContacts(filteredContacts.map(c => c.id));
    }
  }, [selectedSegmentId, filteredContacts]);

  const allTags = [...new Set(contacts.flatMap(c => c.tags ?? []))];

  const handleSelectAllContacts = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map(c => c.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const toggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Broadcasts</h1>
            <p className="text-muted-foreground">
              Create and manage bulk message campaigns
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/dashboard/templates'}>
              <Settings className="w-4 h-4 mr-2" />
              Manage Templates
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                <DialogHeader className="px-6 py-4 border-b">
                  <DialogTitle>Create Broadcast Campaign</DialogTitle>
                  <DialogDescription>
                    Configure your campaign and preview it in real-time.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-1 overflow-hidden">
                  {/* LEFT COLUMN: FORM */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 border-r">
                    <div className="space-y-2">
                      <Label>Campaign Name</Label>
                      <Input
                        placeholder="e.g., Holiday Promotion"
                        value={newCampaign.name}
                        onChange={e => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Select Template</Label>
                      <Select
                        value={newCampaign.template_id}
                        onValueChange={handleTemplateSelect}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a WhatsApp Template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.length > 0 ? (
                            templates.map(template => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name} ({template.category})
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground text-center">No templates found.</div>
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Templates must be approved by Meta. <a href="/dashboard/templates" className="underline text-primary">Manage Templates</a>
                      </p>
                    </div>

                    {/* Dynamic Template Fields would go here (e.g. Image Upload, Variable Inputs) */}
                    {newCampaign.template_id && (
                      <div className="p-4 bg-muted/30 rounded-lg space-y-4 border border-dashed text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ImageIcon className="w-4 h-4" />
                          <span>Media Header (Optional)</span>
                        </div>
                        <Input type="file" accept="image/*" className="bg-background" onChange={handleImageUpload} />
                        <p className="text-[10px] text-muted-foreground">Only if your template has an Image header.</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Message Content (Preview)</Label>
                      <Textarea
                        disabled
                        className="bg-muted"
                        value={newCampaign.message_content || "Select a template to view content..."}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Target Audience</Label>

                      {/* Segment Selector */}
                      <div className="flex flex-col gap-2 mb-2">
                        <Select value={selectedSegmentId} onValueChange={(val) => {
                          setSelectedSegmentId(val);
                          if (val === 'custom') {
                            setIsImportOpen(true);
                          }
                        }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Segment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Check Manually / All Contacts</SelectItem>
                            <SelectItem value="custom">
                              <span className="flex items-center gap-2 font-medium text-primary">
                                <Upload className="w-3 h-3" />
                                Import Custom Audience
                              </span>
                            </SelectItem>
                            {(segments || []).map(s => (
                              <SelectItem key={s.id} value={s.id}>
                                <span className="flex items-center gap-2">
                                  <Filter className="w-3 h-3 text-muted-foreground" />
                                  {s.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {selectedSegmentId === 'custom' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full border-dashed border-2"
                            onClick={() => setIsImportOpen(true)}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Import More Contacts to Audience
                          </Button>
                        )}
                      </div>

                      <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
                        <div className="flex items-center gap-2 pb-2 border-b sticky top-0 bg-background z-10">
                          <Checkbox
                            checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                            onCheckedChange={handleSelectAllContacts}
                          />
                          <span className="text-sm font-medium">Select All ({filteredContacts.length})</span>
                        </div>
                        {filteredContacts.map(contact => (
                          <div key={contact.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedContacts.includes(contact.id)}
                              onCheckedChange={() => toggleContact(contact.id)}
                            />
                            <span className="text-sm">{contact.name || contact.phone_number}</span>
                          </div>
                        ))}
                        {filteredContacts.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-2">No contacts found.</p>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedContacts.length} contacts selected</p>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: PREVIEW */}
                  <div className="w-[350px] bg-muted/10 p-6 flex flex-col items-center justify-center bg-slate-50 relative">
                    <div className="absolute top-4 left-0 w-full text-center">
                      <h3 className="text-sm font-semibold text-muted-foreground flex items-center justify-center gap-2">
                        <Smartphone className="w-4 h-4" /> Live Preview
                      </h3>
                    </div>
                    <PhoneMockup
                      message={newCampaign.message_content || "Select a template to preview"}
                      time={format(new Date(), 'HH:mm')}
                      image={previewImage}
                      avatar={businessProfile?.profile_picture_url}
                    />
                  </div>
                </div>

                <div className="px-6 py-2 bg-amber-50 border-t border-amber-100">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="opt-in"
                      checked={optInConfirmed}
                      onCheckedChange={(checked) => setOptInConfirmed(checked as boolean)}
                    />
                    <Label htmlFor="opt-in" className="text-xs text-amber-900 leading-tight cursor-pointer">
                      I confirm that all selected recipients have explicitly opted-in to receive messages from my business.
                      I understand that messaging users without consent may lead to my WhatsApp Business Account being blocked.
                    </Label>
                  </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t bg-background">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button
                    onClick={handleCreate}
                    disabled={!newCampaign.name || !newCampaign.template_id || selectedContacts.length === 0 || createCampaign.isPending || !optInConfirmed}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {newCampaign.scheduled_at ? 'Schedule' : 'Send Broadcast'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Campaign List */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg">No campaigns yet</h3>
              <p className="text-muted-foreground">Create your first broadcast campaign</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {campaigns.map(campaign => (
              <Card key={campaign.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>Created {format(new Date(campaign.created_at), 'PPp')}</CardDescription>
                    </div>
                    <Badge className={statusColors[campaign.status]}>
                      {statusIcons[campaign.status]}
                      <span className="ml-1 capitalize">{campaign.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{campaign.total_recipients} recipients</span>
                    </div>
                    {campaign.template && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{campaign.template.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline"><Eye className="mr-2 h-3 w-3" /> View Details</Button>
                    {campaign.status === 'draft' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => sendCampaign.mutateAsync(campaign.id)}
                        >
                          <Send className="mr-2 h-3 w-3" /> Send Now
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteCampaign.mutate(campaign.id)}>
                          <Trash2 className="mr-2 h-3 w-3" /> Delete
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ImportContactsDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        onImportSuccess={handleImportSuccess}
      />
    </DashboardLayout >
  );
}
