import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText, Calendar, CreditCard } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Invoice {
    id: string;
    amount: number;
    currency: string;
    status: string;
    invoice_date: string;
    invoice_number: string;
    pdf_url: string | null;
}

export default function InvoicesPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        if (user) {
            fetchInvoices();
        }
    }, [user]);

    const fetchInvoices = async () => {
        try {
            const { data, error } = await supabase
                .from('invoices')
                .select('*')
                .eq('user_id', user?.id)
                .order('invoice_date', { ascending: false });

            if (error) {
                console.error('Error fetching invoices:', error);
            } else {
                setInvoices(data || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadInvoice = (invoice: Invoice) => {
        // In a real app, this would download a generated PDF
        // For now, we'll create a simple text representation
        const content = `
      INVOICE #${invoice.invoice_number}
      --------------------------------
      Date: ${new Date(invoice.invoice_date).toLocaleDateString()}
      Status: ${invoice.status.toUpperCase()}
      
      Amount: ${invoice.currency} ${invoice.amount.toFixed(2)}
      
      Thank you for your business!
      Avelo Team
    `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice-${invoice.invoice_number}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return <div className="flex items-center justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Billing & Invoices</h1>
                <p className="text-slate-500 dark:text-slate-400">View and manage your payment history</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>Download past invoices for your records</CardDescription>
                </CardHeader>
                <CardContent>
                    {invoices.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <div className="flex justify-center mb-4">
                                <FileText className="w-12 h-12 text-slate-200" />
                            </div>
                            <p>No invoices found. Once you subscribe, your payment history will appear here.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-mono">{invoice.invoice_number}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {format(new Date(invoice.invoice_date), 'MMM dd, yyyy')}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {invoice.currency} {invoice.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'} className={
                                                invoice.status === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-700'
                                            }>
                                                {invoice.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => downloadInvoice(invoice)}>
                                                <Download className="w-4 h-4 mr-2" />
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-900/50 border-dashed">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Payment Method</h3>
                            <p className="text-sm text-slate-500">Securely managed by Stripe</p>
                        </div>
                    </div>
                    <Button variant="outline">Update Card</Button>
                </CardContent>
            </Card>
        </div>
    );
}
