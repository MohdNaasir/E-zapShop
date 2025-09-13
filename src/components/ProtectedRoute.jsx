import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated ? children : <Navigate to='/' />}
    </div>
  )
}

export default ProtectedRoute
