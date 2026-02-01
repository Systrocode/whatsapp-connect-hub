import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Menu,
    X,
    ChevronDown,
    Globe,
} from "lucide-react";
import { QuoteRequestDialog } from "./QuoteRequestDialog";
import { Button } from "@/components/ui/button";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "WhatsApp Broadcasting",
        description: "Retargeting, CRM & more",
        icon: "https://img.icons8.com/3d-fluency/94/megaphone.png",
    },
    {
        title: "AI WhatsApp Chatbot",
        description: "Automate everything with AI",
        icon: "https://img.icons8.com/3d-fluency/94/robot-2.png",
    },
    {
        title: "Click to WhatsApp Ads",
        description: "3X Your Leads",
        icon: "https://img.icons8.com/3d-fluency/94/lightning-bolt.png",
    },
    {
        title: "WhatsApp Payments",
        description: "Collect Payments via UPI",
        icon: "https://img.icons8.com/3d-fluency/94/card-wallet.png",
    },
    {
        title: "WhatsApp Forms",
        description: "Native Data Collection",
        icon: "https://img.icons8.com/3d-fluency/94/form.png",
    },
    {
        title: "WhatsApp Catalog",
        description: "Sell Products on WhatsApp",
        icon: "https://img.icons8.com/3d-fluency/94/shopping-bag.png",
    },
];

const integrations = [
    {
        title: "Shopify",
        description: "Abandoned Cart Recovery",
        icon: "https://img.icons8.com/3d-fluency/94/shopping-bag.png",
    },
    {
        title: "Razorpay",
        description: "Payment Notifications",
        icon: "https://img.icons8.com/3d-fluency/94/bank-cards.png",
    },
    {
        title: "Webhooks",
        description: "Connect any stack",
        icon: "https://img.icons8.com/3d-fluency/94/link.png",
    },
    {
        title: "CRM Sync",
        description: "Salesforce, HubSpot & more",
        icon: "https://img.icons8.com/3d-fluency/94/user-group-man-woman.png",
    },
];

