# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbo (runs on http://localhost:3000)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Project Architecture

This is a Next.js 14+ application using the App Router pattern with TypeScript. The application appears to be an energy monitoring dashboard with features for MSolarFit, overload alerts, M-EV, and bill management.

### Directory Structure

- `src/app/` - App Router pages and layouts
  - `(auth)/` - Authentication route group with custom auth layout
  - `(dashboard)/` - Main dashboard route group with sidebar layout
  - `app-shelf/` - Application shelf/launcher page
- `src/components/` - Reusable React components
  - `ui/` - shadcn/ui components (Radix UI + Tailwind CSS)
  - `navigation/` - Navigation components (sidebar, headers)
  - `data-display/` - Data visualization components
  - `form/` - Form-related components
- `src/containers/` - Feature-specific container components
  - `msolarfit/`, `overload/`, `m-ev/` - Main feature modules
- `src/hooks/` - Custom React hooks including API hooks
- `src/lib/` - Utility libraries and configurations
- `src/i18n/` - Internationalization files (Thai locale support)

### Key Technologies

- **Next.js 14+** with App Router and TypeScript
- **Tailwind CSS** with shadcn/ui components
- **TanStack Query** for server state management
- **Axios** for API communication
- **Next-Auth** for authentication (currently disabled/commented out)
- **Next-intl** for internationalization
- **React Hook Form** with Zod validation
- **Radix UI** primitives for accessible components
- **Recharts** for data visualization

### API Integration

The app uses a centralized API approach:
- Base API client in `src/lib/axios/client.ts` with interceptors
- Custom hooks in `src/hooks/use-api.ts` for data fetching
- API base URL configured via `NEXT_PUBLIC_API_URL` environment variable

### UI Components

- Uses shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Dark mode support via `next-themes`
- Responsive design with mobile-first approach

### Authentication

NextAuth is configured but currently disabled. The auth configuration is in `src/lib/auth.ts` with a custom signin page at `/signin`.

### Internationalization

- Configured for Thai (th) locale
- Translation files in `src/i18n/locales/th/`
- Uses next-intl for client and server-side translations

### Build Configuration

- Outputs standalone build for containerization
- Uses Turbo for fast development builds
- ESLint configuration includes TypeScript, Next.js, and custom sorting rules