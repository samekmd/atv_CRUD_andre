import "./index.css"
import Sidebar from "../../components/sidebar/sidebar";
import api from "../../services/api";
import { useState } from "react";

function User(){
    const [name, setName] = useState("")
    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleSubmit = async () => {
        const data = {
            "user_name": name,
            "user_email": email
        }
        try{
           
             await api.post("/user",{
                ...data, 
                password: password
            })
             alert("Usuário cadastrado com sucesso! ")
             setName("")
             setEmail("")
             setPassword("")
        }catch(error){
            console.error("Erro ao efetuar cadastro: ", error)
            alert("Erro ao efetuar cadastro")
        }
    }


    return (
        <>
            <Sidebar/>
            <div>
                <div className="main-content">
                <h2>Cadastro de Usuário</h2>
                <div className="form">
                    
                    <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                </div>
                <button className="btn" onClick={handleSubmit}> 
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>Cadastrar</span>     
                </button>
            </div>
            </div>
        </>
    )
}



export default User;