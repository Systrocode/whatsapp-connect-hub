# WA Business - WhatsApp Management Dashboard

A powerful dashboard for managing WhatsApp Business conversations, automating responses, and tracking analytics.

## 📖 Documentation

We have detailed documentation available in the `docs/` directory:

- [**Architecture**](docs/ARCHITECTURE.md): High-level overview of the system design and tech stack.
- [**Setup Guide**](docs/SETUP.md): Detailed instructions for local development and deployment.
- [**Features**](docs/FEATURES.md): Breakdown of the application modules and code map.
- [**API Reference**](docs/API.md): Documentation for the Supabase Edge Functions.

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <YOUR_REPO_URL>
   cd whatsapp-connect-hub
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` and fill in your Supabase credentials.
   *(See [Setup Guide](docs/SETUP.md) for details)*

3. **Run Locally**
   ```bash
   npm run dev
   ```

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Supabase](https://supabase.com/) (Auth, DB, Edge Functions)

## License

All rights reserved. © 2024 WA Business Dashboard.
