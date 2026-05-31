# Book Scanner — Lovable Deployment Guide
## Complete step-by-step for a non-coder

---

## STEP 1 — Open Lovable and create a new project

1. Go to https://lovable.dev and sign in
2. Click **"New Project"**
3. In the chat prompt box type exactly:

   > "I want to import my own React code. Create a blank React + Tailwind project."

4. Wait for Lovable to scaffold the blank project (about 30 seconds)

---

## STEP 2 — Paste the App code

1. In the Lovable file explorer (left sidebar), click on **src/App.jsx**
2. Select ALL the existing code (Ctrl+A or Cmd+A) and DELETE it
3. Open the file **src/App.jsx** from this zip
4. Copy ALL of its contents and paste into Lovable's editor
5. Click **Save**

---

## STEP 3 — Replace index.css

1. In Lovable, click **src/index.css**
2. Replace ALL contents with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* { -webkit-tap-highlight-color: transparent; }

body {
  background: #f1f5f9;
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 16px; height: 16px; flex-shrink: 0;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.25s ease both; }
```

---

## STEP 4 — Add Google Font to index.html

1. In Lovable, click **index.html**
2. Find the `<head>` section and add these two lines before `</head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

---

## STEP 5 — Deploy the Cloudflare Worker (the API proxy)

The app needs a Cloudflare Worker so API calls are not blocked by the browser.

1. Go to https://workers.cloudflare.com — sign up free
2. Click **Create Worker**
3. Delete all default code
4. Open **cloudflare-worker.js** (in this zip) — copy ALL contents — paste into Cloudflare
5. Find the line: `const ANTHROPIC_API_KEY = "PASTE_YOUR_ANTHROPIC_API_KEY_HERE";`
6. Replace with your actual key from https://console.anthropic.com → API Keys
7. Click **Save and Deploy**
8. Copy your Worker URL — looks like: `https://book-scanner.yourname.workers.dev`

---

## STEP 6 — Set up Google Sheets

1. Go to https://sheets.google.com — create new sheet called **Book Database**
2. Row 1 headers: `Timestamp | Title | Author | ID | Price (INR)`
3. Go to **Extensions → Apps Script** — delete existing code — paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data  = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date().toLocaleString(),
    data.title   || "",
    data.author  || "",
    data.id      || "",
    data.price   || "",
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** → Copy the Web App URL

---

## STEP 7 — Add your URLs to the app in Lovable

1. Back in Lovable, open **src/App.jsx**
2. Find these two lines near the top (lines 8-9):

```js
const WORKER_URL  = "PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE";
const SHEETS_URL  = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

3. Replace with your actual URLs:

```js
const WORKER_URL  = "https://book-scanner.yourname.workers.dev";
const SHEETS_URL  = "https://script.google.com/macros/s/YOUR_ID/exec";
```

4. Click **Save** — Lovable rebuilds automatically

---

## STEP 8 — Publish on Lovable

1. Click the **Publish** or **Deploy** button (top right in Lovable)
2. Your app gets a live URL like: `https://book-scanner-xyz.lovable.app`
3. Open on your phone → tap **Share → Add to Home Screen**
4. It appears as an app icon — tap to open like a native app

---

## DONE! Your workflow is now:

1. Open app → tap camera zone → photograph book
2. Tap **Analyse with AI** → title, author, ID fill automatically
3. Tap **Search secondhand price** → live INR price appears
4. Edit price if needed → tap **Save to Google Sheets**
5. Your Google Sheet updates instantly with all 5 columns

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Failed to fetch" | Cloudflare Worker URL is wrong or not deployed yet |
| Fields come back empty | Check your Anthropic API key in the Worker file |
| Price shows "estimated" | No live listing found — price calculated at 50% of new MRP |
| Google Sheets not saving | Re-deploy the Apps Script as a Web App with "Anyone" access |
| App looks broken on Lovable | Make sure tailwind.config.js content includes `./src/**/*.{js,jsx}` |
