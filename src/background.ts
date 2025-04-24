// Invoke if the extension successfully installed or updated
chrome.runtime.onInstalled.addListener((tab) => {
  console.log('Successfully', tab.reason);
});

// Intercept the onClick from ICON Extension
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('web.html')
  });
  // This execute the scripts
  // chrome.scripting.executeScript({
  //   target: {tabId: tab.id!},
  //   files: ['content.js']
  // });
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  // chrome.tabs.query({url: message.url}, (tabs) => {
  //   sendResponse({tabs});
  // });

  if (message.type === 'CODE') {
    chrome.tabs.query({url: message.url}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id!},
        func: (code) => new Function(code)(),
        args: [message.payload]
      });
      sendResponse('Successful execute');
    });
    return true;
  }
});
