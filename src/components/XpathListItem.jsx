import React from 'react'
import xmark from './xmark.svg'
import copy from './copy.png'
import "./XpathList.css"

const XpathListItem = ({ xpath, index, removeXpath }) => {
  return (
    <div className="container">
      <div>
        {xpath}
      </div>
      <div className="icon-container">
        <img src={copy} width={20} height={20}/>
        <img id={`${index}`} src={xmark} width={20} height={20} onClick={removeXpath}/>
      </div>
    </div>
  )
}

export default XpathListItem