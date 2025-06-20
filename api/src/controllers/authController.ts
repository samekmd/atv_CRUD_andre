import { Request, Response } from "express";
import AuthService from "../services/authService";


const auth = new AuthService()


const login = async (req:Request, res:Response) => {
    try{
        const {user_email, user_password} = req.body
        const result = await auth.login(user_email, user_password)
        res.status(200).json(result)
    }catch(error){
        console.log("Erro ao efetuar login: ", error)
        res.status(401).json(error)
    }
}

export {
    login
}