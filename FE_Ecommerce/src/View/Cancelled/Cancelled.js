import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { f_getCartItemCancel_api } from '../../config/api'
import { toast } from 'react-toastify'
import { convertBase64ToBlob, formatCurrency, formatDateTime } from '../../Validate/Validate'

const Cancelled = () => {
    const [listCart, setListCart] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getLitsCart = async() =>{
        setIsLoading(true);
        try {
            const res = await f_getCartItemCancel_api();
            // if(res.data.status === 'not found'){
            //     toast.warning(res.data.message)
            // }
            if(res.data.status === 'success'){
                setListCart(res.data.result);
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getLitsCart()
    },[])

    const statusFomat = (status) =>{
        if(status === "Canceled"){
            return "ĐÃ HUỶ"
        }
        return statusFomat
    }
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
        <div className='container-fluid'>
            <div className='row'>
                <SideBar/>
                <div className='col-xl-9 col-lg-9 col-md-8'>
                    <div className='card'>
                        <div className='container-fluid' style={{minHeight: "60vh"}}>
                            <div className='col-sm-12 m-auto'>
                                <div className='col-lg-12 table-responsive mb-5'>
                                    <h3>Cancelled</h3>
                                    <table class="table table-light table-borderless table-hover text-center mb-0">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>Products</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="align-middle">
                                        {isLoading ? (
                                            <tr className="d-flex justify-content-center">
                                                <td colSpan="5">
                                                    <div className="custom-loader"></div>
                                                </td>
                                            </tr>
                                        ) : listCart && listCart.length === 0 ? (
                                            <tr className="d-flex justify-content-center">
                                                <td colSpan="5">No Data</td>
                                            </tr>
                                        ) : (
                                            listCart && listCart.map((cartUser) => (
                                                <tr className='fadeIn' key={cartUser.id} style={{verticalAlign: "middle"}}>
                                                    <td style={{verticalAlign: "middle"}} className='d-flex align-items-center'>
                                                        <img 
                                                        src={convertBase64ToBlob(cartUser.image)} 
                                                        alt="" className='mx-5' style={{ width: "80px", height: "80px" }} />
                                                        {cartUser.productName}
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>{formatCurrency(cartUser.total)}</td>
                                                    <td style={{verticalAlign: "middle"}}>{(cartUser.quantity)}</td>
                                                    <td style={{verticalAlign: "middle"}}>{formatDateTime(cartUser.created_at)}</td>
                                                    <td style={{verticalAlign: "middle", color: "#BB0000"}}>{statusFomat(cartUser.status)}</td>
                                                </tr>
                                            ))
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cancelled