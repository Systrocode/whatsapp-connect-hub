import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, DollarSign, Users, TrendingUp, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface AffiliateProfile {
    id: string;
    referral_code: string;
    commission_rate: number;
    total_earnings: number;
    status: string;
}

interface Referral {
    id: string;
    status: string;
    commission_amount: number;
    created_at: string;
    referred_user: {
        email: string;
    }
}

export default function AffiliateDashboard() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [profile, setProfile] = useState<AffiliateProfile | null>(null);
    const [referrals, setReferrals] = useState<Referral[]>([]);

    useEffect(() => {
        if (user) {
            fetchAffiliateData();
        }
    }, [user]);

    const fetchAffiliateData = async () => {
        try {
            const { data, error } = await supabase
                .from('affiliates')
                .select('*')
                .eq('user_id', user?.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching affiliate data:', error);
            }

            if (data) {
                setProfile(data);
                fetchReferrals(data.id);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReferrals = async (affiliateId: string) => {
        const { data: referralsData, error } = await supabase
            .from('referrals')
            .select(`
        *,
        referred_user:referred_user_id (email)
      `)
            .eq('affiliate_id', affiliateId)
            .order('created_at', { ascending: false });

        if (!error && referralsData) {
            // @ts-ignore
            setReferrals(referralsData);
        }
    };

    const joinProgram = async () => {
        setCreating(true);
        try {
            // Generate a simple code based on email or random
            const baseCode = user?.email?.split('@')[0] || 'user';
            const randomSuffix = Math.random().toString(36).substring(2, 6);
            const code = `${baseCode}-${randomSuffix}`.toLowerCase();

            const { data, error } = await supabase
                .from('affiliates')
                .insert([
                    { user_id: user?.id, referral_code: code }
                ])
                .select()
                .single();

            if (error) throw error;

            setProfile(data);
            toast({
                title: "Welcome to the program!",
                description: "Your affiliate account has been created successfully.",
            });
        } catch (error: any) {
            toast({
                title: "Error joining program",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setCreating(false);
        }
    };

    const copyLink = () => {
        if (!profile) return;
        const link = `${window.location.origin}/?ref=${profile.referral_code}`;
        navigator.clipboard.writeText(link);
        toast({
            title: "Link copied!",
            description: "Referral link copied to clipboard.",
        });
    };

    if (loading) {
        return <div className="flex items-center justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>;
    }

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto p-8 space-y-8">
                <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-none shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <CardContent className="p-12 text-center space-y-8 relative z-10">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                            <TrendingUp className="w-10 h-10 text-purple-200" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight">Become a Partner</h1>
                            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                                Join our affiliate program and earn 20% recurring commission on every referral.
                                Turn your influence into income today.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto pt-8">
                            {[
                                { icon: DollarSign, title: "20% Commission", desc: "Recurring monthly earnings" },
                                { icon: Users, title: "60-Day Cookie", desc: "Long attribution window" },
                                { icon: CreditCard, title: "Monthly Payouts", desc: "Direct to your account" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <item.icon className="w-6 h-6 text-purple-300 mb-2" />
                                    <div className="font-semibold">{item.title}</div>
                                    <div className="text-sm text-purple-200">{item.desc}</div>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            onClick={joinProgram}
                            disabled={creating}
                            className="bg-white text-purple-900 hover:bg-purple-50 hover:text-purple-950 font-bold px-8 py-6 text-lg rounded-full shadow-lg transition-all transform hover:scale-105"
                        >
                            {creating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                            Activate Affiliate Account
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Affiliate Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400">Track your performance and earnings</p>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Status: {profile.status}</Badge>
                        <span className="text-sm text-slate-500">|</span>
                        <span className="text-sm font-mono text-slate-700 dark:text-slate-300 px-2">{profile.referral_code}</span>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={copyLink}>
                            <Copy className="w-3 h-3" />
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Total Earnings</CardTitle>
                            <DollarSign className="w-4 h-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{profile.total_earnings.toFixed(2)}</div>
                            <p className="text-xs text-slate-400 mt-1">+0% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Pending Commission</CardTitle>
                            <CreditCard className="w-4 h-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹0.00</div>
                            <p className="text-xs text-slate-400 mt-1">Available for payout</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Total Referrals</CardTitle>
                            <Users className="w-4 h-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{referrals.length}</div>
                            <p className="text-xs text-slate-400 mt-1">All time referrals</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Commission Rate</CardTitle>
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(profile.commission_rate * 100).toFixed(0)}%</div>
                            <p className="text-xs text-slate-400 mt-1">Recurring commission</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Referrals</CardTitle>
                                <CardDescription>People who signed up using your link</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {referrals.length === 0 ? (
                                    <div className="text-center py-12 text-slate-500">
                                        <div className="flex justify-center mb-4">
                                            <Users className="w-12 h-12 text-slate-200" />
                                        </div>
                                        <p>No referrals yet. Share your link to start earning!</p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>User</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right">Commission</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {referrals.map((ref) => (
                                                <TableRow key={ref.id}>
                                                    <TableCell>{ref.referred_user?.email || 'Unknown User'}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={ref.status === 'converted' ? 'default' : 'secondary'} className={
                                                            ref.status === 'converted' ? 'bg-green-100 text-green-700' :
                                                                ref.status === 'paid' ? 'bg-blue-100 text-blue-700' :
                                                                    'bg-slate-100 text-slate-700'
                                                        }>
                                                            {ref.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{new Date(ref.created_at).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-right font-medium text-green-600">
                                                        ₹{ref.commission_amount.toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg">Your Affiliate Link</CardTitle>
                                <CardDescription className="text-slate-400">Share this link to track referrals</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2 bg-black/30 p-3 rounded-lg border border-white/10">
                                    <code className="text-sm flex-1 truncate text-purple-300">
                                        {window.location.origin}/?ref={profile.referral_code}
                                    </code>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/10" onClick={copyLink}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button onClick={copyLink} className="w-full bg-purple-600 hover:bg-purple-700">
                                    Copy Link
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Resources</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-purple-600">Marketing Assets</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400" />
                                </a>
                                <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-purple-600">Commission Guide</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400" />
                                </a>
                                <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-purple-600">Terms of Service</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400" />
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
