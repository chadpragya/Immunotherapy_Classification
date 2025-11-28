import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({children}){
    const user =localStorage.getItem("user")
    const isAuthenticated = JSON.parse(user);
    if (!isAuthenticated?.isSignup) {
        return <Navigate to="/signup" replace />;
    }
  return children;
  
  
}
// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   let userData;

//   try {
//     userData = JSON.parse(localStorage.getItem("user")) || null;
//   } catch {
//     userData = null;
//   }

//   // Example check: redirect if user does NOT exist
//   if (!userData || !userData.isSignup) {
//     return <Navigate to="/signup" replace />;
//   }

//   return children;
// }

