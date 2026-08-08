# Fixly AI Connection

The Scan screen now calls the deployed Supabase Edge Function `diagnose` through the Supabase client.

Flow:
1. User signs in.
2. User takes or selects a repair photo.
3. The app sends the problem description and image to `diagnose`.
4. The Edge Function uses the server-side `OPENAI_API_KEY`.
5. Fixly renders the structured repair diagnosis.
6. Save Repair uploads the photo to the private `repair-images` bucket and saves the guide to `public.repairs`.

The OpenAI secret is not stored in the mobile app.
