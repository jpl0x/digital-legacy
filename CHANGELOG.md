# Changelog

All notable changes to Digital Legacy will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- User authentication (Supabase Auth)
- AI chat interface (OpenAI integration)
- Beneficiary designation system
- Payment integration (Stripe)

---

## [0.4.2] - 2025-11-01

### Changed
- Updated text utilities to use centralized DATE_FORMAT constant
- Updated main page to use APP_META constants for all text content
- Added proper Next.js metadata for improved SEO
- Completed constants refactor: all hardcoded values now centralized

### Technical
- Date formatting now uses configuration from constants
- App metadata (titles, descriptions, footer) now managed centrally
- Browser tab displays proper title instead of default Next.js text

---

## [0.4.1] - 2025-10-26

### Added
- Comprehensive JSDoc documentation for all database functions
- JSDoc documentation for utility functions (text processing)
- JSDoc documentation for server actions
- Improved IDE autocomplete and hover hints

### Changed
- Enhanced code maintainability through inline documentation

---

## [0.4.0] - 2025-10-24

### Changed
- **Major refactor:** Modular architecture with clean separation of concerns
- Separated database queries into `/lib/database/entries.ts`
- Separated utilities into `/lib/utils/text.ts`
- Created server actions in `/app/actions/entries.ts`
- Split UI into reusable components (`EntryForm`, `EntryList`, `EntryCard`, `EntryStats`, `SearchBar`)
- Improved code organization for easier maintenance and testing
- Updated README to reflect new architecture

### Technical
- Implemented Next.js 15 best practices (Server Components + Server Actions)
- Prepared codebase for authentication integration
- Improved type safety across all layers

---

## [0.3.0] - 2025-10-22

### Added
- Entry editing functionality with inline editing UI
- Search and filter entries by content
- Statistics dashboard showing total entries, words preserved, and averages
- "Last edited" timestamp indicator
- Delete confirmation dialogs

### Changed
- Improved placeholder text visibility
- Enhanced user feedback for all actions

---

## [0.2.0] - 2025-10-15

### Added
- Entry display with reverse chronological ordering
- Live word counter during entry creation
- Live character counter during entry creation
- Entry timestamps with formatted dates
- Success/error message feedback

---

## [0.1.0] - 2025-10-13

### Added
- Initial project setup with Next.js 15
- Basic journal entry creation
- Supabase PostgreSQL database integration
- Journal entries table with user_id, content, and timestamps
- Clean, minimal UI with Tailwind CSS
- Basic entry list display

### Technical
- Set up Vercel deployment configuration
- Configured Supabase client
- Established project structure

---

## Version History Summary

- **0.1.0** - Initial setup and basic journaling
- **0.2.0** - Entry display and word counting
- **0.3.0** - Edit, search, and statistics features
- **0.4.0** - Major refactor: modular architecture
- **0.4.1** - Documentation improvements (JSDoc)
- **0.4.2** - Constants refactor completion
- **0.5.0** - (Planned) User authentication