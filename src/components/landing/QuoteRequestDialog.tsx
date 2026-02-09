import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function QuoteRequestDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [volume, setVolume] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Helper to get trimmed string
        const getStr = (key: string) => (formData.get(key) as string || "").trim();

        const data = {
            firstName: getStr("firstName"),
            lastName: getStr("lastName"),
            email: getStr("email"),
            company: getStr("company"),
            volume: volume,
            message: getStr("requirements"),
        };

        // Basic Empty Check
        if (!data.firstName || !data.lastName || !data.email || !data.company || !data.volume || !data.message) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            toast.error("Please enter a valid email address.");
            setLoading(false);
            return;
        }



        try {
            const { error } = await supabase.functions.invoke('send-quote-request', {
                body: data
            });

            if (error) throw error;

            toast.success("Quote request sent!", {
                description: "Our team will contact you within 24 hours."
            });
            setOpen(false);
            // Reset form? The dialog unmounts or we can rely on it closing.
            // If we reopen, it might have old data if not reset.
            // Since we close it, state reset is good but maybe not strictly necessary if component re-mounts?
            // Shadcn Dialog preserves state if not unmounted.
            setVolume("");
            (e.target as HTMLFormElement).reset();

        } catch (error: any) {
            console.error("Error submitting quote request:", error);
            toast.error("Failed to send request", {
                description: error.message || "Please try again later."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Request a Quote</DialogTitle>
                    <DialogDescription>
                        Get a custom pricing plan tailored to your business needs.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                            <Input id="firstName" name="firstName" required placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                            <Input id="lastName" name="lastName" required placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Work Email <span className="text-red-500">*</span></Label>
                        <Input id="email" name="email" type="email" required placeholder="john@company.com" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company">Company Name <span className="text-red-500">*</span></Label>
                        <Input id="company" name="company" required placeholder="Acme Inc." />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="volume">Monthly Message Volume <span className="text-red-500">*</span></Label>
                        <Select value={volume} onValueChange={setVolume} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select volume" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="less_than_10k">Less than 10k</SelectItem>
                                <SelectItem value="10k_100k">10k - 100k</SelectItem>
                                <SelectItem value="100k_1m">100k - 1M</SelectItem>
                                <SelectItem value="1m_plus">1M+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="requirements">Additional Requirements <span className="text-red-500">*</span></Label>
                        <Textarea id="requirements" name="requirements" required placeholder="Tell us about your use case..." className="min-h-[100px]" />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
                            {loading ? "Sending..." : "Submit Request"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
