import prisma from "../database/prisma";
import { User, Prisma } from "../generated/prisma";


export class UserService{

    

    async createUser(data: Prisma.UserCreateInput):Promise<User>{
        console.log(data)
        const user = await prisma.user.create({data})
        return user
    }


    async getUser(user_id:number):Promise<User | null>{
        const user = await prisma.user.findUnique({where: {user_id:user_id}})
        return user
    }

    async getUsers():Promise<User[]>{
        const users = await prisma.user.findMany({where: {user_admin:false}})
        return users
    }

    async updateUser(user_id:number ,data:Prisma.UserCreateInput):Promise<User>{

        const userExists = await prisma.user.findUnique({
            where: {user_id:user_id}
        })


        if (!userExists){
            throw new Error("usuário não existe")
        }

       const user = await prisma.user.update({
          where: {user_id: user_id},
          data: data
        })

        return user
    }

    async deleteUser(user_id:number):Promise<void>{
        await prisma.user.delete({
            where: {user_id:user_id}
        })
    }
}