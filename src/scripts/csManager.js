/*global chrome*/

class CursorPoint{
    constructor(nodeName="zero", x=0, y=0){
        this.nodeName = nodeName
        this.x = x 
        this.y = y
    }
}

class csManager{

    constructor(){ }

    static async handleListener(){
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

                if (request.greeting === "hello")
                    sendResponse({farewell: "goodbye"});
            }
        );
    }

    static async insertCSS(fileLocation, tabId){
        await chrome.scripting.removeCSS({
            files: [fileLocation], //"focus-mode.css"
            target: { tabId: tabId },
        });
    }

    static async removeCSS(fileLocation, tabId){
        await chrome.scripting.removeCSS({
            files: [fileLocation], //"focus-mode.css"
            target: { tabId: tabId },
        });
    }

    static async initStorageCache(storageCache){
        getAllStorageSyncData().then(items => {
            // Copy the data retrieved from storage into storageCache.
            Object.assign(storageCache, items);
        });
    }

    static async getAllStorageSyncData() {
        
        // Immediately return a promise and start asynchronous work
        return new Promise((resolve, reject) => {
          
            chrome.storage.sync.get(null, (items) => {

                if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
                }

                resolve(items);
            });
        });
    }

    //Desc - Location is array of js file locations to execute
    static async executeContentScript(location, tabId){
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: location //['content-script.js']
        });
    }

    //Desc - jsFunc has to be pure function declaration
    static async executeContentFunc(jsFunc, tabId, ...args){
        console.log(args)
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: jsFunc,
            args: args,
        });
    }

    static async TrackMouseMovement(trackingMouse, callbackFunc){
        let point = new CursorPoint()

        if (trackingMouse){
            
            document.onmousemove = function(e)
            {
                var x = e.pageX;
                var y = e.pageY;
    
                const nodeName = e.target.nodeName

                point = new CursorPoint(nodeName, x, y);

                callbackFunc(point)

                // e.target.style.backgroundColor = 'pink'
                console.log("Target =>", e.target)
                console.log("Point From Move ->", point)
            };

        }else{

            document.onmousemove = () => { }
            callbackFunc(point)
        }
    }

}

export {
    CursorPoint
}

export default csManager;