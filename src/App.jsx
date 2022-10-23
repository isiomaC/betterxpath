import { useState, useCallback, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ContentScriptManager, { CursorPoint } from './scripts/ContentScriptManager';
const storageCache = {};

function App() {
  
  const [attached, setAttached] = useState(false)

  const [track, setTracking]= useState(false)

  const [point, setPoint] = useState(new CursorPoint())

  const handleMenu = useCallback((phrase)=> {
    if (phrase == "Enable"){
      ContentScriptManager.addContextMenu()
      setAttached(true)
    }

    if (phrase == "Disable"){
      ContentScriptManager.removeContextMenu()
      setAttached(false)
    }
  }, [])

  const handlePoint = useCallback((mPoint) => {
    setPoint(mPoint)
  }, [])

  const startTracking = useCallback(async() => {
    let track = true
    setTracking(track)

    await ContentScriptManager.TrackMouseMovement(track, handlePoint)
  }, [])

  const endTracking = useCallback(async() => {
    let track = false
    setTracking(track)

    await ContentScriptManager.TrackMouseMovement(track, handlePoint)
  }, [])

  const triggerContentScript = useCallback(async() => {
    const tab = await ContentScriptManager.getCurrentTab()
    await ContentScriptManager.executeContentScript(['/assets/contentScript.js'], tab.id)
  }, [])

  useEffect(()=> {
    
    // console.log( ContentScriptManager.TrackMouseMovement(true, handlePoint))

    //-----------For v3 use async await initStorageCache;-------------
    
    // chrome.action.onClicked.addListener(async (tab) => {
    //   try {
    //     await csManager.initStorageCache();
    //   } catch (e) {
    //     // Handle error that occurred during storage initialization.
    //     console.log(e)
    //   }
    //   // Normal action handler logic.

    // });
    
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <header>
        <h1>Better Xpath</h1>
        <button className="card-item" onClick={triggerContentScript}>
          triggerCS
        </button>
      </header>
      <div className="card">
        <p>{track ? "cursor tracking Enabled": "cursor tracking Disabled"}</p>
        <button className="card-item" onClick={track ? endTracking : startTracking}>
          {track ? "Disble Tracking" : "Enable Tracking" }
        </button>
        <button className="card-item" onClick={() => handleMenu(attached ? "Disable": "Enable")}>
          {attached ? "Disbable Menu" : "Enable menu" }
        </button>
        <button className="card-item" onClick={() => ContentScriptManager.changeColor(['/assets/chromeChangeBg.js']) }>
          Change color
        </button>
      </div>
      <p className="read-the-docs">
        Find and Organise your Xpaths the right way!! 
      </p>
    </div>
  )
}

export default App
