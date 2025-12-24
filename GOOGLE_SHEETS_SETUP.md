# Google Sheets Integration Setup Guide

This guide will help you connect your contact form to Google Sheets so all form submissions are automatically saved.

## Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it something like "Contact Form Submissions"
4. **Copy the Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
   - Then Sheet ID is: `1a2b3c4d5e6f7g8h9i0j`

### Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. You'll see a default function - **delete it**
4. Open the file `google-apps-script-code.js` from your project
5. **Copy the entire contents** and paste it into the Apps Script editor
6. **Replace these values:**
   - `YOUR_SHEET_ID_HERE` → Your actual Sheet ID from Step 1
   - `Sheet1` → Your sheet name (if different from "Sheet1")

### Step 3: Save and Deploy

1. Click **"Save"** (or press `Ctrl+S` / `Cmd+S`)
2. Give your project a name (e.g., "Contact Form Handler")
3. Click **"Deploy"** → **"New deployment"**
4. Click the gear icon ⚙️ next to "Select type"
5. Choose **"Web app"**
6. Configure:
   - **Description:** "Contact Form Handler"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone" (or "Anyone with Google account" for more security)
7. Click **"Deploy"**
8. **Authorize the script:**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"
9. **Copy the Web App URL** - You'll need this in the next step!

### Step 4: Configure Your Website

1. Open the file: `Aivora/assets/js/contact-form-handler.js`
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your Web App URL from Step 3
4. Save the file

### Step 5: Test It!

1. Open your contact form page (`contact.html`)
2. Fill out the form and submit
3. Check your Google Sheet - you should see the data appear!

## Troubleshooting

### Form submissions not appearing in Sheet?

1. **Check the Sheet ID** - Make sure it's correct in the Apps Script
2. **Check the Sheet Name** - Make sure it matches exactly (case-sensitive)
3. **Check the Web App URL** - Make sure it's correct in `contact-form-handler.js`
4. **Check browser console** - Open Developer Tools (F12) and look for errors
5. **Test the script** - In Apps Script, run the `testConnection()` function

### Getting "Script not authorized" error?

1. Go back to Apps Script
2. Click "Deploy" → "Manage deployments"
3. Click the edit icon (pencil) on your deployment
4. Click "Test deployments" to re-authorize

### Getting CORS errors?

- The script uses `no-cors` mode, so you won't see response data
- But the data should still be saved to your sheet
- Check your Google Sheet to verify submissions are being saved

## Sheet Structure

Your Google Sheet will automatically have these columns:

| Timestamp | Name | Email | Phone | Service | Message |
|-----------|------|-------|-------|---------|---------|
| 2025-01-15 10:30:00 | John Doe | john@example.com | 123-456-7890 | AI - marketing | Hello... |

## Security Notes

- The Web App URL is public, but only authorized users can execute it
- Consider using "Anyone with Google account" for better security
- Don't share your Sheet ID publicly
- Regularly check your sheet for spam submissions

## Need Help?

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)

