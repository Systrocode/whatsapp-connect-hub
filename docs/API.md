# Edge Functions API Reference

This application uses Supabase Edge Functions (built on Deno) to handle server-side logic, primarily integrating with the Meta (Facebook/WhatsApp) Graph API.

## Core Functions

### 1. `whatsapp-api`
**Purpose**: The central hub for WhatsApp connectivity. It acts as the Webhook receiver for Meta.
- **Endpoint**: `/functions/v1/whatsapp-api`
- **Method**: `POST` (Webhooks), `GET` (Validation)
- **Capabilities**:
  - **Webhook validation**: Verifies the `hub.verify_token` from Meta.
  - **Incoming Message Processing**: Receives messages -> Finds/Creates Contact -> Saves Message to DB.
  - **Status Updates**: Updates message status (Sent, Delivered, Read) in the DB.
  - **Outbound Sending**: Handles sending messages via API (Text, Templates, Media).
  - **Profile Management**: Profile picture updates, Business Profile sync.

### 2. `whatsapp-onboard`
**Purpose**: Handles the OAuth "Embedded Signup" flow for connecting a user's WhatsApp Business Account (WABA) to the platform.
- **Input**:
  - `code`: The OAuth code returned by the Facebook Login SDK.
  - `waba_id`: The ID of the business account.
  - `phone_id`: The ID of the selected phone number.
- **Process**: Exchanges the temporary code for a permanent System User Token and securely stores credentials in `whatsapp_settings` table.

### 3. `create-template`
**Purpose**: programmatic creation of WhatsApp Message Templates.
- **Input**: `{ name, category, content, headerType, language }`
- **Process**:
  1. Validates input.
  2. Calls Meta Graph API endpoint for template creation.
  3. Records the template in the local database.

### 4. `ads-connect`
**Purpose**: Connects a user's Facebook Ads manager to the dashboard for analytics or "Click to WhatsApp" ad management.
- **Input**: OAuth Code.
- **Process**: Exchanges token and fetches available Ad Accounts.

### 5. `google-sheets`
**Purpose**: Integration for syncing contacts or leads (implied).

## Configuration
All functions require the following environment secrets set in Supabase:
- `SUPABASE_URL`: Auto-injected in Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: Auto-injected in Supabase.
- `META_APP_ID`: Your Meta App ID.
- `META_APP_SECRET`: Your Meta App Secret.
- `WHATSAPP_VERIFY_TOKEN`: A custom string used to verify the webhook connection in the Meta App Dashboard.