export function LandingHeader({ variant = 'default' }: { variant?: 'default' | 'dark' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isDark = variant === 'dark' && !isScrolled;
    const textColor = isDark ? "text-white hover:text-white/80" : "text-foreground";
    const mutedTextColor = isDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground";

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-white dark:bg-slate-900 shadow-sm border-border py-2"
                    : "bg-white dark:bg-slate-900 border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logos/avelo logo.png" alt="Avelo" className="h-10 md:h-14 lg:h-20 w-auto object-contain mix-blend-multiply brightness-105 contrast-110 dark:mix-blend-screen dark:grayscale dark:invert dark:brightness-200" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:block">
                    <NavigationMenu>
                        <NavigationMenuList className={isDark ? "text-white" : ""}>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-green-600 focus:text-green-600 data-[state=open]:text-green-600 dark:text-white dark:focus:text-white dark:data-[state=open]:text-white font-medium" >Product</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <ListItem title="Official API" href="/product/official-api">
                                            Direct access to WhatsApp Cloud API infrastructure.
                                        </ListItem>
                                        <ListItem title="Team Inbox" href="/product/team-inbox">
                                            Multi-agent support inbox for your team.
                                        </ListItem>
                                        <ListItem title="Flow Builder" href="/product/flow-builder">
                                            Drag & Drop chatbot builder.
                                        </ListItem>
                                        <ListItem title="Analytics" href="/product/analytics">
                                            Detailed insights and reporting.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-green-600 focus:text-green-600 data-[state=open]:text-green-600 dark:text-white dark:focus:text-white dark:data-[state=open]:text-white font-medium" >Features</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {features.map((feature) => (
                                            <ListItem
                                                key={feature.title}
                                                title={feature.title}
                                                href={`/features/${feature.title.toLowerCase().replace(/ /g, '-')}`}
                                                icon={<img src={feature.icon} alt={feature.title} className="w-6 h-6 object-contain" />}
                                            >
                                                {feature.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-green-600 focus:text-green-600 data-[state=open]:text-green-600 dark:text-white dark:focus:text-white dark:data-[state=open]:text-white font-medium" >Integrations</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {integrations.map((item) => (
                                            <ListItem
                                                key={item.title}
                                                title={item.title}
                                                href={`/integrations/${item.title.toLowerCase().replace(/ /g, '-')}`}
                                                icon={<img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" />}
                                            >
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-green-600 focus:text-green-600 data-[state=open]:text-green-600 dark:text-white dark:focus:text-white dark:data-[state=open]:text-white font-medium" >Resources</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/tools/chat-button-generator"
                                                >
                                                    <img src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="Free Tools" className="w-12 h-12 mb-4 object-contain" />
                                                    <div className="mb-2 text-lg font-medium">
                                                        Free WhatsApp Tools
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Generate WhatsApp buttons, links & QR codes for your site.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem title="Chat Button Generator" href="/tools/chat-button-generator">
                                            Create a sticky chat widget.
                                        </ListItem>
                                        <ListItem title="Link Generator" href="/tools/whatsapp-link-generator">
                                            Create WhatsApp links instantly.
                                        </ListItem>
                                        <ListItem title="Blog" href="/blog">
                                            Latest updates and marketing tips.
                                        </ListItem>
                                        <ListItem title="Case Studies" href="/customers/case-studies">
                                            See how others grow with Avelo.
                                        </ListItem>
                                        <ListItem title="Help Center" href="/help">
                                            Get support for your questions.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link to="/pricing">
                                    <NavigationMenuLink className="bg-transparent hover:bg-transparent focus:bg-transparent hover:text-green-600 focus:text-green-600 dark:text-white dark:focus:text-white font-medium px-4 py-2" >
                                        Pricing
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <div className={cn("hidden sm:flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors", mutedTextColor)}>
                        <Globe className="w-4 h-4" />
                        <span>Eng</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                        <Link to="/auth">
                            <Button variant="ghost" size="sm" className={cn(isDark && "text-white hover:text-white hover:bg-white/10")}>Sign in</Button>
                        </Link>
                        <QuoteRequestDialog>
                            <Button variant="whatsapp" size="sm">Request a Quote</Button>
                        </QuoteRequestDialog>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={cn("lg:hidden p-2", isDark ? "text-white" : "text-foreground")}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-x-0 top-[60px] h-[calc(100vh-60px)] bg-white dark:bg-slate-900 p-6 flex flex-col gap-6 overflow-y-auto animate-in fade-in slide-in-from-top-5 z-50">
                    <div className="flex flex-col gap-2">
                        <Link
                            to="/pricing"
                            className="text-lg font-medium py-3 border-b border-border"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Features</p>
                            <Link
                                to="/features"
                                className="text-xs text-primary font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                View All
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {features.slice(0, 4).map(f => (
                                <Link
                                    key={f.title}
                                    to={`/features/${f.title.toLowerCase().replace(/ /g, '-')}`}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="p-2 bg-green-500/10 rounded-md">
                                        <img src={f.icon} alt={f.title} className="w-5 h-5 object-contain" />
                                    </div>
                                    <span className="font-medium">{f.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pb-8 space-y-4">
                        <div className="h-px bg-border" />
                        <div className="flex flex-col gap-3">
                            <Link to="/auth" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full h-12 text-base font-medium border-primary/20 hover:bg-primary/5 hover:text-primary">
                                    Sign in
                                </Button>
                            </Link>
                            <div className="w-full">
                                <QuoteRequestDialog>
                                    <Button variant="whatsapp" className="w-full h-12 text-base font-bold shadow-lg shadow-green-500/20">
                                        Request a Quote
                                    </Button>
                                </QuoteRequestDialog>
                            </div>
                        </div>
                        <p className="text-center text-xs text-muted-foreground">
                            Join 10,000+ businesses growing on WhatsApp
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
}

const ListItem = ({ className, title, children, icon, ...props }: any) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:text-accent-foreground">
                        {icon}
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-accent-foreground/90 mt-1.5">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
};

const BookIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);
