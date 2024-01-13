import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { f_deleteCartItem_api, f_getCartItem_api } from '../../config/api';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';


const Cart = () => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false)
    const [cartItem, setCartItem] = useState([])
    const [showModel, setShowModel] = useState(false)
    const [selectedCartId, setSelectedCartId] = useState(null);
    const [cartResult, setCartResult] = useState([])
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    },[navigate])

    useEffect(() => {
        // Tính tổng giá trị và số lượng sản phẩm khi cartItem thay đổi
        const total = cartItem.reduce((acc, cart) => acc + cart.price, 0);
        const itemsCount = cartItem.reduce((acc, cart) => acc + cart.quantity, 0);
        setTotalPrice(total);
        setTotalItems(itemsCount);
    }, [cartItem]);
    
    const getCartItem = async() =>{
        setIsLoading(true);
        
        try {
            const res = await f_getCartItem_api();
            if(res.data.status === 'success'){
                setCartItem(res.data.products);
                setCartResult(res.data.result)
                console.log(res.data.result)
            }
        } catch (error) {
            // toast.error(error.message)
        }finally{
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        getCartItem()
    },[])
    // ----------------------------------------------------------------
    const handleOpen = useCallback((id) => {
        setSelectedCartId(id);
        setShowModel(true);
    }, []);
    
    const handleClose = useCallback(() => {
        setShowModel(false);
    }, []);
    
    const handleDelete = useCallback(async () => {
        // setIsLoading(true);
        window.location.reload(true);
        try {
            const res = await f_deleteCartItem_api(selectedCartId);
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                
            } else if (res.data.status === 'not found') {
                toast.warning(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            setShowModel(false);
        }
    }, [selectedCartId]);
    
  return (
    <>
      <div class="container-fluid">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <Link class="breadcrumb-item text-dark" to="/">Home</Link>
                    <Link class="breadcrumb-item text-dark" to="/list-product">Shop</Link>
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
            <div className='col-lg-8'>
                <h1 className='text-center text-info'>The shopping cart is empty</h1>
                <h1 className='text-center text-info'>please add items to the shopping cart</h1>
            </div>
        ):(
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-light table-borderless table-hover text-center mb-0">
                    <thead class="thead-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        {/* {cartResult && cartResult.map((cartRe)=>(
                            cartItem && cartItem.map((cart)=>(
                                <tr key={cartRe.id} className='fadeInUp'>
                                <td class="align-middle">
                                    <img src={`http://127.0.0.1:8000/${cart.image}`} alt="" className='mx-2' style={{ width: "50px" }} />
                                    {cart.name}
                                </td>
                                <td class="align-middle">{cart.price}</td>
                                <td class="align-middle">
                                    <div class="input-group quantity mx-auto" style={{ width: "100px" }}>
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-primary btn-minus">
                                                <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value={cartResult.quantity} />
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-primary btn-plus">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle">{cart.price}</td>
                                <td class="align-middle"><button class="btn btn-sm btn-danger" onClick={() => handleOpen(cartRe.id)}><i class="fa fa-times"></i></button></td>
                            </tr>
                            ))
                        ))} */}
                        {cartItem && cartItem.map((cart) => (
                            <tr className='fadeInUp'>
                                <td class="align-middle">
                                    <img src={`http://127.0.0.1:8000/${cart.image}`} alt="" className='mx-2' style={{ width: "50px" }} />
                                    {cart.name}
                                </td>
                                <td class="align-middle">{cart.price}</td>
                                <td class="align-middle">
                                    <div class="input-group quantity mx-auto" style={{ width: "100px" }}>
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-primary btn-minus">
                                                <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value={cartResult.quantity} />
                                        <div class="input-group-btn">
                                            <button class="btn btn-sm btn-primary btn-plus">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle">{cart.price}</td>
                                {cartResult && cartResult.map((cartRe) =>(
                                    <td class="align-middle"><button class="btn btn-sm btn-danger" onClick={() => handleOpen(cartRe.id)}><i class="fa fa-times"></i></button></td>
                                ))}  
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
                <form class="mb-30" action="">
                    <div class="input-group">
                        <input type="text" class="form-control border-0 p-4" placeholder="Coupon Code"/>
                        <div class="input-group-append">
                            <button class="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form>
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Cart Summary</span></h5>
                <div class="bg-light p-30 mb-5 bounceIn">
                    <div class="border-bottom pb-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h6>All Cart Item</h6>
                            <h6>({totalItems} production)</h6>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>${totalPrice.toFixed(2)}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Shipping</h6>
                            <h6 class="font-weight-medium">20000</h6>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>${(totalPrice + 20000).toFixed(2)}</h5>
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
