import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface FacebookLoginButtonProps {
    onSuccess?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const FacebookLoginButton = ({ onSuccess, className, children }: FacebookLoginButtonProps) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const wabaDataRef = useRef<{ waba_id: string; phone_id: string } | null>(null);

    useEffect(() => {
        const handleMetaMessage = (event: MessageEvent) => {
            if (!event.origin.endsWith('facebook.com')) return;
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'WA_EMBEDDED_SIGNUP' && data.event === 'FINISH') {
                    console.log("Captured WABA Data:", data.data);
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
            toast.error("Facebook SDK not loaded. Please disable ad blockers and refresh.");
            setIsConnecting(false);
            return;
        }

        // @ts-ignore
        window.FB.login((response: any) => {
            if (response.authResponse) {
                // Wait a moment for the message event to fire if it hasn't already (though FINISH usually comes before login callback in embedded flow)
                // Actually, the login callback fires when the popup closes. The message event fires during the flow.
                // We'll use the ref.
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
        try {
            toast.info("Connecting to WhatsApp...");
            const { data, error } = await supabase.functions.invoke('whatsapp-onboard', {
                body: {
                    code: code,
                    waba_id: ids.waba_id,
                    phone_id: ids.phone_id
                }
            });

            if (error || (data && data.error)) {
                console.error(error || data?.error);
                toast.error("Connection failed: " + (error?.message || data?.error));
            } else {
                toast.success("WhatsApp Connected Successfully!");
                if (onSuccess) onSuccess();
            }
        } catch (e: any) {
            console.error(e);
            toast.error("Connection error: " + e.message);
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <Button
            onClick={launchWhatsAppSignup}
            disabled={isConnecting}
            className={`bg-[#1877F2] hover:bg-[#1864D0] text-white font-semibold transition-all ${className}`}
        >
            {isConnecting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {children || (isConnecting ? 'Connecting...' : 'Login with Facebook')}
        </Button>
    );
};
