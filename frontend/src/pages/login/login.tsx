import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import "./index.css"

function Login(){


    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()



    const handleSubmit = async () => {
        const data = {
            "user_email": email,
            "user_password": password
        }
        try{
            const result = await axios.post("http://localhost:3000/login", data)
            const token = result.data.token
            sessionStorage.setItem("userData",token)
            alert("Login realizado com sucesso!")
            navigate("/products")
        
        }catch(error){
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
            </div>
        </>
    )
}


export default Login