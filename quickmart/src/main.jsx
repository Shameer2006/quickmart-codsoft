import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this path is correct if your App file is .js or .jsx
import './index.css' // Keep this for basic global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)