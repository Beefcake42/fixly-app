# Fixly V6 Release Candidate

V6 is a release-candidate codebase, not a signed AAB. Complete these environment-specific steps before store submission.

1. Create/link the final Supabase project and run schema.sql, schema-v2.sql, schema-v3.sql, schema-v4.sql in order.
2. Deploy Edge Functions:
   - diagnose
   - delete-account
3. Set OPENAI_API_KEY only as a Supabase server secret.
4. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY in the build environment.
5. Run `eas init` and replace REPLACE_WITH_EAS_PROJECT_ID in app.json with the generated project ID.
6. Confirm the final Android package name. Once published, treat it as permanent.
7. Host `public-account-deletion/index.html` on a public HTTPS website. Replace its placeholder developer contact text.
8. Replace the in-app draft Privacy Policy/Terms with finalized documents and public URLs.
9. Run `npm install`, `npx expo-doctor`, and test on a physical Android device.
10. Build: `eas build --platform android --profile production`.
11. Test the resulting production build before uploading to Play Console.

Do not commit .env or secret keys.
