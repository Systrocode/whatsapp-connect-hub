import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Inline SVG sync icon — avoids icons8-proxy ? fallback
const SyncIcon = ({ spinning = false }: { spinning?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className={spinning ? 'animate-spin' : ''}
  >
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);
import { CreateCampaignDialog } from "@/components/campaigns/CreateCampaignDialog";

const icons = {
    spend: 'https://img.icons8.com/fluency/48/money-bag.png',
    messages: 'https://img.icons8.com/fluency/48/chat-message.png',
    impressions: 'https://img.icons8.com/fluency/48/visible.png',
    cost: 'https://img.icons8.com/fluency/48/rupee.png',
    empty: 'https://img.icons8.com/fluency/96/commercial.png',
};

const currencySymbol = (code?: string) => {
    if (!code) return '₹';
    const map: Record<string, string> = {
        INR: '₹', USD: '$', EUR: '€', GBP: '£', AED: 'د.إ', SGD: 'S$', MYR: 'RM',
    };
    return map[code.toUpperCase()] ?? code + ' ';
};

const DATE_PRESETS = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'last_7d' },
    { label: 'Last 30 days', value: 'last_30d' },
    { label: 'This month', value: 'this_month' },
];

interface Insights {
    impressions?: string;
    clicks?: string;
    spend?: string;
    reach?: string;
    ctr?: string;
    cpc?: string;
    actions?: { action_type: string; value: string }[];
}

