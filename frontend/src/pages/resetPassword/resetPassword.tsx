import { useState } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router"
import axios from "axios"



function ResetPassword(){

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [newPassword, setNewPassword] = useState("")
    
    const navigate = useNavigate()



    const handleSubmit = async () => {
       try{
            await axios.post("http://localhost:3000/reset-password",{
                 token,
                newPassword
            })
            alert("Senha redefinida com sucesso!")
            navigate("/login")
       }catch(error){
            alert("Erro ao atualizar senha")
            console.error("Erro ao atualizar senha")
       }
    }

    return (
        <>
            <div className="main-content">
                <h2>Alterar Senha</h2>
                <div className="form">
                    
                  
                    <input type="password" placeholder="Password" onChange={(e) => setNewPassword(e.target.value)}/>
                
                </div>
                <button className="btn" onClick={handleSubmit}> 
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>Salvar</span>     
                </button>

                
            </div>
        </>
    )
}


export default ResetPassword