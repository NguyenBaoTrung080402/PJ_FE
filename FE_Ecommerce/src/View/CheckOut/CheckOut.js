import React, { useEffect, useState } from 'react'
import { f_getCartItemByUser_api, f_order_api } from '../../config/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { formatCurrency } from "../../Validate/Validate";
const CheckOut = () => {
  const currentAccount = JSON.parse(localStorage.getItem('current-account'));
  const [data, setData] = useState([])
  const [toggleBtn, setToggleBtn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const setOpen = ()=>{
    setToggleBtn(!toggleBtn)
  }
    const handleMoney = (quantity, price) => {
        return quantity * price;
    };

  const subtotal = data.reduce((total, item) => total + handleMoney(item.quantity, item.product_price), 0);
  const totalItems = data.reduce((total, item) => total + parseFloat(item.quantity), 0);
  const shippingFee = 20000;
  const total = subtotal + shippingFee;

  const getListCart = async()=>{
    setIsLoading(true);
    try {
      const res = await f_getCartItemByUser_api()
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'success'){
        setData(res.data.result)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    getListCart()
  },[])

  const handleOrder =  async() =>{
    setIsLoading(true)
    try {
        const res = await f_order_api(data.user_id, data.products_id, data.id, data.quantity)
        if(res.data.status === 'error'){
            toast.error(res.data.message)
        }else if(res.data.status === 'success'){
            toast.success(res.data.result)
            getListCart()
        }
    } catch (error) {
        toast.error(error.message)
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                    <Link className="breadcrumb-item text-dark" to="/list-product">Product</Link>
                    <span className="breadcrumb-item active">Checkout</span>
                </nav>
            </div>
        </div>
    </div>
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-8">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>First Name</label>
                            <input className="form-control" type="text" placeholder="John"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Last Name</label>
                            <input className="form-control" type="text" placeholder="Doe"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>E-mail</label>
                            <input className="form-control" type="text" placeholder="example@email.com"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Mobile No</label>
                            <input className="form-control" type="text" placeholder="+123 456 789"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Address Line 1</label>
                            <input className="form-control" type="text" placeholder="123 Street"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Address Line 2</label>
                            <input className="form-control" type="text" placeholder="123 Street"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Country</label>
                            <select className="custom-select">
                                <option selected>United States</option>
                                <option>Afghanistan</option>
                                <option>Albania</option>
                                <option>Algeria</option>
                            </select>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>City</label>
                            <input className="form-control" type="text" placeholder="New York"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>State</label>
                            <input className="form-control" type="text" placeholder="New York"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>ZIP Code</label>
                            <input className="form-control" type="text" placeholder="123"/>
                        </div>
                        <div className="col-md-12 form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="newaccount"/>
                                <label className="custom-control-label" for="newaccount">Create an account</label>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" 
                                className="custom-control-input" 
                                onChange={setOpen}
                                checked={toggleBtn }
                                id="shipto"/>
                                <label className="custom-control-label" for="shipto" style={{userSelect: "none"}}>Ship to different address</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`mb-5 collapse${toggleBtn ? 'show fadeIn' : '' }`} id="shipping-address" >
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Shipping Address</span></h5>
                    <div className="bg-light p-30">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" placeholder="John"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" placeholder="Doe"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input className="form-control" type="text" placeholder="example@email.com"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input className="form-control" type="text" placeholder="+123 456 789"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 1</label>
                                <input className="form-control" type="text" placeholder="123 Street"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 2</label>
                                <input className="form-control" type="text" placeholder="123 Street"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select className="custom-select">
                                    <option selected>United States</option>
                                    <option>Afghanistan</option>
                                    <option>Albania</option>
                                    <option>Algeria</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input className="form-control" type="text" placeholder="New York"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input className="form-control" type="text" placeholder="New York"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input className="form-control" type="text" placeholder="123"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom">
                        <div className='d-flex justify-content-between'>
                            <h6 className="mb-3">Products </h6>
                            <span> {(totalItems)} productions</span>
                        </div>
                        {data && data.map((dataRes) =>(
                          <div className="d-flex justify-content-between">
                            <p style={{fontSize:"20px", fontWeight: "bolder", color: "#d98181"}}>{dataRes.product_name}</p>
                            <p>${formatCurrency(dataRes.product_price)}</p>
                        </div>
                        ))}
                    </div>
                    <div className="border-bottom pt-3 pb-2">
                        
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>${formatCurrency(subtotal.toFixed(2))}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">${formatCurrency(shippingFee.toFixed(2))}</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5 className='text-danger'>${formatCurrency(total.toFixed(2))}</h5>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                    <div className="bg-light p-30">
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="paypal"/>
                                <label className="custom-control-label" for="paypal">Paypal</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="directcheck"/>
                                <label className="custom-control-label" for="directcheck">Direct Check</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="banktransfer"/>
                                <label className="custom-control-label" for="banktransfer">Bank Transfer</label>
                            </div>
                        </div>
                        <button className="btn btn-block btn-primary font-weight-bold py-3" onClick={handleOrder}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CheckOut