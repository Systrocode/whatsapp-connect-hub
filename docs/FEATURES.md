# Features & Module Logic

This document outlines the key functional modules of the Avelo application and their corresponding code locations.

## 1. Dashboard & Analytics
**Location**: `src/pages/Dashboard.tsx`, `src/pages/Analytics.tsx`, `src/pages/AdminDashboard.tsx`
- **Overview**: Provides a high-level view of account activity for users and sweeping metrics for admins.
- **Key Files**:
  - `src/components/dashboard/*`: Widgets for stats, recent chats, and status.
  - `src/hooks/useAdminStats.ts`: Fetches platform-wide data for the administration layer.

## 2. Conversation Hub (Inbox)
**Location**: `src/pages/Conversations.tsx`, `src/pages/ConversationDetail.tsx`
- **Functionality**: Unified inbox for real-time messaging using Supabase real-time subscriptions.
- **Key Features**:
  - **Quick Replies**: Shortcut triggered (`/`) menu to send pre-defined answers instantly.
  - **Right Sidebar**: Contact details and CRM attributes (Tags, Notes).
- **Data Source**: Tables `conversations`, `messages`, `contacts`.

## 3. Contact Management (CRM)
**Location**: `src/pages/Contacts.tsx`, `src/pages/Segments.tsx`
- **Functionality**: Full featured customer database.
- **Capabilities**:
  - Filtering and Search.
  - Smart Segments: Create dynamic contact lists based on behavior and tags (`FEATURES_POC.md` legacy).
  - Bulk actions (Import/Export CSV).

## 4. Automation & Tools
- **Templates**: `src/pages/Templates.tsx`. Create and manage WhatsApp Templates.
- **Campaigns**: `src/pages/Campaigns.tsx`. Logic for bulk broadcasting messages to contact lists.
- **Flow Builder**: `src/pages/FlowBuilder.tsx`. Visual drag-and-drop tool for creating auto-response trees.
- **Ads Manager**: `src/pages/AdsManager.tsx`. Native integration with Facebook SDK to bind Pages and Ad Accounts for "Click to WhatsApp" ad campaigns.

## 5. Affiliate System
**Location**: `src/pages/AffiliateProgram.tsx`, `src/pages/AffiliatePage.tsx`, `src/pages/affiliates/*`
- **Overview**: Multi-tiered partner tracking system with automated signup.
- **Key Modules**:
  - Affiliate Dashboard (`AffiliateDashboard.tsx`): Real-time tracking of signups, conversions, and current balance.
  - Commission payouts system including tracking of various payout methods (UPI, Bank details) via the `affiliates` and `affiliate_commissions` database tables.

## 6. Administration & Settings
- **Settings**: `src/pages/Settings.tsx`. Handles compliance flags, business profile, and Meta token connections.
- **Subscriptions / Billing**: `src/pages/BillingPage.tsx`. Handles payment tiers via backend gateways.
- **User / Support**: Handles internal user queries and Quote Requests.

## 7. Public Website & Integrations
The application utilizes a single unified repository for its robust marketing presence.
- **Landing Core**: `src/pages/Index.tsx`
- **Solution Verticals**: `src/pages/EcommercePage.tsx`, `src/pages/EducationPage.tsx`, `src/pages/MobileAppPage.tsx`.
- **General Marketing**: `src/pages/FeaturePage.tsx`, `src/pages/Pricing.tsx`, `src/pages/ReviewsPage.tsx`.
- **Integrations Directory**: `src/pages/Integrations.tsx` and dynamic individual detail views `src/pages/IntegrationPage.tsx`. Fully driven by the structured schema in `src/data/integrations-data.ts`.
- **UI Architecture**: Deeply integrated with Framer Motion for scroll animations and fully customized using Icons8 library components mapped via `src/icons8-proxy.tsx`.
