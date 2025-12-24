/**
 * Google Apps Script Code for Contact Form to Google Sheets Integration
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete the default code and paste this entire file
 * 4. Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
 * 5. Replace 'Sheet1' with your sheet name if different
 * 6. Click "Save" (Ctrl+S or Cmd+S)
 * 7. Click "Deploy" → "New deployment"
 * 8. Select type: "Web app"
 * 9. Execute as: "Me"
 * 10. Who has access: "Anyone" (or "Anyone with Google account" for more security)
 * 11. Click "Deploy"
 * 12. Copy the Web App URL and paste it in contact-form-handler.js
 */

// ⚠️ REPLACE THIS WITH YOUR GOOGLE SHEET ID
// You can find it in the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
const SHEET_ID = 'YOUR_SHEET_ID_HERE';

// ⚠️ REPLACE WITH YOUR SHEET NAME (default is usually 'Sheet1')
const SHEET_NAME = 'Sheet1';

/**
 * Handle POST request from contact form
 */
function doPost(e) {
    try {
        // Get the active spreadsheet
        const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
        
        // If sheet doesn't exist, create it
        if (!sheet) {
            const ss = SpreadsheetApp.openById(SHEET_ID);
            const newSheet = ss.insertSheet(SHEET_NAME);
            // Add headers if this is a new sheet
            newSheet.getRange(1, 1, 1, 6).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Message']]);
            return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Sheet created. Please try again.' }));
        }
        
        // Parse the incoming data
        let data;
        try {
            data = JSON.parse(e.postData.contents);
        } catch (err) {
            // If JSON parsing fails, try form data
            data = {
                name: e.parameter.name || '',
                email: e.parameter.email || '',
                phone: e.parameter.phone || '',
                service: e.parameter.service || '',
                message: e.parameter.message || '',
                file: e.parameter.file || 'No file'
            };
        }
        
        // Get current timestamp
        const timestamp = new Date();
        
        // Prepare row data
        const rowData = [
            timestamp,                    // Column A: Timestamp
            data.name || '',              // Column B: Name
            data.email || '',             // Column C: Email
            data.phone || '',             // Column D: Phone
            data.service || '',           // Column E: Service
            data.message || ''            // Column F: Message
        ];
        
        // Check if headers exist, if not add them
        const lastRow = sheet.getLastRow();
        if (lastRow === 0) {
            sheet.getRange(1, 1, 1, 6).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Message']]);
            sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
            sheet.getRange(1, 1, 1, 6).setBackground('#4285f4');
            sheet.getRange(1, 1, 1, 6).setFontColor('#ffffff');
        }
        
        // Append the new row
        sheet.appendRow(rowData);
        
        // Format the new row
        const newRow = sheet.getLastRow();
        sheet.getRange(newRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
        
        // Auto-resize columns for better readability
        sheet.autoResizeColumns(1, 6);
        
        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            success: true,
            message: 'Data saved successfully',
            row: newRow
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
        // Return error response
        return ContentService.createTextOutput(JSON.stringify({
            success: false,
            error: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handle GET request (for testing)
 */
function doGet(e) {
    return ContentService.createTextOutput('Contact Form Handler is running! Use POST to submit form data.');
}

/**
 * Test function - Run this to verify your setup
 */
function testConnection() {
    const testData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '123-456-7890',
        service: 'AI - marketing',
        message: 'This is a test message'
    };
    
    const mockEvent = {
        postData: {
            contents: JSON.stringify(testData)
        }
    };
    
    const result = doPost(mockEvent);
    Logger.log(result.getContent());
}

