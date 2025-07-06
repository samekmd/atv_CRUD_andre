import { Request, Response } from "express";
import AuthService from "../services/authService";


const auth = new AuthService()


const login = async (req:Request, res:Response) => {
    const {user_email, user_password} = req.body
    
    try{
        const result = await auth.login(user_email, user_password)
        res.status(200).json(result)
    }catch(error){
        console.log("Erro ao efetuar login: ", error)
        res.status(401).json(error)
    }
}


const requestResetPasswordController = async (req: Request, res: Response) => {
    const { user_email } = req.body;

    if (!user_email) {
        res.status(400).json({ message: "E-mail é obrigatório." });
    }

    try {
        await auth.requestResetPassword(user_email);
         res.status(200).json({ message: "E-mail de redefinição enviado com sucesso." });
    } catch (error) {
        console.error("Erro ao solicitar redefinição:", error);
         res.status(500).json({ message: "Erro ao solicitar redefinição de senha." });
    }
};

const resetPasswordController = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
         res.status(400).json({ message: "Token e nova senha são obrigatórios." });
    }

    try {
        await auth.resetPassword(token, newPassword);
         res.status(200).json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
        console.error("Erro ao redefinir senha:", error);
         res.status(500).json({ message: "Erro ao redefinir senha." });
    }
};

export {
    login,
    requestResetPasswordController,
    resetPasswordController
}