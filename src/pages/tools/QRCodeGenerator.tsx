import { useState } from 'react';
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { QrCode, Download, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const QRCodeGenerator = () => {
    const [inputValue, setInputValue] = useState('');
    const [qrUrl, setQrUrl] = useState('');

    const generateQR = () => {
        if (!inputValue) {
            setQrUrl('');
            return;
        }
        // Using goqr.me API for simplicity
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(inputValue)}&format=png`;
        setQrUrl(url);
    };

    const handleDownload = async () => {
        if (!qrUrl) return;
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'whatsapp-qr-code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('QR Code downloaded!');
        } catch (err) {
            toast.error('Failed to download image');
        }
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
                            className="w-16 h-16 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <QrCode className="w-8 h-8" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            Free WhatsApp QR Code Generator
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Generate high-quality QR codes for your WhatsApp number, website, or any text for free.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Input Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center"
                        >
                            <h2 className="text-xl font-bold mb-6">Type Content</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        WhatsApp Link or Text
                                    </label>
                                    <Input
                                        placeholder="https://wa.me/15551234567"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="h-12"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        Tip: Use our Link Generator first if you need a wa.me link.
                                    </p>
                                </div>
                                <Button
                                    onClick={generateQR}
                                    className="w-full h-12 rounded-xl text-lg font-bold"
                                    disabled={!inputValue}
                                >
                                    Generate QR Code <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Result Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex justify-center"
                        >
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-sm text-center">
                                <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider mb-6">Preview</h3>

                                <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 p-4">
                                    {qrUrl ? (
                                        <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="text-slate-400 text-sm">QR Code will appear here</div>
                                    )}
                                </div>

                                <Button
                                    onClick={handleDownload}
                                    variant="outline"
                                    className="w-full h-12 rounded-xl"
                                    disabled={!qrUrl}
                                >
                                    <Download className="w-4 h-4 mr-2" /> Download PNG
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

export default QRCodeGenerator;
