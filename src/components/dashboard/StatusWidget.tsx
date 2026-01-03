import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const StatusWidget = () => {
    const [statusData, setStatusData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isConnecting, setIsConnecting] = useState(false);
    const wabaDataRef = useRef<{ waba_id: string; phone_id: string } | null>(null);

    const fetchStatus = async () => {
        try {
            const { data, error } = await supabase.functions.invoke('whatsapp-api', {
                body: { action: 'get_status' }
            });
            if (!error && !data?.error) {
                setStatusData(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    useEffect(() => {
        const handleMetaMessage = (event: MessageEvent) => {
            if (!event.origin.endsWith('facebook.com')) return;
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'WA_EMBEDDED_SIGNUP' && data.event === 'FINISH') {
                    wabaDataRef.current = {
                        waba_id: data.data.waba_id,
                        phone_id: data.data.phone_number_id
                    };
                }
            } catch (e) { /* Ignore */ }
        };
        window.addEventListener('message', handleMetaMessage);
        return () => window.removeEventListener('message', handleMetaMessage);
    }, []);

    const launchWhatsAppSignup = () => {
        setIsConnecting(true);
        // @ts-ignore
        if (!window.FB) {
            toast.error("Facebook SDK not loaded. Disable AdBlocker?");
            setIsConnecting(false);
            return;
        }
        // @ts-ignore
        window.FB.login((response: any) => {
            if (response.authResponse) {
                // Use wabaDataRef if captured, or fallback to manual ID entry if user flow requires it
                // Note: Without sessionInfoVersion:3, wabaDataRef might be null. We added it.
                const ids = wabaDataRef.current || { waba_id: null, phone_id: null };
                onboardToBackend(response.authResponse.code, ids);
            } else {
                setIsConnecting(false);
            }
        }, {
            config_id: '1357067465897447',
            response_type: 'code',
            override_default_response_type: true,
            extras: {
                sessionInfoVersion: 3
            }
        });
    };

    const onboardToBackend = async (code: string, ids: any) => {
        const { data, error } = await supabase.functions.invoke('whatsapp-onboard', {
            body: {
                code: code,
                waba_id: ids.waba_id,
                phone_id: ids.phone_id
            }
        });

        if (error || (data && data.error)) {
            toast.error("Connection failed: " + (error?.message || data?.error));
            setIsConnecting(false);
        } else {
            toast.success("WhatsApp Connected Successfully!");
            setIsConnecting(false);
            fetchStatus(); // Refresh to show stats
        }
    };

    const getQualityColor = (q: string) => {
        if (!q) return 'bg-gray-500';
        if (q === 'GREEN') return 'bg-emerald-500';
        if (q === 'YELLOW') return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const formatTier = (tier: string) => {
        if (!tier) return 'N/A';
        if (tier.startsWith('TIER_')) return tier.replace('TIER_', '');
        return tier;
    };

    if (loading) return <div className="p-4 flex gap-2 items-center text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Checking Status...</div>;

    if (!statusData) {
        // Connect UI
        return (
            <Card className="p-6 mb-4 flex flex-col items-center justify-center gap-4 bg-card border-border border-dashed">
                <h3 className="text-lg font-semibold">Connect WhatsApp Business</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                    Link your WhatsApp API number to start sending messages and viewing analytics.
                </p>
                <Button onClick={launchWhatsAppSignup} disabled={isConnecting} className="bg-[#1877F2] hover:bg-[#1864D0]">
                    {isConnecting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {isConnecting ? 'Connecting...' : 'Login with Facebook'}
                </Button>
            </Card>
        );
    }

    // Status UI
    return (
        <Card className="p-4 mb-4 flex flex-wrap gap-8 items-center bg-card border-border shadow-sm">
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account Status</span>
                <Badge variant={statusData.status === 'CONNECTED' ? 'default' : 'destructive'} className="w-fit px-3 py-1 bg-emerald-500 hover:bg-emerald-600">
                    {statusData.status || 'UNKNOWN'}
                </Badge>
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quality Rating</span>
                <Badge className={`w-fit px-3 py-1 text-white border-0 ${getQualityColor(statusData.quality_rating)} hover:${getQualityColor(statusData.quality_rating)}`}>
                    {statusData.quality_rating || 'UNKNOWN'}
                </Badge>
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Daily Messaging Limit</span>
                <span className="text-lg font-bold text-foreground">
                    {formatTier(statusData.messaging_limit_tier)}
                </span>
            </div>
        </Card>
    );
};