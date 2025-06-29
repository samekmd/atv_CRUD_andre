import prisma from "../database/prisma";
import { Sale, Prisma, Product } from "../generated/prisma";
import ItemSaleService from "./itemSaleService";

interface ProductSale {
    itsl_quantidade: number,
    pr_id:number
}

export default class SaleService{

    
    async createSale(data: Prisma.SaleCreateInput, products: ProductSale[]):Promise<Sale>{
        return await prisma.$transaction(async (tx) => {

            const sale = await tx.sale.create({data})

            const itemSaleData = products.map(product => ({
                itsl_quantidade: product.itsl_quantidade,
                sl_id: sale.sl_id,
                pr_id: product.pr_id
            }));

            await tx.itemSale.createMany({
                data:itemSaleData
            })
            
            return sale
        })

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