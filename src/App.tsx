import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Lazy load all pages for performance optimization
const Index = lazy(() => import("./pages/Index"));
const Pricing = lazy(() => import("./pages/Pricing"));
const FeaturePage = lazy(() => import("./pages/FeaturePage"));
const Auth = lazy(() => import("./pages/Auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Conversations = lazy(() => import("./pages/Conversations"));
const ConversationDetail = lazy(() => import("./pages/ConversationDetail"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
const Broadcasts = lazy(() => import("./pages/Broadcasts"));
const Campaigns = lazy(() => import("./pages/Campaigns"));
const CampaignDetail = lazy(() => import("./pages/CampaignDetail"));
const Integrations = lazy(() => import("./pages/Integrations"));
const Tools = lazy(() => import("./pages/Tools"));
const WhatsAppLink = lazy(() => import("./pages/WhatsAppLink"));
const WebsiteWidget = lazy(() => import("./pages/WebsiteWidget"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PartnerPage = lazy(() => import("./pages/PartnerPage"));
const AffiliatePage = lazy(() => import("./pages/AffiliatePage"));
const ClientStoriesPage = lazy(() => import("./pages/ClientStoriesPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const MarketingPage = lazy(() => import("./pages/MarketingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TermsAndPrivacy = lazy(() => import("./pages/TermsAndPrivacy"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const SalesPage = lazy(() => import("./pages/SalesPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const EcommercePage = lazy(() => import("./pages/EcommercePage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));


// Lazy load admin pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminTemplates = lazy(() => import("./pages/AdminTemplates"));
const AdminSubscriptions = lazy(() => import("./pages/AdminSubscriptions"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));

// Global loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="whatsapp-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/features/:slug" element={<FeaturePage />} />
                <Route path="/integrations/:slug" element={<FeaturePage />} />
                <Route path="/product/:slug" element={<FeaturePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard/conversations" element={<ProtectedRoute><Conversations /></ProtectedRoute>} />
                <Route path="/dashboard/conversations/:id" element={<ProtectedRoute><ConversationDetail /></ProtectedRoute>} />
                <Route path="/dashboard/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
                <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/dashboard/broadcasts" element={<ProtectedRoute><Broadcasts /></ProtectedRoute>} />
                <Route path="/dashboard/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
                <Route path="/dashboard/campaigns/:id" element={<ProtectedRoute><CampaignDetail /></ProtectedRoute>} />
                <Route path="/dashboard/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
                <Route path="/dashboard/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
                <Route path="/dashboard/whatsapp-link" element={<ProtectedRoute><WhatsAppLink /></ProtectedRoute>} />
                <Route path="/dashboard/website-widget" element={<ProtectedRoute><WebsiteWidget /></ProtectedRoute>} />
                {/* Admin Routes */}
                <Route path="/dashboard/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/dashboard/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                <Route path="/dashboard/admin/templates" element={<AdminRoute><AdminTemplates /></AdminRoute>} />
                <Route path="/dashboard/admin/subscriptions" element={<AdminRoute><AdminSubscriptions /></AdminRoute>} />
                <Route path="/dashboard/admin/blog" element={<AdminRoute><AdminBlog /></AdminRoute>} />
                <Route path="/dashboard/admin/blog" element={<AdminRoute><AdminBlog /></AdminRoute>} />

                {/* Partner Route */}
                <Route path="/partners/become" element={<PartnerPage />} />
                <Route path="/partners/affiliate" element={<AffiliatePage />} />
                <Route path="/customers/stories" element={<ClientStoriesPage />} />
                <Route path="/customers/case-studies" element={<CaseStudiesPage />} />
                <Route path="/customers/reviews" element={<ReviewsPage />} />
                <Route path="/solutions/marketing" element={<MarketingPage />} />
                <Route path="/solutions/support" element={<SupportPage />} />
                <Route path="/solutions/sales" element={<SalesPage />} />
                <Route path="/solutions/education" element={<EducationPage />} />
                <Route path="/solutions/ecommerce" element={<EcommercePage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms-privacy" element={<TermsAndPrivacy />} />



                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <VercelAnalytics />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
