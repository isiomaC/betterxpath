/*global chrome*/

//Inititalizer js file - runs to init extension 
chrome.runtime.onInstalled.addListener(() => {

    ///global initializer

    //set state here from Storage
    chrome.action.setBadgeText({
      text: "OFF",
    });
    
    chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
});


//Send Message from content_script
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
});



//set storage
// chrome.storage.sync.get("position", ({position}) => {
//     document.onmousemove = function(e)
//     {
//         var x = e.pageX;
//         var y = e.pageY;

//         const nodeName = e.target.nodeName

//         point = new CursorPoint(nodeName, x, y);

//         callbackFunc(point)

//         // e.target.style.backgroundColor = 'pink'
//         console.log("Target =>", e.target)
//         console.log("Point From Move ->", point)
//     };
// })

    // chrome.action.onClicked.addListener((tab) => {
    //     chrome.scripting.executeScript({
    //       target: { tabId: tab.id },
    //       files: ['content-script.js']
    //     });
    //   });

// //For passing message around
// chrome.runtime.onMessage.addListener((message, callback) => {
//     const tabId = getForegroundTabId();

//     if (message.data === "setAlarm") {
//         chrome.alarms.create({delayInMinutes: 5})
//     } else if (message.data === "runLogic") {
//         chrome.scripting.executeScript({file: 'logic.js', tabId});
//     } else if (message.data === "changeColor") {
//         chrome.scripting.executeScript(
//             {func: () => document.body.style.backgroundColor="orange", tabId});
//     };
// });



chrome.action.onClicked.addListener(async (tab) => {


    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {

      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });

      if (nextState === "ON") {

        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ["testCss.css"],
          target: { tabId: tab.id },
        });

      } else if (nextState === "OFF") {

        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
          files: ["testCss.css"],
          target: { tabId: tab.id },
        });
      }
    }
})