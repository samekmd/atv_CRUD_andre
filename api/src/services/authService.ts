import prisma from "../database/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config()

const SECRET = process.env.JWT_SECRET || 'meuSegredo'

export default class AuthService{

    async login(user_email:string, user_password:string){

        const user = await prisma.user.findUnique({
            where: {user_email: user_email}
        })

        if (!user){
            throw new Error("Email inválido")
        }

        const password = await bcrypt.compare(user_password, user.user_password)

        if(!password){
            throw new Error("Senha inválida")
        }

        if(user.user_status !== 'A'){
            throw new Error("Usuário bloqueado")
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                user_email: user.user_email,
                user_admin: user.user_admin
            },
            SECRET,
            {expiresIn: '1d'}
        )

        return {
            message:'Login realizado com sucesso',
            token,
            user:{
                id: user.user_id,
                nome: user.user_name,
                email: user.user_email,
                admin: user.user_admin
            }
        };
    }
}