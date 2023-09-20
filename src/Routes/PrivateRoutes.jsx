import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
const PrivateRoutes = ({children}) => {
   const { isAuth, userData, login, logout } = useAuth(); 
   const navigate  =useNavigate()
   let Auth=isAuth;
   if(!Auth){
      // navigate("/login")
   return <Navigate to="/login" />
   }
  return (
   children
  )
}

export default PrivateRoutes
