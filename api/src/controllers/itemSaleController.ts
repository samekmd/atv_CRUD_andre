import { Request, Response } from "express";
import ItemSaleService from "../services/itemSaleService";

const itemSaleService = new ItemSaleService()



const createItemSale = async (req: Request, res: Response) => {
    try{
        const data = {
            ...req.body
        }
        const itemSale = await itemSaleService.createItemSale(data)
        res.status(201).json(itemSale)
    }catch(error){
        console.log("Erro ao atribuir produtos a venda ", error)
        res.status(400).json("Erro ao atribuir produtos a venda")
    }
}


const getItensSale = async (req: Request, res: Response) => {
    try{
        const {sl_id} = req.params
        const itensSale = await itemSaleService.getItensSale(Number(sl_id))
        res.status(201).json(itensSale)
    }catch(error){
        console.log("Erro ao selecionar itens da venda", error)
        res.status(400).json("Erro ao selecionar itens da venda")
    }
}


export {
    createItemSale,
    getItensSale
}
