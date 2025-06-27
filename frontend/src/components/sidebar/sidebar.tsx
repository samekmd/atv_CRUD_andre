import "./index.css"



function Sidebar(){
    
    return (
        <>
            <nav className="sidebar">
                <a href="/login">Login</a>
                <a href="/products">Produtos</a>
                <a href="/sales">Vendas</a>
                <a href="/admin-config">Usuário</a>
            </nav>
        </>
    )

}


export default Sidebar;