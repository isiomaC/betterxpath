import { useState, useCallback, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ContentScriptManager, { CursorPoint } from './scripts/ContentScriptManager';
const storageCache = {};

function App() {
  
  const [attached, setAttached] = useState(false)

  const [track, setTracking]= useState(false)

  const [point, setPoint] = useState(new CursorPoint())

  //-----
  // Unused
  //-----
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
  //-----
  // Unused
  //-----

  const triggerTracking = useCallback(async(isOn) => {

    console.log("Is ON ->", isOn)

    setTracking(isOn)
    
    ContentScriptManager.saveChromeStorage({ tracking: isOn }, async () => {
      const tab = await ContentScriptManager.getCurrentTab()

      await ContentScriptManager.executeContentScript(["/assets/trackMouse.js"], tab.id)
    })
  
  }, [])

  const detectXPath = useCallback(async() => {
    const tab = await ContentScriptManager.getCurrentTab()
    await ContentScriptManager.executeContentScript(['/assets/contentScript.js'], tab.id)
  }, [])

  useEffect(()=> {

  }, [])

  return (
    <div className="App">
      <header>
        <h1>Better Xpath</h1>
        <button className="card-item" onClick={detectXPath}>
          Detect Xpath
        </button>
      </header>
      <div className="card">
        <p>{track ? "cursor tracking Enabled": "cursor tracking Disabled"}</p>
        <button className="card-item" onClick={track ? () => triggerTracking(false) : () => triggerTracking(true)}>
          {track ? "Disble Tracking" : "Enable Tracking" }
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
