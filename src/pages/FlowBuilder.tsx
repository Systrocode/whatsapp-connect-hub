import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, Sparkles, ArrowRight, GitBranch, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FlowBuilder() {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-100px)] animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Automation Flow Builder</h1>
                        <p className="text-muted-foreground mt-1">Visually design your chatbot logic.</p>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center p-4">
                    <Card className="max-w-2xl w-full p-12 flex flex-col items-center text-center space-y-8 border-dashed border-2 shadow-sm bg-card/50">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2 animate-pulse">
                            <GitBranch className="w-10 h-10 text-primary" />
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold">Coming Soon</h2>
                            <p className="text-muted-foreground text-lg max-w-md mx-auto">
                                We're building a powerful drag-and-drop editor to help you create complex WhatsApp automation flows without writing code.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-8 text-left">
                            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                                <div className="p-2 bg-blue-500/10 rounded-md text-blue-500">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-base">Visual Editor</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Drag, drop, and connect message blocks easily.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                                <div className="p-2 bg-purple-500/10 rounded-md text-purple-500">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-base">Smart Logic</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Add conditions, delays, and integration triggers.</p>
                                </div>
                            </div>
                        </div>

                        <Button onClick={() => navigate('/dashboard')} variant="outline" className="mt-8 border-primary/20 text-primary hover:bg-primary/5">
                            Back to Dashboard
                        </Button>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
