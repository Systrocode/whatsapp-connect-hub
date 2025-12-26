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
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-5 py-4 rounded-2xl rounded-br-none shadow-2xl border border-slate-100 dark:border-slate-700 relative max-w-[240px] mb-2 mr-2"
                        style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.1))" }}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                            className="absolute -top-3 -left-3 bg-white dark:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full p-1.5 shadow-sm border border-slate-100 dark:border-slate-600 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-base">Hi there! 👋</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                Chat with us on WhatsApp to learn more about our product.
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.a
                href="https://wa.me/1234567890" // Replace with actual number
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all cursor-pointer relative group"
            >
                <MessageCircle className="w-8 h-8 text-white fill-white transition-transform duration-300 group-hover:scale-110" />

                {/* Ping Animation */}
                <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></div>

                {/* Badge if needed */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </motion.a>
        </div>
    );
};
