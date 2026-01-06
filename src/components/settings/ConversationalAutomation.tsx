import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, MessageSquare, Terminal, HelpCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface IceBreaker {
    question: string;
}

interface Command {
    command: string;
    description: string;
}

interface AutomationConfig {
    ice_breakers: IceBreaker[];
    commands: Command[];
    enable_welcome_message: boolean;
}

export function ConversationalAutomation() {
    const [config, setConfig] = useState<AutomationConfig>({
        ice_breakers: [],
        commands: [],
        enable_welcome_message: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('whatsapp-api', {
                body: { action: 'get_automation_config' }
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            // Transform API response to match our internal state shape if needed
            // API typically returns ice_breakers as strings or objects depending on version
            // We'll normalize to our interface rows

            setConfig({
                ice_breakers: Array.isArray(data.ice_breakers) ? data.ice_breakers : [],
                commands: Array.isArray(data.commands) ? data.commands : [],
                enable_welcome_message: data.enable_welcome_message || false
            });

        } catch (err: any) {
            console.error('Failed to load automation config:', err);
            // Don't toast error on 404/empty, just assume empty.
        } finally {
            setIsLoading(false);
        }
    };

    const saveConfig = async () => {
        setIsSaving(true);
        try {
            // Validation
            if (config.commands.some(c => !c.command.startsWith('/'))) {
                toast.error('All commands must start with "/" (e.g., /help)');
                setIsSaving(false);
                return;
            }

            const { data, error } = await supabase.functions.invoke('whatsapp-api', {
                body: {
                    action: 'update_automation_config',
                    ice_breakers: config.ice_breakers,
                    commands: config.commands,
                    enable_welcome_message: config.enable_welcome_message
                }
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            toast.success('Automation settings updated successfully!');
        } catch (err: any) {
            console.error('Failed to save config:', err);
            toast.error(err.message || 'Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    const addIceBreaker = () => {
        if (config.ice_breakers.length >= 4) {
            toast.error('Maximum 4 ice breakers allowed');
            return;
        }
        setConfig(prev => ({
            ...prev,
            ice_breakers: [...prev.ice_breakers, { question: '' }]
        }));
    };

    const removeIceBreaker = (index: number) => {
        setConfig(prev => ({
            ...prev,
            ice_breakers: prev.ice_breakers.filter((_, i) => i !== index)
        }));
    };

    const updateIceBreaker = (index: number, value: string) => {
        const newBreakers = [...config.ice_breakers];
        newBreakers[index] = { question: value };
        setConfig(prev => ({ ...prev, ice_breakers: newBreakers }));
    };

    const addCommand = () => {
        if (config.commands.length >= 30) {
            toast.error('Maximum 30 commands allowed');
            return;
        }
        setConfig(prev => ({
            ...prev,
            commands: [...prev.commands, { command: '/', description: '' }]
        }));
    };

    const removeCommand = (index: number) => {
        setConfig(prev => ({
            ...prev,
            commands: prev.commands.filter((_, i) => i !== index)
        }));
    };

    const updateCommand = (index: number, field: keyof Command, value: string) => {
        const newCommands = [...config.commands];
        newCommands[index] = { ...newCommands[index], [field]: value };
        setConfig(prev => ({ ...prev, commands: newCommands }));
    };

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-8 flex items-center justify-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Loading automation settings...
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Ice Breakers
                    </CardTitle>
                    <CardDescription>
                        Buttons shown to new customers when they open a chat with you.
                        (Max 4 items)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {config.ice_breakers.map((breaker, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                placeholder="e.g., What are your opening hours?"
                                value={breaker.question}
                                onChange={(e) => updateIceBreaker(index, e.target.value)}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeIceBreaker(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                    {config.ice_breakers.length < 4 && (
                        <Button variant="outline" size="sm" onClick={addIceBreaker} className="mt-2">
                            <Plus className="w-4 h-4 mr-2" /> Add Ice Breaker
                        </Button>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        Commands
                    </CardTitle>
                    <CardDescription>
                        Menu shortcuts that appear when users type '/' in the chat.
                        (e.g., /help, /reset)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {config.commands.length > 0 && (
                        <div className="grid grid-cols-12 gap-4 mb-2 text-sm font-medium text-muted-foreground">
                            <div className="col-span-4">Command</div>
                            <div className="col-span-7">Description (Hint)</div>
                            <div className="col-span-1"></div>
                        </div>
                    )}

                    {config.commands.map((cmd, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4">
                                <Input
                                    placeholder="/command"
                                    value={cmd.command}
                                    onChange={(e) => updateCommand(index, 'command', e.target.value)}
                                />
                            </div>
                            <div className="col-span-7">
                                <Input
                                    placeholder="What does this do?"
                                    value={cmd.description}
                                    onChange={(e) => updateCommand(index, 'description', e.target.value)}
                                />
                            </div>
                            <div className="col-span-1 flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={() => removeCommand(index)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" size="sm" onClick={addCommand} className="mt-2">
                        <Plus className="w-4 h-4 mr-2" /> Add Command
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        Welcome Message
                    </CardTitle>
                    <CardDescription>
                        Automatically greet users when they send their first message.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Enable Welcome Message</Label>
                            <p className="text-sm text-muted-foreground">
                                This is a standard Meta feature availability may vary.
                            </p>
                        </div>
                        <Switch
                            checked={config.enable_welcome_message}
                            onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enable_welcome_message: checked }))}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
                <Button onClick={saveConfig} variant="whatsapp" disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
