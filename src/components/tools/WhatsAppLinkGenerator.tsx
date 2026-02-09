import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Copy, Check, ExternalLink, QrCode, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const WhatsAppLinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Clean phone number (remove spaces, dashes, etc.)
  const cleanPhoneNumber = phoneNumber.replace(/[\s\-\(\)]+/g, '').replace(/^\+/, '');

  // Generate wa.me link
  const waLink = cleanPhoneNumber
    ? `https://wa.me/${cleanPhoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`
    : '';

  // Generate QR code URL using a free QR code API
  const qrCodeUrl = waLink
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(waLink)}`
    : '';

  const handleCopy = async () => {
    if (!waLink) {
      toast.error('Enter a phone number first');
      return;
    }
    await navigator.clipboard.writeText(waLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `whatsapp-qr-${cleanPhoneNumber}.png`;
    link.click();
    toast.success('QR code downloaded!');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" />
            Create WhatsApp Link
          </CardTitle>
          <CardDescription>
            Generate click-to-chat links with pre-filled messages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Include country code (e.g., +91 for India, +1 for US)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Pre-filled Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Hi! I'm interested in your services..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              This message will be pre-filled when someone clicks the link
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            Your WhatsApp Link
          </CardTitle>
          <CardDescription>
            Use this link on your website, social media, or marketing materials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Generated Link */}
          <div className="space-y-2">
            <Label>Generated Link</Label>
            <div className="flex gap-2">
              <Input
                value={waLink}
                readOnly
                placeholder="Enter a phone number to generate link"
                className="font-mono text-sm"
              />
              <Button
                onClick={handleCopy}
                variant="outline"
                size="icon"
                disabled={!waLink}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                disabled={!waLink}
              >
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* QR Code */}
          {waLink && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <Label>QR Code</Label>
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white border border-border">
                <img
                  src={qrCodeUrl}
                  alt="WhatsApp QR Code"
                  className="w-48 h-48"
                />
                <Button
                  onClick={handleDownloadQR}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            </motion.div>
          )}

          {/* Tips */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h4 className="font-medium text-foreground mb-2 text-sm">Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Share the link on social media bio, email signatures</li>
              <li>• Print the QR code on business cards or flyers</li>
              <li>• Use in marketing campaigns for direct customer contact</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppLinkGenerator;
