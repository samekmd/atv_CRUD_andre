import React ,{ useEffect, useState } from "react";
import axios from "axios";
import "./index.css"


interface ProductSale{
    pr_id: number;
    pr_name: string;
    pr_price:number;
    itsl_quantidade:number
}

interface ModalProps{
    onClose: () => void;
    sl_id: number
}


const ModalInfoSale: React.FC<ModalProps> = ({onClose, sl_id}) => {
    const [productsSale, setProductsSale] = useState<ProductSale[]>([])
     const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setTimeout(() => {
        onClose();
        }, 300); 
    };

    const fetchProductsSale = async () => {
        try{
            const result = await axios.get(`http://localhost:3000/itemSale/${sl_id}`)
            const resultFormated = result.data.map((product:any) => {
                return {
                    pr_id: product.product.pr_id,
                    pr_name: product.product.pr_name,
                    pr_price: product.product.pr_price,
                    itsl_quantidade: product.itsl_quantidade
                }    
            })
            setProductsSale(resultFormated)
        }catch(error){
            alert(`Erro ao listar produtos da venda '${sl_id}' `)
            console.error(`Erro ao listar produtos da venda "${sl_id}": ${error}`)
        }
    }

    useEffect(() => {
        if(sl_id){
            fetchProductsSale()
            
        }
        setShowModal(true)
    },[sl_id])

 

    return (
        <>
            <div className="overlay-modal" onClick={handleClose}></div>

            <div className={`main-content-modal-sl-info ${showModal ? "show" : "hide"}`}>
                <h2>Sale Info</h2>
                <button className="close-button" onClick={handleClose}>X</button>
                
                <div className="product-sale-container">
                    <div className="product-sale-header">
                        <span>ID</span>
                        <span>Nome</span>
                        <span>Preço</span>
                        <span>Quantidade</span>
                    </div>

                    {productsSale.map((product) => (
                        <div key={product.pr_id} className="product-sale-card">
                            <span>{product.pr_id}</span>
                            <span>{product.pr_name}</span>
                            <span>R$ {product.pr_price.toFixed(2)}</span>
                            <span>{product.itsl_quantidade}</span>
                        </div>
                    ))}
                </div>
                    
            </div>
        </>
    )
}




export default ModalInfoSale