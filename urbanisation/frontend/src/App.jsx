import axios from 'axios'
import { useState } from 'react'
import './index.css'
import CitzenRegister from './Citzen_register.jsx'
import CitzenLogin from './Citzen_login.jsx'
import StaffRegister from './Staff_register.jsx'
import StaffLogin from './Staff_login.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position='top-center' autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/staff-register" element={<StaffRegister />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/register" element={<CitzenRegister />} />
          <Route path="/login" element={<CitzenLogin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
