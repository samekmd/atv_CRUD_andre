import { Request, Response } from "express";
import { UserService } from "../services/userService";
import bcrypt from 'bcrypt';


async function cript_password(password:string):Promise<String>{
    try{
        const hashed_password = await bcrypt.hash(password, 10)
        return String(hashed_password)
    }catch(error){
        console.log("Erro ao criptografar senha: " + error)
        throw error
    }
}


const userService = new UserService()

const createUser = async (req: Request, res:Response) => {
    try{
        const { password, ...rest } = req.body;

        const user_password = await cript_password(password)

        const data = {
            ...rest,
            user_password: user_password,
             user_status: "A",
             user_quant_acesso: 1
        };
        const user = await userService.createUser(data)
        res.status(201).json({id: user.user_id})
    }catch(error){
        console.log("Erro ao criar usuário ", error )
        res.status(400).json(error)
    }
}


const updateUser = async (req: Request, res:Response) =>{
    try{
        const {user_id , ...rest} = req.body

        const data = {
            ...rest
        }

        const user = await userService.updateUser(user_id, data)
        res.status(204).json("Usuário atualizado com sucesso!")
    }catch(error){
        console.log("Erro ao atualizar usuário ", error)
        res.status(400).json(error)
    }
}


const deleteUser = async (req: Request, res:Response) =>{
    try{
        const {user_id} = req.params
        const id = Number(user_id) 
        const user = await userService.deleteUser(id)
        res.status(204).json("Usuário deletado com sucesso!")
    }catch(error){
        console.log("Erro ao deletar usuário ", error)
        res.status(400).json(error)
    }
}


const getUser = async (req: Request, res:Response) =>{
    try{
        const {user_id} = req.params
        const id = Number(user_id)
        const user = await userService.getUser(id)
        res.status(200).json(user)
    }catch(error){
        console.log("Erro ao selecionar usuário ", error)
        res.status(400).json(error)
    }
}

const getUsers = async (req: Request, res:Response) =>{
    try{
        const users = await userService.getUsers()
        res.status(200).json(users)
    }catch(error){
        console.log("Erro ao selecionar usuários ", error)
        res.status(400).json(error)
    }
}

export {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers
}