import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { AuthProvider } from './store/context/AuthContext';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navber from './pages/Navber'
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/publicRoute';


const App = () => {
  return (
    <BrowserRouter>
    <div className="m-20">
    <AuthProvider>
    <Routes>
        <Route path="/" element={  <Navber/>} />
        <Route path="/profile" element={<><Navber/><PrivateRoute><HomePage/></PrivateRoute></> } />
        <Route path="/login" element={<><Navber/> <PublicRoute><LoginPage/></PublicRoute></>}/>
    </Routes>
    </AuthProvider>
    </div>
    </BrowserRouter>
  )
}

export default App
