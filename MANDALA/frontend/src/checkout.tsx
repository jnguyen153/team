import React from 'react'
import ReactDOM from 'react-dom/client'
import Checkout from './pages/Checkout'
import './index.css'

console.log('Loading checkout page...');  // Add this to debug

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Checkout />
  </React.StrictMode>,
)