import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom' // ✅ sax


import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProtectedRoute from './components/auth/ProtectRoute'
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/dashboard'  element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
       {/* <Route path='/admin' element={<AdminProtected><Admin/></AdminProtected>}></Route>  */}
      <Route path='/' element={<Navigate to="/login" replace />} />
    
    </Routes>
  )
}

export default App
