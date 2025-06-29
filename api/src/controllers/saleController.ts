import { Request, Response } from "express";
import SaleService from "../services/saleService";

const saleService = new SaleService()

const createSale = async (req:Request, res: Response) => {
    try{
        const {products, ...rest} = req.body
        const data = {
            ...rest
        }
        const sale = await saleService.createSale(data, products) 
        res.status(201).json(sale)
    }catch(error){
        console.log("Erro ao cadastrar venda", error)
        res.status(400).json("Erro ao cadastrar venda")
    }
}

const getSale = async (req:Request, res: Response) => {
    try{
        const {sl_id} = req.params
        const sale = await saleService.getSale(Number(sl_id))
        res.status(200).json(sale)
    }catch(error){
        console.log("Erro ao selecionar venda: ", error)
        res.status(404).json("Venda não encontrada")
    }
}

const getSales = async (req:Request, res: Response) => {
    try{
        const {user_id} = req.params
        const sales = await saleService.getSales(Number(user_id))
        res.status(200).json(sales)
    }catch(error){
        console.log("Erro ao selecionar venda: ", error)
        res.status(404).json("Venda não encontrada")
    }
}


const updateSale = async (req:Request, res: Response) => {
    try{
        const {sl_id, ...rest} = req.body
        const data = {
            ...rest
        }
        const sale = await saleService.updateSale(Number(sl_id), data)
        res.status(204).json(sale)
    }catch(error){
        console.log("Erro ao atualizar venda", error)
        res.status(400).json("Erro ao atualizar venda")
    }
}


const deleteSale = async(req:Request, res:Response) => {
    try{
        const {sl_id} = req.params
        const sale = await saleService.softDeleteSale(Number(sl_id))
        res.status(204).json(sale)
    }catch(error){
        console.log("Erro ao deletar venda", error)
        res.status(400).json("Erro ao deletar venda")    
    }
}



export {
    createSale,
    getSale,
    getSales,
    deleteSale,
    updateSale
}