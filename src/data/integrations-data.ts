
import {
    ShoppingCart,
    CreditCard,
    Link as LinkIcon,
    Users,
    TableProperties,
    BarChart,
    Megaphone,
    ArrowRightLeft,
    RefreshCw
} from "lucide-react";

export interface Integration {
    id: string;
    title: string;
    description: string;
    icon: any;
    logo?: string;
    color: string;
    heroImage: string;
    features: {
        title: string;
        description: string;
        icon: any;
    }[];
    benefits: string[];
    steps: {
        title: string;
        description: string;
    }[];
}

export const INTEGRATIONS_DATA: Record<string, Integration> = {
    "salesforce": {
        id: "salesforce",
        title: "Salesforce",
        description: "Sync your WhatsApp contacts and conversations directly with Salesforce CRM to keep your sales team in the loop.",
        icon: Users,
        logo: "/logos/salesforce.svg",
        color: "#00A1E0",
        heroImage: "https://images.unsplash.com/photo-1554774853-b415df9eeb92?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Two-Way Sync",
                description: "Automatically log WhatsApp messages as activities in Salesforce leads and contacts.",
                icon: ArrowRightLeft
            },
            {
                title: "Lead Creation",
                description: "Create new leads in Salesforce automatically when unknown numbers contact your business.",
                icon: Users
            },
            {
                title: "Automated Workflows",
                description: "Trigger WhatsApp messages based on Salesforce status changes (e.g., 'Closed Won').",
                icon: RefreshCw
            }
        ],
        benefits: [
            "Eliminate manual data entry",
            "Single source of truth for customer data",
            "Better visibility for sales managers",
            "Faster response times"
        ],
        steps: [
            { title: "Connect Account", description: "Log in to your Salesforce account via our dashboard." },
            { title: "Map Fields", description: "Choose which WhatsApp fields map to Salesforce Lead/Contact fields." },
            { title: "Enable Sync", description: "Turn on real-time synchronization and watch the data flow." }
        ]
    },
    "hubspot": {
        id: "hubspot",
        title: "HubSpot",
        description: "Supercharge your HubSpot CRM with WhatsApp. Automate abandoned cart recovery, meeting reminders, and more.",
        icon: Users,
        logo: "/logos/hubspot.svg",
        color: "#FF7A59",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Workflow Actions",
                description: "Add 'Send WhatsApp Message' as an action in your HubSpot Workflows.",
                icon: Megaphone
            },
            {
                title: "Timeline Events",
                description: "View full chat history directly on the HubSpot Contact Timeline.",
                icon: TableProperties
            },
            {
                title: "Personalization",
                description: "Use any HubSpot contact property (First Name, Deal Value) in your message templates.",
                icon: Users
            }
        ],
        benefits: [
            "Automate follow-ups at scale",
            "Close deals faster with instant communication",
            "Track engagement alongside email and calls"
        ],
        steps: [
            { title: "Install App", description: "Find our app in the HubSpot App Marketplace." },
            { title: "Authorize", description: "Grant permissions to read/write contact and timeline data." },
            { title: "Build Workflow", description: "Create your first HubSpot Workflow with a WhatsApp action." }
        ]
    },
    "zoho-crm": {
        id: "zoho-crm",
        title: "Zoho CRM",
        description: "Integrate WhatsApp with Zoho CRM to manage your leads and deals effectively within the Zoho ecosystem.",
        icon: Users,
        logo: "/logos/zoho.svg",
        color: "#188038",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Contextual Chat",
                description: "Chat with leads directly from within the Zoho CRM interface.",
                icon: Users
            },
            {
                title: "SalesSignals",
                description: "Get real-time notifications in Zoho when a customer replies on WhatsApp.",
                icon: Megaphone
            },
            {
                title: "Deals Pipeline",
                description: "Move deals automatically based on WhatsApp interactions.",
                icon: BarChart
            }
        ],
        benefits: [
            "Seamless experience for Zoho users",
            "Improved lead qualification",
            "Higher conversion rates"
        ],
        steps: [
            { title: "Setup Extension", description: "Install the WhatsApp extension from Zoho Marketplace." },
            { title: "Authenticate", description: "Link your Avelo phone number." },
            { title: "Configure", description: "Set up your notification preferences." }
        ]
    },
    "shopify": {
        id: "shopify",
        title: "Shopify",
        description: "The ultimate WhatsApp marketing tool for your Shopify store. Recover abandoned carts and boost sales.",
        icon: ShoppingCart,
        logo: "/logos/shopify-logo.svg",
        color: "#96BF48",
        heroImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Abandoned Cart Recovery",
                description: "Automatically send a WhatsApp message when a customer leaves their cart.",
                icon: ShoppingCart
            },
            {
                title: "Order Notifications",
                description: "Send instant updates for 'Order Placed', 'Shipped', and 'Delivered'.",
                icon: Megaphone
            },
            {
                title: "Click-to-Chat Button",
                description: "Add a floating WhatsApp widget to your storefront.",
                icon: Users
            }
        ],
        benefits: [
            "Recover up to 20% of abandoned carts",
            "Reduce support tickets with proactive updates",
            "Increase customer lifetime value"
        ],
        steps: [
            { title: "Add App", description: "Install directly from the Shopify App Store." },
            { title: "Enable Triggers", description: "Turn on the automated flows you needed." },
            { title: "Customize Templates", description: "Edit the message copy to match your brand voice." }
        ]
    },
    "woocommerce": {
        id: "woocommerce",
        title: "WooCommerce",
        description: "Connect your WordPress/WooCommerce store to WhatsApp for seamless order management and notifications.",
        icon: ShoppingCart,
        logo: "/logos/woocommerce.svg",
        color: "#96588A",
        heroImage: "https://images.unsplash.com/photo-1556742102-fab954492e01?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Order Updates",
                description: "Notify customers instantly about their order status changes.",
                icon: ShoppingCart
            },
            {
                title: "COD Confirmation",
                description: "Automate Cash on Delivery verification messages.",
                icon: CreditCard
            },
            {
                title: "Product Sharing",
                description: "Let customers share your products to their WhatsApp contacts easily.",
                icon: Users
            }
        ],
        benefits: [
            "Reduce COD returns",
            "Plug-and-play installation",
            "Detailed delivery tracking"
        ],
        steps: [
            { title: "Download Plugin", description: "Get the plugin from your WordPress dashboard." },
            { title: "Connect API", description: "Enter your Avelo API keys." },
            { title: "Go Live", description: "Start sending automated notifications immediately." }
        ]
    },
    "zapier": {
        id: "zapier",
        title: "Zapier",
        description: "Connect WhatsApp to 5,000+ apps. Create custom automations without writing a single line of code.",
        icon: LinkIcon,
        logo: "/logos/zapier.svg",
        color: "#FF4F00",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Infinite Possibilities",
                description: "Trigger WhatsApp messages from Google Forms, Slack, Typeform, Calendly, etc.",
                icon: LinkIcon
            },
            {
                title: "Multi-Step Zaps",
                description: "Create complex workflows involving multiple apps and conditions.",
                icon: RefreshCw
            },
            {
                title: "No-Code Builder",
                description: "Visual editor to design your automation logic.",
                icon: TableProperties
            }
        ],
        benefits: [
            "Connect to any tool in your stack",
            "Save hundreds of hours of manual work",
            "Flexible and customizable"
        ],
        steps: [
            { title: "Accept Invite", description: "Click our Zapier invite link." },
            { title: "Create Zap", description: "This is when... (Trigger) -> Do this... (WhatsApp Action)." },
            { title: "Test & Turn On", description: "Validate the workflow and set it live." }
        ]
    },
    "pipedrive": {
        id: "pipedrive",
        title: "Pipedrive",
        description: "Sync your sales communications with Pipedrive deals. Stop switching tabs and start selling.",
        icon: Users,
        logo: "/logos/pipedrive.svg",
        color: "#222222",
        heroImage: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Activity Logging",
                description: "Every WhatsApp message is logged as an activity on the Deal.",
                icon: TableProperties
            },
            {
                title: "Contact Sync",
                description: "Keep contact details up to date in both platforms automatically.",
                icon: RefreshCw
            },
            {
                title: "Deal Automation",
                description: "Create deals automatically when a new prospect chats with you.",
                icon: BarChart
            }
        ],
        benefits: [
            "Cleaner CRM data",
            "Full visibility into sales conversations",
            "Automated deal creation"
        ],
        steps: [
            { title: "Install", description: "Add from the Pipedrive Marketplace." },
            { title: "Configure", description: "Select the pipelines you want to sync." },
            { title: "Sync", description: "Watch your activities populate automatically." }
        ]
    },
    "google-sheets": {
        id: "google-sheets",
        title: "Google Sheets",
        description: "The simplest way to manage broadcast lists and collect data. Send messages directly from a spreadsheet.",
        icon: TableProperties,
        // No local logo for sheets found, will rely on Icon fallback or generic table icon
        color: "#0F9D58",
        heroImage: "https://images.unsplash.com/photo-1543286386-713df548e9cc?auto=format&fit=crop&q=80&w=2000",
        features: [
            {
                title: "Sheet to WhatsApp",
                description: "Send personalized broadcasts to a list of numbers in a column.",
                icon: Megaphone
            },
            {
                title: "WhatsApp to Sheet",
                description: "Save incoming replies or form data directly into a new row.",
                icon: TableProperties
            },
            {
                title: "Bulk Operations",
                description: "Manage thousands of contacts with the familiarity of a spreadsheet.",
                icon: Users
            }
        ],
        benefits: [
            "No CRM required",
            "Easy to use for anyone",
            "Powerful batch processing"
        ],
        steps: [
            { title: "Connect", description: "Authorize access to your Google Drive." },
            { title: "Select Sheet", description: "Choose the file you want to use." },
            { title: "Map Columns", description: "Tell us which column contains the phone number." }
        ]
    }
};
