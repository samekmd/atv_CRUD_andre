import { Request, Response } from "express";
import ProductService from "../services/productService";


const productService = new ProductService()

const createProduct = async (req:Request, res: Response) => {
    try{
        const data = {
            ...req.body
        }
        const product = await productService.createProduct(data)
        res.status(201).json(product)
    }catch(error){
        console.log("Erro ao cadastrar produto ", error)
        res.status(400).json(error)
    }
}

const getProduct = async (req:Request, res: Response) => {
    try{
        const {pr_id} = req.params
        const product = await productService.getProduct(Number(pr_id))
        res.status(200).json(product)
    }catch(error){
        console.log("Erro ao listar produto: ", error)
        res.status(400).json(error)
    }
} 

const getProducts = async (req:Request, res: Response) => {
    try{
        const{user_id} = req.params
        const products = await productService.getProducts(Number(user_id))
        res.status(200).json(products)
    }catch(error){
        console.log("Erro ao listar vários produtos: ", error)
        res.status(400).json(error)
    }
} 


const updateProduct = async (req:Request, res: Response) => {
    try{
        const{pr_id, ...rest} = req.body
        const data = {
            ...rest
        }
        const product = await productService.updateProduct(Number(pr_id), data)
        res.status(204).json("Produto atualizado com sucesso!")
    }catch(error){
        console.log("Erro ao atualizar produto: ", error)
        res.status(400).json(error)
    }
} 


const softDeleteProduct = async (req:Request, res: Response) => {
    try{
        const {pr_id} = req.params
        const data ={
            pr_is_delete: true
        }
        const product = await productService.updateProduct(Number(pr_id), data)
        res.status(204).json("Produto deletado com sucesso!")
    }catch(error){
        console.log("Erro ao deletar produto: ", error)
        res.status(400).json(error)
    }
} 


export {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    softDeleteProduct
}