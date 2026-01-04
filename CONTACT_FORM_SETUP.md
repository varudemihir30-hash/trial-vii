# Contact Form to Google Sheets Setup Guide

This guide will help you set up your contact form to automatically save all submissions to a Google Sheet (Excel).

## 📋 Quick Overview

Your contact form will send data to Google Sheets when users submit:
- Name
- Email
- Phone
- Service Selected
- Message
- File Attachment (filename)

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it something like **"Contact Form Submissions"**
4. **Copy the Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
   - Then Sheet ID is: `1a2b3c4d5e6f7g8h9i0j`
   - **Save this Sheet ID** - you'll need it in Step 2

### Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"** (or the **"+"** button)
3. You'll see a default function - **delete all the code**
4. Open the file `Aivora/google-apps-script-code.js` from your project
5. **Copy the entire contents** and paste it into the Apps Script editor
6. **Replace these values:**
   - Find: `const SHEET_ID = 'YOUR_SHEET_ID_HERE';`
   - Replace with: `const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID';` (use the ID from Step 1)
   - Find: `const SHEET_NAME = 'Sheet1';`
   - Replace with your sheet name if different (usually it's "Sheet1")
7. Click **"Save"** (or press `Ctrl+S` / `Cmd+S`)
8. Give your project a name (e.g., "Contact Form Handler") in the top left

### Step 3: Deploy as Web App

1. In Google Apps Script, click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure the settings:
   - **Description:** "Contact Form Handler"
   - **Execute as:** "Me" (your email)
   - **Who has access:** "Anyone" (this allows your website to submit data)
5. Click **"Deploy"**
6. **Authorize the script:**
   - Click **"Authorize access"**
   - Choose your Google account
   - **You'll see a warning:** "Google hasn't verified this app"
   - **This is NORMAL and SAFE** for personal/internal apps
   - Click **"Advanced"** (at the bottom left)
   - Click **"Go to [Project Name] (unsafe)"** (this is safe for your own app)
   - Click **"Allow"** to grant permissions
   - You may need to allow access to Google Sheets
7. **Copy the Web App URL** - It will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   - **Save this URL** - You'll need it in Step 4!

### Step 4: Configure Your Website

1. Open the file: `Aivora/assets/js/contact-form-handler.js`
2. Find this line (around line 12):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your Web App URL from Step 3
   - Example:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby123456789/exec';
   ```
4. **Save the file**

### Step 5: Test It! 🎉

**Testing on Localhost:**
- The form works perfectly on localhost (e.g., `http://localhost:8000`)
- Start a local server: `python -m http.server 8000` or `npx http-server -p 8000`
- Open `http://localhost:8000/Aivora/contact.html`

**Testing on Production:**
- Works the same way on your live website
- No code changes needed between localhost and production

1. Open your contact form page (`contact.html` in a browser)
2. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: 123-456-7890
   - Service: Select any service
   - Message: This is a test message
3. Click **"send a message"**
4. You should see a success modal
5. **Check your Google Sheet** - you should see the data appear in a new row!

---

## 📊 Sheet Structure

Your Google Sheet will automatically have these columns:

| Timestamp | Name | Email | Phone | Service | Message |
|-----------|------|-------|-------|---------|---------|
| 2025-01-15 10:30:00 | John Doe | john@example.com | 123-456-7890 | Resume Writing | Hello... |

The headers will be created automatically on the first submission.

---

## 🔧 Troubleshooting

### Form submissions not appearing in Sheet?

1. **Check the Sheet ID** - Make sure it's correct in the Apps Script (Step 2)
2. **Check the Sheet Name** - Make sure it matches exactly (case-sensitive, usually "Sheet1")
3. **Check the Web App URL** - Make sure it's correct in `contact-form-handler.js` (Step 4)
4. **Check browser console** - Open Developer Tools (F12) → Console tab, look for errors
5. **Test the script** - In Apps Script, click "Run" → select `testConnection` function

### Getting "Script not authorized" error?

1. Go back to Apps Script
2. Click **"Deploy"** → **"Manage deployments"**
3. Click the edit icon (pencil) on your deployment
4. Click **"Test deployments"** to re-authorize
5. Make sure "Who has access" is set to **"Anyone"**

### Seeing "Google hasn't verified this app" warning?

**This is completely normal and safe!** This warning appears because:
- Your app is for personal/internal use (not published publicly)
- Google's verification is only required for apps with many users
- For your own contact form, this is perfectly safe

**To proceed:**
1. Click **"Advanced"** (at the bottom left of the warning)
2. Click **"Go to [Your Project Name] (unsafe)"**
   - Don't worry - it says "unsafe" but it's safe for your own app
3. Click **"Allow"** to grant permissions
4. You may need to allow access to Google Sheets - click **"Allow"** again

### Getting CORS errors in console?

- This is normal! The script uses `no-cors` mode, so you won't see response data
- But the data should still be saved to your sheet
- **Check your Google Sheet** to verify submissions are being saved

### Form shows error message?

1. Check that `GOOGLE_SCRIPT_URL` is set correctly in `contact-form-handler.js`
2. Make sure the URL starts with `https://script.google.com/macros/s/`
3. Make sure the URL ends with `/exec`

### Data not saving?

1. Make sure the Apps Script is deployed (not just saved)
2. Make sure "Who has access" is set to **"Anyone"**
3. Try running the `testConnection()` function in Apps Script to verify it works

---

## 🔒 Security Notes

- The Web App URL is public, but only authorized users can execute it
- Consider using "Anyone with Google account" for better security (but "Anyone" works for public forms)
- Don't share your Sheet ID publicly
- Regularly check your sheet for spam submissions
- You can add validation in the Apps Script to filter spam

---

## 📝 Files Involved

- **Contact Form:** `Aivora/contact.html`
- **Form Handler:** `Aivora/assets/js/contact-form-handler.js`
- **Google Apps Script:** `Aivora/google-apps-script-code.js`
- **Setup Guide:** This file!

---

## ✅ Checklist

Before going live, make sure:

- [ ] Google Sheet created and Sheet ID copied
- [ ] Google Apps Script created with correct Sheet ID
- [ ] Script deployed as Web App
- [ ] Web App URL copied
- [ ] `contact-form-handler.js` updated with Web App URL
- [ ] Test submission successful
- [ ] Data appears in Google Sheet

---

## 🆘 Need Help?

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- Check the browser console (F12) for error messages
- Test the Apps Script function directly in the script editor

---

**Good luck! Your contact form should now be saving all submissions to Google Sheets! 🎉**

