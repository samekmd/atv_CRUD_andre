import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import "./index.css"
import ModalRequestEmail from "../../components/modalRequestEmail/modalRequestEmail"

function Login(){


    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userAttempts, setUserAttempts] = useState(0)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const navigate = useNavigate()

    const toogleModal = (n: number) => {
        if (n == 0){
            setIsOpenModal(false)
        }else if(n == 1){
            setIsOpenModal(true)
        }else{
            alert("Erro ao abrir modal")
        }
    }


    const handleSubmit = async () => {
        const data = {
            "user_email": email,
            "user_password": password
        }
        try{
            if (userAttempts > 3){
                alert("Usuário bloqueado por excesso de tentativas")
                setUserAttempts(0)
            }else{
                const result = await axios.post("http://localhost:3000/login", data)
                const token = result.data.token
                sessionStorage.setItem("userData",token)
                alert("Login realizado com sucesso!")
                navigate("/products")
                setUserAttempts(0)
            }  
        }catch(error){
            setUserAttempts(userAttempts + 1)
            console.log("Erro ao efetuar login: ", error)
            alert("Erro ao efetuar login")
        }
    }




    return (
        <>
            <div className="main-content">
                <h2>Login</h2>
                <div className="form">
                    
                  
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                
                </div>
                <button className="btn" onClick={handleSubmit}> 
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>Entrar</span>     
                </button>
                
                <button className="btn-reset-pass" onClick={() => toogleModal(1)}>
                    <p>Esqueceu a senha?</p>
                </button>
                
                {isOpenModal && <ModalRequestEmail onClose={() => toogleModal(0)}/>}
            </div>
        </>
    )
}


export default Login