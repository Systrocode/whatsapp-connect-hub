import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MessageSquare,
    Menu,
    X,
    ChevronDown,
    Bot,
    Megaphone,
    CreditCard,
    ShoppingCart,
    Link as LinkIcon,
    FileText,
    Zap,
    Smartphone,
    Globe,
    Users
} from "lucide-react";
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
        icon: Megaphone,
    },
    {
        title: "AI WhatsApp Chatbot",
        description: "Automate everything with AI",
        icon: Bot,
    },
    {
        title: "Click to WhatsApp Ads",
        description: "3X Your Leads",
        icon: Zap,
    },
    {
        title: "WhatsApp Payments",
        description: "Collect Payments via UPI",
        icon: CreditCard,
    },
    {
        title: "WhatsApp Forms",
        description: "Native Data Collection",
        icon: FileText,
    },
    {
        title: "WhatsApp Catalog",
        description: "Sell Products on WhatsApp",
        icon: ShoppingCart,
    },
];

const integrations = [
    {
        title: "Shopify",
        description: "Abandoned Cart Recovery",
        icon: ShoppingCart,
    },
    {
        title: "Razorpay",
        description: "Payment Notifications",
        icon: CreditCard,
    },
    {
        title: "Webhooks",
        description: "Connect any stack",
        icon: LinkIcon,
    },
    {
        title: "CRM Sync",
        description: "Salesforce, HubSpot & more",
        icon: Users,
    },
];

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-border py-2"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold text-foreground">WA Business</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:block">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/pricing">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Pricing
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
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
                                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {features.map((feature) => (
                                            <ListItem
                                                key={feature.title}
                                                title={feature.title}
                                                href={`/features/${feature.title.toLowerCase().replace(/ /g, '-')}`}
                                                icon={<feature.icon className="w-4 h-4 text-whatsapp" />}
                                            >
                                                {feature.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Integrations</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {integrations.map((item) => (
                                            <ListItem
                                                key={item.title}
                                                title={item.title}
                                                href={`/integrations/${item.title.toLowerCase().replace(/ /g, '-')}`}
                                                icon={<item.icon className="w-4 h-4 text-primary" />}
                                            >
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <BookIcon className="h-6 w-6 text-whatsapp" />
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        Documentation
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Start integrating with our comprehensive guides.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem title="Blog" href="/blog">
                                            Latest updates and marketing tips.
                                        </ListItem>
                                        <ListItem title="Case Studies" href="/case-studies">
                                            See how others grow with WA Business.
                                        </ListItem>
                                        <ListItem title="Help Center" href="/help">
                                            Get support for your questions.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        <Globe className="w-4 h-4" />
                        <span>Eng</span>
                    </div>

                    {/* ModeToggle removed */}

                    <div className="hidden lg:flex items-center gap-2">
                        <Link to="/auth">
                            <Button variant="ghost" size="sm">Sign in</Button>
                        </Link>
                        <Link to="/auth?mode=signup">
                            <Button variant="whatsapp" size="sm">Request a Quote</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-xl">
                    <Link to="/pricing" className="text-sm font-medium py-2">Pricing</Link>
                    <div className="space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Features</p>
                        {features.slice(0, 4).map(f => (
                            <div key={f.title} className="flex items-center gap-2 text-sm">
                                <f.icon className="w-4 h-4 text-whatsapp" />
                                {f.title}
                            </div>
                        ))}
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex flex-col gap-2">
                        <Link to="/auth">
                            <Button variant="ghost" className="w-full justify-start">Sign in</Button>
                        </Link>
                        <Link to="/auth?mode=signup">
                            <Button variant="whatsapp" className="w-full">Request a Quote</Button>
                        </Link>
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
