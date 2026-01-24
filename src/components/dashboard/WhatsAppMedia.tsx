import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ImageOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface WhatsAppMediaProps {
    mediaId?: string;
    mediaUrl?: string;
    caption?: string;
    className?: string;
    type?: 'image' | 'video' | 'audio' | 'document';
    filename?: string;
}

export const WhatsAppMedia = ({ mediaId, mediaUrl, caption, className, type = 'image', filename }: WhatsAppMediaProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(mediaUrl || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);
    const { session } = useAuth(); // We need the session token

    useEffect(() => {
        if (mediaUrl) {
            setImageUrl(mediaUrl);
            return;
        }

        if (!mediaId) return;

        const fetchMedia = async () => {
            setLoading(true);
            setError(false);
            setErrorDetails(null);
            try {
                // We use direct fetch to handle blob response properly
                // supabase.functions.invoke parses JSON by default
                const { data: { session: currentSession } } = await supabase.auth.getSession();

                if (!currentSession) throw new Error('No session');

                const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/whatsapp-api`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${currentSession.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'get_media',
                        media_id: mediaId
                    })
                });

                if (!response.ok) {
                    // Try to parse error message from JSON response
                    let errorMsg = 'Failed to fetch media';
                    try {
                        const errData = await response.json();
                        errorMsg = errData.error || errorMsg;
                    } catch (e) {
                        // Response might be text or blob, ignore
                    }
                    throw new Error(errorMsg);
                }

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            } catch (err: any) {
                console.error('Error loading image:', err);
                setError(true);
                setErrorDetails(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();

        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl);
        };
    }, [mediaId, mediaUrl]);

    if (!mediaId && !mediaUrl) {
        return (
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded text-muted-foreground text-sm italic">
                <ImageOff className="w-4 h-4" />
                Image not available
            </div>
        );
    }

    if (loading) {
        return (
            <div className="w-full h-48 bg-muted animate-pulse rounded-lg flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error || !imageUrl) {
        return (
            <div className="w-full h-48 bg-muted rounded-lg flex flex-col items-center justify-center text-muted-foreground gap-2 p-2">
                <ImageOff className="w-6 h-6" />
                <span className="text-xs font-medium">Failed to load image</span>
                {errorDetails && <span className="text-[10px] text-center opacity-70 break-all">{errorDetails}</span>}
            </div>
        );
    }

    if (type === 'video') {
        return (
            <div className={`space-y-1 ${className}`}>
                <video
                    src={imageUrl}
                    controls
                    className="rounded-lg max-w-sm w-full bg-black/10"
                />
                {caption && <p className="text-sm mt-1 opacity-90">{caption}</p>}
            </div>
        );
    }

    if (type === 'audio') {
        return (
            <div className={`flex items-center gap-2 p-2 bg-secondary/50 rounded-lg min-w-[200px] ${className}`}>
                <audio src={imageUrl} controls className="h-8 w-full" />
            </div>
        );
    }

    if (type === 'document') {
        return (
            <a
                href={imageUrl}
                download={filename || "document"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 bg-secondary/50 hover:bg-secondary/80 transition-colors rounded-lg border border-border/50 cursor-pointer mb-1 group max-w-[280px] ${className}`}
                title="Click to download"
            >
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {/* We can import FileText if we want, or just use text/svg */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <div className="flex flex-col overflow-hidden min-w-0">
                    <span className="text-sm font-medium truncate text-foreground/90">{filename || 'Document'}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{filename?.split('.').pop() || 'FILE'}</span>
                </div>
            </a>
        );
    }

    return (
        <div className={`space-y-1 ${className}`}>
            <img
                src={imageUrl}
                alt={caption || 'WhatsApp Image'}
                className="rounded-lg max-w-sm w-full object-cover shadow-sm bg-background/50 cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => window.open(imageUrl, '_blank')}
                title="Click to view full size"
            />
            {caption && <p className="text-sm mt-1 opacity-90">{caption}</p>}
        </div>
    );
};
