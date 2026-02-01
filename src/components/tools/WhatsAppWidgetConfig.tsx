import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Copy, Check, Settings2, Eye, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const WhatsAppWidgetConfig = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Hello! How can we help you?');
  const [ctaText, setCtaText] = useState('Chat with us');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [theme, setTheme] = useState<'green' | 'dark'>('green');
  const [copied, setCopied] = useState(false);

  const cleanPhoneNumber = phoneNumber.replace(/[\s\-\(\)]+/g, '').replace(/^\+/, '');

  // Generate widget code
  const widgetCode = `<!-- WhatsApp Chat Widget -->
<style>
  .wa-widget-btn {
    position: fixed;
    ${position === 'bottom-right' ? 'right: 20px;' : 'left: 20px;'}
    bottom: 20px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 50px;
    background: ${theme === 'green' ? '#25D366' : '#1f2937'};
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }
  .wa-widget-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  }
  .wa-widget-btn svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
  @media (max-width: 640px) {
    .wa-widget-btn span { display: none; }
    .wa-widget-btn { padding: 14px; border-radius: 50%; }
  }
</style>
<a class="wa-widget-btn" href="https://wa.me/${cleanPhoneNumber}${welcomeMessage ? `?text=${encodeURIComponent(welcomeMessage)}` : ''}" target="_blank" rel="noopener noreferrer">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  <span>${ctaText}</span>
</a>`;

  const handleCopy = async () => {
    if (!cleanPhoneNumber) {
      toast.error('Enter a phone number first');
      return;
    }
    await navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    toast.success('Widget code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            Configure Widget
          </CardTitle>
          <CardDescription>
            Customize your floating WhatsApp chat button
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="widgetPhone">WhatsApp Number</Label>
            <Input
              id="widgetPhone"
              placeholder="+91 98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcomeMsg">Welcome Message</Label>
            <Textarea
              id="welcomeMsg"
              placeholder="Hello! How can we help you?"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta">Button Text</Label>
            <Input
              id="cta"
              placeholder="Chat with us"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Position</Label>
              <Select value={position} onValueChange={(v) => setPosition(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">WhatsApp Green</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview & Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Widget Code
          </CardTitle>
          <CardDescription>
            Copy and paste this code before the closing &lt;/body&gt; tag
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="preview">
            <TabsList className="w-full">
              <TabsTrigger value="preview" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1">
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="relative bg-muted/50 rounded-xl p-8 min-h-[200px] border border-border overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Your website preview
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute ${position === 'bottom-right' ? 'right-4' : 'left-4'} bottom-4`}
                >
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-full text-white font-medium text-sm shadow-lg cursor-pointer hover:scale-105 transition-transform ${
                      theme === 'green' ? 'bg-[#25D366]' : 'bg-gray-800'
                    }`}
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>{ctaText}</span>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-4">
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-x-auto max-h-[250px]">
                  <code>{widgetCode}</code>
                </pre>
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="absolute top-2 right-2"
                  disabled={!cleanPhoneNumber}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Installation Guide */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h4 className="font-medium text-foreground mb-2 text-sm">Installation</h4>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Copy the widget code above</li>
              <li>Open your website's HTML file</li>
              <li>Paste the code before the closing &lt;/body&gt; tag</li>
              <li>Save and refresh your website</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppWidgetConfig;
