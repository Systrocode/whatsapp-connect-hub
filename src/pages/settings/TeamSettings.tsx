import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Trash2, Shield, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
    id: string;
    role: string;
    user: {
        email: string;
        id: string;
    }
}

interface Invite {
    id: string;
    email: string;
    role: string;
    status: 'pending' | 'accepted';
    created_at: string;
}

export default function TeamSettings() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [invites, setInvites] = useState<Invite[]>([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("member");
    const [sendingInvite, setSendingInvite] = useState(false);

    useEffect(() => {
        if (user) {
            fetchTeamData();
        }
    }, [user]);

    const fetchTeamData = async () => {
        try {
            // 1. Get my team ID (Currently assuming 1 team per user for simplicity)
            const { data: myMembership } = await supabase
                .from('team_members')
                .select('team_id')
                .eq('user_id', user?.id)
                .single();

            if (!myMembership) {
                // Handle case where user has no team (should create one automatically usually)
                setLoading(false);
                return;
            }

            // 2. Fetch Members
            // Note: We need to join with auth.users which is tricky in client. 
            // For MVP, we might need a view or just store email in team_members or profiles.
            // Let's assume we fetch profiles roughly or use a join if RLS permits.
            // Actually, standard pattern: team_members -> user_id. 
            // We will mock the email fetch for now or use a secure Edge Function later.
            // Ideally 'profiles' table has email. checking types... types.ts says profiles has no email. (Auth has it).
            // WORKAROUND: We will just list the IDs for now, or fetch from a 'profiles' if updated.
            // Let's rely on 'team_members' and maybe we can't see emails yet without a function.

            const { data: membersData, error: membersError } = await supabase
                .from('team_members')
                .select('*')
                .eq('team_id', myMembership.team_id);

            if (membersError) throw membersError;

            // Map to shape
            setMembers(membersData.map(m => ({
                id: m.id,
                role: m.role || 'member',
                user: { id: m.user_id, email: 'User ' + m.user_id.slice(0, 4) } // Temporary until we have profile emails
            })));

            // 3. Fetch Invites
            const { data: invitesData, error: invitesError } = await supabase
                .from('team_invites')
                .select('*')
                .eq('team_id', myMembership.team_id);

            if (invitesError) throw invitesError;
            // @ts-ignore
            setInvites(invitesData || []);

        } catch (error) {
            console.error("Error fetching team:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async () => {
        if (!inviteEmail) return;
        setSendingInvite(true);
        try {
            // Get team ID again
            const { data: myMembership } = await supabase
                .from('team_members')
                .select('team_id')
                .eq('user_id', user?.id)
                .single();

            if (!myMembership) throw new Error("No team found");

            // Create Invite
            const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
            const { data, error } = await supabase.from('team_invites').insert({
                team_id: myMembership.team_id,
                email: inviteEmail,
                role: inviteRole,
                token: token,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
            }).select();

            if (error) throw error;

            // Send email via Edge Function
            const { error: fnError } = await supabase.functions.invoke('send-team-invite', {
                body: {
                    invite_id: (data as any)[0].id,
                    site_url: window.location.origin
                }
            });

            if (fnError) {
                console.error("Failed to trigger email:", fnError);
                toast({
                    title: "Warning",
                    description: "Invite created but failed to send email.",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Invite Sent",
                    description: `Invitation sent to ${inviteEmail}`,
                });
            }

            setInviteEmail("");
            fetchTeamData();

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setSendingInvite(false);
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Team Management</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your team members and their access levels.
                </p>
            </div>

            {/* Invite Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Invite New Member</CardTitle>
                    <CardDescription>
                        Send an email invitation to add a new user to your team.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input
                                placeholder="colleague@company.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                            />
                        </div>
                        <div className="w-40 space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <Select value={inviteRole} onValueChange={setInviteRole}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="member">Member</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleInvite} disabled={!inviteEmail || sendingInvite}>
                            {sendingInvite ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                            Send Invite
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Members List */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://avatar.vercel.sh/${member.user.email}`} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{member.user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={member.role === 'owner' ? 'default' : 'secondary'} className="capitalize">
                                            {member.role === 'owner' && <Shield className="w-3 h-3 mr-1" />}
                                            {member.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        Active
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {member.role !== 'owner' && (
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* Pending Invites */}
                            {invites.map((invite) => (
                                <TableRow key={invite.id} className="bg-muted/30">
                                    <TableCell className="flex items-center gap-3 opacity-70">
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{invite.email}</span>
                                            <span className="text-xs text-muted-foreground">Invitation Sent</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-dashed">
                                            {invite.role} (Pending)
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        -
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
