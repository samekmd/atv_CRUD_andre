import React,{useState, useEffect} from "react";
import axios from "axios";
import "./index.css"



interface ModalProps{
    onClose: () => void;
}



const ModalRequestEmail: React.FC<ModalProps> = ({onClose}) => {
    
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState("")


    const handleClose = () => {
        onClose()
    }


    const handleSubmit = async () => {
        try{
            await axios.post("http://localhost:3000/request-reset-password",{
                user_email: email
            })
            alert(`Um email para ${email} foi enviado para resetar a senha`)
            onClose()
        }catch(error){
            alert("Erro ao enviar email")
            console.error("Erro ao enviar email")
        }
    }

    useEffect(() => {
        setShowModal(true)
    })
    
    return (
        <>
             <div className="overlay-modal" onClick={handleClose}></div>

            <div className={`main-content-modal-psw ${showModal ? "show" : "hide"}`}>
                <h2>Recuperação de senha</h2>
                <button className="close-button" onClick={handleClose}>X</button>
                
                <input className="input-psw" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <button className="register-sale-button" onClick={handleSubmit}>
                    Mandar Email 
                </button>    
                    
            </div>
        </>
    )
}


export default ModalRequestEmail;