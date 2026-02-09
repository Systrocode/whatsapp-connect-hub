# System Architecture

## Overview
Avelo (WhatsApp Connect Hub) is a modern, full-stack web application designed to help businesses manage their WhatsApp communications. It serves as a unified inbox, marketing automation tool, and CRM client.

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite.
- **Language**: TypeScript.
- **State Management**:
  - **Server State**: TanStack Query (React Query) for caching and synchronizing with Supabase.
  - **Local State**: React Context API (e.g., AuthContext) and local component state.
- **Routing**: `react-router-dom` v6.
- **UI/UX**:
  - **Styling**: Tailwind CSS.
  - **Components**: shadcn/ui (Radix UI primitives).
  - **Icons**: Lucide React.
  - **Forms**: React Hook Form + Zod validation.

### Backend (Serverless)
- **Platform**: Supabase (BaaS).
- **Database**: PostgreSQL.
- **Authentication**: Supabase Auth (JWT).
- **Edge Functions**: Deno-based serverless functions for third-party integrations (Meta Graph API, Google Sheets).

## Project Structure

```
/
├── src/
│   ├── components/     # Specific UI components (dashboard, landing, etc.)
│   ├── contexts/       # Global state providers (Auth, Theme)
│   ├── data/           # Static data files
│   ├── hooks/          # Custom React hooks (useAuth, useSubscription)
│   ├── integrations/   # Third-party SDK configurations (Supabase client)
│   ├── lib/            # Utility libraries and helpers
│   ├── pages/          # Route-level page components
│   └── utils/          # Shared utility functions
│
├── supabase/
│   ├── functions/      # Deno edge functions (API logic)
│   └── migrations/     # SQL database schema migrations
│
└── public/             # Static assets
```

## Data Flow

1.  **Authentication**: User logs in -> Supabase Auth returns session/JWT -> Stored in local storage -> `AuthContext` updates app state.
2.  **API Requests**: Frontend uses `supabase-js` client to query PostgreSQL directly (protected by Row Level Security policies).
3.  **Third-Party Actions**: Complex actions (e.g., sending a WA message, syncing ads) trigger Supabase Edge Functions.
    - Frontend -> `supabase.functions.invoke('function-name')` -> Deno Function -> Meta API.

## Security
- **RLS (Row Level Security)**: All database access is restricted by Postgres RLS policies ensuring users can only access their own organization's data.
- **Environment Variables**: Sensitive keys (Service Role Key, Meta Access Tokens) are stored in server-side secrets, never exposed to the client.
