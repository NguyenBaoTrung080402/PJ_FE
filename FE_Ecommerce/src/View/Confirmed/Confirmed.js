import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import { f_getCartItemPurchased_api } from '../../config/api';
import { toast } from 'react-toastify';
import { convertBase64ToBlob, formatCurrency, formatDateTime } from '../../Validate/Validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShoppingBasket  } from '@fortawesome/free-solid-svg-icons';
import './Confirmed.css';
const Confirmed = () => {
    const [listCart, setListCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getConfirmedCart = async() => {
        setIsLoading(true);
        try {
            const res = await f_getCartItemPurchased_api();
            if(res.data.status === 'not found'){
                toast.warning(res.data.message);
            }
            if(res.data.status === 'success'){
                setListCart(res.data.result);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getConfirmedCart();
    }, []);

    const statusFormat = (status) => {
        let formattedStatus = null;
        let buttonClass = "status-btn ";
        let icon = null;
    
        if (status === "Confirmed") {
            formattedStatus = "ĐÃ XÁC NHẬN ĐƠN HÀNG";
            buttonClass += "status-btn-primary";
            icon = <FontAwesomeIcon icon={faCheckCircle} />;
        }
    
        return formattedStatus ? (
            <button type="button" className={buttonClass}>
                {icon} {formattedStatus}
            </button>
        ) : null;
    };
    
    
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className='container-fluid'>
                <div className='row'>
                    <SideBar />
                    <div className='col-xl-9 col-lg-9 col-md-8'>
                        <div className='card'>
                            <div className='container-fluid' style={{ minHeight: "60vh" }}>
                                <div className='col-sm-12 m-auto'>
                                    <div className='col-lg-12 table-responsive mb-5'>
                                        {isLoading ? (
                                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                                                <div className="custom-loader"></div>
                                            </div>
                                        ) : listCart && listCart.length === 0 ? (
                                            <div className="text-center py-5">
                                                <FontAwesomeIcon icon={faShoppingBasket} className="empty-cart-icon" />
                                                <h3>No Confirmed Items</h3>
                                                <p className="mt-3">You haven't confirmed any items yet.</p>
                                            </div>
                                        ) : (
                                            <table className="table table-light table-borderless table-hover text-center mb-0">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>Products</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Time</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="align-middle">
                                                    {listCart.map((cartUser) => (
                                                        <tr key={cartUser.id} className='fadeIn' style={{verticalAlign: "middle"}}>
                                                            <td style={{verticalAlign: "middle"}} className='d-flex align-items-center'>
                                                                <img src={convertBase64ToBlob(cartUser.image)} alt="" className='mx-5' style={{ width: "80px", height: "80px" }} />
                                                                {cartUser.product_name}
                                                            </td>
                                                            <td style={{verticalAlign: "middle"}}>{formatCurrency(cartUser.total)}</td>
                                                            <td style={{verticalAlign: "middle"}}>{(cartUser.quantity)}</td>
                                                            <td style={{verticalAlign: "middle"}}>{formatDateTime(cartUser.created_at)}</td>
                                                            <td style={{verticalAlign: "middle"}}>{statusFormat(cartUser.status)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmed;