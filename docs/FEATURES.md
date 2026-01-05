# Features & Module Logic

This document outlines the key functional modules of the application and their corresponding code locations.

## 1. Dashboard & Analytics
**Location**: `src/pages/Dashboard.tsx`, `src/pages/Analytics.tsx`
- **Overview**: Provides a high-level view of account activity.
- **Key Files**:
  - `src/components/dashboard/*`: Widgets for stats, recent chats, and status.
  - `src/stats/*`: Logic for calculating metrics (implied usage).

## 2. Conversation Hub (Inbox)
**Location**: `src/pages/Conversations.tsx`, `src/pages/ConversationDetail.tsx`
- **Functionality**: Unified inbox for real-time messaging.
- **Key Features**:
  - **List View**: Displays active conversations, searchable by contact name.
  - **Detail View**: Chat interface (bubble layout), media handling, templated responses.
  - **Right Sidebar**: Contact details and CRM attributes (Tags, Notes).
- **Data Source**: Tables `conversations`, `messages`, `contacts`.

## 3. Contact Management (CRM)
**Location**: `src/pages/Contacts.tsx`
- **Functionality**: manage the database of customers/leads.
- **Capabilities**:
  - Filtering and Searching.
  - Bulk actions (Import/Export CSV - handled by `PapaParse`).
  - Editing contact attributes.

## 4. Automation & Tools
- **Templates**: `src/pages/Templates.tsx`. Create and manage WhatsApp Templates ( HSMs). Syncs with Meta via `create-template` function.
- **Campaigns**: `src/pages/Campaigns.tsx`. Logic for bulk broadcasting messages to contact lists.
- **Flow Builder**: `src/pages/FlowBuilder.tsx`. Visual tool for creating auto-response flows.
- **Widgets**: `src/pages/WebsiteWidget.tsx`, `src/tools/WhatsAppLink.tsx`. Growth tools generators.

## 5. Administration
- **Settings**: `src/pages/Settings.tsx`. Configures profile, notifications, and integration status.
- **Billing**: `src/pages/AdminSubscriptions.tsx`. Manages subscription plans (likely Stripe integration patterns).
- **User Management**: `src/pages/AdminUsers.tsx`. Role-based access control views.

## 6. Public Website (Landing)
The application handles both the SaaS dashboard and the marketing site in one repo.
- **Home**: `src/pages/Index.tsx`
- **Solutions Pages**: `src/pages/MarketingPage.tsx`, `src/pages/SalesPage.tsx`, etc.
- **Components**: `src/components/landing/*`.
