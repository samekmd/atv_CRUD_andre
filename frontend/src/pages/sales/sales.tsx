import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./index.css"
import { useUserData } from "../../hook/userData";
import axios from "axios";
import { IoIosInformationCircle } from "react-icons/io";
import ModalRegisterSale from "../../components/modalRegisterSale/modalRegisterSale";
import ModalInfoSale from "../../components/modalInfoSale/modalInfoSale";

interface Sale{
    sl_id:number,
    sl_total:number,
    sl_data:Date
}

function Sales(){
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false)
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false)
    const [selectedSale, setSelectedSale] = useState<number>(0)
    const [sales, setSales] = useState<Sale[]>([])
    const user = useUserData()


    const formateDate = (date:string):string => {
        return date.split('T')[0]
    }

    const setSaleId = (sl_id:number) => {
        setSelectedSale(sl_id)
    }

    const toogleModalRegister = (n: number) => {
        if (n == 0){
            setIsModalRegisterOpen(false)
            
        }else if(n == 1){
           
            setIsModalRegisterOpen(true)
        }else{
            alert("Erro ao abrir modal de registro")
        }
    }

      const toogleModalInfo = (n: number, sl_id:number) => {
        if (n == 0){
            setIsModalInfoOpen(false)
            
        }else if(n == 1){
            setSaleId(sl_id)
            setIsModalInfoOpen(true)
        }else{
            alert("Erro ao abrir modal de informações")
        }
    }


    const fetchSales = async () => {
        try{
            const user_id = user.user_id
            const result = await axios.get(`http://localhost:3000/sale/user/${user_id}`)
            setSales(result.data)
        }catch(error){
            console.log("Erro ao carregar vendas: ", error)
            alert("Erro ao carregar vendas")
        }
    }


    useEffect(() => {
      if(user?.user_id){
        fetchSales()
      }
    },[user])

    return (
        <>
            <Sidebar/>
            <div className="main-content-sales">
                <div className="btn-group">
                        <button className="btn-post-sl" onClick={() => toogleModalRegister(1)}>
                             + 
                        </button>
                </div>
            </div>
        
            <div className="table-group">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Total (R$)</th>
                            <th>Data </th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.sl_id}>
                                <td>{sale.sl_id}</td>
                                <td>{sale.sl_total}</td>
                                <td>{formateDate(String(sale.sl_data))}</td>

                                <td>
                                    <button onClick={() => toogleModalInfo(1,sale.sl_id)}>
                                        <IoIosInformationCircle size={30} color="#339989"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalRegisterOpen && <ModalRegisterSale onClose={() => toogleModalRegister(0)} onRegisterSale={fetchSales}/>}
                {isModalInfoOpen && <ModalInfoSale onClose={() => toogleModalInfo(0,0)} sl_id={selectedSale}/>}
            </div>

        </>
    )
}


export default Sales;