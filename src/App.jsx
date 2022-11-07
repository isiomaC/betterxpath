/*global chrome*/

import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ContentScriptManager, { CursorPoint } from './scripts/ContentScriptManager';
import XpathListItem from './components/XpathListItem'
const storageCache = {};

function App() {
  
  const [track, setTracking] = useState(false)

  const [xpaths, setXpaths] = useState([])

  const trackCaptured = useRef(false)

  const startDetectXPath = useCallback(async () => {
    const tab = await ContentScriptManager.getCurrentTab()
    await ContentScriptManager.executeContentScript(['/assets/contentScript.js'], tab.id)
    chrome.storage.sync.set({ isTracking: true }, () => {
      console.log("isTracking--> TRUE")
    })
  }, [])

  const stopDetectXPath = useCallback(async () => {
    const tab = await ContentScriptManager.getCurrentTab()
    await ContentScriptManager.executeContentScript(['/assets/stopDetection.js'], tab.id)
    chrome.storage.sync.set({ isTracking: false }, () => {
      console.log("isTracking--> FALSE")
    })
  }, [])

  const handleCheckBox = useCallback(async () => {
    setTracking(prev => {

      if (prev === false){
        //want to start detection
        startDetectXPath()
      }else{
        //want to stop detection
        stopDetectXPath()
      }

      return !prev
    })
  }, [])

  useEffect(()=> {

    chrome.runtime.onMessage.addListener( // this is the message listener
    function(request, sender, sendResponse) {

      if (request.data === "SaveCaptured"){
        console.log("Captured send message in react component")
        sendResponse({ success: true })
      }

  });
    try{
      chrome.storage.sync.get(["isTracking", "xpaths"], (result) => {
        console.log("[use effect query]",result)
        setXpaths(result?.xpaths)
        if (trackCaptured.current === false){
          setTracking(result?.isTracking ?? false)
          trackCaptured.current = true
        } 
      });
    }catch(e){
      console.log("error use effect", e)
    }
  
  }, [track])



  console.log("OUTSIDE EFFECT",xpaths)

  const removeXpath = useCallback((indexToRemove, myXpaths) => {
    const newXpaths = myXpaths.filter((item, index) => index !== indexToRemove)

    chrome.storage.sync.set({ xpaths: newXpaths }, () => {
      console.log("removed xpath")
      setXpaths(newXpaths)
    });

  }, [])

  return (
    <div className="App">
      <header className="header">
        <h3 className="header-item">
          Better Xpath
        </h3>
      </header>
      <div className="header-item">
          <input 
            type="checkbox" 
            id="detectXpath" 
            name="detectXpath" 
            onChange={handleCheckBox} 
            checked={track}
            value={track}/>
          <label htmlFor="detectXpath">Detect Xpath</label>
      </div>
      <div className="list-section">
        {( xpaths && xpaths.length > 0) && xpaths.map((item, index) => (
              <XpathListItem 
                key={index} 
                xpath={item} 
                removeXpath={() => removeXpath(index, xpaths)}/>
          ))}
      </div>
      <p className="read-the-docs">
        Find and Organise your Xpaths the right way!! 
      </p>
    </div>
  )
}

export default App
