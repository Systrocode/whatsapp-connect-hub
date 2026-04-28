import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function mergeDuplicates() {
  console.log('Fetching all contacts...');
  const { data: contacts, error } = await supabase.from('contacts').select('*');
  if (error) throw error;

  console.log(`Found ${contacts.length} contacts.`);
  
  // Group by user_id and normalized phone number
  const groups = new Map();
  for (const contact of contacts) {
    const normPhone = contact.phone_number.replace(/\D/g, '');
    const key = `${contact.user_id}_${normPhone}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(contact);
  }

  for (const [key, similarContacts] of groups.entries()) {
    if (similarContacts.length > 1) {
      console.log(`Found duplicates for ${key}:`, similarContacts.map(c => c.phone_number));
      
      // Sort to keep the oldest or one with the best formatting (e.g., + prefix or shortest string)
      // Actually, let's keep the one that has the most conversations or the oldest. Let's sort by created_at.
      similarContacts.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      
      const primary = similarContacts[0];
      const duplicates = similarContacts.slice(1);
      
      for (const dup of duplicates) {
        console.log(`Merging ${dup.id} into ${primary.id}...`);
        
        // Find conversations for dup
        const { data: convos } = await supabase.from('conversations').select('*').eq('contact_id', dup.id);
        
        for (const convo of convos || []) {
          // Does primary already have a conversation?
          const { data: primaryConvo } = await supabase.from('conversations')
            .select('*').eq('contact_id', primary.id).maybeSingle();
            
          if (primaryConvo) {
            console.log(`Moving messages from convo ${convo.id} to ${primaryConvo.id}`);
            // Update messages to point to primaryConvo
            await supabase.from('messages').update({ conversation_id: primaryConvo.id }).eq('conversation_id', convo.id);
            // Delete dup convo
            await supabase.from('conversations').delete().eq('id', convo.id);
          } else {
            console.log(`Reassigning convo ${convo.id} to primary contact ${primary.id}`);
            // Just point the convo to the primary contact
            await supabase.from('conversations').update({ contact_id: primary.id }).eq('id', convo.id);
          }
        }
        
        console.log(`Deleting duplicate contact ${dup.id}...`);
        await supabase.from('contacts').delete().eq('id', dup.id);
      }
    }
  }
  console.log('Merge complete.');
}

mergeDuplicates().catch(console.error);
