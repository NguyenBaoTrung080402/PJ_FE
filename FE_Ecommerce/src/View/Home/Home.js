/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import vendor1 from "../../assets/IMG/defaultIMG/vendor-1.jpg"
import vendor2 from "../../assets/IMG/defaultIMG/vendor-2.jpg"
import vendor3 from "../../assets/IMG/defaultIMG/vendor-3.jpg"
import vendor4 from "../../assets/IMG/defaultIMG/vendor-4.jpg"
import vendor5 from "../../assets/IMG/defaultIMG/vendor-5.jpg"
import { f_getAllCategory_api, f_getAllProduct_api } from "../../config/api";
import { toast } from "react-toastify";
import { convertBase64ToBlob, formatCurrency } from "../../Validate/Validate";

const Home = () => {
    const [index, setIndex] = useState(0);

    const [listCategories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([])
    
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

    // get all product
    const getAllProducts = async(pageNumber = 0, size= 8) =>{
        setIsLoading(true)
        try {
          const res = await f_getAllProduct_api(pageNumber, size);
          if(res.data.status === "not found"){
            toast.warning(res.data.message)
          }else if(res.data.status === "error"){
            toast.error(res.data.message)
          }else if(res.data.status === "success"){
            setProducts(res.data.result.content)
          }
        } catch (error) {
          toast.error(error.message)
        }finally{
          setIsLoading(false)
        }
      }
    
      
      useEffect(()=>{
        getAllProducts()
      },[])

  //chatbox
  

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div className="container-fluid mb-3">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.instyle.com/thmb/EMeMmp7gV5ZC-QgM9f-7R_iLSr0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-539573922-2000-a03885527cf14bb9b1719a5812fb1d26.jpg"
                  alt="First slide"
                  style={{height: "430px"}}
                />
                <Carousel.Caption className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{maxWidth: "700px"}}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Men Fashion</h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                        <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</Link>
                    </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://static-mec.sport-conrad.com/cachedresize/5000_5000_90/mecs-8629439cad095efe-top-faction-1-EN.jpg"
                  alt="Second slide"
                  style={{height: "430px"}}
                />
                <Carousel.Caption className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{maxWidth: "700px"}}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                        <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</Link>
                    </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                <img
                  className="d-block w-100"
                  src="https://re-fashion.co.uk/cdn/shop/articles/reasons-to-buy-second-hand-clothes-blog-header_grande.png?v=1630541954"
                  alt="Third slide"
                  style={{height: "430px"}}
                />
                <Carousel.Caption className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{maxWidth: "700px"}}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                        <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</Link>
                    </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-lg-4">
            <div className="product-offer mb-30" style={{ height: "200px" }}>
              <img
                className="img-fluid"
                src="https://vcdn-sohoa.vnecdn.net/2023/07/06/DSCF3483-1686014164-7221-1688583032.jpg"
                alt=""
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <Link href="" to="/contact" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="product-offer mb-30" style={{ height: "200px" }}>
              <img
                className="img-fluid"
                src="https://genk.mediacdn.vn/139269124445442048/2023/8/9/canon-r50-minh-duc-1-1691570578958133734956-1691575388538-16915753896781954852060.jpg"
                alt=""
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <Link href="#" to="/contact" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                    <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
    </div>

    
    <div className="container-fluid pt-5 text-center" id="category">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
        <div className="row px-xl-5 pb-3">
            {listCategories && listCategories.slice(-12).map((category) =>(
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <Link className="text-decoration-none" href="">
                        <div className="cat-item d-flex align-items-center mb-4">
                            <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                                <img className="img-fluid h-100" style={{width: "100%", height: "100%"}} 
                                src={convertBase64ToBlob(category.imgCategory)} 
                                alt=""/>
                            </div>
                            <div className="flex-fill pl-3">
                                <h6>{category.name}</h6>
                                <small className="text-body">100 Products</small>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
           </div>     
    </div>

    <div class="container-fluid pt-5 pb-3 text-center">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Featured Products</span></h2>
        <div class="row px-xl-5">
            {products && products.map((listProduct) =>(
                <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden">
                        <img class="img-fluid w-100" style={{height: "300px"}} 
                        src={convertBase64ToBlob(listProduct.image)} 
                        alt=""/>
                        <div class="product-action">
                            <Link class="btn btn-outline-dark btn-square" to={`/product-detail/${listProduct.id}`}><i class="fa fa-search"></i></Link>
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <Link class="h6 text-decoration-none text-truncate" to={`/product-detail/${listProduct.id}`}>{listProduct.name}</Link>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>{formatCurrency(listProduct.discountedPrice)}</h5><h6 class="text-muted ml-2"><del>{formatCurrency(listProduct.price)}</del></h6>
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>

    <div class="container-fluid pt-5 pb-3">
        <div class="row px-xl-5">
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height: "300px" }}>
                    <img class="img-fluid" src="https://vcdn-sohoa.vnecdn.net/2023/07/06/DSCF3483-1686014164-7221-1688583032.jpg" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <Link href="#" to="/contact" class="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height: "300px" }}>
                    <img class="img-fluid" src="https://genk.mediacdn.vn/139269124445442048/2023/8/9/canon-r50-minh-duc-1-1691570578958133734956-1691575388538-16915753896781954852060.jpg" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <Link href="#" to="/contact" class="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="row">
                <div class="owl-carousel vendor-carousel d-flex">
                    <div class="bg-light p-4 mx-5">
                        <img src={vendor1} alt=""/>
                    </div>
                    <div class="bg-light p-4 mx-5">
                        <img src={vendor2} alt=""/>
                    </div>
                    <div class="bg-light p-4 mx-5">
                        <img src={vendor3} alt=""/>
                    </div>
                    <div class="bg-light p-4 mx-5">
                        <img src={vendor4} alt=""/>
                    </div>
                    <div class="bg-light p-4 mx-5">
                        <img src={vendor5} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Home;
