import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ImageOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface WhatsAppMediaProps {
    mediaId?: string;
    mediaUrl?: string;
    caption?: string;
    className?: string;
}

export const WhatsAppMedia = ({ mediaId, mediaUrl, caption, className }: WhatsAppMediaProps) => {
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
