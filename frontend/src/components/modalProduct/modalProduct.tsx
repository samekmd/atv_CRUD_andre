import React, { useEffect, useState } from "react";
import "./index.css";
import { useUserData } from "../../hook/userData";
import axios from "axios";
import api from "../../services/api";

interface ModalProps {
  onClose: () => void;
  onAddProduct: () => void;
  pr_id: number;
}

const ModalProduct: React.FC<ModalProps> = ({ onClose, onAddProduct, pr_id }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const userData = useUserData()

  const fetchProduct = async () =>{
    try{
      const response = await axios.get(`http://localhost:3000/product/${pr_id}`)
      const productData = {
        pr_name: response.data.pr_name,
        pr_price: response.data.pr_price
      }
      setName(productData.pr_name)
      setPrice(productData.pr_price)
    }catch(error){
      console.log("Erro ao carregar dados do produto no modal: ",error)
      alert("Erro ao carregar dados do produto no modal")
    }
  }

  useEffect(() => {
    setShowModal(true);
    console.log(pr_id)
    if(pr_id !== 0){
      
      fetchProduct()
    }
  }, [pr_id]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300); 
  };


  const handleSubmitProduct = async () => {
    if(pr_id !== 0){
      const data = {
        "pr_id": pr_id,
        "pr_name": name,
        "pr_price": Number(price)      
    }
    try{
        const result = await api.put("http://localhost:3000/product", data)
        alert("Produto atualizado com sucesso!")
        onAddProduct()
        handleClose()
    }catch(error){
        console.log("Erro ao cadastrar produto: ", error)
        alert("Erro ao cadastrar produto")
    }

    }else{
      
      const data = {
        "pr_name": name,
        "pr_price": Number(price),
        "user_id": userData.user_id         
    }
    try{
        const result = await api.post("http://localhost:3000/product", data)
        alert("Produto registrado com sucesso!")
        setName("")
        setPrice("")
        onAddProduct()
        handleClose()
    }catch(error){
        console.log("Erro ao cadastrar produto: ", error)
        alert("Erro ao cadastrar produto")
    }
    }
    
  }

  return (
    <>
      <div className="overlay-modal" onClick={handleClose}></div>

      <div className={`main-content-modal-pr ${showModal ? "show" : "hide"}`}>
        <h2>Produto</h2>
        <button className="close-button" onClick={handleClose}>X</button>

        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <button className="btn" onClick={() => handleSubmitProduct()}> 
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>Salvar</span>     
        </button>
      </div>
    </>
  );
};

export default ModalProduct;
