import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Building2, Bell, Smartphone, Save, ExternalLink, Key, CheckCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useProfile } from '@/hooks/useProfile';
import { useWhatsAppAPI } from '@/hooks/useWhatsAppAPI';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  const { user } = useAuth();
  const { profile, whatsappSettings, isLoading, updateProfile, updateWhatsAppSettings } = useProfile();
  const { connectionStatus, isCheckingConnection, saveAccessToken } = useWhatsAppAPI();
  
  const [businessName, setBusinessName] = useState(profile?.business_name || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number || '');
  const [waPhoneNumberId, setWaPhoneNumberId] = useState(whatsappSettings?.phone_number_id || '');
  const [waBusinessAccountId, setWaBusinessAccountId] = useState(whatsappSettings?.business_account_id || '');
  const [webhookToken, setWebhookToken] = useState(whatsappSettings?.webhook_verify_token || '');
  const [accessToken, setAccessToken] = useState('');

  // Update local state when profile loads
  useState(() => {
    if (profile) {
      setBusinessName(profile.business_name || '');
      setPhoneNumber(profile.phone_number || '');
    }
    if (whatsappSettings) {
      setWaPhoneNumberId(whatsappSettings.phone_number_id || '');
      setWaBusinessAccountId(whatsappSettings.business_account_id || '');
      setWebhookToken(whatsappSettings.webhook_verify_token || '');
    }
  });

  const handleSaveProfile = async () => {
    await updateProfile.mutateAsync({
      business_name: businessName,
      phone_number: phoneNumber,
    });
  };

  const handleSaveWhatsAppSettings = async () => {
    await updateWhatsAppSettings.mutateAsync({
      phone_number_id: waPhoneNumberId,
      business_account_id: waBusinessAccountId,
      webhook_verify_token: webhookToken,
    });
  };

  const handleSaveAccessToken = async () => {
    if (!accessToken.trim()) return;
    await saveAccessToken.mutateAsync(accessToken);
    setAccessToken(''); // Clear the input after saving
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your account and WhatsApp Business settings</p>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>Update your business profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ''} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="businessName"
                        placeholder="Your Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+1 234 567 8900"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    variant="whatsapp"
                    disabled={updateProfile.isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {updateProfile.isPending ? 'Saving...' : 'Save Profile'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* WhatsApp Business API Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                WhatsApp Business API
                {!isCheckingConnection && (
                  connectionStatus?.connected && connectionStatus?.has_token ? (
                    <Badge variant="default" className="ml-2 bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-2">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Not Connected
                    </Badge>
                  )
                )}
              </CardTitle>
              <CardDescription>
                Connect your WhatsApp Business API credentials for live messaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <h4 className="font-medium text-foreground mb-2">Setup Guide</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  To enable real WhatsApp messaging, you'll need to set up a Meta Business account
                  and obtain your API credentials.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://developers.facebook.com/docs/whatsapp/cloud-api/get-started"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Setup Guide
                  </a>
                </Button>
              </div>

              <Separator />

              {/* Access Token - Stored securely server-side */}
              <div className="space-y-2">
                <Label htmlFor="accessToken" className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Access Token
                  {connectionStatus?.has_token && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Saved
                    </Badge>
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="accessToken"
                    type="password"
                    placeholder={connectionStatus?.has_token ? "••••••••••••••••" : "Enter your access token"}
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                  />
                  <Button
                    onClick={handleSaveAccessToken}
                    variant="outline"
                    disabled={saveAccessToken.isPending || !accessToken.trim()}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveAccessToken.isPending ? 'Saving...' : 'Save'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your access token is stored securely server-side and never exposed to the browser
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="waPhoneId">Phone Number ID</Label>
                <Input
                  id="waPhoneId"
                  placeholder="Enter your Phone Number ID"
                  value={waPhoneNumberId}
                  onChange={(e) => setWaPhoneNumberId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waBusinessId">Business Account ID</Label>
                <Input
                  id="waBusinessId"
                  placeholder="Enter your Business Account ID"
                  value={waBusinessAccountId}
                  onChange={(e) => setWaBusinessAccountId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookToken">Webhook Verify Token</Label>
                <Input
                  id="webhookToken"
                  placeholder="Create a custom verify token"
                  value={webhookToken}
                  onChange={(e) => setWebhookToken(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This token is used to verify incoming webhook requests from Meta
                </p>
              </div>
              <Button
                onClick={handleSaveWhatsAppSettings}
                variant="whatsapp"
                disabled={updateWhatsAppSettings.isPending}
              >
                <Save className="w-4 h-4 mr-2" />
                {updateWhatsAppSettings.isPending ? 'Saving...' : 'Save WhatsApp Settings'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">New message alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive new messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email summaries of your conversations
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Sound alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Play a sound when new messages arrive
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;