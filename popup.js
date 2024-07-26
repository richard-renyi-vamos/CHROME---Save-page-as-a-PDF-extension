document.getElementById('savePDF').addEventListener('click', () => {
  chrome.runtime.sendMessage({action: "savePDF"});
  window.close();
});
