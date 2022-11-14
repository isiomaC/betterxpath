/*global chrome*/

// These run in context of the page - can get dom and send back to service-worker

import { createPopper } from '@popperjs/core';

//💡
//storeXpath and snapshot of what it represents
const buildXpath = (targetElement) => {

    let returnXpath = null;

    const evaluateXpath = (path, element) => {
        let singleNode = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (singleNode) {
            if (singleNode === element){
                console.log("Xpath Evaluation - Passed ")
                return true
            }
        }
        console.log("Xpath Evaluation - Failed \n")
        return false
    }

    const special = {
        'input': (element) => {
            let nodeName = element.nodeName.toLowerCase()
            var name = element.name

            var placeHolder = element.placeholder
            var type = element.type

            let returnVal = name ? `//${nodeName}[@name="${name}"]` : placeHolder ? `//${nodeName}[@placeholder="${placeHolder}"]` : `//${nodeName}[@name="${name}"]`
            return returnVal

        }, 
        'img': (element) => {
            
            let nodeName = element.nodeName.toLowerCase()

            let src = element.outerHTML.split(' ').find((item) => item.includes('src'))
            
            let returnVal = `//${nodeName}[@${src}]`

            return returnVal
        }, 
        'form': (element) => {

            let nodeName = element.nodeName.toLowerCase()
            var classes = element.className

            let returnVal = `//${nodeName}[@class="${classes}"]`
            return returnVal
        },
        'a': (element) => {
            let nodeName = element.nodeName.toLowerCase()
            var href = element.href

            let returnVal = `//${nodeName}[@href="${href}"]`
            return returnVal
        }
    }

    let nodeName = targetElement.nodeName.toLowerCase()

    //having id path
    if (targetElement.hasAttribute('id')){
        returnXpath = `//${nodeName}[@id="${targetElement.id}"]`

        evaluateXpath(returnXpath, targetElement)
        return returnXpath
    }

    //having input or img, most likely won have text
    if (Object.keys(special).includes(nodeName)) {

        returnXpath = special[nodeName](targetElement)

    }else{

        let text = targetElement.textContent

        returnXpath = `//${nodeName}[contains(text(), "${text}")]`
    }

    evaluateXpath(returnXpath, targetElement)
    return returnXpath
}


const addTooltip = (e) => {
    let x = e.pageX ?? e.clientX;
    let y = e.pageY ?? e.clientX;

    const nodeName = e.target.nodeName

    const getRandomId = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
   
    let currentTargetId = getRandomId()
    let currentTargetColor = e.target.backgroundColor

    e.target.setAttribute("mId", currentTargetId)

    //--------Tooltip
    chrome.storage.sync.get(['mId', 'bgColor'], (result) => {

        const removeTooltip = () => {
            const tooltip = document.querySelector('#tooltip');
            if (tooltip){
                let element = document.querySelector(`[mId="${result.mId}"]`)
                if (element){
                    element.style.backgroundColor = result.bgColor ?? ""
                    element.style.borderColor = "",
                    element.style.borderRadius = "",
                    console.log("remove tooltip [TOOLTIP]",element)
                }
                document.body.removeChild(tooltip);
            }
        }

        const addTooltip = (xpath) => {

            //tooltip
            let tooltip = document.createElement("div");
            tooltip.id = "tooltip";
            tooltip.textContent = xpath
            document.body.appendChild(tooltip);

            //arrow direction for tooltip
            let arrow = document.createElement("div")
            arrow.id = "arrow"
            arrow.setAttribute("data-popper-arrow","")
            tooltip.appendChild(arrow);

            return tooltip
        }
    
        removeTooltip()

        let xPath = buildXpath(e.target)

        const tooltip = addTooltip(xPath)
        
        const highLightElement = () => {

            //send message to insertCSS
            chrome.runtime.sendMessage({data: "insertCSS" }, function(response) {
                console.log("[Current tab id]", response.tabId)
            });

            let popper = createPopper(e.target, tooltip, {
                placement: 'top'
            })
            
        }

        highLightElement()

        //save Xpath
        chrome.storage.sync.get(["xpaths"], (result) => {

            console.log("[Result]", result)

            const savedXpaths = result?.xpaths

            let data = savedXpaths ? [...savedXpaths, xPath] : [xPath]
           
            chrome.storage.sync.set({ xpaths: data }, () => {
                console.log('***********************----->>>>>updated xpaths \n')
            });
           
        });
       
        chrome.storage.sync.set({ mId: currentTargetId, bgColor: currentTargetColor }, () => {
            console.log('currentTarget saved')
        });

    });
}


document.addEventListener('click', function(e)
{
    addTooltip(e)
});

// document.addEventListener('mouseover', function(e)
// {
//     addTooltip(e)
// });


//remove tooltip if visible
//get storage mId and bgColor, remove every popper attached to element
//clear storage mId and bgColor
//new action removeCSS to be triggered - handle in listener for bg
//remove click listener