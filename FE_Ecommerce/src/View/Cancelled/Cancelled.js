import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import { f_getCartItemCancel_api } from '../../config/api';
import { toast } from 'react-toastify';
import { convertBase64ToBlob, formatCurrency, formatDateTime } from '../../Validate/Validate';
import './Cancelled.css';

const Cancelled = () => {
    const [listCart, setListCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCancelledItems = async () => {
        setIsLoading(true);
        try {
            const res = await f_getCartItemCancel_api();
            if (res.data.status === 'success') {
                setListCart(res.data.result);
            } else {
                toast.warning(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCancelledItems();
    }, []);

    const statusFormat = (status) => {
        return status === 'Canceled' ? 'Đã hủy' : status;
    };

    return (
        <div className="shopee-page-wrapper">
            <div className="shopee-container">
                <SideBar />
                <div className="shopee-content">
                    <div className="shopee-card">
                        <div className="shopee-heading">
                            <h3>Đơn hàng đã hủy</h3>
                        </div>
                        <div className="shopee-table-responsive">
                            <table className="shopee-table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thời gian</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr className="shopee-loading-row">
                                            <td colSpan="5">Loading...</td>
                                        </tr>
                                    ) : listCart.length === 0 ? (
                                        <tr className="shopee-empty-row">
                                            <td colSpan="5">Không có dữ liệu</td>
                                        </tr>
                                    ) : (
                                        listCart.map((cartUser) => (
                                            <tr key={cartUser.id} className='fadeIn' style={{ verticalAlign: "middle" }}>
                                                <td style={{ verticalAlign: "middle" }} className='d-flex align-items-center'>
                                                    <img
                                                        src={convertBase64ToBlob(cartUser.image)}
                                                        alt=""
                                                        className='mx-5'
                                                        style={{ width: "80px", height: "80px" }}
                                                    />
                                                    {cartUser.productName}
                                                </td>
                                                <td style={{ verticalAlign: "middle" }}>{formatCurrency(cartUser.total)}</td>
                                                <td style={{ verticalAlign: "middle" }}>{(cartUser.quantity)}</td>
                                                <td style={{ verticalAlign: "middle" }}>{formatDateTime(cartUser.created_at)}</td>
                                                <td style={{ verticalAlign: "middle", color: "#BB0000" }}>{statusFormat(cartUser.status)}</td>
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
    );
};

export default Cancelled;