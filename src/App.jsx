import { useState, useCallback, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { changeColor, addContextMenu, removeContextMenu } from './scripts';

function App() {
  const [attached, setAttached] = useState(false)

  const handleMenu = useCallback((phrase)=> {
    if (phrase == "Enable"){
      addContextMenu()
      setAttached(true)
    }

    if (phrase == "Disable"){
      removeContextMenu()
      setAttached(false)
    }
  }, [])

  useEffect(()=> {
    
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
      </header>
      <div className="card">
        <button className="card-item" onClick={() => handleMenu(attached ? "Disable": "Enable")}>
          {attached ? "Disbable Menu" : "Enable menu" }
        </button>
        <button className="card-item" onClick={changeColor}>
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
