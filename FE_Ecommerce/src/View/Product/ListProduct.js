import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { f_getAllProduct_api } from '../../config/api';
import { toast } from 'react-toastify';
import "./listProduct.css"
import Pagination from "react-paginate"
import { formatCurrency } from '../../Validate/Validate';
import { useLocation } from 'react-router-dom';
import { f_getAllProductId_api } from '../../config/api';

const ListProduct = (colors, sizes) => {

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const [listColor, setListColor] = useState();
    const [listSizes, setListSizes] = useState();
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
        status:"",
        sizeName: "",
        colorName: "",
      });

        //get product by id
        const {id} = useParams();
        const getProductById = async() =>{
            setIsLoading(true)
            try {
              const res = await f_getAllProductId_api(id);
              if(res.data.status === 'not found'){
                toast.warning(res.data.message);
              }else if(res.data.status === 'success'){
                setProductsId(res.data.result.product)
                setListColor(res.data.result.colors)
                setListSizes(res.data.result.sizes)
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

        // get all product        
        useEffect(() => {
            const fetchProducts = async () => {
                setIsLoading(true);
                try {
                    const response = await f_getAllProduct_api();
                    if (response.data.status === 'success') {
                        setProducts(response.data.result.content);
                        // Initial display of all products
                        setSearchResults(response.data.result.content);
                    } else {
                        console.error('Lỗi khi lấy dữ liệu sản phẩm:', response.data.message);
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProducts();
        }, []);
    
        useEffect(() => {
            if (location.search) {
                const searchQuery = new URLSearchParams(location.search).get('search');
                if (searchQuery) {
                    const filteredProducts = products.filter((product) => {
                        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
                    });
                    setSearchResults(filteredProducts);
                } else {
                    setSearchResults(products);
                }
            } else {
                setSearchResults(products);
            }
        }, [location.search, products]);    

        const handlePageChange = ({ selected }) => {
            setPage(selected);
            const offset = selected * 10;
            const end = offset + 10;
            const filteredProducts = searchResults.slice(offset, end);
            setSearchResults(filteredProducts);
        };
        
        //checked filter
        const priceRangeOptions = document.getElementById('price-range-options');
        let currentChecked = document.getElementById('price-all'); // Khởi tạo giá trị ban đầu

        function handleCheckboxChange(event) {
        const clickedCheckbox = event.target;

        // Bỏ chọn checkbox đang được chọn
        if (currentChecked && currentChecked !== clickedCheckbox) {
            currentChecked.checked = false;
        }
        // Cập nhật checkbox hiện tại
        currentChecked = clickedCheckbox;
        }
        // Lặp qua các checkbox và thêm sự kiện 'change'
        const checkboxes = document.querySelectorAll('.custom-control-input');
        checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
        });

        //filter giá 
        const handleCheckboxChangeByMoney = (event) => {
            const selectedPriceRange = event.target.value;
            let filteredProducts = [];
            if (selectedPriceRange === "all") {
                filteredProducts = products;
            } else {
                const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
                filteredProducts = products.filter(product => product.discountedPrice >= minPrice && product.discountedPrice <= maxPrice);
            }
            setSearchResults(filteredProducts);
        };

        const handleCheckboxChangeByColor = (event) => {
            const selectedColor = event.target.value;
            let filteredProducts = [];
           if (selectedColor === "all"){
            filteredProducts = products;
           } else{
            filteredProducts = products.filter(product => product.nameColor === selectedColor);
           }
           setSearchResults(filteredProducts);
        }

        const handleCheckboxChangeBySize = (event) => {
            const selectedSize = event.target.value;
            let filteredProducts = [];
           if (selectedSize === "all"){
            filteredProducts = products;
           } else{
            filteredProducts = products.filter(product => product.nameSize === selectedSize);
           }
           setSearchResults(filteredProducts);
        }
        
  return (
    <>
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                    <Link className="breadcrumb-item text-dark" to="/list-product">Product</Link>
                    <span className="breadcrumb-item">Product List</span>
                </nav>
            </div>
        </div>
    </div>

    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-3 col-md-4">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
                <div className="bg-light p-4 mb-30">
                    <form>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-all" value="all" onChange={handleCheckboxChangeByMoney} checked />
                            <label className="custom-control-label" htmlFor="price-all">All Price</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-1" value="0-100" onChange={handleCheckboxChangeByMoney} />
                            <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-2" value="100-200" onChange={handleCheckboxChangeByMoney} />
                            <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-3" value="200-300" onChange={handleCheckboxChangeByMoney}/>
                            <label className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-4" value="300-400" onChange={handleCheckboxChangeByMoney}/>
                            <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="price-5" value="400-500" onChange={handleCheckboxChangeByMoney}/>
                            <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                        </div>
                    </form>
                </div>

                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by color</span></h5>
                <div className="bg-light p-4 mb-30">
                    <form>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" checked id="color-all" value="all" onChange={handleCheckboxChangeByColor}/>
                            <label className="custom-control-label" htmlFor="price-all">All Color</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-1" value="1" onChange={handleCheckboxChangeByColor}/>
                            <label className="custom-control-label" htmlFor="color-1">Black</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-2" value="2" onChange={handleCheckboxChangeByColor}/>
                            <label className="custom-control-label" htmlFor="color-2">White</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-3" value="3" onChange={handleCheckboxChangeByColor}/>
                            <label className="custom-control-label" htmlFor="color-3">Red</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-4" value="4" onChange={handleCheckboxChangeByColor}/>
                            <label className="custom-control-label" htmlFor="color-4">Blue</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="color-5" value="5" onChange={handleCheckboxChangeByColor}/>
                            <label className="custom-control-label" htmlFor="color-5">Green</label>
                        </div>
                    </form>
                </div>
               
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by size</span></h5>
                <div className="bg-light p-4 mb-30">
                    <form>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" checked id="size-all" value="all" onChange={handleCheckboxChangeBySize}/>
                            <label className="custom-control-label" htmlFor="size-all">All Size</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-1" value="1" onChange={handleCheckboxChangeBySize}/>
                            <label className="custom-control-label" htmlFor="size-1">XS</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-2" value="2" onChange={handleCheckboxChangeBySize}/>
                            <label className="custom-control-label" htmlFor="size-2">S</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-3" value="3" onChange={handleCheckboxChangeBySize}/>
                            <label className="custom-control-label" htmlFor="size-3">M</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-4" value="4" onChange={handleCheckboxChangeBySize} />
                            <label className="custom-control-label" htmlFor="size-4">L</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="size-5" value="5" onChange={handleCheckboxChangeBySize}/>
                            <label className="custom-control-label" htmlFor="size-5">XL</label>
                        </div>
                    </form>
                </div>
            </div>

            
            <div className="col-lg-9 col-md-8">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div>
                                <button className="btn btn-sm btn-light"><i className="fa fa-th-large"></i></button>
                                <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars"></i></button>
                            </div>
                            <div className="ml-2">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" href="#">Latest</Link>
                                        <Link className="dropdown-item" href="#">Popularity</Link>
                                        <Link className="dropdown-item" href="#">Best Rating</Link>
                                    </div>
                                </div>
                                <div className="btn-group ml-2">
                                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" href="#">10</Link>
                                        <Link className="dropdown-item" href="#">20</Link>
                                        <Link className="dropdown-item" href="#">30</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                        {isLoading ? (
                            <div className='loading'>
                                <div className="custom-loader"></div>
                            </div> 
                        ):(
                        
                            searchResults.map((listProduct) => (    
                                <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
                                    <div className="product-item bg-light mb-4">
                                        <div className="product-img position-relative overflow-hidden">
                                            <img className="img-fluid w-100" style={{height: "300px"}} src={`http://127.0.0.1:8000/${listProduct.image}`} alt=""/>
                                            <div className="product-action">
                                                <Link className="btn btn-outline-dark btn-square" to={`/product-detail/${listProduct.id}`}><i className="fa fa-search"></i></Link>
                                            </div>
                                        </div>
                                        <div className="text-center py-4">
                                            <Link className="h6 text-decoration-none text-truncate" to={`/product-detail/${listProduct.id}`}>{listProduct.name}</Link>
                                            <div className="d-flex align-items-center justify-content-center mt-2">
                                                <h5>{formatCurrency(listProduct.discountedPrice)}</h5><h6 className="text-muted ml-2"><del>{formatCurrency(listProduct.price)}</del></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center mb-1">
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small>(99)</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                </div>
                <Pagination
                    pageCount={page}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    // forcePage={currentPage - 1}
                />
            </div>
        </div>
        </div>    
    </>
  )
}

export default ListProduct