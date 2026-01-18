import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function JoinTeam() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, session } = useAuth();
    const { toast } = useToast();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'validating' | 'valid' | 'invalid' | 'joining' | 'success'>('validating');
    const [inviteData, setInviteData] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus('invalid');
            setErrorMsg("No invitation token provided.");
            setLoading(false);
            return;
        }

        // Delay validation slightly to ensure Auth is ready if we needed it (though specific token lookup might be public if we allow it, 
        // but standard RLS prevents it. We will try to fetch assuming user might be logged in, or we rely on a Secure Function.
        // For MVP without Edge Function, we might face an issue if RLS is strict. 
        // Let's try to see if we can find the invite. 
        // Actually, looking at my previous migration, only Team Admins can view invites. 
        // This means a NEW user cannot validate the invite until they are added.
        // CORRECTION: We need a Postgres Function to "Accept Invite" that bypasses RLS securely.

        validateToken();
    }, [token, user]);

    const validateToken = async () => {
        // Since RLS hides invites from non-members, we can't simple SELECT * FROM invites WHERE token = ...
        // UNLESS we add a specific policy for "anyone can view invite where token = input".
        // BUT for now, let's assume the user MUST be logged in to even try. 
        if (!user) {
            // Logic: We show a generic "Login to accept invite" screen. 
            // We can't validate the token details (like Team Name) yet securely without backend.
            setLoading(false);
            return;
        }

        try {
            // Attempt to find invite. 
            // Note: If RLS is strictly "Admins only", even a logged in NEW user cannot see it.
            // We need a database function to handle this.
            // I will implement a client-side RPC call or just try to insert into team_members directly 
            // if I modify the policy.

            // LET'S TRY calling a custom function (I will create this in the next step).
            // For now, let's just simulate the UI flow.

            const { data, error } = await supabase
                .rpc('get_invite_details', { _token: token });

            if (error || !data || data.length === 0) {
                console.error(error);
                // Fallback or error
                if (!error) setErrorMsg("Invite not found");
                setStatus('invalid');
            } else {
                setInviteData(data[0]);
                setStatus('valid');
            }

        } catch (error: any) {
            console.error("Validation error:", error);
            setStatus('invalid');
            setErrorMsg("Invalid or expired invitation.");
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async () => {
        if (!user) {
            navigate(`/auth?redirectTo=/join-team?token=${token}`);
            return;
        }

        setStatus('joining');
        try {
            // Call the secure RPC function to join
            const { error } = await supabase.rpc('accept_team_invite', { _token: token });

            if (error) throw error;

            setStatus('success');
            toast({
                title: "Welcome!",
                description: "You have successfully joined the team.",
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (error: any) {
            toast({
                title: "Error joining team",
                description: error.message,
                variant: "destructive"
            });
            setStatus('valid'); // revert
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight text-slate-900 dark:text-white mb-2">
                        {status === 'success' ? 'Welcome Aboard!' : 'Team Invitation'}
                    </h1>
                    <CardDescription>
                        {status === 'success' ? 'Redirecting to dashboard...' : 'You have been invited to join a workspace.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {status === 'invalid' ? (
                        <div className="text-center text-red-500 space-y-4">
                            <XCircle className="w-12 h-12 mx-auto" />
                            <p>{errorMsg}</p>
                            <Button variant="outline" onClick={() => navigate('/')}>Go Home</Button>
                        </div>
                    ) : status === 'success' ? (
                        <div className="text-center text-green-500 space-y-4">
                            <CheckCircle2 className="w-12 h-12 mx-auto" />
                            <p>You are now a member.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {!user && (
                                <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm text-center">
                                    You need to sign in or create an account to accept this invitation.
                                </div>
                            )}

                            <div className="text-center space-y-2">
                                <p className="text-muted-foreground">You are joining:</p>
                                <h3 className="text-xl font-bold">{inviteData?.team_name || "Whatsapp Connect Team"}</h3>
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    Role: {inviteData?.role || 'Member'}
                                </div>
                            </div>

                            <Button onClick={handleJoin} className="w-full bg-whatsapp hover:bg-whatsapp/90" size="lg" disabled={status === 'joining'}>
                                {status === 'joining' ? <Loader2 className="animate-spin mr-2" /> : null}
                                {user ? 'Accept Invitation' : 'Login to Accept'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
