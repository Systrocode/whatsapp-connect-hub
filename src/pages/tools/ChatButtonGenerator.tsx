import { useState, useEffect } from 'react';
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Code, Copy, Info, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChatButtonGenerator = () => {
    // Button Config
    const [phoneNumber, setPhoneNumber] = useState('');
    const [buttonBgColor, setButtonBgColor] = useState('#4dc247');
    const [ctaText, setCtaText] = useState('Chat with us');
    const [marginBottom, setMarginBottom] = useState('30');
    const [marginLeft, setMarginLeft] = useState('30');
    const [marginRight, setMarginRight] = useState('30');
    const [borderRadius, setBorderRadius] = useState('24');
    const [prefilledMessage, setPrefilledMessage] = useState('Hi');
    const [position, setPosition] = useState('bottom-right');

    // Widget Config
    const [brandName, setBrandName] = useState('My Business');
    const [brandSubtitle, setBrandSubtitle] = useState('Usually replies within an hour');
    const [brandColor, setBrandColor] = useState('#0A5F54');
    const [brandImageUrl, setBrandImageUrl] = useState('');
    const [widgetCtaText, setWidgetCtaText] = useState('Start chat');
    const [onScreenMessage, setOnScreenMessage] = useState('Hi, How can I help you?');
    const [openOnMobile, setOpenOnMobile] = useState('yes');
    const [openByDefault, setOpenByDefault] = useState('no');

    // Generator State
    const [code, setCode] = useState('');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Toggle Preview state based on default settings
    useEffect(() => {
        if (openByDefault === 'yes') {
            setIsPreviewOpen(true);
        } else {
            setIsPreviewOpen(false);
        }
    }, [openByDefault]);

    // Generate Code
    useEffect(() => {
        const generatedCode = `
<div id="whatsapp-chat-widget" style="display: none; position: fixed; z-index: 9999; ${position === 'bottom-right' ? `bottom: ${marginBottom}px; right: ${marginRight}px;` : `bottom: ${marginBottom}px; left: ${marginLeft}px;`}">
    <!-- Chat Window -->
    <div id="wa-chat-window" style="display: none; width: 350px; background: #fff; box-shadow: 0 5px 25px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; margin-bottom: 20px; font-family: sans-serif; opacity: 0; transform: translateY(20px); transition: all 0.3s ease;">
        <!-- Header -->
        <div style="background: ${brandColor}; padding: 20px; color: white;">
            <div style="display: flex; align-items: center; gap: 12px;">
                ${brandImageUrl ? `<img src="${brandImageUrl}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;" alt="Brand">` : ''}
                <div>
                    <div style="font-weight: bold; font-size: 18px;">${brandName}</div>
                    <div style="font-size: 13px; opacity: 0.9;">${brandSubtitle}</div>
                </div>
                <div style="margin-left: auto; cursor: pointer;" onclick="toggleWhatsAppWidget()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </div>
            </div>
        </div>
        <!-- Body -->
        <div style="padding: 20px; height: 250px; background: #e5ddd5; position: relative;">
            <div style="background: white; padding: 10px 15px; border-radius: 0 12px 12px 12px; max-width: 80%; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 14px; line-height: 1.4; position: relative;">
                <div style="font-weight: bold; font-size: 12px; color: #999; margin-bottom: 4px;">${brandName}</div>
                ${onScreenMessage}
                <div style="font-size: 10px; color: #999; text-align: right; margin-top: 4px;">Now</div>
            </div>
        </div>
        <!-- Footer -->
        <div style="padding: 15px; background: white; border-top: 1px solid #f0f0f0;">
            <a href="https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledMessage)}" target="_blank" style="display: block; background: #25d366; color: white; text-align: center; padding: 10px; border-radius: 24px; text-decoration: none; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/></svg>
                ${widgetCtaText}
            </a>
        </div>
    </div>
    <!-- Launcher Button -->
    <div onclick="toggleWhatsAppWidget()" style="background: ${buttonBgColor}; color: white; padding: 12px 24px; border-radius: ${borderRadius}px; cursor: pointer; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/></svg>
        <span style="font-weight: bold;">${ctaText}</span>
    </div>
</div>

<script>
    document.getElementById('whatsapp-chat-widget').style.display = 'block';
    ${openOnMobile === 'no' ? `if (window.innerWidth < 768) document.getElementById('whatsapp-chat-widget').style.display = 'none';` : ''}

    function toggleWhatsAppWidget() {
        const window = document.getElementById('wa-chat-window');
        if (window.style.display === 'none' || window.style.display === '') {
            window.style.display = 'block';
            setTimeout(() => { window.style.opacity = '1'; window.style.transform = 'translateY(0)'; }, 10);
        } else {
            window.style.opacity = '0';
            window.style.transform = 'translateY(20px)';
            setTimeout(() => { window.style.display = 'none'; }, 300);
        }
    }
    
    // Open by default logic
    ${openByDefault === 'yes' ? 'setTimeout(toggleWhatsAppWidget, 1000);' : ''}
</script>
        `.trim();
        setCode(generatedCode);
    }, [phoneNumber, buttonBgColor, ctaText, marginBottom, marginLeft, marginRight, borderRadius, prefilledMessage, position, brandName, brandSubtitle, brandColor, brandImageUrl, widgetCtaText, onScreenMessage, openOnMobile, openByDefault]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success('Widget code copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            <section className="pt-24 pb-12 px-4 md:pt-32 md:pb-20 md:px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-16 h-16 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <MessageCircle className="w-8 h-8" />
                        </motion.div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            WhatsApp Chat Button Generator
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Design a custom WhatsApp chat widget for your website in seconds.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,500px] gap-8 lg:gap-12 items-start">
                        {/* Configuration Panel */}
                        <div className="space-y-6 md:space-y-8">

                            {/* Section 1: Button Config */}
                            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
                                <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-8 w-1 bg-green-500 rounded-full" />
                                        <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                                            Configure WhatsApp Chat Button
                                        </h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <Label className="flex items-center gap-2">
                                                WhatsApp Phone Number <Info className="w-4 h-4 text-muted-foreground" />
                                            </Label>
                                            <Input
                                                placeholder="With country code (e.g. 15551234567)"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                Button Background <Info className="w-4 h-4 text-muted-foreground" />
                                            </Label>
                                            <div className="flex gap-2">
                                                <div
                                                    className="w-10 h-10 rounded-lg border shadow-sm shrink-0"
                                                    style={{ backgroundColor: buttonBgColor }}
                                                />
                                                <Input
                                                    value={buttonBgColor}
                                                    onChange={(e) => setButtonBgColor(e.target.value)}
                                                    className="font-mono bg-slate-50 border-slate-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                CTA Text <Info className="w-4 h-4 text-muted-foreground" />
                                            </Label>
                                            <Input
                                                value={ctaText}
                                                onChange={(e) => setCtaText(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                Margin Bottom (px)
                                            </Label>
                                            <Input
                                                type="number"
                                                value={marginBottom}
                                                onChange={(e) => setMarginBottom(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                {position === 'bottom-right' ? 'Margin Right (px)' : 'Margin Left (px)'}
                                            </Label>
                                            <Input
                                                type="number"
                                                value={position === 'bottom-right' ? marginRight : marginLeft}
                                                onChange={(e) => position === 'bottom-right' ? setMarginRight(e.target.value) : setMarginLeft(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                Border Radius (px)
                                            </Label>
                                            <Input
                                                type="number"
                                                value={borderRadius}
                                                onChange={(e) => setBorderRadius(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label className="flex items-center gap-2">
                                                Default Pre-filled Message <Info className="w-4 h-4 text-muted-foreground" />
                                            </Label>
                                            <Textarea
                                                value={prefilledMessage}
                                                onChange={(e) => setPrefilledMessage(e.target.value)}
                                                className="bg-slate-50 border-slate-200 min-h-[100px]"
                                            />
                                            <p className="text-xs text-muted-foreground">You can use variables: {'{{page_url}}'} & {'{{page_title}}'}</p>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label className="flex items-center gap-2 mb-2">
                                                Position <Info className="w-4 h-4 text-muted-foreground" />
                                            </Label>
                                            <RadioGroup
                                                value={position}
                                                onValueChange={setPosition}
                                                className="flex flex-wrap gap-6"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="bottom-right" id="br" />
                                                    <Label htmlFor="br">Bottom-Right</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="bottom-left" id="bl" />
                                                    <Label htmlFor="bl">Bottom-Left</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Section 2: Widget Config */}
                            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
                                <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-8 w-1 bg-green-500 rounded-full" />
                                        <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                                            Chat Widget Configuration
                                        </h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Brand Name</Label>
                                            <Input
                                                value={brandName}
                                                onChange={(e) => setBrandName(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Brand Subtitle</Label>
                                            <Input
                                                value={brandSubtitle}
                                                onChange={(e) => setBrandSubtitle(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Brand Color</Label>
                                            <div className="flex gap-2">
                                                <div
                                                    className="w-10 h-10 rounded-lg border shadow-sm shrink-0"
                                                    style={{ backgroundColor: brandColor }}
                                                />
                                                <Input
                                                    value={brandColor}
                                                    onChange={(e) => setBrandColor(e.target.value)}
                                                    className="font-mono bg-slate-50 border-slate-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Brand Image URL</Label>
                                            <Input
                                                placeholder="https://example.com/logo.png"
                                                value={brandImageUrl}
                                                onChange={(e) => setBrandImageUrl(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label className="flex items-center gap-2">Widget CTA Text</Label>
                                            <Input
                                                value={widgetCtaText}
                                                onChange={(e) => setWidgetCtaText(e.target.value)}
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label className="flex items-center gap-2">Default On-screen Message</Label>
                                            <Textarea
                                                value={onScreenMessage}
                                                onChange={(e) => setOnScreenMessage(e.target.value)}
                                                className="bg-slate-50 border-slate-200 min-h-[100px]"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2">Open widget on Mobile</Label>
                                            <RadioGroup
                                                value={openOnMobile}
                                                onValueChange={setOpenOnMobile}
                                                className="flex gap-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="yes" id="mob-yes" />
                                                    <Label htmlFor="mob-yes">Yes</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no" id="mob-no" />
                                                    <Label htmlFor="mob-no">No</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2">Open widget by default</Label>
                                            <RadioGroup
                                                value={openByDefault}
                                                onValueChange={setOpenByDefault}
                                                className="flex gap-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="yes" id="def-yes" />
                                                    <Label htmlFor="def-yes">Yes</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no" id="def-no" />
                                                    <Label htmlFor="def-no">No</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Code Snippet Card */}
                            <Card className="border-0 shadow-xl bg-slate-900 text-slate-100 rounded-2xl overflow-hidden mt-8 max-w-[calc(100vw-3rem)] lg:max-w-none mx-auto">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-black/20">
                                        <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
                                            <Code className="w-4 h-4" /> generated-snippet.html
                                        </div>
                                        <Button
                                            onClick={handleCopy}
                                            className="bg-green-600 hover:bg-green-700 text-white border-0"
                                            size="sm"
                                        >
                                            <Copy className="w-4 h-4 mr-2" /> Copy to Clipboard
                                        </Button>
                                    </div>
                                    <div className="relative group">
                                        <pre className="p-6 overflow-x-auto text-xs font-mono text-green-400 leading-relaxed h-[300px] whitespace-pre w-full">
                                            {code}
                                        </pre>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/10 pointer-events-none" />
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                        {/* Sticky Preview */}
                        <div className="lg:sticky lg:top-32 space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border-8 border-slate-100 dark:border-slate-800 shadow-2xl relative h-[500px] sm:h-[600px] lg:h-[800px] w-full overflow-hidden flex flex-col">
                                {/* Browser Header */}
                                <div className="h-10 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2 shrink-0">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 bg-white dark:bg-slate-700 h-6 rounded-md mx-2 text-[10px] flex items-center px-3 text-slate-400">
                                        yourwebsite.com
                                    </div>
                                </div>

                                {/* Preview Content */}
                                <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 p-6 overflow-hidden">
                                    {/* Fake Website Content */}
                                    <div className="space-y-6 opacity-30 select-none pointer-events-none">
                                        <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
                                        <div className="flex gap-4">
                                            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl w-2/3" />
                                            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
                                        </div>
                                        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2" />
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                                            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                                            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                                        </div>
                                    </div>

                                    {/* LIVE PREVIEW ELEMENTS */}
                                    <AnimatePresence>
                                        {isPreviewOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                                className={`absolute z-20 w-[300px] sm:w-[350px] flex flex-col shadow-2xl rounded-xl overflow-hidden font-sans
                                                    ${position === 'bottom-right' ? 'right-4 sm:right-6 bottom-[80px]' : 'left-4 sm:left-6 bottom-[80px]'}
                                                `}
                                                style={{ marginBottom: `${marginBottom}px` }}
                                            >
                                                {/* Header */}
                                                <div className="p-4 sm:p-5 text-white flex items-center gap-3 relative" style={{ backgroundColor: brandColor }}>
                                                    {brandImageUrl && (
                                                        <img src={brandImageUrl} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/20" alt="" />
                                                    )}
                                                    <div>
                                                        <div className="font-bold text-base sm:text-lg leading-tight">{brandName}</div>
                                                        <div className="text-[10px] sm:text-xs opacity-90">{brandSubtitle}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => setIsPreviewOpen(false)}
                                                        className="absolute top-4 right-4 text-white/80 hover:text-white"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Body */}
                                                <div className="bg-[#e5ddd5] p-5 pr-2 h-[250px] sm:h-[300px] overflow-hidden relative">
                                                    {/* Chat bubbles */}
                                                    <div className="bg-white p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm max-w-[85%] relative mb-4">
                                                        <div className="text-[10px] text-slate-400 font-bold mb-1">{brandName}</div>
                                                        <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{onScreenMessage}</div>
                                                        <div className="text-[10px] text-slate-400 text-right mt-1">Now</div>
                                                    </div>
                                                </div>

                                                {/* Footer */}
                                                <div className="bg-white p-4 border-t border-slate-100">
                                                    <a
                                                        href={`https://wa.me/${phoneNumber}`}
                                                        className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-full transition-colors"
                                                    >
                                                        <MessageCircle className="w-5 h-5" />
                                                        {widgetCtaText}
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Launcher Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                                        className={`absolute flex items-center gap-2.5 px-6 py-3.5 shadow-lg z-10 font-bold text-white transition-all
                                            ${position === 'bottom-right' ? 'right-4 sm:right-6' : 'left-4 sm:left-6'}
                                        `}
                                        style={{
                                            backgroundColor: buttonBgColor,
                                            marginBottom: `${marginBottom}px`,
                                            borderRadius: `${borderRadius}px`
                                        }}
                                    >
                                        <MessageCircle className="w-6 h-6" />
                                        <span>{ctaText}</span>
                                    </motion.button>
                                </div>
                            </div>

                            <div className="text-center text-sm text-muted-foreground">
                                <p>Preview updates automatically as you edit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

export default ChatButtonGenerator;
