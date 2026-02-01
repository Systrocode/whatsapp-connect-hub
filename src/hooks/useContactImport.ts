import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';
import { 
  parseContactFile, 
  parsePastedText, 
  ParsedContact, 
  ParseResult 
} from '@/utils/contactParsers';

export interface ImportLimits {
  batchLimit: number;
  totalLimit: number;
  currentUsed: number;
  canImport: boolean;
  remaining: number;
}

export interface ImportProgress {
  total: number;
  processed: number;
  successful: number;
  failed: number;
  duplicates: number;
}

export type DuplicateHandling = 'skip' | 'update' | 'create';

export const useContactImport = () => {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const queryClient = useQueryClient();
  
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ImportProgress>({
    total: 0,
    processed: 0,
    successful: 0,
    failed: 0,
    duplicates: 0,
  });

  // Get import limits based on subscription
  const getImportLimits = useCallback((): ImportLimits => {
    const plan = subscription?.plan;
    const contactsUsed = subscription?.contacts_used ?? 0;
    
    // Default limits for different plans
    let batchLimit = 1000;
    let totalLimit = 1000;
    
    if (plan) {
      totalLimit = plan.contact_limit;
      // Batch limit is the minimum of plan limit or a reasonable batch size
      batchLimit = Math.min(plan.contact_limit, 5000);
      
      // Check plan name for higher tier limits
      const planName = plan.name.toLowerCase();
      if (planName.includes('starter')) {
        batchLimit = 2000;
      } else if (planName.includes('professional') || planName.includes('pro')) {
        batchLimit = 5000;
      } else if (planName.includes('enterprise')) {
        batchLimit = 10000;
        totalLimit = 999999; // Effectively unlimited
      }
    }
    
    const remaining = Math.max(0, totalLimit - contactsUsed);
    
    return {
      batchLimit,
      totalLimit,
      currentUsed: contactsUsed,
      canImport: remaining > 0,
      remaining,
    };
  }, [subscription]);

  // Parse file
  const parseFile = useCallback(async (file: File): Promise<ParseResult> => {
    setIsProcessing(true);
    try {
      const result = await parseContactFile(file);
      setParseResult(result);
      return result;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Parse pasted text
  const parseText = useCallback((text: string): ParseResult => {
    const result = parsePastedText(text);
    setParseResult(result);
    return result;
  }, []);

  // Clear parse result
  const clearParseResult = useCallback(() => {
    setParseResult(null);
    setProgress({
      total: 0,
      processed: 0,
      successful: 0,
      failed: 0,
      duplicates: 0,
    });
  }, []);

  // Import contacts mutation
  const importContacts = useMutation({
    mutationFn: async ({ 
      contacts, 
      duplicateHandling = 'skip' 
    }: { 
      contacts: ParsedContact[]; 
      duplicateHandling?: DuplicateHandling;
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const limits = getImportLimits();
      
      if (!limits.canImport) {
        throw new Error('Contact limit reached. Please upgrade your plan.');
      }
      
      // Limit contacts to what's allowed
      const contactsToImport = contacts.slice(0, Math.min(limits.batchLimit, limits.remaining));
      
      if (contactsToImport.length < contacts.length) {
        toast.warning(`Importing ${contactsToImport.length} of ${contacts.length} contacts due to plan limits`);
      }
      
      setProgress({
        total: contactsToImport.length,
        processed: 0,
        successful: 0,
        failed: 0,
        duplicates: 0,
      });
      
      // Get existing contacts to check for duplicates
      const { data: existingContacts } = await supabase
        .from('contacts')
        .select('phone_number, id')
        .eq('user_id', user.id);
      
      const existingPhones = new Map(
        existingContacts?.map(c => [c.phone_number, c.id]) ?? []
      );
      
      const results = {
        successful: 0,
        failed: 0,
        duplicates: 0,
        errors: [] as Array<{ contact: ParsedContact; error: string }>,
      };
      
      // Process in batches of 50
      const batchSize = 50;
      for (let i = 0; i < contactsToImport.length; i += batchSize) {
        const batch = contactsToImport.slice(i, i + batchSize);
        
        const toInsert: Array<ParsedContact & { user_id: string }> = [];
        const toUpdate: Array<{ id: string; data: Partial<ParsedContact> }> = [];
        
        for (const contact of batch) {
          const existingId = existingPhones.get(contact.phone_number);
          
          if (existingId) {
            results.duplicates++;
            
            if (duplicateHandling === 'update') {
              toUpdate.push({ 
                id: existingId, 
                data: {
                  name: contact.name,
                  email: contact.email,
                  tags: contact.tags,
                  notes: contact.notes,
                }
              });
            } else if (duplicateHandling === 'create') {
              // Add with slightly modified phone (rare use case)
              toInsert.push({ ...contact, user_id: user.id });
            }
            // skip: do nothing
          } else {
            toInsert.push({ ...contact, user_id: user.id });
          }
        }
        
        // Insert new contacts
        if (toInsert.length > 0) {
          const { data, error } = await supabase
            .from('contacts')
            .insert(toInsert)
            .select();
          
          if (error) {
            results.failed += toInsert.length;
            toInsert.forEach(c => {
              results.errors.push({ contact: c, error: error.message });
            });
          } else {
            results.successful += data?.length ?? 0;
            // Add to existing map to handle duplicates within the import
            data?.forEach(c => existingPhones.set(c.phone_number, c.id));
          }
        }
        
        // Update existing contacts
        for (const update of toUpdate) {
          const { error } = await supabase
            .from('contacts')
            .update(update.data)
            .eq('id', update.id);
          
          if (error) {
            results.failed++;
          } else {
            results.successful++;
          }
        }
        
        setProgress(prev => ({
          ...prev,
          processed: Math.min(i + batchSize, contactsToImport.length),
          successful: results.successful,
          failed: results.failed,
          duplicates: results.duplicates,
        }));
      }
      
      return results;
    },
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
      
      if (results.failed > 0) {
        toast.warning(
          `Imported ${results.successful} contacts with ${results.failed} failures`
        );
      } else {
        toast.success(`Successfully imported ${results.successful} contacts`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    parseResult,
    isProcessing,
    progress,
    getImportLimits,
    parseFile,
    parseText,
    clearParseResult,
    importContacts,
  };
};
