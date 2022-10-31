/*global chrome*/

import { MENU_ID, SUB_MENU1_ID, SUB_MENU2_ID } from '../constants'

class CursorPoint{
    constructor(nodeName="zero", x=0, y=0){
        this.nodeName = nodeName
        this.x = x 
        this.y = y
    }
}


class ContentScriptManager{

    constructor(){ }

    static getCurrentTab = async () => {
        let returnTab
        try{
            let queryOptions = { active: true, lastFocusedWindow: true };
            // `tab` will either be a `tabs.Tab` instance or `undefined`.
            let [tab] = await chrome.tabs.query(queryOptions);
            returnTab = tab
        }catch(e){
            returnTab = null
            console.log("************************")
            console.time(e)
        }
        return returnTab
    }

    static changeColor = async ( files=[] ) => {
        console.time('changeColor Called')
    
        const getRandomColor =() => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    
        chrome.storage.sync.get("color", ({ color }) => {
            if (!color) {
                chrome.storage.sync.set({color: "#3aa757"}, ()=>{});
            }else{
                chrome.storage.sync.set({color: getRandomColor()}, ()=>{});
            }
        });
    
        await chrome.tabs.query({ active: true, currentWindow: true }, (val) => {
            console.table(val)
        })
    
        const generateRandomid = (id) => id+'_'+getRandomColor()
    
        // get current tab
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [mtab] = await chrome.tabs.query(queryOptions);
    
        console.log(mtab)
    
        // V3
        if (files.length > 0){
            await chrome.scripting.executeScript({
                target: { tabId: mtab.id },
                files: files
            });
        }
       
        // V2
        // await chrome.tabs.query({active: true, currentWindow: true}, (r) => {
        //         chrome.tabs.executeScript(r[0].id , {file: './content-scripts/chromeChangeBg.js'}, () => {
        //             if(chrome.runtime.lastError) {
        //                 console.error("Script injection failed: " + chrome.runtime.lastError.message);
        //             }
        //         })
        //     }
        // );
    }
    
    
    static addContextMenu = () => {
    
        let attached = false

        const menuOptions = {
            'copy': 'Copy Xpath',
            'show': 'Show Xpath',
        };
    
        try{
            const mainMenuProperties = {
                enabled: true,
                id: MENU_ID,
                title: "copy xpath",
                visible: true,
                type: 'normal',
                contexts: ['selection'],
                // onclick: (info, tab) => {
                //     console.log(info)
                //     console.log(tab)
                // }
            }
        
            const handleError = () => {
                if(chrome.runtime.lastError) {
                    console.error("(addContextMenu) Script injection failed: " + chrome.runtime.lastError.message);
                    throw chrome.runtime.lastError
                }
            }
            
            for (let [id, title] of Object.entries(menuOptions)) {
                chrome.contextMenus.create({
                  id: id,
                  title: title,
                  type: 'normal',
                  contexts: ['selection'],
                }, handleError);
            }

            attached = true
            console.log("after create")

        }catch(e){
            console.error("(catch block addContextMenu) Script injection failed:  " + e);

        }
        // chrome.contextMenus.create({
        //     id: SUB_MENU1_ID,
        //     title: "Option 1",
        //     parentId: MENU_ID,
        //     contexts:["selection"],
        // }, handleError);
          
        // chrome.contextMenus.create({
        //     id: SUB_MENU2_ID,
        //     title: "Option 2",
        //     parentId: MENU_ID,
        //     contexts:["selection"],
        // }, handleError);
    
        return attached
    }
    
    
    static removeContextMenu = () => {
    
        const handleError = () => {
            if(chrome.runtime.lastError) {
                console.error("(removeContextMenu) Script injection failed: " + chrome.runtime.lastError.message);
            }
        }
        chrome.contextMenus.remove(
            SUB_MENU1_ID,
            handleError
        )

        chrome.contextMenus.remove(
            SUB_MENU2_ID,
            handleError
        )

        chrome.contextMenus.remove(
            MENU_ID,
            handleError
        )
        console.log("after remove")
    }

    static async insertCSS(fileLocation=[], tabId){
        await chrome.scripting.removeCSS({
            files: fileLocation, //"focus-mode.css"
            target: { tabId: tabId },
        });
    }

    static async removeCSS(fileLocation=[], tabId){
        await chrome.scripting.removeCSS({
            files: fileLocation, //"focus-mode.css"
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

    static saveChromeStorage(obj, callback){
        console.log("[saveChromeStorage]", obj)
        chrome.storage.local.set(obj, () => {
            console.table(obj)
            callback()
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

export default ContentScriptManager;