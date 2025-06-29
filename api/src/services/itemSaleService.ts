import prisma from "../database/prisma";
import { ItemSale, Prisma } from "../generated/prisma";


export default class ItemSaleService{

    async createItemSale(data: Prisma.ItemSaleCreateInput):Promise<ItemSale>{
        const itemSale = await prisma.itemSale.create({data})
        return itemSale
    }

    async getItensSale(sl_id:number){
        const itemSale = await prisma.itemSale.findMany({
            where:{sl_id: sl_id},
            select:{
                itsl_id:true,
                itsl_quantidade:true,
                product:{
                    select:{
                        pr_id:true,
                        pr_name:true,
                        pr_price:true
                    }
                }
            }
        })

        return itemSale
    }


}