// Invoke if the extension successfully installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('Successfully Installed!');
});

// Intercept the onClick on ICON Extension
chrome.action.onClicked.addListener((tab) => {
  console.log(tab, '<---@');

  chrome.tabs.create({
    url: chrome.runtime.getURL("web.html")
  });
  
  // This execute the scripts
  // chrome.scripting.executeScript({
  //   target: {tabId: tab.id!},
  //   files: ['content.js']
  // });
});
