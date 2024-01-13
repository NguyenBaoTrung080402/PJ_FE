/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import "./productDetail.css"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { f_getAllProductId_api } from '../../../config/api';
import axios from '../../../config/customAxios'
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const [listProdct, setListProduct] = useState([])
  const [activeTab, setActiveTab] = useState("tab-pane-1");
  const [productId, setProductsId] = useState({
    name: "",
    slug: "",
    description: "",
    information: '',
    summary: "",
    stock:"",
    price: "",
    discounted_price: "",
    image: "",
    status:""
  });
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams();

  const getProductById = async() =>{
    setIsLoading(true)
    try {
      const res = await f_getAllProductId_api(id);
      if(res.data.status === 'not found'){
        toast.warning(res.data.message);
      }else if(res.data.status === 'success'){
        setProductsId(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  
  useEffect(()=>{
    getProductById()
  },[])

  const handleTabChange = (tabId) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
    }
  };

  const handleAddToCart = async(e) => {
    e.preventDefault();
    
    const dataCart = {
      products_id: productId.id,
      quantity: 1,
    }

    setIsLoading(true)
    try {
      const res = await axios.post('order/add-to-cart', dataCart);
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'Conflict'){
        toast.error(res.data.message)
      }else if(res.data.status === 'success'){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  const getProduct = () =>{}
  
  return (
    <>
    <div class="container-fluid">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <Link class="breadcrumb-item text-dark" href="#">Home</Link>
                    <Link class="breadcrumb-item text-dark" href="#">Shop</Link>
                    <span class="breadcrumb-item active">Shop Detail</span>
                </nav>
            </div>
        </div>
    </div>
      <div 
      class="container-fluid pb-5">
      <div class="row px-xl-5">
          <div class="col-lg-5 mb-30">
              <div id="product-carousel" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner bg-light">
                      <div class="carousel-item active">
                          <img class="w-100" style={{height: "500px"}} 
                          src={`http://127.0.0.1:8000/${productId.image}`} 
                          alt="Image"/>
                      </div>
                  </div>
                  <Link class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                      <i class="fa fa-2x fa-angle-left text-dark"></i>
                  </Link>
                  <Link class="carousel-control-next" href="#product-carousel" data-slide="next">
                      <i class="fa fa-2x fa-angle-right text-dark"></i>
                  </Link>
              </div>
          </div>

          <div class="col-lg-7 h-auto mb-30">
              <div class="h-100 bg-light p-30">
                    <h3>
                      {productId.name}
                    </h3>
                  <div class="d-flex mb-3">
                      <div class="text-primary mr-2">
                          <small class="fas fa-star"></small>
                          <small class="fas fa-star"></small>
                          <small class="fas fa-star"></small>
                          <small class="fas fa-star-half-alt"></small>
                          <small class="far fa-star"></small>
                      </div>
                      <small class="pt-1">(99 Reviews)</small>
                  </div>
                  <h3 class="font-weight-semi-bold mb-4">{productId.discounted_price}</h3>
                  <p class="mb-4">
                    {productId.summary}
                    </p>
                  <div class="d-flex mb-3">
                      <strong class="text-dark mr-3">Sizes:</strong>
                      <div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="size-1" name="size"/>
                              <label class="custom-control-label" for="size-1">XS</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="size-2" name="size"/>
                              <label class="custom-control-label" for="size-2">S</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="size-3" name="size"/>
                              <label class="custom-control-label" for="size-3">M</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="size-4" name="size"/>
                              <label class="custom-control-label" for="size-4">L</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="size-5" name="size"/>
                              <label class="custom-control-label" for="size-5">XL</label>
                          </div>
                      </div>
                  </div>
                  <div class="d-flex mb-4">
                      <strong class="text-dark mr-3">Colors:</strong>
                      <form>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="color-1" name="color"/>
                              <label class="custom-control-label" for="color-1">Black</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="color-2" name="color"/>
                              <label class="custom-control-label" for="color-2">White</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="color-3" name="color"/>
                              <label class="custom-control-label" for="color-3">Red</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" class="custom-control-input" id="color-4" name="color"/>
                              <label class="custom-control-label" for="color-4">Blue</label>
                          </div>
                      </form>
                  </div>
                  <div class="d-flex align-items-center mb-4 pt-2">
                      <div class="input-group quantity mr-3" style={{width: "130px"}}>
                          <div class="input-group-btn">
                              <button class="btn btn-primary btn-minus">
                                  <i class="fa fa-minus"></i>
                              </button>
                          </div>
                          <input type="text" class="form-control bg-secondary border-0 text-center" value="1"/>
                          <div class="input-group-btn">
                              <button class="btn btn-primary btn-plus">
                                  <i class="fa fa-plus"></i>
                              </button>
                          </div>
                      </div>
                      <button class="btn btn-primary px-3" onClick={handleAddToCart}><i class="fa fa-shopping-cart mr-1"></i> Add To
                          Cart</button>
                  </div>
                  <div class="d-flex pt-2">
                      <strong class="text-dark mr-2">Share on:</strong>
                      <div class="d-inline-flex">
                          <Link class="text-dark px-2" href="">
                              <i class="fab fa-facebook-f"></i>
                          </Link>
                          <Link class="text-dark px-2" href="">
                              <i class="fab fa-twitter"></i>
                          </Link>
                          <Link class="text-dark px-2" href="">
                              <i class="fab fa-linkedin-in"></i>
                          </Link>
                          <Link class="text-dark px-2" href="">
                              <i class="fab fa-pinterest"></i>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
       <div className="row px-xl-5">
    <div className="col">
      <div className="bg-light p-30">
        <div className="nav nav-tabs mb-4">
          <Link
            className={`nav-item nav-link text-dark ${
              activeTab === "tab-pane-1" ? "active" : ""
            }`}
            onClick={() => handleTabChange("tab-pane-1")}
          >
            Description
          </Link>
          <Link
            className={`nav-item nav-link text-dark ${
              activeTab === "tab-pane-2" ? "active" : ""
            }`}
            onClick={() => handleTabChange("tab-pane-2")}
          >
            Information
          </Link>
          <Link
            className={`nav-item nav-link text-dark ${
              activeTab === "tab-pane-3" ? "active" : ""
            }`}
            onClick={() => handleTabChange("tab-pane-3")}
          >
            Reviews (0)
          </Link>
        </div>
        <div className="tab-content">
          <div
            className={`tab-pane fadeIn ${
              activeTab === "tab-pane-1" ? "show active" : ""
            }`}
            id="tab-pane-1"
          >
            <h4 className="mb-3">Product Description</h4>
            <p>
              {productId.description}
            </p>
          </div>
          <div
            className={`tab-pane${
              activeTab === "tab-pane-2" ? "show active fadeIn" : ""
            }`}
            id="tab-pane-2"
          >
            <h4 className="mb-3">Additional Information</h4>
            <p className='wrapper'>
              {productId.information}
            </p>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing
                    at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua.
                    Nonumy.
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing
                    at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua.
                    Nonumy.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`tab-pane ${
              activeTab === "tab-pane-3" ? "show active fadeIn" : ""
            }`}
            id="tab-pane-3"
          >
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-4">1 review for "Product Name"</h4>
                <div className="media mb-4">
                  <img
                    src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                    alt="Image"
                    className="img-fluid mr-3 mt-1"
                    style={{ width: "45px" }}
                  />
                  <div className="media-body">
                    <h6>
                      John Doe<small> - <i>01 Jan 2045</i></small>
                    </h6>
                    <div className="text-primary mb-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <i className="far fa-star"></i>
                    </div>
                    <p>
                      Diam amet duo labore stet elitr ea clita ipsum, tempor
                      labore accusam ipsum et no at. Kasd diam tempor rebum
                      magna dolores sed sed eirmod ipsum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="mb-4">Leave a review</h4>
                <small>
                  Your email address will not be published. Required fields
                  are marked *
                </small>
                <div className="d-flex my-3">
                  <p className="mb-0 mr-2">Your Rating * :</p>
                  <div className="text-primary">
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="message">Your Review *</label>
                    <textarea
                      id="message"
                      cols="30"
                      rows="5"
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <input
                      type="submit"
                      value="Leave Your Review"
                      className="btn btn-primary px-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </>
  )
}

export default ProductDetails
