# Architecture rules

- Keep portfolio sections in one validated JSON content record so the editor can update entries without changing the established public layout.
- Store editor authorization in a separate owner-role table and enforce every write through database policies; browser-only checks are presentation, not security.
- Keep public portfolio reads unauthenticated and read-only so recruiter links remain accessible without an account.
- Keep dated portfolio card ordering in a pure, independently testable utility so it stays consistent across saved and default content.