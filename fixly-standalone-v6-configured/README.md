# Fixly standalone MVP

Mobile-first repair assistant built with Expo + React Native, Supabase, and a protected OpenAI-powered Supabase Edge Function.

## What works in this starter
- Email/password account creation and sign-in
- Camera and photo-library input
- Problem description
- Protected AI diagnosis request
- Structured diagnosis, safety notice, and repair steps
- Initial repairs database with per-user Row Level Security

## Setup
1. Install Node.js 22.13+.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and add your Supabase Project URL and publishable key.
4. In Supabase SQL Editor, run `supabase/schema.sql`.
5. Install/login to Supabase CLI, link the project, and set the server-only secret:
   `supabase secrets set OPENAI_API_KEY=YOUR_KEY`
6. Deploy:
   `supabase functions deploy diagnose`
7. Run:
   `npx expo start`
8. On Android, open the project using the compatible Expo development workflow.

Do NOT put OPENAI_API_KEY in EXPO_PUBLIC_* variables. EXPO_PUBLIC variables are bundled into the client.

## Next milestone
Add repair saving/history, photo storage, maintenance reminders, favorites, richer diagnosis JSON validation, rate limiting, account deletion, and Play Store production configuration.


## V2 additions
- Fixly dashboard
- Saved repair history
- Individual repair-guide screen
- Save diagnosis to Supabase
- Maintenance task tracker
- Favorites placeholder/data field
- Account/sign-out screen

Run `supabase/schema-v2.sql` after the original schema before testing V2.


## V3 additions
- Tools and parts recommendations
- Difficulty and estimated repair time
- Working Favorites
- Repair image Storage bucket + owner-only policies
- Expanded AI diagnosis contract
- Richer saved Repair Guide

Run `supabase/schema-v3.sql` after V1 and V2 schemas.


## V4 additions
- Actual repair-photo upload to private Supabase Storage
- Maintenance due dates and local reminder notifications
- Complete/delete maintenance tasks
- Delete saved repairs
- In-app account deletion
- EAS production build configuration
- Android/iOS production identifiers and build numbers

Run `supabase/schema-v4.sql`, deploy `delete-account`, and reinstall dependencies before testing.
For Google Play production, replace the example package/bundle identifier if your final identifier differs, then configure EAS credentials and store metadata.


## V5 additions
- App icon, adaptive icon, monochrome icon, and splash assets/config
- In-app Privacy Policy and Terms & Safety screens
- Safer AI JSON parsing/validation
- Google Play release checklist
- Production version bumped to 0.5.0 / Android versionCode 5


## V6 release candidate
- Session-aware authentication routing and better auth validation/loading states
- Account deletion now removes private repair-image objects before deleting the auth user
- External account-deletion webpage source for public HTTPS hosting
- EAS project placeholder and release-candidate setup guide
- Secret-safe .gitignore and production version 0.6.0 / Android versionCode 6


## Configured Supabase project
This copy is configured for Supabase project ref `fgveywxylysvmkdundjw`.
The `.env` contains only Expo public client configuration. Do not add OpenAI, service-role, or Supabase secret keys to `.env`.
