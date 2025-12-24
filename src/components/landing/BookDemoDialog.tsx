import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Mail, User, Building2, Phone, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const bookDemoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
});

type BookDemoFormData = z.infer<typeof bookDemoSchema>;

interface BookDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookDemoDialog = ({ open, onOpenChange }: BookDemoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[80vh] p-0 overflow-hidden flex flex-col bg-white text-black border-none [&>button]:text-black">
        <DialogHeader className="p-6 pb-2 shrink-0">
          <DialogTitle className="flex items-center gap-2 text-black">
            <Calendar className="w-5 h-5 text-green-600" />
            Book a Demo
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Schedule a personalized demo with our team.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex-1 bg-background">
          <iframe
            src="https://calendly.com/systrocode/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a Demo"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
