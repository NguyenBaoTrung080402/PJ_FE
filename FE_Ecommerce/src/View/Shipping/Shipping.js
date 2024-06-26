import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import { f_getCartItemShipping_api } from '../../config/api';
import { toast } from 'react-toastify';
import { convertBase64ToBlob, formatCurrency, formatDateTime } from '../../Validate/Validate';

const Shipping = () => {
    const [listCart, setListCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getShippingItems = async () => {
        setIsLoading(true);
        try {
            const res = await f_getCartItemShipping_api();
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
        getShippingItems();
    }, []);

    const statusFormat = (status) => {
        return status === 'Shipping' ? 'Đang vận chuyển' : status;
    };

    return (
        <div className="shopee-page-wrapper">
            <div className="shopee-container">
                <SideBar />
                <div className="shopee-content">
                    <div className="shopee-card">
                        <div className="shopee-heading">
                            <h3>Đơn hàng đang vận chuyển</h3>
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
                                            <tr key={cartUser.id}>
                                                <td className="shopee-product">
                                                    <img src={convertBase64ToBlob(cartUser.image)} alt={cartUser.product_name} />
                                                    <span>{cartUser.productName}</span>
                                                </td>
                                                <td>{formatCurrency(cartUser.total)}</td>
                                                <td>{cartUser.quantity}</td>
                                                <td>{formatDateTime(cartUser.created_at)}</td>
                                                <td className="shopee-status">{statusFormat(cartUser.status)}</td>
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

export default Shipping;
