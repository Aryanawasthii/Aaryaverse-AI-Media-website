# Aaryaverse AI Media – Website

Static website (no build step). Files:

- `index.html` – the full website (founder page is built in)
- `founder.html` – standalone copy of the founder page (optional)
- `google-sheet-setup.gs` – Google Apps Script used for the lead-capture Google Sheet
- `.nojekyll` – tells GitHub Pages to serve files as they are

## Go live with GitHub Pages
1. Create a repository on GitHub (e.g. `aaryaverse-website`), public.
2. Upload all files in this folder to the repository root (keep `index.html` at the top level).
3. Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. After a minute the site is live at `https://<your-username>.github.io/aaryaverse-website/`.

## Leads
Form submissions are posted to the Google Apps Script URL stored in `SHEET_URL` inside `index.html`.
