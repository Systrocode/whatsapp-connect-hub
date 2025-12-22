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
import { useBroadcasts, BroadcastCampaign } from '@/hooks/useBroadcasts';
import { useTemplates } from '@/hooks/useTemplates';
import { useContacts } from '@/hooks/useContacts';
import { useSubscription } from '@/hooks/useSubscription';
import { Plus, Send, Calendar, Users, MessageSquare, Trash2, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

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
  const { subscription, checkUsageLimit } = useSubscription();
  
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

  const canSendMessages = checkUsageLimit('messages');

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
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button disabled={!canSendMessages}>
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Broadcast Campaign</DialogTitle>
                <DialogDescription>
                  Send messages to multiple contacts at once
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Campaign Name</Label>
                  <Input
                    placeholder="e.g., Holiday Promotion"
                    value={newCampaign.name}
                    onChange={e => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Message Template (Optional)</Label>
                  <Select
                    value={newCampaign.template_id}
                    onValueChange={value => setNewCampaign(prev => ({ 
                      ...prev, 
                      template_id: value,
                      message_content: templates.find(t => t.id === value)?.content ?? '',
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.filter(t => t.is_approved).map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Message Content</Label>
                  <Textarea
                    placeholder="Enter your message..."
                    value={newCampaign.message_content}
                    onChange={e => setNewCampaign(prev => ({ ...prev, message_content: e.target.value }))}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Schedule (Optional)</Label>
                  <Input
                    type="datetime-local"
                    value={newCampaign.scheduled_at}
                    onChange={e => setNewCampaign(prev => ({ ...prev, scheduled_at: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Select Recipients</Label>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-muted-foreground">Filter by tag:</Label>
                      <Select value={filterTag} onValueChange={setFilterTag}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Contacts</SelectItem>
                          {allTags.map(tag => (
                            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <Checkbox
                        checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                        onCheckedChange={handleSelectAllContacts}
                      />
                      <span className="text-sm font-medium">
                        Select All ({filteredContacts.length})
                      </span>
                    </div>
                    {filteredContacts.map(contact => (
                      <div key={contact.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={() => toggleContact(contact.id)}
                        />
                        <span className="text-sm">
                          {contact.name || contact.phone_number}
                        </span>
                        {contact.tags?.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedContacts.length} contacts selected
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreate} 
                  disabled={!newCampaign.name || selectedContacts.length === 0 || createCampaign.isPending}
                >
                  {newCampaign.scheduled_at ? 'Schedule Campaign' : 'Create Campaign'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {!canSendMessages && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>You've reached your message limit. Upgrade your plan to send more broadcasts.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {subscription && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-sm">
                <span>Messages Used</span>
                <span className="font-medium">
                  {subscription.messages_used} / {subscription.plan?.message_limit ?? 0}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min((subscription.messages_used / (subscription.plan?.message_limit ?? 1)) * 100, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}

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
                      <CardDescription>
                        Created {format(new Date(campaign.created_at), 'PPp')}
                      </CardDescription>
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
                    {campaign.scheduled_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Scheduled: {format(new Date(campaign.scheduled_at), 'PPp')}</span>
                      </div>
                    )}
                  </div>
                  
                  {campaign.status === 'completed' && (
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div className="p-2 rounded-md bg-muted">
                        <p className="text-lg font-semibold">{campaign.sent_count}</p>
                        <p className="text-xs text-muted-foreground">Sent</p>
                      </div>
                      <div className="p-2 rounded-md bg-green-500/10">
                        <p className="text-lg font-semibold text-green-500">{campaign.delivered_count}</p>
                        <p className="text-xs text-muted-foreground">Delivered</p>
                      </div>
                      <div className="p-2 rounded-md bg-destructive/10">
                        <p className="text-lg font-semibold text-destructive">{campaign.failed_count}</p>
                        <p className="text-xs text-muted-foreground">Failed</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex gap-2">
                    {campaign.status === 'draft' && (
                      <Button size="sm">
                        <Send className="mr-2 h-3 w-3" />
                        Send Now
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                    {campaign.status === 'draft' && (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteCampaign.mutate(campaign.id)}
                      >
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
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
