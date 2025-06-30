import { useNavigate } from 'react-router';
import React from 'react';

interface PrivateRouteProps{
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    
    const token = sessionStorage.getItem("userData");
    const navigate = useNavigate()
    if(!token){
        navigate("/")
    }

    return <>{children}</>
}


export default PrivateRoute
