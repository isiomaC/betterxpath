/*global chrome*/

//Send Message from content_script

// These run in context of the page - can get dom and send back to service-worker
// import { createPopper } from '/assets/popperJsCore.025f931a';

// import { createPopper } from '@popperjs/core';


// //💡
// //storeXpath and snapshot of what it represents
// const buildXpath = (targetElement) => {

//     let returnXpath = null;

//     function evaluateXpath(path, element) {
//         let singleNode = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//         if (singleNode) {
//             if (singleNode === element){
//                 console.log("Xpath Evaluation - Passed ")
//                 return true
//             }
//         }
//         console.log("Xpath Evaluation - Failed")
//         return false
//     }

//     const special = {
//         'input': (element) => {
//             let nodeName = element.nodeName.toLowerCase()
//             var name = element.name

//             var placeHolder = element.placeholder
//             var type = element.type

//             let returnVal = name ? `//${nodeName}[@name="${name}"]` : placeHolder ? `//${nodeName}[@placeholder="${placeHolder}"]` : `//${nodeName}[@name="${name}"]`
//             return returnVal

//         }, 
//         'img': (element) => {
            
//             let nodeName = element.nodeName.toLowerCase()

//             let src = element.outerHTML.split(' ').find((item) => item.includes('src'))
            
//             let returnVal = `//${nodeName}[@${src}]`

//             return returnVal
//         }, 
//         'form': (element) => {

//             let nodeName = element.nodeName.toLowerCase()
//             var classes = element.className

//             let returnVal = `//${nodeName}[@class="${classes}"]`
//             return returnVal
//         },
//         'a': (element) => {
//             let nodeName = element.nodeName.toLowerCase()
//             var href = element.href

//             let returnVal = `//${nodeName}[@href="${href}"]`
//             return returnVal
//         }
//     }

//     let nodeName = targetElement.nodeName.toLowerCase()

//     //having id path
//     if (targetElement.hasAttribute('id')){
//         returnXpath = `//${nodeName}[@id="${targetElement.id}"]`

//         evaluateXpath(returnXpath, targetElement)
//         return returnXpath
//     }

//     //having input or img, most likely won have text
//     if (Object.keys(special).includes(nodeName)) {

//         returnXpath = special[nodeName](targetElement)

//     }else{

//         let text = targetElement.textContent

//         returnXpath = `//${nodeName}[contains(text(), "${text}")]`
//     }

//     evaluateXpath(returnXpath, targetElement)
//     return returnXpath
// }

// const addTooltip = (e, createPopper) => {
//     let x = e.pageX ?? e.clientX;
//     let y = e.pageY ?? e.clientX;

//     const nodeName = e.target.nodeName

//     const getRandomId = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//           color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     }
   
//     let oldTargetMid = getRandomId()
//     let oldTargetColor = e.target.backgroundColor

//     e.target.setAttribute("mId", oldTargetMid)

//     const others = { 
//         x, y, nodeName, 
//         oldTarget: {
//             mId: oldTargetMid,
//             bgColor: oldTargetColor
//         }
//     }

//     //--------Tooltip
//     chrome.storage.sync.get(['mId', 'bgColor'], (result) => {

//         console.log('mId currently is ' + result.mId);
//         console.log('bgColor currently is ' + result.bgColor);

//         const removeTooltip = () => {
//             const tooltip = document.querySelector('#tooltip');
//             if (tooltip){
//                 let element = document.querySelector(`[mId="${result.mId}"]`)
//                 if (element){
//                     element.style.backgroundColor = result.bgColor ?? ""
//                     console.log("remove tooltip[TOOLTIP]",element)
//                 }
//                 document.body.removeChild(tooltip);
//             }
//         }

//         const addTooltip = (xpath) => {
//             let wrapper = document.createElement("div");
//             wrapper.id = "tooltip";
//             wrapper.textContent = xpath
//             document.body.appendChild(wrapper);
//             return wrapper
//         }
    
//         removeTooltip()

//         let xPath = buildXpath(e.target)

//         console.log(xPath)

//         const tooltip = addTooltip(xPath)
        
//         const highLightElement = () => {

//             e.target.style.backgroundColor = "blue"
//             let popper = createPopper(e.target, tooltip, {
//                 placement: 'top'
//             })
//             console.log(popper)
//         }
    
//         highLightElement()
       
//         chrome.storage.sync.set({ mId: oldTargetMid, bgColor: oldTargetColor }, () => {
//             console.log('oldTarget saved')
//         });

//     });
// }

// // These run in context of the page - can get dom and send back to service-worker
// chrome.storage.local.get(['tracking'], (result) => {
   
//     console.log('tracking currently is ' + result.tracking);

//     if (result?.tracking === true){
//         document.onmouseover = async (e) => {
//             var x = e.pageX;
//             var y = e.pageY;

//             const nodeName = e.target.nodeName

//             console.log(nodeName)

//             if (nodeName.toLowerCase() === 'body' || e.target === document.getElementById("root")){
//                 return
//             }else{

//                 // const { createPopper } = await import('@popperjs/core');

//                 addTooltip(e, createPopper)

//                 // let point = {
//                 //     nodeName, x, y
//                 // }
    
//                 // // e.target.style.backgroundColor = 'pink'
//                 // console.log("Target =>", e.target)
//                 // console.log("Point From Move ->", point)
//             }

//         };

//     }else{

//         document.onmouseover = () => { }

//     }
// })
