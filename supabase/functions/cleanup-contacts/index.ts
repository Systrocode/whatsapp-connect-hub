import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";
import { corsHeaders } from "../_shared/security.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseServiceRole = createClient(supabaseUrl, supabaseKey);

    const { data: contacts, error } = await supabaseServiceRole.from('contacts').select('*');
    if (error) throw error;

    let updatedCount = 0;
    
    // First, strip spaces from all contacts to normalize them in the DB permanently
    for (const contact of contacts) {
      if (!contact.phone_number) continue;
      const stripped = contact.phone_number.replace(/\s+/g, '');
      if (stripped !== contact.phone_number) {
        await supabaseServiceRole.from('contacts').update({ phone_number: stripped }).eq('id', contact.id);
        updatedCount++;
      }
    }

    // Now re-fetch and merge any duplicates that might have been created
    const { data: normalizedContacts } = await supabaseServiceRole.from('contacts').select('*');
    
    const groups = new Map();
    for (const contact of normalizedContacts) {
      if (!contact.phone_number) continue;
      const normPhone = contact.phone_number.replace(/\D/g, '');
      const key = `${contact.user_id}_${normPhone}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(contact);
    }

    let deletedCount = 0;
    for (const [key, similarContacts] of groups.entries()) {
      if (similarContacts.length > 1) {
        similarContacts.sort((a, b) => {
          // Prefer contacts that have names over those that don't
          if (a.name && !b.name) return -1;
          if (b.name && !a.name) return 1;
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
        const primary = similarContacts[0];
        const duplicates = similarContacts.slice(1);
        
        for (const dup of duplicates) {
          const { data: convos } = await supabaseServiceRole.from('conversations').select('*').eq('contact_id', dup.id);
          for (const convo of convos || []) {
            const { data: primaryConvo } = await supabaseServiceRole.from('conversations').select('*').eq('contact_id', primary.id).maybeSingle();
            if (primaryConvo) {
              await supabaseServiceRole.from('messages').update({ conversation_id: primaryConvo.id }).eq('conversation_id', convo.id);
              await supabaseServiceRole.from('conversations').delete().eq('id', convo.id);
            } else {
              await supabaseServiceRole.from('conversations').update({ contact_id: primary.id }).eq('id', convo.id);
            }
          }
          await supabaseServiceRole.from('contacts').delete().eq('id', dup.id);
          deletedCount++;
        }
      }
    }

    return new Response(JSON.stringify({ success: true, updated: updatedCount, deleted: deletedCount }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
});
