import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2, Search, DollarSign, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface AdminInvoice {
    id: string;
    amount: number;
    currency: string;
    status: string;
    invoice_date: string;
    invoice_number: string;
    user_id: string;
    profiles?: {
        business_name: string | null;
        phone_number: string | null;
    };
}

export default function AdminInvoices() {
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState<AdminInvoice[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const { data, error } = await supabase
                .from('invoices')
                .select(`
          *,
          profiles:user_id (
            business_name,
            phone_number
          )
        `)
                .order('invoice_date', { ascending: false });

            if (error) {
                console.error('Error fetching invoices:', error);
            } else {
                // @ts-ignore - Supabase types join handling
                setInvoices(data || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.profiles?.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = invoices.reduce((sum, inv) => {
        if (inv.status === 'paid') return sum + Number(inv.amount);
        return sum;
    }, 0);

    if (loading) {
        return <div className="flex items-center justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    return (
        <DashboardLayout>
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All Invoices</h1>
                    <p className="text-slate-500 dark:text-slate-400">Monitor all system transactions and payments</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">Lifetime collected earnings</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{invoices.length}</div>
                            <p className="text-xs text-muted-foreground">Across all users</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Transactions</CardTitle>
                                <CardDescription>List of all generated invoices</CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search invoice or business..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>User / Business</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInvoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-mono font-medium">{invoice.invoice_number}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{invoice.profiles?.business_name || 'Unknown Business'}</span>
                                                <span className="text-xs text-slate-500 truncate max-w-[150px]">{invoice.user_id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(invoice.invoice_date), 'MMM dd, yyyy')}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {invoice.currency} {Number(invoice.amount).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'} className={
                                                invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                                            }>
                                                {invoice.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredInvoices.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                            No invoices found matching your search.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
