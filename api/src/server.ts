import express from "express";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes";
import prisma from "./database/prisma";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use('/', router);



async function startServer(){
    try{
        await prisma.$connect();
         console.log("🟢 Conectado ao banco de dados com sucesso");

         app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
         })
    
    }catch(error){
         console.error("🔴 Erro ao conectar com o banco de dados:", error);
        process.exit(1); 
    }
}

startServer();



