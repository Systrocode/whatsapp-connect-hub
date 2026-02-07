import { useState } from 'react';
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Link, Copy, ExternalLink, MessageSquare, Phone } from 'lucide-react';
import { toast } from 'sonner';

const WhatsAppLinkGenerator = () => {
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
            toast.error('Please enter a phone number');
            return;
        }
        navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Link className="w-8 h-8" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            Free WhatsApp Link Generator
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Create a custom whatsapp link with a pre-filled message. Share it on Instagram, Twitter, Facebook, or your website.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800"
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Phone className="w-5 h-5 text-slate-400" /> Your Details
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">WhatsApp Number</label>
                                    <Input
                                        placeholder="e.g. 1 555 123 4567"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-12"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Include your country code. Don't use +, 00, or dashes.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Pre-filled Message</label>
                                    <Textarea
                                        placeholder="Hi! I'm interested in your services..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="h-32 resize-none"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Result Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div className="bg-[#E9FDF0] dark:bg-[#0a331b] border border-[#25D366]/20 p-8 rounded-3xl h-full flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-[#128c7e] dark:text-[#25D366] mb-6 mb-2">Your Link Preview</h3>

                                <Card className="bg-white/80 dark:bg-black/20 backdrop-blur border-0 mb-6 font-mono text-sm break-all text-slate-600 dark:text-slate-300 shadow-sm">
                                    <CardContent className="p-4 min-h-[60px] flex items-center">
                                        {link || 'https://wa.me/number?text=...'}
                                    </CardContent>
                                </Card>

                                <div className="space-y-3">
                                    <Button
                                        onClick={handleCopy}
                                        className="w-full h-12 bg-[#25D366] hover:bg-[#128c7e] text-white font-bold rounded-xl"
                                        disabled={!phone}
                                    >
                                        <Copy className="w-4 h-4 mr-2" /> Copy Link
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => link && window.open(link, '_blank')}
                                        className="w-full h-12 rounded-xl border-[#25D366]/30 text-[#128c7e] dark:text-[#25D366] hover:bg-[#25D366]/10"
                                        disabled={!phone}
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" /> Test Link in Browser
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* FAQ / SEO Content */}
                    <div className="mt-24 max-w-3xl mx-auto space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Why use a WhatsApp specific link?</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                A direct "wa.me" link allows users to start a chat with you instantly without having to save your phone number first. This friction-free experience significantly increases conversion rates for marketing campaigns, social media bios, and customer support channels.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">How pre-filled messages help</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                By adding a custom message, you help your customers start the conversation. It also helps you identify where the lead came from or what they are interested in immediately, streamlining your support or sales process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

export default WhatsAppLinkGenerator;
