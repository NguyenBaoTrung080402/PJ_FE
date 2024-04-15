import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { f_deleteCartItem_api, f_getCartItem_api } from '../../config/api';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { convertBase64ToBlob, formatCurrency } from '../../Validate/Validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false)
    const [cartItem, setCartItem] = useState()
    const [showModel, setShowModel] = useState(false)
    const [selectedCartId, setSelectedCartId] = useState(null);
    // const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    },[navigate])
    const handleMoney = (quantity, price) => {
        return quantity * price;
    };

    // const subtotal = cartItem.reduce((total, item) => total + parseFloat(item.product_price), 0);
    const subtotal = cartItem?.reduce((total, item) => total + handleMoney(item.quantityProduct, item.discountedPrice), 0);
    const totalItems = cartItem?.reduce((total, item) => total + parseFloat(item.quantityProduct), 0);
    const shippingFee = 1;
    const total = subtotal + shippingFee;
    
    const getCartItem = async() =>{
        setIsLoading(true);
        
        try {
            const res = await f_getCartItem_api();
            if(res.data.status === 'success'){
                setCartItem(res.data.result);
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        getCartItem()
    },[])
    // ----------------------------------------------------------------
    const handleOpen = (id) => {
        setSelectedCartId(id);
        setShowModel(true);
    };
    
    const handleClose = () => {
        setShowModel(false);
    };
    
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const res = await f_deleteCartItem_api(selectedCartId);
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setTimeout(() => {
                    window.location.reload(true);
                }, 0);
            } 
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            setShowModel(false);
        }
    };
    
  return (
    <>
      <div class="container-fluid">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                    <Link className="breadcrumb-item text-dark" to="/list-product">Product</Link>
                    <span class="breadcrumb-item active">Shopping Cart</span>
                </nav>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row px-xl-5">
        {isLoading ?(
            <div className='col-lg-8'>
                <div className="custom-loader "></div>
            </div>
        ): cartItem && cartItem.length === 0 ?(
            // <div className='col-lg-8'>
            //     <h1 className='text-center text-info'>The shopping cart is empty</h1>
            //     <h1 className='text-center text-info'>please add items to the shopping cart</h1>
            // </div>
            <div className="text-center py-5">
            <FontAwesomeIcon icon={faShoppingBasket} className="empty-cart-icon" />
            <h3>Empty shopping cart</h3>
            <p className="mt-3">Please add items to the shopping cart.</p>
        </div>
        ):(
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-light table-borderless table-hover text-center mb-0">
                    <thead class="thead-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        {cartItem?.map((cart) => (
                            <tr className='fadeIn'>
                                <td style={{verticalAlign: "middle"}} className='d-flex align-items-center'>
                                    <img 
                                    src={convertBase64ToBlob(cart.image)} 
                                    alt="" className='mx-5' style={{ width: "80px", height: "80px" }} />
                                    {cart.nameProduct}
                                </td>
                                <td class="align-middle">{formatCurrency(cart.discountedPrice)}</td>
                                <td class="align-middle">{cart.size}</td>
                                <td class="align-middle">{cart.color}</td>
                                <td class="align-middle">
                                    <div class="input-group quantity mx-auto d-flex flex-row w-50">
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-primary btn-minus">
                                                <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value={cart.quantityProduct} readOnly/>
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-primary btn-plus">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle">{formatCurrency(handleMoney(cart.quantityProduct,cart.discountedPrice))}</td>
                                <td class="align-middle"><button class="btn btn-sm btn-danger" onClick={() => handleOpen(cart.id)}><i class="fa fa-times"></i></button></td> 
                            </tr>
                        ))}
                    </tbody>
                    {showModel && (
                    <Modal show={showModel} onHide={handleClose}>
                        <Modal.Header closeButton >
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete ?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                            Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                            Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    )}
                </table>
            </div>
            )}
            <div class="col-lg-4">
                <div class="mb-30" action="">
                    <div class="input-group">
                        <input type="text" class="form-control border-0 p-4" placeholder="Coupon Code"/>
                        <div class="input-group-append">
                            <button class="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </div>
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Cart Summary</span></h5>
                <div class="bg-light p-30 mb-5 bounceIn">
                    <div class="border-bottom pb-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h6>All Cart Item</h6>
                            <h6>({totalItems} production)</h6>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>{formatCurrency(subtotal?.toFixed(2))}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Shipping</h6>
                            <h6 class="font-weight-medium">{formatCurrency(shippingFee?.toFixed(2))}</h6>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>{formatCurrency(total?.toFixed(2))}</h5>
                        </div>
                        <Link class="btn btn-block btn-primary font-weight-bold my-3 py-3" to="/check-out">Proceed To Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Cart
