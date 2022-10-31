/*global chrome*/
import ContentScriptManager from '../ContentScriptManager'
// importScripts('../ContentScriptManagerjs') - without module option



//Inititalizer js file - runs to installation of extension extension 
chrome.runtime.onInstalled.addListener(() => {

    ///global initializer
    ContentScriptManager.addContextMenu()

    //set state here from Storage
    chrome.action.setBadgeText({
      text: "OFF",
    });

    chrome.action.setBadgeBackgroundColor({color: '#4688F1'});

});

//Notification
chrome.alarms.create({ periodInMinutes: 1 })
chrome.alarms.onAlarm.addListener(() => {

  const showStayHydratedNotification = () => {
	  chrome.notifications.create({
	    type: 'basic',
	    iconUrl: '29.png',
	    title: 'Time to Hydrate',
	    message: 'Everyday I\'m Guzzlin\'!',
	    buttons: [
	      { title: 'Keep it Flowing.' }
	    ],
	    priority: 0
	  });
	}
  showStayHydratedNotification()
  console.log('log for debug')
});


//Context menu listener
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log("INFO >>>>>>-",info)
  console.log("TAB >>>>>>-",tab)

  if (info.menuItemId == "copy") {
    console.log("copy Xpath!");

    //trigger contentScript using scripting to get element.
  }

  if (info.menuItemId == "show") {
    console.log("show Xpath!");
  }
});


// const filter = {
//   url: [
//     {
//       urlMatches: 'http://localhost:5173/',
//     },
//   ],
// };

// chrome.webNavigation.onCompleted.addListener(() => {
//   console.info("The user has loaded my favorite localhost!");
// }, filter);


chrome.runtime.onConnect.addListener(() => {
   console.log("onConnect Called")
})


//Passing message - e.g from contentscript to background
chrome.runtime.onMessage.addListener( // this is the message listener
    function(request, sender, sendResponse) {


      console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");

      const runThisFunction = (oldTarget) => {
        console.log("[runThisFunction] triggered")
      }

      if (request.data === "highLight"){
        console.log("Request [onMessage]\t", request)
        runThisFunction(request.oldTarget);
        sendResponse({ success: true })
      }

      if (request.data === 'insertCSS'){
        console.log(sender);
        console.log(request);

        console.log("[GETCURRENTTAB CALLED]")

        chrome.scripting.insertCSS({
          files: ["/assets/testCss.css"], //"focus-mode.css"
          target: { tabId: sender.tab.id },
        });
        
        sendResponse({ tabId: sender.tab.id })
      }
    }
);

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await ContentScriptManager.initStorageCache();
  } catch (e) {
    console.log(e)
  }
  // Other Normal action handler logic go below

});



// //set storage
// // chrome.storage.sync.get("position", ({position}) => {
// //     document.onmousemove = function(e)
// //     {
// //         var x = e.pageX;
// //         var y = e.pageY;

// //         const nodeName = e.target.nodeName

// //         point = new CursorPoint(nodeName, x, y);

// //         callbackFunc(point)

// //         // e.target.style.backgroundColor = 'pink'
// //         console.log("Target =>", e.target)
// //         console.log("Point From Move ->", point)
// //     };
// // })

//     // chrome.action.onClicked.addListener((tab) => {
//     //     chrome.scripting.executeScript({
//     //       target: { tabId: tab.id },
//     //       files: ['content-script.js']
//     //     });
//     //   });

// // //For passing message around
// // chrome.runtime.onMessage.addListener((message, callback) => {
// //     const tabId = getForegroundTabId();

// //     if (message.data === "setAlarm") {
// //         chrome.alarms.create({delayInMinutes: 5})
// //     } else if (message.data === "runLogic") {
// //         chrome.scripting.executeScript({file: 'logic.js', tabId});
// //     } else if (message.data === "changeColor") {
// //         chrome.scripting.executeScript(
// //             {func: () => document.body.style.backgroundColor="orange", tabId});
// //     };
// // });


// //Fired when an action icon is clicked. This event will not fire if the action has a popup.
// //When you click the icons for the extension
// chrome.action.onClicked.addListener(async (tab) => {
//     const myTab = await ContentScriptManager.getCurrentTab()

//     console.log("Tab Click ->>>>", myTab)

//     chrome.scripting.executeScript({
//       target: { tabId: myTab.id },
//       files: ['./content-scripts/contentScript.js']
//     });

//     if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {

//       console.log("chrome.action.onClicked.addListener(async (tab) => {")
//       // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//       const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

//       // Next state will always be the opposite
//       const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
//       // Set the action badge to the next state
//       await chrome.action.setBadgeText({
//         tabId: tab.id,
//         text: nextState,
//       });

//       if (nextState === "ON") {

//         // Insert the CSS file when the user turns the extension on
//         await chrome.scripting.insertCSS({
//           files: ["testCss.css"],
//           target: { tabId: tab.id },
//         });

//       } else if (nextState === "OFF") {

//         // Remove the CSS file when the user turns the extension off
//         await chrome.scripting.removeCSS({
//           files: ["testCss.css"],
//           target: { tabId: tab.id },
//         });
//       }
//     }
// })

