import React from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './Compopents/Login.jsx'
import Register from './Compopents/Register.jsx'
import Counter from './contrex/Counter.jsx'
import PasswordForgetotp from "./Compopents/PasswordForgetotp.jsx"
 import Loginotp from"./Compopents/Loginotp.jsx"
import Checkemail from './Compopents/Checkemail.jsx'
import Updatepassword from "./Compopents/Updatepassword.jsx"
import Home from './Compopents/Home.jsx'
function App() {
  const router =createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Counter' element={<Counter/>}/>
      <Route path="/PasswordForgetotp" element={<PasswordForgetotp/>}/>
      <Route path="/Loginotp" element={<Loginotp/>}/>
      <Route path="/Checkemail" element={<Checkemail/>}/>
      <Route path="/Updatepassword" element={<Updatepassword/>}/>
      <Route path="/Home" element={<Home/>}/>
      </>
    )
  )
  

  return (
<><RouterProvider router={router} /></>

  )
}

export default App
