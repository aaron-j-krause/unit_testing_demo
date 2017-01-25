import React from 'react'
import ReactDOM from 'react-dom'
import TopComponent from './components/top_component'

import './style.css'

const reactNode = document.createElement('div')
document.body.insertBefore(reactNode, document.body.firstChild)

ReactDOM.render(<TopComponent />, reactNode)
