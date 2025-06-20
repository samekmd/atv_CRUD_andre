import prisma from "../prisma/prisma";
import { Sale, Prisma } from "@prisma/client";

export default class SaleService{

    async createSale(data: Prisma.SaleCreateInput):Promise<Sale>{
        const sale = await prisma.sale.create({data})
        return sale
    }


    async getSale(sl_id:number):Promise<Sale | null>{
        const sale = await prisma.sale.findUnique({
            where:{sl_id: sl_id}
        })

        return sale
    }

    async getSales(user_id:number):Promise<Sale[] | null>{
        const sales = await prisma.sale.findMany({
            where:{user_id: user_id}
        })

        return sales
    }

    async updateSale(sl_id:number, data: Prisma.SaleUpdateInput):Promise<Sale>{
        const sale = await prisma.sale.update({
            where: {sl_id: sl_id},
            data: data
        })

        return sale
    }

    async softDeleteSale(sl_id:number):Promise<void>{
        await prisma.sale.update({
            where: {sl_id: sl_id},
            data: {sl_is_delete: true}
        })
    }

}