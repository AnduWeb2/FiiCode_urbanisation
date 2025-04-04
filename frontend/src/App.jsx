import axios from 'axios'
import { useState } from 'react'
import './App.css'
import CitzenRegsier from './Citzen_register.jsx'
function App() {
  return (
    <>
      <div className="App">
        <h1>Welcome to the Registration Page</h1>
        <CitzenRegsier />
      </div>
    </>
  )
}

export default App