export default function AdsManager() {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [adAccountInfo, setAdAccountInfo] = useState<any>(null);

    // Insights state per campaign
    const [expandedCamp, setExpandedCamp] = useState<string | null>(null);
    const [insightsMap, setInsightsMap] = useState<Record<string, Insights | null>>({});
    const [insightsLoading, setInsightsLoading] = useState<Record<string, boolean>>({});
    const [datePreset, setDatePreset] = useState('last_7d');

    const fetchAdData = useCallback(async () => {
        try {
            const [campaignsRes, accountRes] = await Promise.all([
                supabase.functions.invoke('meta-marketing', { body: { action: 'list_campaigns' } }),
                supabase.functions.invoke('meta-marketing', { body: { action: 'get_account' } }),
            ]);
            if (campaignsRes.data?.success) setCampaigns(campaignsRes.data.data || []);
            if (accountRes.data?.success) setAdAccountInfo(accountRes.data.data);
        } catch (err) {
            console.error('Error fetching ad data:', err);
            toast.error('Failed to load Meta ad campaigns.');
        }
    }, []);

    const checkConnection = useCallback(async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase
                .from('whatsapp_settings')
                .select('ad_account_id')
                .eq('user_id', user.id)
                .single();
            if ((data as any)?.ad_account_id) {
                setIsConnected(true);
                await fetchAdData();
            }
        } catch (error) {
            console.error('Error checking connection:', error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchAdData]);

    useEffect(() => { checkConnection(); }, [checkConnection]);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            await fetchAdData();
            // Clear cached insights so they re-fetch fresh
            setInsightsMap({});
            toast.success('Synced from Meta successfully!');
        } catch {
            toast.error('Sync failed. Please try again.');
        } finally {
            setIsSyncing(false);
        }
    };

    const fetchInsights = async (campaignId: string) => {
        setInsightsLoading(prev => ({ ...prev, [campaignId]: true }));
        try {
            const res = await supabase.functions.invoke('meta-marketing', {
                body: { action: 'get_insights', campaignId, datePreset },
            });
            if (res.data?.success) {
                setInsightsMap(prev => ({ ...prev, [campaignId]: res.data.data }));
            } else {
                setInsightsMap(prev => ({ ...prev, [campaignId]: null }));
                toast.error('No insights data available for this campaign yet.');
            }
        } catch {
            toast.error('Failed to load insights.');
        } finally {
            setInsightsLoading(prev => ({ ...prev, [campaignId]: false }));
        }
    };

    const toggleInsights = (campaignId: string) => {
        if (expandedCamp === campaignId) {
            setExpandedCamp(null);
        } else {
            setExpandedCamp(campaignId);
            if (!insightsMap[campaignId]) fetchInsights(campaignId);
        }
    };

    const handleConnectAds = () => {
        // @ts-ignore
        if (!window.FB) { toast.error('Facebook SDK loading... please wait a moment.'); return; }
        // @ts-ignore
        window.FB.login((response: any) => {
            if (response.authResponse) {
                (async () => {
                    try {
                        const { data, error } = await supabase.functions.invoke('ads-connect', {
                            body: { access_token: response.authResponse.accessToken },
                        });
                        if (error || data?.error) throw new Error(error?.message || data?.error);
                        toast.success('Ad Account Connected & Saved!');
                        setIsConnected(true);
                        checkConnection();
                    } catch (err: any) {
                        toast.error('Failed to save connection: ' + err.message);
                    }
                })();
            } else {
                toast.error('Login cancelled or failed.');
            }
        }, { scope: 'ads_management,ads_read', return_scopes: true });
    };

    const sym = currencySymbol(adAccountInfo?.currency);

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Ads Manager</h1>
                        <p className="text-muted-foreground mt-1">Create and manage Click-to-WhatsApp ads on Facebook & Instagram.</p>
                    </div>
                    <div className="flex gap-2">
                        {isConnected && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleSync}
                                    disabled={isSyncing}
                                    className="gap-2"
                                >
                                    <SyncIcon spinning={isSyncing} />
                                    {isSyncing ? 'Syncing...' : 'Sync from Meta'}
                                </Button>
                                <Button
                                    onClick={() => setIsCreateOpen(true)}
                                    className="bg-[#1877F2] hover:bg-[#1864D0] shadow-md transition-all hover:scale-105"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Ad Campaign
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-l-4 border-l-[#1877F2] shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                            <img src={icons.spend} alt="Spend" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {adAccountInfo?.amount_spent
                                    ? `${sym}${(adAccountInfo.amount_spent / 100).toFixed(2)}`
                                    : `${sym}0.00`}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium">Active Account Status</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Live Campaigns</CardTitle>
                            <img src={icons.messages} alt="Messages" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{campaigns.filter((c: any) => c.status === 'ACTIVE').length}</div>
                            <p className="text-xs text-muted-foreground mt-1">Driving traffic to WhatsApp</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                            <img src={icons.impressions} alt="Impressions" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{campaigns.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Account ID</CardTitle>
                            <img src={icons.cost} alt="Cost" className="w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold truncate">
                                {adAccountInfo?.id ? adAccountInfo.id.replace('act_', '') : 'Not Connected'}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Campaigns List */}
                {campaigns.length === 0 ? (
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
                            <Button onClick={() => setIsCreateOpen(true)} className="bg-[#1877F2] hover:bg-[#1864D0]">
                                <Plus className="w-4 h-4 mr-2" />
                                Create First Campaign
                            </Button>
                        )}
                    </Card>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold py-2 border-b flex-1">Your Meta Campaigns</h3>
                            {/* Date preset selector */}
                            <select
                                value={datePreset}
                                onChange={e => {
                                    setDatePreset(e.target.value);
                                    setInsightsMap({});
                                }}
                                className="ml-4 text-sm border border-border rounded-md px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                {DATE_PRESETS.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                        {campaigns.map(camp => (
                            <Card key={camp.id} className="shadow-sm hover:shadow-md transition-all border-l-4 border-l-[#1877F2]">
                                <CardContent className="p-5">
                                    {/* Campaign Header Row */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-lg">{camp.name}</h4>
                                                <Badge
                                                    variant={camp.status === 'ACTIVE' ? 'default' : 'secondary'}
                                                    className={camp.status === 'ACTIVE' ? 'bg-green-500 hover:bg-green-600' : ''}
                                                >
                                                    {camp.status}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-3 flex-wrap">
                                                <span className="capitalize">Objective: {camp.objective.toLowerCase().replace('_', ' ')}</span>
                                                {camp.daily_budget && (
                                                    <span>• Daily Limit: {sym}{(camp.daily_budget / 100).toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <div className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Created on</div>
                                                <div className="text-sm font-medium">{new Date(camp.created_time).toLocaleDateString()}</div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => toggleInsights(camp.id)}
                                                className="gap-1.5 text-[#1877F2] border-[#1877F2]/30 hover:bg-[#1877F2]/5"
                                            >
                                                <img src="https://img.icons8.com/fluency/20/positive-dynamic.png" className="w-3.5 h-3.5" alt="insights" />
                                                Insights
                                                {expandedCamp === camp.id
                                                    ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                                                    : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Insights Panel */}
                                    {expandedCamp === camp.id && (
                                        <div className="mt-4 pt-4 border-t border-border">
                                            {insightsLoading[camp.id] ? (
                                                <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground text-sm">
                                                    <SyncIcon spinning={true} />
                                                    Loading insights from Meta...
                                                </div>
                                            ) : insightsMap[camp.id] ? (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                                    <InsightStat
                                                        iconUrl="https://img.icons8.com/fluency/48/visible.png"
                                                        label="Impressions"
                                                        value={Number(insightsMap[camp.id]?.impressions || 0).toLocaleString()}
                                                    />
                                                    <InsightStat
                                                        iconUrl="https://img.icons8.com/fluency/48/cursor.png"
                                                        label="Clicks"
                                                        value={Number(insightsMap[camp.id]?.clicks || 0).toLocaleString()}
                                                    />
                                                    <InsightStat
                                                        iconUrl="https://img.icons8.com/fluency/48/group.png"
                                                        label="Reach"
                                                        value={Number(insightsMap[camp.id]?.reach || 0).toLocaleString()}
                                                    />
                                                    <InsightStat
                                                        iconUrl="https://img.icons8.com/fluency/48/money-bag.png"
                                                        label="Spend"
                                                        value={`${sym}${Number(insightsMap[camp.id]?.spend || 0).toFixed(2)}`}
                                                    />
                                                    <InsightStat
                                                        iconUrl="https://img.icons8.com/fluency/48/positive-dynamic.png"
                                                        label="CTR"
                                                        value={`${Number(insightsMap[camp.id]?.ctr || 0).toFixed(2)}%`}
                                                    />
                                                    <InsightStat
                                                        iconUrl="https://img.icons8.com/fluency/48/rupee.png"
                                                        label="CPC"
                                                        value={`${sym}${Number(insightsMap[camp.id]?.cpc || 0).toFixed(2)}`}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="text-center py-6 text-muted-foreground text-sm">
                                                    No insights data available for this period. Try a different date range.
                                                    <div className="mt-2">
                                                        <Button size="sm" variant="outline" onClick={() => fetchInsights(camp.id)}>
                                                            <SyncIcon /> Retry
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <CreateCampaignDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
            </div>
        </DashboardLayout>
    );
}

function InsightStat({ iconUrl, label, value }: { iconUrl: string; label: string; value: string }) {
    return (
        <div className="bg-muted/40 rounded-xl p-3 flex flex-col gap-1 hover:bg-muted/70 transition-colors">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <img src={iconUrl} alt={label} className="w-4 h-4 object-contain" />
                {label}
            </div>
            <div className="text-lg font-bold text-foreground">{value}</div>
        </div>
    );
}
