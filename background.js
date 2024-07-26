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
