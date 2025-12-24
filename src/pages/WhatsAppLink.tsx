import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, QrCode, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const WhatsAppLink = () => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const generateLink = () => {
        if (!phone) return '';
        const cleanPhone = phone.replace(/\D/g, '');
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
    };

    const link = generateLink();

    const handleCopy = () => {
        if (!link) {
            toast.error('Please enter a phone number first');
            return;
        }
        navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard!');
    };

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold text-foreground mb-1">Customize WhatsApp Link</h1>
                <p className="text-muted-foreground mb-6">Create shareable links & QR for your WA business number</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                            <CardDescription>Enter your WhatsApp details below</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">WhatsApp Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="e.g. 15551234567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">Include country code without + or 00</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Pre-filled Message (Optional)</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Hello, I'm interested in..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>Your generated link and QR code</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 bg-muted/50 rounded-lg break-all font-mono text-sm">
                                {link || 'https://wa.me/number'}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button onClick={handleCopy} className="flex-1 gap-2" variant="outline">
                                    <Copy className="w-4 h-4" />
                                    Copy Link
                                </Button>
                                <Button
                                    className="flex-1 gap-2"
                                    variant="outline"
                                    onClick={() => link && window.open(link, '_blank')}
                                    disabled={!link}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Test Link
                                </Button>
                            </div>

                            <div className="pt-4 border-t">
                                <Button className="w-full gap-2" variant="secondary" disabled>
                                    <QrCode className="w-4 h-4" />
                                    Generate QR Code (Coming Soon)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default WhatsAppLink;
