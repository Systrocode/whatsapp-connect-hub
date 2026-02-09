import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, DollarSign, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Affiliate {
    id: string;
    referral_code: string;
    total_earnings: number;
    commission_rate: number;
    status: string;
    payment_details: any;
    user: {
        email: string;
        full_name: string;
    }
}

export default function AdminAffiliates() {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAffiliates();
    }, []);

    const fetchAffiliates = async () => {
        try {
            // Updated query to use profiles:user_id which is safer
            // Note: We might not get email from profiles if it's not there, but let's try to get business_name/phone at least
            // Or stick to the original query if RLS is fixed.
            // Let's stick to the original query but add error handling

            const { data, error } = await supabase
                .from('affiliates')
                .select(`
                    *,
                    profiles:user_id(
                        business_name,
                        phone_number
                    )
                `)
                .order('total_earnings', { ascending: false });

            if (error) throw error;

            // Map the data to flatten the structure slightly
            // Handle null data gracefully
            const formattedData = (data || []).map((item: any) => ({
                ...item,
                user: {
                    email: 'View Profile',
                    full_name: item.profiles?.business_name || 'Unknown Business'
                }
            }));

            setAffiliates(formattedData);
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to load affiliates. " + (error.message || ""));
        } finally {
            setLoading(false);
        }
    };

    const getPaymentDetailsDisplay = (details: any) => {
        if (!details) return <span className="text-slate-400 italic">Not set</span>;

        if (details.method === 'upi') {
            return (
                <div className="text-sm">
                    <div className="font-semibold text-purple-600">UPI</div>
                    <div>{details.upi_id}</div>
                </div>
            );
        }
        if (details.method === 'bank_transfer') {
            return (
                <div className="text-sm">
                    <div className="font-semibold text-blue-600">Bank Transfer</div>
                    <div>{details.bank_name}</div>
                    <div className="text-xs text-slate-500">{details.account_number}</div>
                    <div className="text-xs text-slate-500">{details.ifsc_code}</div>
                </div>
            );
        }
        if (details.method === 'paypal') {
            return (
                <div className="text-sm">
                    <div className="font-semibold text-indigo-600">PayPal</div>
                    <div>{details.paypal_email}</div>
                </div>
            );
        }
        return <span className="text-slate-400">Unknown Method</span>;
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <DashboardLayout>
            <div className="p-8 max-w-7xl mx-auto space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Affiliate Management</h1>
                        <p className="text-slate-500">View earnings and payout details</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Affiliates</CardTitle>
                        <CardDescription>
                            List of all registered affiliates and their current earnings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Affiliate</TableHead>
                                    <TableHead>Referral Code</TableHead>
                                    <TableHead>Total Earnings</TableHead>
                                    <TableHead>Payment Details</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {affiliates.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                            No affiliates found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    affiliates.map((aff) => (
                                        <TableRow key={aff.id}>
                                            <TableCell>
                                                <div className="font-medium">{aff.user.full_name}</div>
                                                <div className="text-xs text-slate-500">{aff.user.email}</div>
                                            </TableCell>
                                            <TableCell>
                                                <code className="bg-slate-100 px-2 py-1 rounded text-xs">{aff.referral_code}</code>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-bold text-green-600">
                                                    ₹{aff.total_earnings.toFixed(2)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getPaymentDetailsDisplay(aff.payment_details)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={aff.status === 'active' ? 'default' : 'secondary'}>
                                                    {aff.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            View Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Payout Details</DialogTitle>
                                                            <DialogDescription>
                                                                Copy these details to process manual payout
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 pt-4">
                                                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-2">
                                                                <div className="text-sm font-medium text-slate-500">Amount Due</div>
                                                                <div className="text-3xl font-bold text-green-600">₹{aff.total_earnings.toFixed(2)}</div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <h4 className="font-semibold flex items-center gap-2">
                                                                    <Shield className="w-4 h-4" />
                                                                    Payment Method
                                                                </h4>
                                                                <div className="p-4 border rounded-lg">
                                                                    {getPaymentDetailsDisplay(aff.payment_details)}
                                                                </div>
                                                            </div>

                                                            <Button className="w-full" onClick={() => {
                                                                navigator.clipboard.writeText(JSON.stringify(aff.payment_details, null, 2));
                                                                toast.success("Details copied to clipboard");
                                                            }}>
                                                                Copy Details to Clipboard
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
