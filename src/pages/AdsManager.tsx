import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const icons = {
    spend: 'https://img.icons8.com/fluency/48/money-bag.png',
    messages: 'https://img.icons8.com/fluency/48/chat-message.png',
    impressions: 'https://img.icons8.com/fluency/48/visible.png',
    cost: 'https://img.icons8.com/fluency/48/price-tag-usd.png',
    empty: 'https://img.icons8.com/fluency/96/commercial.png',
};

import { CreateCampaignDialog } from "@/components/campaigns/CreateCampaignDialog";

export default function AdsManager() {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const checkConnection = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('whatsapp_settings')
                .select('ad_account_id')
                .eq('user_id', user.id)
                .single();

            if ((data as any)?.ad_account_id) {
                setIsConnected(true);
            }
        } catch (error) {
            console.error("Error checking connection:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkConnection();
    }, []);

    const handleConnectAds = () => {
        console.log("Connect Ads clicked");

        // @ts-ignore
        if (!window.FB) {
            console.error("FB object missing from window");
            toast.error("Facebook SDK loading... please wait a moment.");
            return;
        }

        console.log("Requesting FB Login...");
        // @ts-ignore
        // @ts-ignore
        window.FB.login((response: any) => {
            console.log("FB Login Response:", response);
            if (response.authResponse) {
                console.log('Ad Account Connected:', response);
                (async () => {
                    try {
                        const { data, error } = await supabase.functions.invoke('ads-connect', {
                            body: { access_token: response.authResponse.accessToken }
                        });

                        if (error || (data && data.error)) {
                            throw new Error(error?.message || data?.error);
                        }

                        toast.success("Ad Account Connected & Saved!");
                        setIsConnected(true);
                        checkConnection(); // Refresh details
                    } catch (err: any) {
                        console.error("Supabase Error:", err);
                        toast.error("Failed to save connection: " + err.message);
                    }
                })();
            } else {
                console.warn("User cancelled login or auth failed", response);
                toast.error("Login cancelled or failed.");
            }
        }, {
            // Updated config_id to match your likely setup or standard permissions
            scope: 'ads_management,ads_read',
            return_scopes: true
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Ads Manager</h1>
                        <p className="text-muted-foreground mt-1">Create and manage Click-to-WhatsApp ads on Facebook & Instagram.</p>
                    </div>
                    {isConnected && (
                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            className="bg-[#1877F2] hover:bg-[#1864D0] shadow-md transition-all hover:scale-105"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Ad Campaign
                        </Button>
                    )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-l-4 border-l-[#1877F2] shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                            <img src={icons.spend} alt="Spend" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹0.00</div>
                            <p className="text-xs text-muted-foreground mt-1">+0% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Messages Started</CardTitle>
                            <img src={icons.messages} alt="Messages" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground mt-1">Via Click-to-WhatsApp</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                            <img src={icons.impressions} alt="Impressions" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cost Per Message</CardTitle>
                            <img src={icons.cost} alt="Cost" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹0.00</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Empty State / Campaigns List */}
                <Card className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed">
                    <div className="bg-primary/5 p-4 rounded-full mb-4">
                        <img src={icons.empty} alt="Marketing" className="w-16 h-16 opacity-80" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Active Campaigns</h3>
                    <p className="text-muted-foreground max-w-sm mb-6">
                        You haven't launched any ads yet. Start a campaign to drive traffic to your WhatsApp Business number.
                    </p>
                    {!isConnected ? (
                        <Button onClick={handleConnectAds} variant="outline" className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2]/5">
                            Connect Ad Account
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            className="bg-[#1877F2] hover:bg-[#1864D0]"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Campaign
                        </Button>
                    )}
                </Card>

                <CreateCampaignDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
            </div>
        </DashboardLayout>
    );
}
