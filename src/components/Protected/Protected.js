import React from 'react'
import { Navigate } from 'react-router-dom';

export const Protected = ({isLoggedIn, children}) => {
    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
        }
        return children;  
}
