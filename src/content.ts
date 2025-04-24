async function extInit() {
  const jsCode = `alert("Hello from Content.js!");`;

  await chrome.runtime.sendMessage({
    type: 'CODE',
    url: window.location.href,
    payload: jsCode
  });
}

(() => extInit())();
