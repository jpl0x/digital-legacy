# Digital Legacy

A platform for preserving your thoughts, memories, and wisdom for loved ones.

## What is this?

Digital Legacy allows you to capture your personality, values, and life experiences so that your loved ones can interact with an AI representation of you—even after you're gone.

## Development Status

**Currently in maintenance mode (November 2025)** - Active development paused while completing Level 3 Diploma in Networking and Cybersecurity. Daily commits maintain project visibility, but major feature work (authentication, AI integration) will resume after course completion in early 2026.

The foundation is solid. The architecture is clean. The vision is clear. Just temporarily prioritising formal education that will make the security implementation even better.

## Recent Updates

### November 2025
- ✅ Added custom 404 page
- ✅ Added loading state component
- ✅ TypeScript strict mode configuration
- ✅ Professional repository documentation

### October 2025
- ✅ **Major refactor:** Modular architecture with clean separation of concerns
- ✅ Entry editing functionality
- ✅ Search/filter entries
- ✅ Statistics dashboard (total entries, words, averages)
- ✅ Improved placeholder visibility
- ✅ Word and character counters
- ✅ Server actions + proper Next.js 15 patterns
- ✅ Reusable components (ready for auth integration)

## Current Status

**Phase 1: MVP (In Progress - 15% Complete)**

✅ Journal entry system  
✅ Database integration (Supabase)  
✅ Clean, modular codebase  
✅ Entry management (create, edit, delete)  
✅ Search and statistics  
🚧 User authentication (next priority - resuming Q1 2025)  
🚧 AI chat interface (coming after auth)  
🚧 Guided prompts framework (planned)

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Architecture:** Server Components + Server Actions
- **AI:** OpenAI GPT-4 (planned)
- **Hosting:** Vercel

## Project Structure

```
digital-legacy/
├── app/
│   ├── page.tsx              # Main page
│   ├── components/           # UI components
│   │   ├── EntryForm.tsx
│   │   ├── EntryList.tsx
│   │   ├── EntryCard.tsx
│   │   ├── EntryStats.tsx
│   │   └── SearchBar.tsx
│   └── actions/
│       └── entries.ts        # Server actions
└── lib/
    ├── database/
    │   └── entries.ts        # Database queries
    └── utils/
        └── text.ts           # Utilities
```

## Why I'm Building This

I'm building this for my son. I want to leave him something meaningful—not just photos or videos, but a way to ask me questions, get advice, and know how I think, even when I'm no longer here.

## Development Timeline

- **Week 1:** Database + journal system ✅
- **Week 2-3:** Refactor + clean architecture ✅
- **Nov 2025 - Jan 2026:** Maintenance mode (cybersecurity course)
- **Q1 2026:** Resume active development
  - User authentication
  - AI chat integration
  - Guided prompts + personality framework
- **Q2 2026+:** Voice cloning, beneficiary system, production features

## Setup (Local Development)
```bash
# Clone the repo
git clone https://github.com/jpl0x/digital-legacy.git
cd digital-legacy

# Install dependencies
npm install

# Create .env.local with your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Security

See [SECURITY.md](SECURITY.md) for information about reporting vulnerabilities.

## License

MIT (for now - may change as project evolves)

## Contact

Building in public. Follow the journey.

---

*This project is deeply personal. If you've lost someone and wish you could ask them one more question, you understand why this matters.*