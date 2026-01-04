/**
 * Contact Form Handler for Google Sheets Integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet
 * 2. Create a Google Apps Script (see GOOGLE_APPS_SCRIPT.md)
 * 3. Deploy the script as a web app
 * 4. Copy the web app URL and paste it below in GOOGLE_SCRIPT_URL
 */

// ⚠️ IMPORTANT: Replace this URL with your Google Apps Script Web App URL
// The URL should look like: https://script.google.com/macros/s/AKfycby.../exec
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwT2XK2rfjQwVl_6f3oaCbR_zvNniVvdx7QMmDSI3lazEtCAteQTLnsOYrdgp_Q4lep/exec';

/**
 * Submit form data to Google Sheets via Google Apps Script
 * @param {Object} formData - Form data object
 * @returns {Promise} - Promise that resolves when submission is complete
 */
async function submitToGoogleSheets(formData) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        throw new Error('Google Script URL not configured. Please set GOOGLE_SCRIPT_URL in contact-form-handler.js');
    }

    try {
        // Log the data being sent (for debugging)
        console.log('Submitting form data:', formData);
        console.log('Sending to:', GOOGLE_SCRIPT_URL);

        // Use FormData for better compatibility with Google Apps Script
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name || '');
        formDataToSend.append('email', formData.email || '');
        formDataToSend.append('phone', formData.phone || '');
        formDataToSend.append('service', formData.service || '');
        formDataToSend.append('message', formData.message || '');
        formDataToSend.append('file', formData.file || 'No file');

        // Use no-cors mode for Google Apps Script (required)
        // Google Apps Script doesn't support CORS properly
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            redirect: 'follow',
            body: formDataToSend
        });
        
        // Note: With no-cors mode, we can't read the response
        // But the data will still be sent to Google Sheets
        console.log('Form submitted (no-cors mode - cannot verify response)');
        console.log('Check your Google Sheet to verify the data was saved');
        return Promise.resolve();
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}

// Alternative method using form submission (works better with CORS)
async function submitToGoogleSheetsWithForm(formData) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        throw new Error('Google Script URL not configured. Please set GOOGLE_SCRIPT_URL in contact-form-handler.js');
    }

    // Create form data objectw
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('service', formData.service);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('file', formData.file || 'No file');

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formDataToSend
        });

        return Promise.resolve();
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { submitToGoogleSheets, submitToGoogleSheetsWithForm };
}

