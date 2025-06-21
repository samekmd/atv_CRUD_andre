import prisma from "../database/prisma";
import { Product, Prisma } from "../generated/prisma";


export default class ProductService{

    async createProduct(data:Prisma.ProductCreateInput):Promise<Product>{
        const product = await prisma.product.create({data})
        return product
    }

    async getProduct(pr_id:number):Promise<Product | null>{
        return await prisma.product.findUnique({where:{pr_id: pr_id}})
    }


    async getProducts(user_id:number):Promise<Product[] | null>{
        return await prisma.product.findMany({
            where: {user_id}
        })
    }

        async updateProduct(pr_id: number, data: Prisma.ProductUncheckedUpdateInput): Promise<Product> {
        const productExists = await prisma.product.findUnique({ where: { pr_id } });

        if (!productExists) {
            throw new Error("Produto não existe");
        }

        const product = await prisma.product.update({
            where: { pr_id },
            data: data
        });

        return product;
        }


    async deleteProduct(pr_id:number):Promise<void>{
        await prisma.product.delete({
            where:{pr_id: pr_id}
        })
    }

    



}
