/*global chrome*/

chrome.storage.sync.get("color", ({ color }) => {
    //can't log to consoler, here, injected script
    console.time(color)
    document.body.style.backgroundColor = color;
});