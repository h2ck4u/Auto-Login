chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  if (message && message.type == 'saveConfig') {
      alert('saveConfig!!');
      sendResponse(true);
  }
});