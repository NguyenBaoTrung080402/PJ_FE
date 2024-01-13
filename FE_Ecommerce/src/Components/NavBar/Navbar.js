import React, { useEffect, useState } from 'react'
import TopBar from './../TopBar/TopBar';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { f_getAllCategory_api } from '../../config/api';
import { toast } from 'react-toastify';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const [listCategories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleCartClick = () => {
        if (!token) {
            navigate("/login", { replace: true });
        } else {
            navigate("/cart");
        }
    };
    
  // get all categories
  const getListCategories = async() =>{
    setIsLoading(true);
    try {
      const res = await f_getAllCategory_api();
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'success'){
        setCategories(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getListCategories()
  },[])
  return (
    <>
      <TopBar/>
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
            {/* <div className="col-lg-3 d-none d-lg-block" ref={menuRef}>
                <Link className="btn d-flex align-items-center justify-content-between bg-primary w-100" to="#navbar-vertical" onClick={() =>{setIsDropdownOpen(!isDropdownOpen)}} style={{height: "65px", padding: "0 30px"}}>
                    <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                    <i className="fa fa-angle-down text-dark"></i>
                </Link>
                <Nav className={`collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light ${isDropdownOpen? 'active' : 'inactive'}`} id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                    <ul className="navbar-nav w-100">
                        <div className={`nav-item dropdown dropright`}>
                        <button className="nav-link dropdown-toggle" type="button">Dresses <i className="fa fa-angle-right float-right mt-1"></i></button>
                            <div className={`dropdown-menu position-absolute rounded-0 border-0 m-0 ${isDropdownOpen? 'active' : 'inactive'}`}>
                                <Link className="dropdown-item">Men's Dresses</Link>
                                <Link className="dropdown-item">Women's Dresses</Link>
                                <Link className="dropdown-item">Baby's Dresses</Link>
                            </div>
                        </div>
                        <Link className="nav-item nav-link">Jeans</Link>
                        <Link className="nav-item nav-link">Swimwear</Link>
                        <Link className="nav-item nav-link">Sleepwear</Link>
                        <Link className="nav-item nav-link">Shoes</Link>
                    </ul>
                </Nav>
            </div> */}
            <div className="col-lg-3 d-none d-lg-block">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="btn d-flex align-items-center justify-content-between bg-primary w-100" 
                    style={{height: "65px", padding: "0 30px", transition: "ease-out 0.7s"}}>
                        <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light' 
                    style={{ width: "calc(100%)", zIndex: "999" }}>
                        
                            {listCategories && listCategories.map((category) =>(
                                <ul className='navbar-nav w-100'>
                                    <Dropdown.Item href="#/action-1" className="nav-item nav-link w-100">{category.name}</Dropdown.Item>
                                </ul>
                            ))}
                        
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <Link to="" className="text-decoration-none d-block d-lg-none">
                        <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                        <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </Link>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse  align-items-center flex-row justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            <Link to="/" className="nav-item nav-link">Home</Link>
                            <Link to="/list-product" className="nav-item nav-link">Product</Link>
                            {/* <Link to="/product-detail" className="nav-item nav-link">Product Detail</Link> */}
                            <Link to="/contact" className="nav-item nav-link">Contact</Link>
                        </div>
                        <div className="navbar-nav ml-auto py-0 d-none d-lg-block" onClick={handleCartClick}>
                            <Link to="cart" className="btn px-0 ml-3" >
                                <i className="fas fa-shopping-cart text-primary"></i>
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar
