CLAUDE.AI CONVERSATION

-----


Save Current Page as PDF Chrome Extension


R
Create a Chrome extension that saves the page as a pdf

Edit
To create a Chrome extension that saves the current page as a PDF, we'll need to create a few files:

manifest.json
background.js
popup.html
popup.js
Here's the code for each file:

manifest.json:
json

Copy
{
  "manifest_version": 2,
  "name": "Save as PDF",
  "version": "1.0",
  "description": "Save the current page as a PDF file",
  "permissions": ["activeTab", "downloads"],
  "browser_action": {
    "default_popup": "popup.html"
  },
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  }
}
background.js:
javascript

Copy
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "savePDF") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0];
      chrome.pageCapture.saveAsMHTML({tabId: tab.id}, (mhtmlData) => {
        const blob = new Blob([mhtmlData], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url,
          filename: `${tab.title}.pdf`,
          saveAs: true
        });
      });
    });
  }
});
popup.html:
html

Copy
<!DOCTYPE html>
<html>
<head>
  <title>Save as PDF</title>
  <style>
    body {
      width: 200px;
      padding: 10px;
    }
    button {
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <button id="savePDF">Save as PDF</button>
  <script src="popup.js"></script>
</body>
</html>
popup.js:
javascript

Copy
document.getElementById('savePDF').addEventListener('click', () => {
  chrome.runtime.sendMessage({action: "savePDF"});
  window.close();
});
To use this extension:

Create a new directory for your extension.
Save each file with its respective name in that directory.
Open Chrome and go to chrome://extensions/
Enable "Developer mode" in the top right corner.
Click "Load unpacked" and select your extension directory.
The extension should now appear in your Chrome toolbar. When you click on the extension icon, a popup will appear with a "Save as PDF" button. Clicking this button will save the current page as a PDF file.

Would you like me to explain or break down any part of this code?   
