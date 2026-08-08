# Fixly Google Play release checklist

## Required before submission
- Replace placeholder app icon if desired and verify icon/splash in a preview or production build.
- Finalize a public Privacy Policy webpage and put its URL in Play Console and in the app.
- Create a public web page where a user can request account deletion, then enter that URL in Play Console.
- Confirm in-app account deletion removes the user's associated stored data, including Storage objects where required.
- Complete Google Play Data safety accurately based on the final production behavior.
- Review camera/photo and notification permission disclosures.
- Test sign-up, sign-in, diagnosis, save, favorites, maintenance, reminders, repair deletion, sign-out, and account deletion.
- Test poor/no network, malformed AI output, expired sessions, and denied permissions.
- Run a production Android App Bundle build with EAS and test it before upload.
- Complete store listing assets, screenshots, short/full description, content rating, target audience, app access instructions, and testing requirements.

## Build
npm install
npx expo-doctor
eas build --platform android --profile production

## Important
The current Privacy Policy and Terms screens are release placeholders, not final legal documents.
npx expo install expo-dev-client --legacy-peer-deps
a