# Troubleshooting: Form Data Not Appearing in Google Sheets

If your form submissions aren't appearing in your Google Sheet, follow these steps:

## 🔍 Step 1: Check Browser Console

1. Open your contact form page
2. Press `F12` (or right-click → Inspect)
3. Go to the **Console** tab
4. Submit the form
5. Look for any error messages (red text)

**Common errors:**
- `Failed to fetch` - Script URL issue or CORS problem
- `Google Script URL not configured` - URL not set correctly
- Network errors - Check internet connection

## 🔍 Step 2: Verify Google Apps Script Configuration

### Check Sheet ID in Script

1. Go to [Google Apps Script](https://script.google.com)
2. Open your project
3. Check line 21: `const SHEET_ID = 'YOUR_SHEET_ID_HERE';`
4. **Make sure this is your actual Sheet ID**, not the placeholder text!

**How to get your Sheet ID:**
- Open your Google Sheet
- Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
- Copy the part between `/d/` and `/edit`

### Check Sheet Name

1. In your Google Apps Script, check line 24: `const SHEET_NAME = 'Sheet1';`
2. Make sure this matches your actual sheet name exactly (case-sensitive)
3. If your sheet is named "Contact Form" or something else, update it

### Test the Script

1. In Google Apps Script, click **Run** → Select `testConnection`
2. Click the **Run** button (▶️)
3. Check the **Execution log** (View → Logs) for any errors
4. Check your Google Sheet - you should see a test entry

## 🔍 Step 3: Verify Deployment Settings

1. In Google Apps Script, click **Deploy** → **Manage deployments**
2. Click the edit icon (pencil) on your deployment
3. **Critical settings:**
   - **Execute as:** "Me" (your email)
   - **Who has access:** **"Anyone"** (must be set to this!)
4. Click **Update**
5. If prompted, re-authorize the script

## 🔍 Step 4: Check Google Sheet Permissions

1. Open your Google Sheet
2. Click **Share** (top right)
3. Make sure your Google account has **Editor** access
4. The script needs permission to write to the sheet

## 🔍 Step 5: Test the Web App URL Directly

1. Open a new browser tab
2. Go to your Web App URL: `https://script.google.com/macros/s/AKfycbz.../exec`
3. **If you see a sign-in page:**
   - The deployment isn't set to "Anyone"
   - Go back to Step 3 and fix the deployment settings
4. **If you see "Contact Form Handler is running!":**
   - The script is working, but might have issues with Sheet ID or permissions

## 🔍 Step 6: Check Script Execution Logs

1. In Google Apps Script, click **Executions** (left sidebar)
2. Look for recent executions
3. Click on any failed executions to see error details
4. Common errors:
   - `Cannot find sheet with name "Sheet1"` - Sheet name mismatch
   - `Cannot find spreadsheet with ID` - Wrong Sheet ID
   - `Permission denied` - Sheet sharing issue

## 🔍 Step 7: Manual Test

Test the script directly in Google Apps Script:

1. In Google Apps Script, click **Run** → Select `testConnection`
2. Click **Run** (▶️)
3. Authorize if prompted
4. Check the **Execution log** for results
5. Check your Google Sheet - should see test data

## ✅ Quick Checklist

- [ ] Sheet ID is correct in Google Apps Script (not placeholder text)
- [ ] Sheet name matches exactly (case-sensitive)
- [ ] Deployment is set to "Anyone" (not "Only myself")
- [ ] Script has been authorized
- [ ] Google Sheet is shared with your account
- [ ] Browser console shows no errors
- [ ] Test function works in Apps Script

## 🛠️ Common Fixes

### Fix 1: Update Sheet ID
```javascript
// In google-apps-script-code.js, line 21
const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID_HERE'; // Replace with real ID
```

### Fix 2: Update Sheet Name
```javascript
// In google-apps-script-code.js, line 24
const SHEET_NAME = 'Sheet1'; // Make sure this matches your sheet name
```

### Fix 3: Redeploy Script
1. In Google Apps Script, click **Deploy** → **Manage deployments**
2. Click **Edit** (pencil icon)
3. Change version to **New version**
4. Make sure "Who has access" is **"Anyone"**
5. Click **Deploy**

### Fix 4: Check Script URL
Make sure the URL in `contact-form-handler.js` matches your deployment URL exactly.

## 📞 Still Not Working?

If none of these steps work:

1. **Check the Execution log** in Google Apps Script for specific error messages
2. **Try the test function** (`testConnection`) in Apps Script
3. **Verify the Sheet ID** is correct (copy from Sheet URL)
4. **Check browser console** for JavaScript errors
5. **Make sure the script is deployed** (not just saved)

## 🔐 Security Note

If you're seeing authentication prompts, make sure:
- Deployment is set to "Anyone" (for public forms)
- Script has been authorized
- Sheet is accessible to your account

---

**Need more help?** Check the error messages in:
- Browser Console (F12)
- Google Apps Script Execution Log
- Google Apps Script Logger (View → Logs)





