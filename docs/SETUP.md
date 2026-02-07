# Setup & Installation Guide

## Prerequisites
- **Node.js**: v18 or higher (LTS recommended).
- **npm** or **bun**: Package manager.
- **Git**: Version control.
- **Supabase Account**: For backend services.
- **Meta Business Account**: For WhatsApp Business API access.

## Local Development Setup

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd whatsapp-connect-hub
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory. You can duplicate `.env.example` if it exists.
    ```env
    # Required for Client
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_public_anon_key

    # Required for Edge Functions Development (if using Supabase CLI locally)
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    ```

4.  **Supabase Setup**
    - Create a new project on Supabase.
    - Run the SQL migrations found in `supabase/migrations` (using Supabase SQL Editor or CLI).
    - Ensure 'Storage' buckets are created if file upload features (like media templates) are needed.

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will happen at `http://localhost:8080` (or similar port).

## Deployment

### Frontend (Vercel/Netlify)
1.  Connect your repository.
2.  Set `Build Command` to `npm run build`.
3.  Set `Output Directory` to `dist`.
4.  Add the Environment Variables defined above to the deployment platform.

### Backend (Supabase)
1.  Deploy database changes using migrations.
2.  Deploy Edge Functions:
    ```bash
    supabase functions deploy ads-connect
    supabase functions deploy create-template
    supabase functions deploy whatsapp-api
    # ... deploy others as needed
    ```
3.  Set Secrets for Functions:
    ```bash
    supabase secrets set META_APP_ID=... META_APP_SECRET=... --env-file .env
    ```
