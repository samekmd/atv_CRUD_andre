import Sidebar from "../../components/sidebar/sidebar";
import Imagem from "../../assets/Marketing-rafiki.svg"
import './index.css'

function LandPage(){
    return (
        <>
            <Sidebar/>
            <div className="content">
                
                <div className="text-content">
                    <p>
                        <h2>
                            Gerencie Seus Produtos e Vendas com Facilidade - Tudo em Um só Lugar!
                        </h2>
                    </p>
                    
                    <p>
                        Aqui, você pode cadastrar seus produtos de forma rápida e registrar todas as suas vendas em um só lugar. Tenha total controle do seu estoque, acompanhe seus lucros e impulsione suas vendas sem complicação.
                    </p>
                    <p>
                         <h3>✨ Por que escolher nosso sistema?</h3>        
                    </p>
                    
                    <p>
                        <li>✔ Cadastro fácil de produtos</li>
                        <li>✔ Registro detalhado de vendas</li>
                        <li>✔ Controle de estoque em tempo real</li>                         
                        <li>✔ Relatórios intuitivos para tomar melhores decisões</li>
                        

                        
                    </p>
                        <h3>Comece agora mesmo e leve seu negócio para o próximo nível! 🚀</h3>
                    
                </div>

                <div className="img-content">
                    <img src={Imagem} alt=""  width={'900px'}/>    
                </div>
                
            </div>
            
        </>
    )
}


export default LandPage;