import React from 'react';
import { cn } from '@/lib/utils';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneMockupProps {
    message?: string;
    image?: string;
    time?: string;
    isBusiness?: boolean;
}

export default function PhoneMockup({
    message = "This is a preview of your message.",
    image,
    time = "12:00",
    isBusiness = true
}: PhoneMockupProps) {
    return (
        <div className="w-[300px] h-[600px] bg-black rounded-[2rem] border-[10px] border-slate-900 overflow-hidden relative shadow-2xl mx-auto">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>

            {/* Status Bar */}
            <div className="bg-[#0b141a] text-white px-4 pt-2 pb-1 flex justify-between items-center text-xs z-10 relative">
                <span>{time}</span>
                <div className="flex gap-1.5 opacity-90">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3 h-3" />
                </div>
            </div>

            {/* Header */}
            <div className="bg-[#1f2c34] p-3 flex items-center gap-3 text-white border-b border-gray-800 z-10 relative">
                <div className="w-8 h-8 rounded-full bg-teal-500/50 flex items-center justify-center text-xs overflow-hidden">
                    {image ? <img src={image} className="w-full h-full object-cover" /> : "VB"}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight">My Business</p>
                    <p className="text-[10px] text-gray-400">Business Account</p>
                </div>
            </div>

            {/* Chat Area (WhatsApp Wallpaper) */}
            <div className="bg-[#0b141a] h-full p-4 relative overflow-y-auto pb-20 bg-opacity-95"
                style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>

                {/* Encryption Notice */}
                <div className="text-[10px] text-[#8696a0] text-center bg-[#1f2c34] py-1 px-3 rounded-lg w-fit mx-auto mb-4 shadow-sm">
                    Messages and calls are end-to-end encrypted.
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col gap-1 max-w-[85%]">
                    {image && (
                        <div className="bg-[#202c33] rounded-lg p-1 rounded-tl-none mb-1 shadow-sm">
                            <img src={image} alt="Media" className="rounded-md w-full h-auto" />
                        </div>
                    )}
                    <div className={cn(
                        "p-2 px-3 rounded-lg shadow-sm text-sm relative text-[#e9edef]",
                        "bg-[#202c33] rounded-tl-none"
                    )}>
                        <p className="whitespace-pre-wrap leading-relaxed">{message || "..."}</p>
                        <div className="flex justify-end items-center gap-1 mt-1">
                            <span className="text-[10px] text-[#8696a0]">{time}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Area Mockup */}
            <div className="absolute bottom-0 w-full bg-[#1f2c34] p-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#202c33]"></div>
                <div className="flex-1 h-8 rounded-full bg-[#2a3942]"></div>
                <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                </div>
            </div>
        </div>
    );
}
