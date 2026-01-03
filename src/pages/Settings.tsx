import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Building2, Bell, Smartphone, Save, ExternalLink, Key, CheckCircle, AlertCircle, Globe, Mail, MapPin, Image as ImageIcon } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useProfile } from '@/hooks/useProfile';
import { useWhatsAppAPI } from '@/hooks/useWhatsAppAPI';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

const Settings = () => {
  const { user } = useAuth();
  const { profile, whatsappSettings, isLoading, updateProfile, updateWhatsAppSettings } = useProfile();
  const { connectionStatus, isCheckingConnection, saveAccessToken, businessProfile, isLoadingProfile, updateBusinessProfile, uploadProfilePhoto } = useWhatsAppAPI();

  const [businessName, setBusinessName] = useState(profile?.business_name || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number || '');
  const [waPhoneNumberId, setWaPhoneNumberId] = useState(whatsappSettings?.phone_number_id || '');
  const [waBusinessAccountId, setWaBusinessAccountId] = useState(whatsappSettings?.business_account_id || '');
  const [webhookToken, setWebhookToken] = useState(whatsappSettings?.webhook_verify_token || '');
  const [accessToken, setAccessToken] = useState('');

  // Business Profile State
  const [waProfile, setWaProfile] = useState({
    description: '',
    address: '',
    email: '',
    website: '',
    profile_picture_url: ''
  });

  // Update local state when profile loads
  useEffect(() => {
    if (profile) {
      setBusinessName(profile.business_name || '');
      setPhoneNumber(profile.phone_number || '');
    }
    if (whatsappSettings) {
      setWaPhoneNumberId(whatsappSettings.phone_number_id || '');
      setWaBusinessAccountId(whatsappSettings.business_account_id || '');
      setWebhookToken(whatsappSettings.webhook_verify_token || '');
    }
  }, [profile, whatsappSettings]);

  // Update business profile state when fetched
  useEffect(() => {
    if (businessProfile) {
      setWaProfile({
        description: businessProfile.description || '',
        address: businessProfile.address || '',
        email: businessProfile.email || '',
        website: businessProfile.websites?.[0] || '', // Meta returns array
        profile_picture_url: businessProfile.profile_picture_url || ''
      });
    }
  }, [businessProfile]);

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
    setAccessToken('');
  };

  const handleUpdateBusinessProfile = async () => {
    await updateBusinessProfile.mutateAsync({
      description: waProfile.description,
      address: waProfile.address,
      email: waProfile.email,
      websites: waProfile.website ? [waProfile.website] : []
    });
  };

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    try {
      await uploadProfilePhoto.mutateAsync(file);
    } catch (error) {
      console.error(error);
      // Toast handled in hook
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your account and WhatsApp Business settings</p>
        </motion.div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">Account & API</TabsTrigger>
            <TabsTrigger value="whatsapp_profile">WhatsApp Public Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Profile
                </CardTitle>
                <CardDescription>Update your internal business profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user?.email || ''} disabled className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Button onClick={handleSaveProfile} disabled={updateProfile.isPending}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Account Details
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* API Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  WhatsApp API Configuration
                  {!isCheckingConnection && (
                    connectionStatus?.connected && connectionStatus?.has_token ? (
                      <Badge variant="default" className="ml-2 bg-green-500">Connected</Badge>
                    ) : (
                      <Badge variant="secondary" className="ml-2">Not Connected</Badge>
                    )
                  )}
                </CardTitle>
                <CardDescription>Connect your Meta Business Account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accessToken" className="flex items-center gap-2">
                    <Key className="w-4 h-4" /> Access Token (System User)
                    {connectionStatus?.has_token && <CheckCircle className="w-3 h-3 text-green-500" />}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="accessToken"
                      type="password"
                      placeholder={connectionStatus?.has_token ? "••••••••••••••••" : "Enter permanent access token"}
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                    />
                    <Button onClick={handleSaveAccessToken} variant="outline" disabled={saveAccessToken.isPending || !accessToken.trim()}>
                      Save
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Phone Number ID</Label>
                    <Input value={waPhoneNumberId} onChange={(e) => setWaPhoneNumberId(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>WABA ID (Business Account ID)</Label>
                    <Input value={waBusinessAccountId} onChange={(e) => setWaBusinessAccountId(e.target.value)} />
                  </div>
                </div>
                <Button onClick={handleSaveWhatsAppSettings} variant="whatsapp" disabled={updateWhatsAppSettings.isPending}>
                  <Save className="w-4 h-4 mr-2" /> Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp_profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  WhatsApp Business Profile
                </CardTitle>
                <CardDescription>
                  Edit how your business appears to customers on WhatsApp.
                  {connectionStatus?.connected ? (
                    <span className="text-green-600 ml-1">Synced with Meta</span>
                  ) : (
                    <span className="text-yellow-600 ml-1">(Connect API to edit)</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingProfile ? (
                  <div>Loading profile from WhatsApp...</div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>About / Description</Label>
                      <Textarea
                        rows={3}
                        placeholder="Tell customers about your business..."
                        value={waProfile.description}
                        onChange={(e) => setWaProfile({ ...waProfile, description: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Max 256 characters.</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</Label>
                        <Input
                          placeholder="123 Main St..."
                          value={waProfile.address}
                          onChange={(e) => setWaProfile({ ...waProfile, address: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Mail className="w-4 h-4" /> Business Email</Label>
                        <Input
                          placeholder="contact@example.com"
                          value={waProfile.email}
                          onChange={(e) => setWaProfile({ ...waProfile, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Globe className="w-4 h-4" /> Website 1</Label>
                        <Input
                          placeholder="https://example.com"
                          value={waProfile.website}
                          onChange={(e) => setWaProfile({ ...waProfile, website: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Profile Picture</Label>
                        <div className="flex gap-2 items-center">
                          {waProfile.profile_picture_url && (
                            <img src={waProfile.profile_picture_url} alt="Current" className="w-10 h-10 rounded-full object-cover border" />
                          )}
                          <Input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleProfilePhotoUpload}
                            className="cursor-pointer"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Square JPG or PNG, min 640x640px.</p>
                      </div>
                    </div>

                    <Button
                      className="w-full md:w-auto"
                      onClick={handleUpdateBusinessProfile}
                      disabled={updateBusinessProfile.isPending || !connectionStatus?.connected}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {updateBusinessProfile.isPending ? 'Updating Meta...' : 'Sync to WhatsApp'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>New message alerts</Label>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label>Email notifications</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;