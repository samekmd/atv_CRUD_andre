import { useEffect, useState } from "react";
import { useUserData } from "../../hook/userData";
import Sidebar from "../../components/sidebar/sidebar";
import ModalProduct from "../../components/modalProduct/modalProduct";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./index.css"
import api from "../../services/api";

interface Product{
    pr_id: number;
    pr_name: string;
    pr_price:number;
    user_id:number;
    pr_is_delete:boolean;
}


function Products(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const[numberUpdateModal, setNumberUpdateModal] = useState(0)
    const user = useUserData()

    const toogleModal = (n: number, update: number) => {
        if (n == 0){
            setIsModalOpen(false)
            
        }else if(n == 1){
            setNumberUpdateModal(update)
            setIsModalOpen(true)
        }else{
            alert("Erro ao abrir modal")
        }
    }

    const fetchProducts = async () =>{
            try{
                const id  = user.user_id
                const response = await axios.get(`http://localhost:3000/product/user/${id}`)
                setProducts(response.data)
            }catch(error){
                console.log("Erro ao carregar produtos: ", error)
            }
        }
    
    useEffect(() => {
        

        if(user?.user_id){
            fetchProducts();
        }
    },[user])


    const handleDeleteProduct = async (pr_id:number) => {
        try{
            let sureDelete = confirm("Você tem certeza que deseja deletar o produto?")
            
            if(sureDelete){
                const result = await api.put(`http://localhost:3000/product/delete/${pr_id}`)
                alert("Produto deletado com sucesso!")
                fetchProducts()
            }
        }catch(error){
            console.log("Erro ao deletar produto: ", error)
            alert("Erro ao deletar produto")
        }

            
    }

    return (
        <>
            <Sidebar/>
            <div className="main-content-product">
                <div className="btn-group">
                        <button className="btn-post-pr" onClick={() => toogleModal(1,0)}>
                             + 
                        </button>
                </div>

                <div className="table-group">
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Ações</th>  
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.pr_id}>

                                        <td>{product.pr_id}</td>
                                        <td>{product.pr_name}</td>
                                        <td>{product.pr_price}</td>
                                    
                                        <td>
                                             <button title="Editar" onClick={() => toogleModal(1,product.pr_id)}>
                                                <FaEdit size={18} color="#339989" />
                                            </button>
                                            <button title="Excluir" onClick={() => handleDeleteProduct(product.pr_id)}>
                                                <FaTrash size={18} color="#E63946" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        {isModalOpen && <ModalProduct onClose={() => toogleModal(0,0)} onAddProduct={fetchProducts} pr_id={numberUpdateModal}/>}
                </div>

                
            </div>

            
        </>
    )
}


export default Products;