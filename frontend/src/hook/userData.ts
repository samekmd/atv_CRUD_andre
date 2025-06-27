import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function useUserData(){

    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const token = sessionStorage.getItem("userData")
        if (token){
            try{
                const data = jwtDecode(token)
                setUser(data)
            }catch(error){
                console.log("Erro ao carregar dados do usuário: ", error)
            }
        }
    },[])
    
    return user
}