import React ,{useEffect, useState } from "react"
import { useUserData } from "../../hook/userData"
import axios from "axios"
import api from "../../services/api"
import "./index.css"


interface Product{
    pr_id: number;
    pr_name: string;
    pr_price:number;
    user_id:number;
    pr_is_delete:boolean;
}

interface ProductSale{
    pr_id:number;
    itsl_quantidade:number

}

interface ModalProps{
    onClose: () => void;
    onRegisterSale: () => void
}


const ModalRegisterSale: React.FC<ModalProps> = ({onClose, onRegisterSale }) => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProducts, setSelectedProducts] = useState<ProductSale[]>([]);
    const [total, setTotal] = useState(0)
    const user = useUserData();
    
    const handleClose = () => {
        setShowModal(false);
        setTimeout(() => {
        onClose();
        }, 300); 
    };

    const fetchProducts = async () =>{
            try{
                const id  = user.user_id
                const response = await axios.get(`http://localhost:3000/product/user/${id}`)
                setProducts(response.data)
            }catch(error){
                console.error("Erro ao carregar produtos: ", error)
            }
        }

    useEffect(() => {
        setShowModal(true)
        if(user?.user_id){
            fetchProducts()   
        }
    },[user])


     const handleSelectProduct = (pr_id: number, quantidade: number) => {
        setSelectedProducts((prevSelected) => {
            const existingProduct = prevSelected.find((p) => p.pr_id === pr_id);
            if (existingProduct) {
                return prevSelected.map((p) =>
                    p.pr_id === pr_id ? { ...p, itsl_quantidade: quantidade } : p
                );
            } else {
                return [...prevSelected, { pr_id, itsl_quantidade: quantidade }];
            }
        });
    };

    useEffect(() => {
        const newTotal = selectedProducts.reduce((sum, item) => {
            const product = products.find((p) => p.pr_id === item.pr_id);
            if (product) {
                return sum + (product.pr_price * item.itsl_quantidade);
            }
            return sum
        },0)
        setTotal(newTotal)
    },[selectedProducts, products])

    const handleRegisterSale = async() => {
        if (selectedProducts.length === 0){
            alert("Nenhum produto selecionado")
            return;
        }
        try{
            await api.post("/sale", {
                user_id: user.user_id,
                sl_total: total,
                products: selectedProducts
            })
            alert("Venda registrada com sucesso!")
            onRegisterSale();
            handleClose();
        }catch(error){
            console.log("Erro ao resgistrar venda: ", error)
            alert("Erro ao resgistrar venda")
        }
    }

    return (
        <>
            
            <div className="overlay-modal" onClick={handleClose}></div>

            <div className={`main-content-modal-sl ${showModal ? "show" : "hide"}`}>
                <h2>Sale</h2>
                <button className="close-button" onClick={handleClose}>X</button>
                
                <div className="product-list">
                   {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.pr_id} className="product-item">
                                <span>{product.pr_name} - R${product.pr_price.toFixed(2)}</span>

                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Quantidade"
                                    onChange={(e) =>
                                        handleSelectProduct(product.pr_id, Number(e.target.value))
                                    }
                                />
                            </div>
                        ))
                    ) : (
                        <p>Você não possui produtos cadastrados.</p>
                    )}
                    <br />
                    <h3>Total da Venda: R$ {total.toFixed(2)}</h3>

                </div>


                 <button className="register-sale-button" onClick={handleRegisterSale}>
                    Registrar Venda
                </button>    
                    
            </div>
            
        </>
    )
}




export default ModalRegisterSale