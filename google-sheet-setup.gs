/**
 * Aaryaverse AI Media – lead capture to Google Sheets
 * 1. Create a new Google Sheet (name it e.g. "Aaryaverse Leads").
 * 2. Extensions > Apps Script > paste this whole file > Save.
 * 3. Deploy > New deployment > type: Web app
 *    Execute as: Me   |   Who has access: Anyone  > Deploy (authorise when asked).
 * 4. Copy the Web app URL and paste it into SHEET_URL in index.html.
 */
const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = 'aaryaverseaimedia@gmail.com';

function doPost(e) {
  const p = e.parameter;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Time', 'Form', 'Name', 'Phone', 'Email', 'Service', 'Message', 'Preferred time', 'Links']);
  }
  sh.appendRow([p.time, p.form, p.name, p.phone, p.email, p.service, p.message, p.when, p.links]);
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New lead: ' + p.form,
      'Name: ' + p.name + '\nPhone: ' + p.phone + '\nEmail: ' + p.email +
      '\nService: ' + p.service + '\nMessage: ' + p.message +
      '\nPreferred time: ' + p.when + '\nLinks: ' + p.links);
  } catch (err) {}
  return ContentService.createTextOutput('ok');
}
