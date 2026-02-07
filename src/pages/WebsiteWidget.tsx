import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WebsiteWidget = () => {
    const [position, setPosition] = useState('bottom-right');
    const [welcomeMessage, setWelcomeMessage] = useState('Chat with us!');

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold text-foreground mb-1">WhatsApp Website Button</h1>
                <p className="text-muted-foreground mb-6">Drive WhatsApp sales with personalised CTAs</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                            <CardDescription>Customize your website button</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Position</Label>
                                <Select value={position} onValueChange={setPosition}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Welcome Message</Label>
                                <Input
                                    value={welcomeMessage}
                                    onChange={(e) => setWelcomeMessage(e.target.value)}
                                    placeholder="Chat with us!"
                                />
                            </div>
                            <div className="pt-4">
                                <Button className="w-full">Get Widget Code</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/30 relative overflow-hidden min-h-[300px]">
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Fake Website Content */}
                            <div className="space-y-4 opacity-20 pointer-events-none">
                                <div className="h-8 w-3/4 bg-foreground/20 rounded-md" />
                                <div className="h-4 w-full bg-foreground/20 rounded-md" />
                                <div className="h-4 w-5/6 bg-foreground/20 rounded-md" />
                                <div className="h-40 w-full bg-foreground/20 rounded-md" />
                            </div>

                            {/* Widget Preview */}
                            <div
                                className={`absolute p-4 flex items-center gap-3 transition-all duration-300
                  ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'}
                `}
                            >
                                <div className="bg-white text-black px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-fade-in shadow-black/5">
                                    {welcomeMessage}
                                </div>
                                <div className="rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer">
                                    <img src="https://img.icons8.com/color/96/whatsapp--v1.png" alt="WhatsApp" className="w-14 h-14" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default WebsiteWidget;
