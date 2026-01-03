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
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBroadcasts, BroadcastCampaign } from '@/hooks/useBroadcasts';
import { useTemplates } from '@/hooks/useTemplates';
import { useContacts } from '@/hooks/useContacts';
import { Plus, Send, Calendar, Users, MessageSquare, Trash2, Eye, Clock, CheckCircle, XCircle, AlertCircle, Settings, Smartphone, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import PhoneMockup from '@/components/PhoneMockup';

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

export default function Broadcasts() {
  const { campaigns, isLoading, createCampaign, addRecipients, deleteCampaign } = useBroadcasts();
  const { templates } = useTemplates();
  const { contacts } = useContacts();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    template_id: '',
    message_content: '',
    scheduled_at: '',
    segment_filter: {} as Record<string, unknown>,
  });
  const [filterTag, setFilterTag] = useState('');

  // Handle Template Selection & Content Parsing (Basic)
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setNewCampaign(prev => ({
        ...prev,
        template_id: templateId,
        message_content: template.content,
      }));
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

    setIsCreateOpen(false);
    setNewCampaign({ name: '', template_id: '', message_content: '', scheduled_at: '', segment_filter: {} });
    setSelectedContacts([]);
  };

  const filteredContacts = filterTag
    ? contacts.filter(c => c.tags?.includes(filterTag))
    : contacts;

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
                        <Input type="file" disabled className="bg-background" />
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
                      <Label>Select Recipients</Label>
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
                    />
                  </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t bg-background">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button
                    onClick={handleCreate}
                    disabled={!newCampaign.name || !newCampaign.template_id || selectedContacts.length === 0 || createCampaign.isPending}
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
                      <Button size="sm" variant="destructive" onClick={() => deleteCampaign.mutate(campaign.id)}>
                        <Trash2 className="mr-2 h-3 w-3" /> Delete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
