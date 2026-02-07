import { motion } from 'framer-motion';
import { Link2, MessageCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WhatsAppLinkGenerator from '@/components/tools/WhatsAppLinkGenerator';
import WhatsAppWidgetConfig from '@/components/tools/WhatsAppWidgetConfig';

const Tools = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">WhatsApp Tools</h1>
          <p className="text-muted-foreground">
            Free tools to grow your WhatsApp presence
          </p>
        </motion.div>

        {/* Tools Tabs */}
        <Tabs defaultValue="link-generator">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="link-generator" className="gap-2">
              <Link2 className="w-4 h-4" />
              Link Generator
            </TabsTrigger>
            <TabsTrigger value="chat-widget" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat Widget
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link-generator" className="mt-6">
            <WhatsAppLinkGenerator />
          </TabsContent>

          <TabsContent value="chat-widget" className="mt-6">
            <WhatsAppWidgetConfig />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Tools;
