import prisma from "../database/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import crypto from "crypto";
import { sendResetEmail } from "./emailService";

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
            token
        };
    }


   async requestResetPassword(user_emal: string) {
    const user = await prisma.user.findUnique({ where: { user_email: user_emal } });

    if (!user) {
        console.error("Usuário não encontrado para requisição de nova senha");
        throw new Error("Usuário não encontrado."); // ✅ Corrige aqui
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
        where: { user_email: user_emal },
        data: { reset_token: resetToken, reset_token_expiration: tokenExpiration }
    });

    await sendResetEmail(user_emal, resetToken);

    console.info("Token de reset: ", resetToken);
}


    async resetPassword(token:string, newPassword:string){
        
        const user = await prisma.user.findFirst({
            where: { reset_token: token, reset_token_expiration: { gte: new Date() } },
        });

        if (!user) {
            console.error("Token inválido ou expirado")
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { user_id: user?.user_id },
            data: {
                user_password: hashedPassword,
                reset_token: null,
                reset_token_expiration: null,
            },
        });
    }

}