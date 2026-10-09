
const linesAsArray = (rawRules = '') => {
  return rawRules.split('\n').filter(Boolean)
}

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason == chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.openOptionsPage();
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getRules') {
    chrome.storage.local.get({
      yayRules: '',
      nayRules: '',
    }).then(({ yayRules, nayRules }) => {
      sendResponse({
        yay: linesAsArray(yayRules),
        nay: linesAsArray(nayRules),
      });
    })
  }
  return true
})
