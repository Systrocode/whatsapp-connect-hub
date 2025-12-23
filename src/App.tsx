import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/Conversations";
import ConversationDetail from "./pages/ConversationDetail";
import Contacts from "./pages/Contacts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Broadcasts from "./pages/Broadcasts";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Integrations from "./pages/Integrations";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Lazy load admin pages to exclude from non-admin bundles
// This prevents admin UI components from being loaded for regular users
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminTemplates = lazy(() => import("./pages/AdminTemplates"));
const AdminSubscriptions = lazy(() => import("./pages/AdminSubscriptions"));

// Loading fallback for lazy-loaded admin components
const AdminLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground">Loading admin panel...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
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
            {/* Admin Routes - Lazy loaded for code-splitting */}
            <Route path="/dashboard/admin" element={
              <AdminRoute>
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </AdminRoute>
            } />
            <Route path="/dashboard/admin/users" element={
              <AdminRoute>
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminUsers />
                </Suspense>
              </AdminRoute>
            } />
            <Route path="/dashboard/admin/templates" element={
              <AdminRoute>
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminTemplates />
                </Suspense>
              </AdminRoute>
            } />
            <Route path="/dashboard/admin/subscriptions" element={
              <AdminRoute>
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminSubscriptions />
                </Suspense>
              </AdminRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
