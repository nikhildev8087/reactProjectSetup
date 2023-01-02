import React from "react";
import { Navigate, outlet } from "react-router-dom";

const ProtectedRoute = (status) => {
    const Auth = {token:status && status ? status:false}

    return Auth.token ? <outlet/> : <Navigate to="/"/>
}

export default ProtectedRoute;
