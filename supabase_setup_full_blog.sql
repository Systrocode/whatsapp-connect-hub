-- 1. Create the posts table if it doesn't exist
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text,
  excerpt text,
  image_url text,
  published boolean default false,
  author_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table posts enable row level security;

-- 3. Create Policies (Idempotent checks not natively supported for policies in standard SQL, so we drop if exists to be safe or just create)
-- To avoid errors if they exist, best to run these one by one or wrap in a transaction, but standard Supabase SQL editor handles this fine usually.

drop policy if exists "Public posts are viewable by everyone" on posts;
create policy "Public posts are viewable by everyone"
  on posts for select
  using ( published = true );

drop policy if exists "Admins can view all posts" on posts;
create policy "Admins can view all posts"
  on posts for select
  using ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

drop policy if exists "Admins can insert posts" on posts;
create policy "Admins can insert posts"
  on posts for insert
  with check ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

drop policy if exists "Admins can update posts" on posts;
create policy "Admins can update posts"
  on posts for update
  using ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

drop policy if exists "Admins can delete posts" on posts;
create policy "Admins can delete posts"
  on posts for delete
  using ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

-- 4. Create function to update updated_at timestamp (if not exists)
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 5. Create trigger for updated_at
drop trigger if exists handle_updated_at on posts;
create trigger handle_updated_at
  before update on posts
  for each row
  execute procedure public.handle_updated_at();

-- 6. Seed Data (Blog Posts)
-- We use ON CONFLICT DO NOTHING to avoid duplicates if run multiple times
insert into posts (title, slug, excerpt, content, image_url, published, created_at)
values 
(
  'The Ultimate Guide to WhatsApp Marketing in 2025',
  'ultimate-guide-whatsapp-marketing-2025',
  'Discover the strategies that are shaping the future of conversational commerce. From AI agents to interactive catalog flows.',
  '# The Future of WhatsApp Marketing\n\nWhatsApp marketing is evolving rapidly. As we move into 2025, the landscape is shifting from simple broadcast messages to complex, interactive, and AI-driven experiences.\n\n## 1. AI-Driven Conversations\nThe days of static chatbots are over. The new standard is LLM-powered agents that can understand context, sentiment, and intent. These intelligent agents can handle complex customer queries, recommend products based on preferences, and even process returns without human intervention.\n\n## 2. Interactive Flows\nWhatsApp Flows allow businesses to build rich, app-like experiences directly within the chat interface. Think booking appointments, configuring products, or submitting applications without ever leaving the app. This reduces friction significantly and leads to higher conversion rates compared to traditional web forms.\n\n## 3. The Rise of Click-to-WhatsApp Ads\nDirecting ad traffic to a WhatsApp conversation converts 3x better than traditional landing pages. We explore how to optimize these campaigns for maximum ROI. By initiating a conversation immediately, you build a relationship with the prospect rather than just treating them as a transaction.\n\n## 4. Hyper-Personalization at Scale\nGone are the days of "Hi friend". With data integration from your CRM, every message can be tailored to the customer''s purchase history, location, and behavior. This level of personalization drastically improves engagement and loyalty.',
  'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=2000',
  true,
  now() - interval '5 days' -- Backdate slightly
)
on conflict (slug) do nothing;

insert into posts (title, slug, excerpt, content, image_url, published, created_at)
values 
(
  'How to Automate Customer Support without Losing the Human Touch',
  'automate-customer-support-human-touch',
  'Automation doesn''t have to mean robotic. Learn how to balance AI efficiency with genuine human empathy in your support workflows.',
  '# Balancing Automation with Empathy\n\nIn the rush to automate, many businesses lose the personal connection that built their brand. But it doesn''t have to be one or the other. Here represents a strategic approach to hybrid support.\n\n## The Hybrid Model\nThe most effective support teams use AI to handle the mundane and humans to handle the complex. \n\n### Tier 1: Instant AI Resolution\nUse AI for:\n- Order status inquiries\n- Frequently asked questions (FAQs)\n- Basic troubleshooting steps\n- Account verification\n\n### Tier 2: Human Escalation\nSeamlessly hand over to a human agent when:\n- Sentiment analysis detects frustration\n- The query is complex or sensitive\n- The customer explicitly asks for a person\n\n## Making Bots Feel Human\nEven your automated messages can be warm.\n*   **Use conversational language:** Avoid stiff corporate speak.\n*   **Show empathy:** "I understand this is frustrating" goes a long way.\n*   **Be transparent:** Let users know they are speaking with a virtual assistant.\n\nBy respecting the customer''s time with instant answers and their feelings with empathetic escalation, you build a support system that scales without losing heart.',
  'https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&q=80&w=2000',
  true,
  now() - interval '7 days'
)
on conflict (slug) do nothing;

