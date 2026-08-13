/** FitNow lead capture backend
 * 1) Create a Google Sheet.
 * 2) Extensions -> Apps Script.
 * 3) Paste this code and deploy as Web app: Execute as Me, Who has access: Anyone.
 * 4) Copy the /exec URL into GOOGLE_SHEETS_WEB_APP_URL in index.html.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp','Name','Phone','Email','Program','Message','Source']);
  }
  var data = JSON.parse(e.postData.contents || '{}');
  sheet.appendRow([
    new Date(), data.name || '', data.phone || '', data.email || '',
    data.program || '', data.message || '', data.source || 'FitNow Website'
  ]);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
