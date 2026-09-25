# Private Portfolio Editor

## What will change
- Keep the existing public portfolio design and sections, but load Experience, Tech Stack, Education, Projects, and Certifications from saved portfolio content.
- Add a private `/manage` area where Sangamithra can edit existing entries, add new entries, and remove entries in those five sections.
- Save edits automatically and show clear saving, saved, and error states. Project and technology icons will use curated choices so entries remain visually consistent.
- Keep Aether's answers in sync with the latest saved portfolio content.

## Owner-only access and persistence
- Enable Lovable Cloud for sign-in and durable content storage; no separate user profile data is needed.
- Restrict account creation and editing to the verified email `duraisamysangamithra19@gmail.com`. Enforce access on the server and in database policies, using a separate role record rather than trusting browser state.
- Keep the portfolio readable to everyone. Unauthenticated visitors and any other signed-in account cannot change its content.
- Seed the existing portfolio details into persistent storage so the current content and public experience are preserved.

## Verification
- Confirm the public portfolio still displays all existing entries and remains viewable without signing in.
- Test owner sign-in, edit/add/delete, automatic saving, and persistence after reload.
- Confirm another account and signed-out visitors cannot write portfolio content.

## Technical approach
- Use a Cloud-backed portfolio content record with public read access and owner-only writes enforced by row-level policies.
- Use authenticated server-side checks plus a separate `user_roles` table for the editor role; do not rely on client-side email checks or local storage for security.
- Update the existing sections and Aether data source to read the saved content while preserving the current presentation.
