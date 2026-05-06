# CV Maker

A full-stack professional CV/Resume builder built with Next.js (App Router), Supabase, TypeScript, and Tailwind CSS.

## Features

- **Authentication** - Email/password signup & login via Supabase Auth
- **Dashboard** - View, create, edit, delete, and duplicate CVs
- **Multi-step CV Builder** - Sections for Personal Info, Summary, Education, Experience, Skills, Projects, and Certifications
- **Live Preview** - Split-screen layout with real-time CV preview
- **3 Templates** - Modern, Minimal, and Professional designs
- **Auto-save** - CV data automatically saves to Supabase with debounced updates
- **PDF Export** - Download your CV as a formatted A4 PDF
- **Responsive Design** - Clean, modern UI built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (Auth, PostgreSQL, RLS)
- **State Management**: Zustand
- **PDF Generation**: html2canvas + jsPDF
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A [Supabase](https://supabase.com) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/RafisGit/CV-Maker.git
cd CV-Maker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is ready, go to **SQL Editor** in the dashboard
3. Copy the contents of `supabase/schema.sql` and run it in the SQL Editor
4. This creates the `cvs` and `cv_data` tables with Row Level Security (RLS) policies

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

- **`NEXT_PUBLIC_SUPABASE_URL`**: Found in Supabase Dashboard > Settings > API > Project URL
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Found in Supabase Dashboard > Settings > API > Project API keys > `anon` `public`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    auth/
      login/page.tsx       # Login page
      signup/page.tsx      # Signup page
      callback/route.ts    # Auth callback handler
    dashboard/page.tsx     # Dashboard - list/manage CVs
    builder/[id]/page.tsx  # CV Builder with live preview
    layout.tsx             # Root layout
    page.tsx               # Landing page
  components/
    forms/                 # Form components for each CV section
      PersonalInfoForm.tsx
      SummaryForm.tsx
      EducationForm.tsx
      ExperienceForm.tsx
      SkillsForm.tsx
      ProjectsForm.tsx
      CertificationsForm.tsx
    templates/             # CV template components
      ModernTemplate.tsx
      MinimalTemplate.tsx
      ProfessionalTemplate.tsx
    ui/                    # Shared UI components
      Navbar.tsx
    CVBuilder.tsx          # Main builder component
    CVPreview.tsx          # Preview wrapper component
  lib/
    supabase/
      client.ts            # Browser Supabase client
      server.ts            # Server Supabase client
      middleware.ts         # Auth middleware helper
    database.ts            # Database CRUD operations
  store/
    cv-store.ts            # Zustand state management
  types/
    cv.ts                  # TypeScript interfaces
  middleware.ts            # Next.js middleware for auth
supabase/
  schema.sql               # Database schema with RLS policies
```

## Database Schema

### `cvs` table

| Column      | Type        | Description               |
| ----------- | ----------- | ------------------------- |
| id          | UUID (PK)   | Unique CV identifier      |
| user_id     | UUID (FK)   | References auth.users(id) |
| title       | TEXT        | CV title                  |
| template    | TEXT        | Template name             |
| created_at  | TIMESTAMPTZ | Creation timestamp        |
| updated_at  | TIMESTAMPTZ | Last update timestamp     |

### `cv_data` table

| Column         | Type      | Description               |
| -------------- | --------- | ------------------------- |
| id             | UUID (PK) | Unique data identifier    |
| cv_id          | UUID (FK) | References cvs(id)        |
| personal_info  | JSONB     | Personal information      |
| education      | JSONB     | Education entries         |
| experience     | JSONB     | Work experience entries   |
| skills         | JSONB     | Skills list               |
| projects       | JSONB     | Project entries           |
| certifications | JSONB     | Certification entries     |

## Antigravity Deployment

This project is optimized for deployment on Antigravity hosting.

### 1. Environment Variables

Configure the following variables in the Antigravity dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 2. Build Settings

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Root Directory**: `./`

### 3. Static Export (Optional)

If you wish to deploy as a static site:
1. Uncomment `output: "export"` in `next.config.ts`.
2. Delete `src/app/auth/callback/route.ts` (or handle auth purely on the client).
3. Build with `npm run build`.
4. Deploy the `out` directory.

## Deployment Checklist

- [x] Run `npm run build` locally to verify.
- [x] Ensure Supabase RLS policies are applied (run `supabase/schema.sql`).
- [x] Set production environment variables.
- [x] Verify PDF export works in the live environment.

## License

MIT
