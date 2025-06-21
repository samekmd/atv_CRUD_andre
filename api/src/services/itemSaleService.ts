import prisma from "../database/prisma";
import { ItemSale, Prisma } from "../generated/prisma";


export default class ItemSaleService{

    async createItemSale(data: Prisma.ItemSaleCreateInput):Promise<ItemSale>{
        const itemSale = await prisma.itemSale.create({data})
        return itemSale
    }

    async getItensSale(sl_id:number):Promise<ItemSale[] | null>{
        const itemSale = await prisma.itemSale.findMany({
            where:{sl_id: sl_id},
            include: {
                sale: true,
                product:true
            }
        })

        return itemSale
    }


}