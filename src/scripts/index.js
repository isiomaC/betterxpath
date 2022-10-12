/*global chrome */

//Upgradde to manifest v3 - uses awaits

const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


const changeColor = async ( ) => {
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

    await chrome.tabs.query({active: true, currentWindow: true}, (r) => {
            chrome.tabs.executeScript(r[0].id , {file: './chromeChangeBg.js'}, () => {
                if(chrome.runtime.lastError) {
                    console.error("Script injection failed: " + chrome.runtime.lastError.message);
                }
            })
        }
    );
}


const addContextMenu = () => {
    const menuId = "rand100"

    let attached = false

    const createProperties = {
        enabled: true,
        id: menuId,
        title: "copy xpath",
        visible: true,
        onclick: (info, tab) => {
            console.log(info)
            console.log(tab)
        }
    }

    const handleError = () => {
        if(chrome.runtime.lastError) {
            console.error("(addContextMenu) Script injection failed: " + chrome.runtime.lastError.message);
        }
    }
    chrome.contextMenus.create(
        createProperties,
        handleError
    )

    attached = true
    console.log("after create")

    return attached
}


const removeContextMenu = () => {
    const menuId = "rand100"

    const handleError = () => {
        if(chrome.runtime.lastError) {
            console.error("(removeContextMenu) Script injection failed: " + chrome.runtime.lastError.message);
        }
    }
    chrome.contextMenus.remove(
        menuId,
        handleError
    )
    console.log("after remove")
}


export {
    changeColor,
    addContextMenu,
    removeContextMenu,
    getCurrentTab
}

