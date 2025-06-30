import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config

const PASSWORD = process.env.EMAIL_PASSWORD
const USER_EMAIL = process.env.EMAIL_USER

const sendResetEmail = async(to: string, resetToken:string) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:USER_EMAIL,
            pass:PASSWORD
        }
    })

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`

    await transporter.sendMail({
        from: "Suporte <seuemail@gmail.com>",
        to,
        subject: "Redefinição de Senha",
        html: `
            <h3>Olá,</h3>
            <p>Você solicitou a redefinição da sua senha. Clique no link abaixo para criar uma nova senha:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>Se não foi você, ignore este e-mail.</p>
        `,
    });
}


export {
    sendResetEmail
}