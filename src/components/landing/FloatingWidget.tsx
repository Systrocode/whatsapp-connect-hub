import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const FloatingWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-show bubble after delay
    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-4 font-sans max-w-[360px] w-[calc(100vw-32px)] md:w-full">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border overflow-hidden w-full flex flex-col origin-bottom-right transition-shadow"
                        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    >
                        {/* Header */}
                        <div className="bg-[#075E54] p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <img
                                        src="/logos/Logomark.png"
                                        alt="Avelo"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base leading-tight">Avelo Support</h3>
                                    <p className="text-xs opacity-80 font-medium">Typically replies instantly</p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="bg-[#e5ddd5] dark:bg-slate-800 p-6 relative h-[200px] flex flex-col">
                            {/* WhatsApp Doodles Pattern Overlay */}
                            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03]"
                                style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}
                            />

                            <div className="relative bg-white dark:bg-slate-700 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start animate-fade-in-up">
                                <span className="text-xs font-bold text-[#075E54] dark:text-green-400 block mb-1">Avelo</span>
                                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                                    Hey, Can I get more info about this?
                                </p>
                                <span className="text-[10px] text-slate-400 block text-right mt-1">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-border">
                            <a
                                href="https://wa.me/919672040455?text=Hey,%20Can%20I%20get%20more%20info%20about%20this?"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95"
                            >
                                <MessageCircle className="w-5 h-5 fill-current" />
                                Start Chat
                            </a>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1 opacity-70">
                                    ⚡ by Avelo
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="self-end rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer relative group z-50"
            >
                <img src="https://img.icons8.com/color/96/whatsapp--v1.png" alt="WhatsApp" className="w-16 h-16" />

                {/* Badge */}
                <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-slate-900"></span>
                </span>
            </motion.button>
        </div>
    );
};
