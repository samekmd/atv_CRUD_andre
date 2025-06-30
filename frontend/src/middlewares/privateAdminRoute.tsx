import React from "react";
import { useNavigate } from "react-router";
import { useUserData } from "../hook/userData";

interface PrivateAdminRouteProps{
    children: React.ReactNode;
}


const PrivateAdminRoute: React.FC<PrivateAdminRouteProps> = ({children}) => {

    const navigate = useNavigate();
    const user = useUserData();
    
    if(!user?.user_admin){
        navigate("/")
    }

    return <>{children}</>
}


export default PrivateAdminRoute