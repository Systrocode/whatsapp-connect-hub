# SmartConnect Features: Proof of Concept (POC) & Documentation

## 1. Feature Overview
We have successfully implemented two core features to enhance user engagement and support efficiency:
1.  **Smart Segments (Retargeting)**: Create dynamic contact lists based on behavior and tags.
2.  **Quick Replies (Productivity)**: Rapidly answer common queries using keyboard shortcuts.

---

## 2. Smart Segments
**Objective**: Allow businesses to target specific subsets of their audience (e.g., "Inactive Users", "VIP Customers") for broadcast campaigns.

### 2.1 Functionality
- **Dynamic Filtering**:
    - **Tags**: Filter contacts that have specific tags (e.g., must have "Lead").
    - **Account Age**: Target users who joined $> X$ days ago (useful for re-engagement).
- **Live Preview**: Real-time count of how many contacts match the criteria before saving.
- **Persistence**: Segments are saved to the database and can be reused in future campaigns.

### 2.2 POC Validation Steps
1.  **Navigate to Segments**: Go to `/dashboard/segments`.
2.  **Create Segment**:
    - Click "Create Segment".
    - Name: `Old Leads`.
    - Criteria: "Leads older than **30** days".
    - Observe the "Matching Contacts" count update dynamically.
    - Click "Save".
3.  **Verify Storage**: The card `Old Leads` appears on the dashboard with the correct criteria displayed.
4.  **Verify Usage**: Go to **Broadcasts** -> **New Campaign**. In the audience dropdown, select `Old Leads`. The recipient list automatically filters to match that segment.

### 2.3 Technical Implementation
- **Database**:
    - Table: `segments`
    - Columns: `id, user_id, name, criteria (JSONB), created_at`
    - Security: RLS enabled (users only access their own segments).
- **Frontend**:
    - Hook: `useSegments` (Handles CRUD with React Query).
    - Logic: Client-side filtering mechanism in `Broadcasts.tsx` via `useMemo`.

---

## 3. Quick Replies (Canned Responses)
**Objective**: Reduce response time for frequently asked questions.

### 3.1 Functionality
- **Shortcut Trigger**: Typing `/` in the chat input instantly opens a popover menu.
- **Fuzzy Search**: Typing `/pri` will filter for "Pricing" or "Private" related replies.
- **Keyboard Navigation**: Use `TAB` to auto-complete the first match or click to select.
- **Management**: Users can Add/Delete replies via a managed interface in the chat header.

### 3.2 POC Validation Steps
1.  **Navigate to Chat**: Open any conversation in `/dashboard/conversations`.
2.  **Create Reply**:
    - Click the "Zap" (⚡) icon in the header.
    - Add New: Shortcut `hi`, Content `Hello! How can I help you today?`.
3.  **Use Reply**:
    - In the message input, type `/`.
    - You will see the list. Type `h`.
    - Press `TAB` or Click the item.
    - The input is populated with "Hello! How can I help you today?".

### 3.3 Technical Implementation
- **Database**:
    - Table: `canned_responses`
    - Constraint: Unique composite key `(user_id, shortcut)` to prevent duplicates.
- **Frontend**:
    - Component: `QuickReplyManager` for CRUD.
    - Interaction: `onKeyDown` and `onChange` listeners in `ConversationDetail.tsx` detect the trigger character `/`.

---

## 4. Integration Logic
These features are not isolated; they integrate into the core workflows:

| Feature | Integration Point | Benefit |
| :--- | :--- | :--- |
| **Segments** | **Broadcasts Page** | Allows "One-Click" targeting of complex audiences instead of manual selection. |
| **Quick Replies** | **Conversation Detail** | integrated directly into the `Textarea` for seamless agent capability. |

## 5. Future Roadmap
- **Signup Date Range**: precise date picking for segments (e.g., "Joined Last Month").
- **Message Variables**: Add `{name}` support to Quick Replies.
- **Last Active Timestamp**: Update contact model to track precise `last_seen`.
