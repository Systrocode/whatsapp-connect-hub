
import { useState } from 'react';
import { Contact } from '@/hooks/useContacts';
import {
    ChevronDown,
    ChevronUp,
    Copy,
    Edit2,
    Plus,
    X,
    User,
    Tag,
    FileText,
    Briefcase,
    Info
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { toast } from 'sonner';

interface ContactInfoSidebarProps {
    contact: Contact | null | undefined;
    onUpdate: (updates: Partial<Contact>) => void;
}

export const ContactInfoSidebar = ({ contact, onUpdate }: ContactInfoSidebarProps) => {
    if (!contact) return <div className="w-80 border-l bg-background p-4">No contact selected</div>;

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        contactInfo: true,
        salesAttributes: true,
        contactAttributes: true,
        tags: true,
        notes: true,
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const [newTag, setNewTag] = useState('');
    const [note, setNote] = useState(contact.notes || '');

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag.trim()) {
            const currentTags = contact.tags || [];
            if (!currentTags.includes(newTag.trim())) {
                onUpdate({ tags: [...currentTags, newTag.trim()] });
            }
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        const currentTags = contact.tags || [];
        onUpdate({ tags: currentTags.filter(t => t !== tagToRemove) });
    };

    const handleNoteSave = () => {
        if (note !== contact.notes) {
            onUpdate({ notes: note });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    return (
        <div className="w-80 border-l border-border bg-background h-full overflow-y-auto flex flex-col text-sm">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                    {contact.name?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
                </div>
                <div className="overflow-hidden">
                    <h3 className="font-semibold text-foreground truncate">{contact.name || 'Unknown Contact'}</h3>
                    <p className="text-xs text-muted-foreground truncate opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Edit</p>
                </div>
            </div>

            {/* Accordion Items */}
            <div className="flex-1">

                {/* Contact Info */}
                <div className="border-b border-border">
                    <Collapsible open={openSections.contactInfo} onOpenChange={() => toggleSection('contactInfo')}>
                        <div className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer">
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider flex-1">
                                    <Info className="w-3.5 h-3.5" />
                                    Contact Info
                                </div>
                            </CollapsibleTrigger>
                            <div className="flex items-center">
                                <Button variant="ghost" size="icon" className="h-6 w-6"><Edit2 className="w-3 h-3" /></Button>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        {openSections.contactInfo ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        </div>
                        <CollapsibleContent className="px-4 pb-4 space-y-3">
                            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                                <span className="text-muted-foreground">Phone Number</span>
                                <div className="flex items-center justify-end gap-1 font-medium">
                                    <span className="truncate">{contact.phone_number}</span>
                                    <Copy
                                        className="w-3 h-3 cursor-pointer text-muted-foreground hover:text-foreground"
                                        onClick={() => copyToClipboard(contact.phone_number)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                                <span className="text-muted-foreground">User Name</span>
                                <div className="text-right font-medium truncate">{contact.name || '-'}</div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-dashed border-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border-2 border-green-500 animate-pulse" />
                                    <span className="font-medium text-slate-700">CX Score</span>
                                    <Badge variant="destructive" className="text-[10px] h-5 px-1.5 bg-red-100 text-red-600 hover:bg-red-200 border-none shadow-none">New</Badge>
                                </div>
                                <Button variant="link" className="text-blue-600 h-auto p-0 text-xs font-semibold">Start Tracking</Button>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Sales Attributes (Mock) */}
                <div className="border-b border-border">
                    <Collapsible open={openSections.salesAttributes} onOpenChange={() => toggleSection('salesAttributes')}>
                        <div className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer">
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider flex-1">
                                    <Briefcase className="w-3.5 h-3.5" />
                                    Sales Attributes
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    {openSections.salesAttributes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="px-4 pb-4 space-y-3">
                            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                    Contact Owner
                                </div>
                                <Select defaultValue="you">
                                    <SelectTrigger className="h-7 w-[130px] text-xs bg-transparent border-none text-right font-medium focus:ring-0 shadow-none px-0 justify-end gap-1 text-muted-foreground hover:text-foreground data-[placeholder]:text-muted-foreground">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent align="end">
                                        <SelectItem value="you">You</SelectItem>
                                        <SelectItem value="team">Team Member</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                    Lead Stage
                                </div>
                                <div className="flex items-center justify-end gap-1">
                                    <span className="font-medium">New Lead</span>
                                    <X className="w-3 h-3 cursor-pointer text-muted-foreground hover:text-red-500" />
                                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Contact Attributes */}
                <div className="border-b border-border">
                    <Collapsible open={openSections.contactAttributes} onOpenChange={() => toggleSection('contactAttributes')}>
                        <div className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer">
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider flex-1">
                                    <User className="w-3.5 h-3.5" />
                                    Contact Attributes
                                </div>
                            </CollapsibleTrigger>
                            <div className="flex items-center">
                                <Button variant="ghost" size="icon" className="h-6 w-6"><Edit2 className="w-3 h-3" /></Button>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        {openSections.contactAttributes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        </div>
                        <CollapsibleContent className="px-4 pb-4 space-y-3">
                            <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                                <span className="text-muted-foreground">Name</span>
                                <div className="text-right font-medium truncate">{contact.name || '-'}</div>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                                <span className="text-muted-foreground">Email</span>
                                <div className="text-right font-medium truncate">{contact.email || '-'}</div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Tags */}
                <div className="border-b border-border">
                    <Collapsible open={openSections.tags} onOpenChange={() => toggleSection('tags')}>
                        <div className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer">
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider flex-1">
                                    <Tag className="w-3.5 h-3.5" />
                                    Tags
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    {openSections.tags ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="px-4 pb-4 space-y-3">
                            <Input
                                placeholder="Add a tag..."
                                className="h-8 text-xs bg-muted/30"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onKeyDown={handleAddTag}
                            />
                            <div className="flex flex-wrap gap-2">
                                {(contact.tags || []).map(tag => (
                                    <Badge key={tag} variant="secondary" className="px-2 py-0.5 h-6 text-xs gap-1 hover:bg-muted-foreground/20">
                                        {tag}
                                        <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                                    </Badge>
                                ))}
                                {(!contact.tags?.length) && <span className="text-xs text-muted-foreground italic">No tags added</span>}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Notes */}
                <div className="border-b border-border">
                    <Collapsible open={openSections.notes} onOpenChange={() => toggleSection('notes')}>
                        <div className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer">
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider flex-1">
                                    <FileText className="w-3.5 h-3.5" />
                                    Notes
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Plus className="w-3 h-3" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    {openSections.notes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="px-4 pb-4 space-y-3">
                            <Textarea
                                placeholder="Add a note..."
                                className="min-h-[80px] text-xs bg-muted/30 resize-none"
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                onBlur={handleNoteSave}
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Notes help you to keep track of your conversation with your team
                            </p>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

            </div>
        </div>
    );
};
