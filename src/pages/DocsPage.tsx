import { useState } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Terminal, Copy, Check, Hash, Globe, Lock } from "lucide-react";

const CodeBlock = ({ code, language }: { code: string, language: string }) => (
    <pre className="p-4 bg-[#1e1e1e] text-blue-300 font-mono text-sm overflow-x-auto">
        <code>{code}</code>
    </pre>
);

const DocsPage = () => {
    const [activeSection, setActiveSection] = useState("introduction");
    const [copied, setCopied] = useState(false);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sections = [
        {
            title: "Getting Started",
            items: [
                { id: "introduction", label: "Introduction" },
                { id: "authentication", label: "Authentication" },
                { id: "rate-limits", label: "Rate Limits" },
            ]
        },
        {
            title: "Messaging",
            items: [
                { id: "send-message", label: "Send Message" },
                { id: "send-template", label: "Send Template" },
                { id: "media-messages", label: "Media Messages" },
            ]
        },
        {
            title: "Contacts",
            items: [
                { id: "check-contacts", label: "Check Contacts" },
                { id: "manage-groups", label: "Manage Groups" },
            ]
        },
        {
            title: "Webhooks",
            items: [
                { id: "webhooks-intro", label: "Overview" },
                { id: "events", label: "Events" },
            ]
        }
    ];

    const content = {
        introduction: (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-green-600 font-medium mb-2">
                    <Globe className="w-5 h-5" />
                    <span>API Reference v3.0</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Introduction</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Welcome to the WA Business API documentation. Our REST API allows you to programmatically send messages, manage contacts, and integrate WhatsApp capabilities directly into your applications.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
                    <div className="flex items-start gap-3">
                        <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 dark:text-blue-100">Base URL</h4>
                            <code className="text-sm text-blue-800 dark:text-blue-300 font-mono mt-1 block">
                                https://api.wabusiness.com/v1
                            </code>
                        </div>
                    </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400">
                    The API relies on standard HTTP methods and response codes. All responses are returned in JSON format.
                </p>
            </div>
        ),
        authentication: (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-purple-600 font-medium mb-2">
                    <Lock className="w-5 h-5" />
                    <span>Security</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Authentication</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Authenticate your API requests by including your Bearer Token in the headers of every request. You can manage your API keys in the <a href="#" className="text-green-600 hover:underline">Developer Dashboard</a>.
                </p>

                <div className="my-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Example Request</h3>
                    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e]">
                        <div className="absolute top-3 right-3 z-10">
                            <button
                                onClick={() => handleCopy('curl -X GET https://api.wabusiness.com/v1/profile \\\n  -H "Authorization: Bearer YOUR_API_TOKEN"')}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <CodeBlock
                            language="bash"
                            code={`curl -X GET https://api.wabusiness.com/v1/profile \\
  -H "Authorization: Bearer YOUR_API_TOKEN"`}
                        />
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-1">Important</h4>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Never share your API tokens in client-side code (e.g., browsers). Always route requests through your backend server to keep your credentials secure.
                    </p>
                </div>
            </div>
        ),
        // Add more default content or a fallback for other sections
    };

    const renderContent = () => {
        return (content as any)[activeSection] || (
            <div className="animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-slate-400 font-medium mb-2">
                    <Hash className="w-5 h-5" />
                    <span>Endpoint</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 capitalize px-1">{activeSection.replace('-', ' ')}</h1>
                <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
                    <p className="text-slate-500">Documentation for this endpoint is being updated.</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            <div className="flex-1 pt-20">
                <div className="flex h-[calc(100vh-80px)]">
                    {/* Sidebar */}
                    <aside className="w-64 lg:w-72 border-r border-slate-200 dark:border-slate-800 hidden md:block bg-slate-50 dark:bg-slate-950/50">
                        <ScrollArea className="h-full py-8">
                            <div className="px-6 mb-8">
                                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-green-600" />
                                    Docs
                                </h2>
                            </div>
                            <div className="px-4 space-y-8">
                                {sections.map((section) => (
                                    <div key={section.title}>
                                        <h3 className="px-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                            {section.title}
                                        </h3>
                                        <div className="space-y-1">
                                            {section.items.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setActiveSection(item.id)}
                                                    className={`w-full text-left px-2 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${activeSection === item.id
                                                        ? "bg-white dark:bg-slate-800 text-green-600 shadow-sm border border-slate-200 dark:border-slate-700"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white"
                                                        }`}
                                                >
                                                    {item.label}
                                                    {activeSection === item.id && <ChevronRight className="w-3 h-3" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-16">
                            {renderContent()}

                            <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                                <Button variant="ghost" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                                    Need help? Contact Support
                                </Button>
                                <Button variant="outline" className="gap-2">
                                    Next: Authentication <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Simple footer for docs page, maybe different from Main Footer if desired, but reusing Landing Footer for consistency is fine, though it might be too big. Let's stick to no footer or a minimal one inside the main area, BUT the user usually expects the standard footer. Since the design is full-height sidebar, putting the footer at the bottom of the main content scroll is best. */}
            {/* We will NOT include the LandingFooter here to maintain a "Docs" app feel, or we can include it at the very bottom of the main scroll. Let's include it for consistency. */}
        </div>
    );
};

export default DocsPage;
