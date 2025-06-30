import "./index.css"
import { useUserData } from "../../hook/userData";



function Sidebar(){

    const user = useUserData()

  


    return (
        <>
            <nav className="sidebar">

                <div className="home">
                    <a href="/">SALES</a>
                </div>
                
                <div className="links">
                    <a href="/login">Login</a>
                    <a href="/products">Produtos</a>
                    <a href="/sales">Vendas</a>
                    {user?.user_admin && (
                        <a href="/admin-config">Usuário</a>
                    )}
                </div>
                
            </nav>
        </>
    )

}


export default Sidebar;