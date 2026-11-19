# Aaryaverse AI Media — Launch Website (v1)
Static HTML/CSS/JS. No build step, no paid services, no secrets.

## Folder structure
```
index.html          single-page site (sections: Home, Insights, Trends, Blogs, Learning Hub, About, Collaborate, Contact)
css/styles.css      all styling (brand colours are variables at the top)
js/config.js        ALL settings: email, WhatsApp number, social links, form endpoint
js/content.js       sample articles, trends, learning topics (edit/add here)
js/main.js          rendering, filters, search, article view, form logic
assets/img/         your supplied logos + cropped creator portrait (optimised WebP)
```
URLs: `#insights`, `#trends`, `#blogs`, `#learning`, `#about`, `#collaborate`, `#contact`, articles at `#/post/<slug>`.

## Local preview
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## GitHub Pages deployment
1. Create a GitHub repository and upload all files (keep `index.html` at the root).
2. Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save.
3. After 1–2 minutes the site is live at `https://<username>.github.io/<repo>/`.
4. Put that address in `siteUrl` inside `js/config.js` (used for share links).

## Publishing a new article
Add an object to `ARTICLES` in `js/content.js` (slug, cat, title, date, read, excerpt, body[]) and remove `featured` / sample flags as needed. Remove the "Sample" badge text in `js/main.js` once real.

## Connecting the enquiry form (Google Sheets)
1. Create a Google Sheet with headers: Time, Name, Email, Brand, Link, Type, Message.
2. Extensions → Apps Script, paste:
```js
function doPost(e){
  var d=JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([new Date(),d.name,d.email,d.brand,d.link,d.type,d.message]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
```
3. Deploy → New deployment → Web app → Execute as: Me, Access: Anyone → copy the URL into `formEndpoint` in `js/config.js`.
Until then the form shows an honest "not connected" message with an email fallback — it never shows fake success.

## Needs your confirmation
- WhatsApp number (`whatsappNumber`) — button stays hidden until set; none was invented.
- LinkedIn company page URL and Facebook Page URL — icons stay hidden until set.
- Both Instagram links work; the primary one is in the header/footer, the second is in the Contact card.
- `siteUrl` after deployment; Google Apps Script `formEndpoint`.
- Creator portrait: cropped from your photo to avoid its gold text (outside the brand palette). Confirm you are happy with this crop.
- Open Graph image currently uses the round logo; a 1200x630 share image can be added later.
- All articles, trends and Learning Hub entries are labelled placeholders — no fake news is presented as real.

## Testing report (automated headless Chromium, run on the build)
| Area | Result |
|---|---|
| Desktop 1366px | Renders; no JS errors; no horizontal scroll |
| Mobile 390px | Renders; no JS errors; no horizontal scroll; menu toggles |
| Navigation | Section anchors, article open/back via hash routing work |
| Search | "seo" returns 1 matching article |
| Filters | Insights/Trends category filters render and filter |
| Contact form | With no endpoint: no success message, email fallback shown (verified) |
| Not tested | Real Google Sheets submission (needs your endpoint), real devices/Safari, WhatsApp/LinkedIn/Facebook buttons (hidden until configured), Lighthouse scores |
Reduced-motion is respected in CSS (animations and reveals disabled).
