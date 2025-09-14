import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { authContext } from '../context/authContext'

const App = () => {
  const { authUser }=useContext(authContext);
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster/>
         <Routes>
         <Route path="/" element={authUser ?<HomePage />:<Navigate to="/login"/>}/>
         <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/"/>}/>
         <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/"/>}/>
        </Routes>    
    </div>
  )
}
export default App