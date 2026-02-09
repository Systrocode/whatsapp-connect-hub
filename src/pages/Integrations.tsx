import { motion } from "framer-motion";
import { 
  Sheet, 
  MessageCircle, 
  Link2, 
  ShoppingBag, 
  Zap,
  Check,
  ExternalLink,
  Settings2
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "connected" | "available" | "coming_soon";
  category: string;
  configPath?: string;
  externalUrl?: string;
}

const integrations: Integration[] = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Import contacts from Google Sheets spreadsheets",
    icon: Sheet,
    status: "connected",
    category: "Data Import",
    configPath: "/dashboard/contacts",
  },
  {
    id: "whatsapp-widget",
    name: "WhatsApp Chat Widget",
    description: "Add a floating WhatsApp button to your website",
    icon: MessageCircle,
    status: "available",
    category: "Website",
    configPath: "/dashboard/tools",
  },
  {
    id: "whatsapp-link",
    name: "WhatsApp Link Generator",
    description: "Create click-to-chat links with pre-filled messages",
    icon: Link2,
    status: "available",
    category: "Marketing",
    configPath: "/dashboard/tools",
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    description: "Create and manage Click-to-WhatsApp ad campaigns",
    icon: Zap,
    status: "connected",
    category: "Advertising",
    configPath: "/dashboard/campaigns",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Sync products and orders from your Shopify store",
    icon: ShoppingBag,
    status: "coming_soon",
    category: "E-commerce",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    description: "Connect your WooCommerce store for order notifications",
    icon: ShoppingBag,
    status: "coming_soon",
    category: "E-commerce",
  },
];

const statusBadges = {
  connected: { label: "Connected", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  available: { label: "Available", className: "bg-primary/10 text-primary border-primary/20" },
  coming_soon: { label: "Coming Soon", className: "bg-muted text-muted-foreground border-border" },
};

const Integrations = () => {
  const categories = [...new Set(integrations.map((i) => i.category))];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your favorite tools and services
          </p>
        </div>

        {/* Integration Cards by Category */}
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations
                .filter((i) => i.category === category)
                .map((integration, index) => {
                  const Icon = integration.icon;
                  const badge = statusBadges[integration.status];

                  return (
                    <motion.div
                      key={integration.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <Badge variant="outline" className={badge.className}>
                              {badge.label}
                            </Badge>
                          </div>
                          <CardTitle className="mt-3">{integration.name}</CardTitle>
                          <CardDescription>{integration.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {integration.status === "connected" && (
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={integration.configPath}>
                                  <Settings2 className="w-4 h-4 mr-1" />
                                  Configure
                                </a>
                              </Button>
                              <div className="flex items-center gap-1 text-sm text-emerald-500">
                                <Check className="w-4 h-4" />
                                Active
                              </div>
                            </div>
                          )}
                          {integration.status === "available" && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={integration.configPath}>
                                Connect
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </Button>
                          )}
                          {integration.status === "coming_soon" && (
                            <Button variant="outline" size="sm" disabled>
                              Coming Soon
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