insert into posts (title, slug, excerpt, content, image_url, published, created_at)
values 
(
  'Is WhatsApp API Right for Small Businesses?',
  'whatsapp-api-for-small-business',
  'Breaking down the costs, benefits, and technical requirements of upgrading from the Business App to the Cloud API.',
  '# WhatsApp Business App vs. WhatsApp API\n\nMany small business owners run their operations on the free WhatsApp Business App. While great for starting out, it has significant limitations. When is the right time to upgrade to the API?\n\n## The Limitations of the App\n*   **Single Device (mostly):** Limited multi-device support makes team collaboration hard.\n*   **No Automation:** You can''t build custom flows or chatbots.\n*   **Broadcast Limits:** You are restricted in how many people you can message at once, and you risk getting banned for spamming.\n\n## The Power of the API\nThe WhatsApp Business API unlocks enterprise-grade features:\n1.  **Unlimited Broadcasts:** Scale your marketing campaigns to reach thousands of customers.\n2.  **Team Inbox:** Multiple agents can reply from one number.\n3.  **Green Tick Verification:** Build trust with the official business badge.\n4.  **Integration:** Connect WhatsApp to your CRM, Shopify store, or other tools.\n\n## The Verdict\nIf you are handling more than 50 messages a day or want to recover abandoned carts automatically, the investment in the API (and a platform like WA Business) pays for itself in saved time and increased revenue.',
  'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=2000',
  true,
  now() - interval '12 days'
)
on conflict (slug) do nothing;

insert into posts (title, slug, excerpt, content, image_url, published, created_at)
values 
(
  'Boosting E-commerce Sales with Abandoned Cart Recovery',
  'boost-ecommerce-sales-abandoned-cart',
  'WhatsApp has a 98% open rate. Learn how to leverage this for recovering lost sales with timely, personalized reminders.',
  '# The Abandoned Cart Problem\n\nDid you know nearly 70% of online shopping carts are abandoned? That''s billions of dollars left on the table. Email recovery works, but open rates are plummeting (often below 20%). Enter WhatsApp.\n\n## Why WhatsApp Wins\n*   **98% Open Rate:** Almost every message gets read.\n*   **Immediacy:** Messages are read within minutes, not days.\n*   **Convenience:** Customers can ask questions and complete the purchase in the same chat.\n\n## Best Practices for Recovery Messages\n1.  **Timing is Key:** Send the first reminder 1 hour after abandonment. Not too soon to be annoying, not too late to lose interest.\n2.  **Offer an Incentive:** A small discount (5-10%) can be the nudge they need.\n3.  **Include the Image:** Show them exactly what they are missing. Visuals convert.\n4.  **One-Click Checkout:** Use a button that links directly to their pre-filled checkout page.\n\nStop letting sales slip away. Switch your recovery strategy to the channel your customers actually use.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000',
  true,
  now() - interval '20 days'
)
on conflict (slug) do nothing;

insert into posts (title, slug, excerpt, content, image_url, published, created_at)
values 
(
  'Case Study: How Urban Styles Increased Revenue by 40%',
  'case-study-urban-styles',
  'A deep dive into how a fashion brand used WA Business to transform their customer engagement strategy.',
  '# From Zero to Hero: Urban Styles'' Journey\n\n**Urban Styles**, a rising streetwear brand, was struggling with low email engagement and high customer acquisition costs. They turned to WA Business to pivot their strategy to a WhatsApp-first approach.\n\n## The Strategy\nThey implemented three key automations:\n1.  **Welcome Series:** New subscribers received a lookbook and a discount code via WhatsApp instead of email.\n2.  **VIP Access:** Top customers were added to a broadcast list for early access to new drops.\n3.  **Post-Purchase Care:** Automated tracking updates and "how to style" guides sent after delivery.\n\n## The Results (in 3 Months)\n*   **40% Increase in Revenue:** Attributed directly to WhatsApp campaigns.\n*   **65% Repeat Purchase Rate:** Higher engagement led to better retention.\n*   **90% Reduction in Support Tickets:** Automated order status updates freed up the support team.\n\n"WhatsApp isn''t just a support channel for us anymore; it''s our biggest revenue driver." - Jane Doe, CMO of Urban Styles.',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000',
  true,
  now() - interval '35 days'
)
on conflict (slug) do nothing;

insert into posts (title, slug, excerpt, content, image_url, published, created_at)
values 
(
  'New Feature: WhatsApp Flows for Lead Qualification',
  'new-feature-whatsapp-flows',
  'Introducing our new drag-and-drop builder for creating complex forms within WhatsApp.',
  '# Say Goodbye to Clunky External Forms\n\nWe are thrilled to announce the launch of **Interactive Flows** support in WA Business. \n\n## What are Flows?\nFlows are a new way to capture structured data from your customers. Instead of trading 10 messages back and forth to get a name, email, and budget, you can now pop up a native form directly in the chat.\n\n## Use Cases\n*   **Lead Gen:** Qualify B2B leads by asking for company size and budget.\n*   **Appointments:** Let users pick a time slot from a calendar view.\n*   **Feedback:** Run surveys with radio buttons and text areas.\n\n## How to Get Started\nFlows are available today for all Pro and Enterprise plans. Head over to the "Automation" tab in your dashboard to build your first Flow in minutes—no coding required.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
  true,
  now() - interval '50 days'
)
on conflict (slug) do nothing;


-- 7. Grant Admin Role Helper (Commented out - User needs to fill specific ID)
-- update user_roles set role = 'admin' where user_id = 'YOUR_USER_ID_HERE';
