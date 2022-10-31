/*global chrome*/

import { createPopper } from '@popperjs/core';

export function main({target, tooltip, options}) {
    
    let popper = createPopper(target, tooltip, options)
    console.log(
        "Is chrome.runtime available here?",
        typeof chrome.runtime.sendMessage == "function",
    );
    return popper
}