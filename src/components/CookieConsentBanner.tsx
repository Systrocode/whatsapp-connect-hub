import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'necessary');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg md:p-6"
                >
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="p-2 bg-primary/10 rounded-full hidden md:block">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <div className="space-y-1 text-center md:text-left">
                                <h3 className="font-semibold text-foreground">We value your privacy</h3>
                                <p className="text-sm text-muted-foreground max-w-2xl">
                                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                    By clicking "Accept All", you consent to our use of cookies.
                                    Read our <Link to="/terms-privacy" className="underline hover:text-primary">Cookie Policy</Link>.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button variant="outline" onClick={handleDecline} className="flex-1 md:flex-none">
                                Essential Only
                            </Button>
                            <Button onClick={handleAccept} className="flex-1 md:flex-none">
                                Accept All
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
