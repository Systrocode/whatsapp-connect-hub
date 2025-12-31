import { useState, useEffect } from 'react';
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MessageCircle, Code, Copy } from 'lucide-react';
import { toast } from 'sonner';

const ChatButtonGenerator = () => {
    const [position, setPosition] = useState('bottom-right');
    const [welcomeMessage, setWelcomeMessage] = useState('Chat with us!');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        const generatedCode = `
<!-- WhatsApp Chat Button -->
<a href="https://wa.me/${phone || 'your-number'}" target="_blank" class="whatsapp-button">
  <div class="whatsapp-icon">
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" />
    </svg>
  </div>
  <span class="whatsapp-text">${welcomeMessage}</span>
</a>

<style>
.whatsapp-button {
  position: fixed;
  ${position === 'bottom-right' ? 'bottom: 20px; right: 20px;' : 'bottom: 20px; left: 20px;'}
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #25D366;
  color: white;
  padding: 12px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-family: sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.2s;
  z-index: 1000;
}
.whatsapp-button:hover {
  transform: scale(1.05);
}
.whatsapp-text {
  font-weight: bold;
}
</style>
        `.trim();
        setCode(generatedCode);
    }, [position, welcomeMessage, phone]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-16 h-16 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <MessageCircle className="w-8 h-8" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            WhatsApp Chat Button Generator
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Create a sticky WhatsApp chat widget for your website. No coding skills required.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Configuration */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                                <CardContent className="p-8 space-y-6">
                                    <h2 className="text-xl font-bold mb-6">Customize Widget</h2>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>WhatsApp Number</Label>
                                            <Input
                                                placeholder="15551234567"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Welcome Message</Label>
                                            <Input
                                                value={welcomeMessage}
                                                onChange={(e) => setWelcomeMessage(e.target.value)}
                                                placeholder="Chat with us!"
                                            />
                                        </div>

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
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-xl bg-slate-900 text-slate-100 rounded-3xl overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-black/20">
                                        <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
                                            <Code className="w-4 h-4" /> generated-code.html
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-white hover:bg-white/10">
                                            <Copy className="w-4 h-4 mr-2" /> Copy
                                        </Button>
                                    </div>
                                    <pre className="p-6 overflow-x-auto text-xs font-mono text-green-400 leading-relaxed">
                                        {code}
                                    </pre>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Live Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-white dark:border-slate-700 shadow-2xl relative min-h-[600px] overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-5 rounded-md mx-2" />
                            </div>

                            {/* Fake Content */}
                            <div className="p-8 pt-16 space-y-6 opacity-40">
                                <div className="h-12 w-3/4 bg-slate-300 dark:bg-slate-600 rounded-xl" />
                                <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded-lg" />
                                <div className="h-4 w-5/6 bg-slate-300 dark:bg-slate-600 rounded-lg" />
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="h-32 bg-slate-300 dark:bg-slate-600 rounded-xl" />
                                    <div className="h-32 bg-slate-300 dark:bg-slate-600 rounded-xl" />
                                </div>
                            </div>

                            {/* The Widget */}
                            <div
                                className={`absolute p-4 flex items-center gap-3 transition-all duration-300
                                ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'}
                                `}
                            >
                                <div className="bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg font-bold flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer shadow-[#25D366]/30">
                                    <div className="bg-white/20 p-1 rounded-full">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    {welcomeMessage}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

export default ChatButtonGenerator;
