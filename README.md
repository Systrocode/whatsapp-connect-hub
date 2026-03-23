# Avelo - WhatsApp Business Marketing Platform

A powerful, all-in-one platform for managing WhatsApp Business conversations, automating marketing campaigns, and tracking analytics. Built to be a premium, direct alternative to solutions like Intercom and ManyChat.

## 📖 Documentation

We have detailed developer documentation available in the `docs/` directory:

- [**Architecture**](docs/ARCHITECTURE.md): High-level overview of the system design, database schema, and tech stack.
- [**Setup Guide**](docs/SETUP.md): Detailed instructions for local development, obtaining Meta API keys, and deployment.
- [**Features Hub**](docs/FEATURES.md): Breakdown of the application modules, component logic, and routing.
- [**API Reference**](docs/API.md): Documentation for the Supabase Edge Functions handling Webhooks, OAuth, and Affiliate payments.

## ✨ Core Features

- **Unified Team Inbox**: Manage all WhatsApp conversations from a single, collaborative dashboard.
- **Visual Flow Builder**: Create complex, no-code automated chatbots and routing systems.
- **Smart Broadcasts**: Send rich media campaigns to specialized customer segments.
- **Click-to-WhatsApp Ads**: Deep native integration with Meta Ads Manager to capture leads directly from Facebook & Instagram.
- **Integrated Affiliate System**: Built-in tiered affiliate tracking with automated payout management.
- **Native E-commerce**: Support for WhatsApp catalogs and frictionless checkout.

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <YOUR_REPO_URL>
   cd whatsapp-connect-hub
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` and fill in your Supabase, Meta, and Stripe credentials.
   *(See [Setup Guide](docs/SETUP.md) for details)*

3. **Run Locally**
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: React Router DOM (v6)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + custom animations
- **Icons**: Icons8 native proxy system
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + Framer Motion
- **Backend & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Edge Functions, Row Level Security)
- **External APIs**: Meta Graph API (WhatsApp Business SDK, Facebook Login)

## 📄 License

All rights reserved. © 2026 Avelo.
