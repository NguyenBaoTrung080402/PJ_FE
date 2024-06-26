import React, { createContext, useState, useEffect } from 'react'
import "./Topbar.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { f_getAllProduct_api } from '../../config/api';
import ListProduct from '../../View/Product/ListProduct';
import { convertBase64ToBlob } from '../../Validate/Validate';


const TopBar = () => {
    const token = localStorage.getItem('token');
    const currentAccount = JSON.parse(localStorage.getItem('current-account'));
    const [setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await f_getAllProduct_api(); // Gọi API tìm kiếm sản phẩm với query
            if (response.data.status === 'success') {
                navigate(`/list-product?search=${query}`);
            } else {
                console.error('Lỗi khi tìm kiếm sản phẩm:', response.data.message);
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error.message);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('current-account');
        toast.success("Log out successfully")
        navigate("/");
    };

    const checkRole = (role) => {
        if (currentAccount && currentAccount.authority.includes("ROLE_ADMIN")) {
            return true;
        }
        return false;
    };
    
    return (
    <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
            <div className="col-lg-6 d-none d-lg-block">
                <div className="d-inline-flex align-items-center h-100">
                    <NavLink className="text-body" to="/about" style={{color: "#6C757D", marginRight: "1rem"}}>About</NavLink>
                    <NavLink className="text-body" to="/contact" style={{color: "#6C757D", marginRight: "1rem"}}>Contact</NavLink>
                    {checkRole('ROLE_ADMIN') ? (
                            <NavLink className="text-body" to="/admin-page" style={{ color: "#6C757D", marginRight: "1rem" }}>Admin</NavLink>
                        ):(
                            <NavLink className="text-body" to="/admin-page" style={{ color: "#6C757D", marginRight: "1rem", display: "none" }}>Admin</NavLink>
                        )}
                    {token ? (
                        <NavLink className="text-body" to="/account" style={{color: "#6C757D", marginRight: "1rem"}}>Account</NavLink>
                    ):(
                        <NavLink className="text-body" to="/account" style={{color: "#6C757D", marginRight: "1rem", display: "none"}}>Account</NavLink>
                    )}
                </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    {token ? (
                        <div className="btn-group d-flex align-items-center flex-row">
                            <div className="nav-link text-dark text-uppercase">
                                {currentAccount ? (
                                    <>
                                    <span>Hello, {currentAccount.name}</span>
                                    {currentAccount?.avatar && (
                                        <img
                                        // src={convertBase64ToBlob(currentAccount.avatar)}
                                        alt="avatar"
                                        style={{ width: "7%", borderRadius: "50%" }}
                                        className='img-avtar mx-1'
                                        />
                                    )}
                                    </>
                                ) : (
                                    'User Account'
                                )}
                            </div>
                            <button className="btn logout-btn text-uppercase" style={{height: "50%"}} onClick={handleLogout}>LogOut</button>
                        </div>
                    ):(
                    <div className="btn-group">
                        <NavLink className="dropdown-item" type="button" style={{outline: "none"}} to='/login'>Sign in</NavLink>
                        <NavLink className="dropdown-item" type="button" style={{outline: "none"}} to='/register'>Sign up</NavLink>
                    </div>
                    )}
                </div>
                <div className="d-inline-flex align-items-center d-block d-lg-none">
                    <NavLink to="/" className="btn px-0 ml-2">
                        <i className="fas fa-heart text-dark"></i>
                        <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                    </NavLink>
                    <NavLink to="/" className="btn px-0 ml-2">
                        <i className="fas fa-shopping-cart text-dark"></i>
                        <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                    </NavLink>
                </div>
            </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <div className="col-lg-4">
                <NavLink to="/" className="text-decoration-none">
                    <span className="h1 text-uppercase text-primary bg-dark px-2" style={{userSelect: "none"}}>Multi</span>
                    <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1" style={{userSelect: "none"}}>Shop</span>
                </NavLink>
            </div>
            <div className="col-lg-4 col-6 text-left">
                <form action="">
                    <div className="search">
                        <input type="text" className="form-control search-input" placeholder="Search for products" onChange={(e) => setQuery(e.target.value)} />
                        <button className="btn-search" onClick={handleSearch}>Go</button>
                    </div>
                </form>
            </div>
            <div className="col-lg-4 col-6 text-right">
                <p className="m-0">Customer Service</p>
                <h6 className="m-0">+84 913 562 870</h6>
            </div>
        </div>  
    </div>
  )
}

export default TopBar

