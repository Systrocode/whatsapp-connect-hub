import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface PaymentSettings {
    method: 'upi' | 'bank_transfer' | 'paypal';
    upi_id?: string;
    bank_name?: string;
    account_number?: string;
    ifsc_code?: string;
    account_holder_name?: string;
    paypal_email?: string;
}

interface Props {
    profile: {
        id: string;
        payment_details: PaymentSettings | null;
    };
    onUpdate: (details: PaymentSettings) => void;
}

export function PaymentSettingsForm({ profile, onUpdate }: Props) {
    const [loading, setLoading] = useState(false);
    // Initialize state properly, handling null payment_details
    const [method, setMethod] = useState<'upi' | 'bank_transfer' | 'paypal'>(
        profile.payment_details?.method || 'upi'
    );
    const [formData, setFormData] = useState<Partial<PaymentSettings>>(
        profile.payment_details || {}
    );

    const handleSave = async () => {
        setLoading(true);
        try {
            const details: PaymentSettings = {
                method,
                ...formData
            };

            // Clean up unrelated fields based on method
            if (method === 'upi') {
                delete details.bank_name;
                delete details.account_number;
                delete details.ifsc_code;
                delete details.paypal_email;
            } else if (method === 'bank_transfer') {
                delete details.upi_id;
                delete details.paypal_email;
            } else if (method === 'paypal') {
                delete details.upi_id;
                delete details.bank_name;
                delete details.account_number;
                delete details.ifsc_code;
                delete details.account_holder_name; // Usually not needed for PayPal if email matches, but can keep
            }

            const { error } = await supabase
                .from('affiliates')
                .update({ payment_details: details } as any) // Cast to any for jsonb compatibility
                .eq('id', profile.id);

            if (error) throw error;

            onUpdate(details);
            toast.success("Payment settings saved successfully");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <RadioGroup value={method} onValueChange={(v: any) => setMethod(v)}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI (India)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank_transfer" id="bank" />
                    <Label htmlFor="bank">Bank Transfer (India)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal (International)</Label>
                </div>
            </RadioGroup>

            <div className="space-y-3 pt-2">
                {method === 'upi' && (
                    <div className="space-y-2">
                        <Label>UPI ID</Label>
                        <Input
                            placeholder="username@upi"
                            value={formData.upi_id || ''}
                            onChange={e => setFormData({ ...formData, upi_id: e.target.value })}
                        />
                    </div>
                )}

                {method === 'bank_transfer' && (
                    <>
                        <div className="space-y-2">
                            <Label>Account Holder Name</Label>
                            <Input
                                placeholder="As per bank records"
                                value={formData.account_holder_name || ''}
                                onChange={e => setFormData({ ...formData, account_holder_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Bank Name</Label>
                            <Input
                                placeholder="e.g. HDFC Bank"
                                value={formData.bank_name || ''}
                                onChange={e => setFormData({ ...formData, bank_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Account Number</Label>
                            <Input
                                placeholder="Account Number"
                                value={formData.account_number || ''}
                                onChange={e => setFormData({ ...formData, account_number: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>IFSC Code</Label>
                            <Input
                                placeholder="IFSC Code"
                                value={formData.ifsc_code || ''}
                                onChange={e => setFormData({ ...formData, ifsc_code: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {method === 'paypal' && (
                    <div className="space-y-2">
                        <Label>PayPal Email</Label>
                        <Input
                            type="email"
                            placeholder="email@example.com"
                            value={formData.paypal_email || ''}
                            onChange={e => setFormData({ ...formData, paypal_email: e.target.value })}
                        />
                    </div>
                )}
            </div>

            <Button onClick={handleSave} disabled={loading} className="w-full">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Save Details
            </Button>
        </div>
    );
}
