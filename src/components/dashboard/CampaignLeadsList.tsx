import { motion } from 'framer-motion';
import { Target, Phone, User, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCampaignLeads, CampaignLead } from '@/hooks/useCampaignLeads';
import { useConversations } from '@/hooks/useConversations';
import { useContacts } from '@/hooks/useContacts';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface CampaignLeadsListProps {
  limit?: number;
}

const CampaignLeadsList = ({ limit = 5 }: CampaignLeadsListProps) => {
  const { leads, isLoading } = useCampaignLeads();
  const { createConversation } = useConversations();
  const { createContact } = useContacts();
  const navigate = useNavigate();

  const displayLeads = limit ? leads.slice(0, limit) : leads;

  const handleStartConversation = async (lead: CampaignLead) => {
    try {
      // First, create a contact if not already linked
      let contactId = lead.contact_id;
      
      if (!contactId) {
        const newContact = await createContact.mutateAsync({
          phone_number: lead.phone_number,
          name: lead.name || undefined,
          tags: ['campaign-lead', lead.campaign?.name || 'campaign'],
        });
        contactId = newContact.id;
      }
      
      // Create/get conversation
      const conversation = await createConversation.mutateAsync(contactId);
      
      // Navigate to conversation
      navigate(`/dashboard/conversations/${conversation.id}`);
      toast.success('Conversation started!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to start conversation');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (displayLeads.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
          <Target className="w-6 h-6 text-muted-foreground" />
        </div>
        <h4 className="font-medium text-foreground mb-1">No leads yet</h4>
        <p className="text-sm text-muted-foreground">
          Leads from your campaigns will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayLeads.map((lead, index) => (
        <motion.div
          key={lead.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">
                  {lead.name || 'Unknown'}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  <Target className="w-3 h-3 mr-1" />
                  {lead.campaign?.name || 'Campaign'}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {lead.phone_number}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStartConversation(lead)}
            disabled={createContact.isPending || createConversation.isPending}
          >
            Chat
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default CampaignLeadsList;
