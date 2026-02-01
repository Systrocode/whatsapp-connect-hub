import { ParsedContact, ParseResult } from '@/utils/contactParsers';
import { AlertCircle, CheckCircle2, User, Phone, Mail, Tag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ImportPreviewProps {
  result: ParseResult;
  maxPreview?: number;
}

const ImportPreview = ({ result, maxPreview = 10 }: ImportPreviewProps) => {
  const { contacts, errors, totalRows } = result;
  const previewContacts = contacts.slice(0, maxPreview);
  const hasMore = contacts.length > maxPreview;

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-medium">{contacts.length} valid contacts</span>
        </div>
        {errors.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{errors.length} errors</span>
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground">
          <span className="text-sm">{totalRows} total rows</span>
        </div>
      </div>

      {/* Contact Preview */}
      {contacts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Preview</h4>
          <ScrollArea className="h-[200px] border border-border rounded-lg">
            <div className="p-2 space-y-2">
              {previewContacts.map((contact, index) => (
                <ContactPreviewCard key={index} contact={contact} index={index} />
              ))}
              {hasMore && (
                <div className="text-center py-2 text-sm text-muted-foreground">
                  ... and {contacts.length - maxPreview} more contacts
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Errors Preview */}
      {errors.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-destructive flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Errors ({errors.length})
          </h4>
          <ScrollArea className="h-[120px] border border-destructive/30 rounded-lg bg-destructive/5">
            <div className="p-3 space-y-1">
              {errors.slice(0, 10).map((error, index) => (
                <div key={index} className="text-sm text-destructive">
                  Row {error.row}: {error.message}
                </div>
              ))}
              {errors.length > 10 && (
                <div className="text-sm text-muted-foreground">
                  ... and {errors.length - 10} more errors
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

const ContactPreviewCard = ({ contact, index }: { contact: ParsedContact; index: number }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <User className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-foreground text-sm truncate">
            {contact.name || 'Unknown'}
          </span>
          <span className="text-muted-foreground text-xs flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {contact.phone_number}
          </span>
          {contact.email && (
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {contact.email}
            </span>
          )}
        </div>
        {contact.tags && contact.tags.length > 0 && (
          <div className="flex gap-1 mt-1">
            {contact.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs py-0">
                {tag}
              </Badge>
            ))}
            {contact.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{contact.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportPreview;
