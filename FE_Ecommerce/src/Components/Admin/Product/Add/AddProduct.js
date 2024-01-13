import React, { useEffect, useState } from "react";
import Sidebar from "../../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { f_getAllBrands_api, f_getAllCategory_api } from "../../../../config/api";
import { toast } from "react-toastify";
import axios from '../../../../config/customAxios'

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const [imgProduct, setImgProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [slugProduct, setSlugProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [informationProduct , setInformationProduct] = useState('');
  const [summaryProduct, setSummaryProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [discountedPriceProduct , setDiscountedPriceProduct] = useState(''); 
  const [stockProduct, setStockProduct] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [listBrand, setListBrand] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [statusProduct, setStatusProduct] = useState('Active')

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
    setImgProduct(selectedImage);
  };

  const getListBrand = async () => {
    setIsLoading(true)
    try {
      const res = await f_getAllBrands_api()
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'success'){
        setListBrand(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  const getListCategory = async () => {
    setIsLoading(true)
    try {
      const res = await f_getAllCategory_api();
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'success'){
        setListCategory(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    getListBrand()
    getListCategory()
  },[])


  const handleCreate = async() =>{
    if(!nameProduct || !slugProduct || !descriptionProduct || !informationProduct || !summaryProduct || !priceProduct || !discountedPriceProduct || !stockProduct){
      toast.warning('Input not blank, Please')
      return
    }

    const formData = new FormData()
    formData.append('name', nameProduct)
    formData.append('slug', slugProduct)
    formData.append('description', descriptionProduct)
    formData.append('information', informationProduct)
    formData.append('summary', summaryProduct)
    formData.append('price', priceProduct)
    formData.append('discounted_price', discountedPriceProduct)
    formData.append('stock', stockProduct)
    formData.append('categories_id', categoryId)
    formData.append('brands_id', brandId)
    formData.append('image', imgProduct)
    formData.append('status', statusProduct)
    setIsLoading(true)
    try {
      const res = await axios.post('/manager/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if(res.data.status === 'error'){
        toast.error(res.data.message)
      }else if(res.data.status === 'success'){
        toast.success(res.data.message)
        navigate("/product-admin")
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  const handleCancel = () =>{
    navigate("/product-admin")
  }
  return (
    <div className="admin">
      <div className="adminGlass" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className="py-4">
          <h1 className="text-center fw-bolder">Add Product</h1>
          <div className="d-flex justify-content-around">
            <div className="col-md-5">
                <div className="inputGroup1 py-3">
                    <label htmlFor="productDescription" style={{userSelect: "none"}}>Product Description</label>
                    <textarea id="productDescription" cols="25"
                      value={descriptionProduct}
                      onChange={(e) => setDescriptionProduct(e.target.value)}
                      rows="5" className="col-md-12 form-control">

                    </textarea>
                    <label htmlFor="productDescription" style={{userSelect: "none"}}>Product Information</label>
                    <textarea id="productDescription" cols="25"
                    value={informationProduct}
                    onChange={(e) => setInformationProduct(e.target.value)}
                      rows="5" className="col-md-12 form-control">

                    </textarea>
                    <label htmlFor="productDescription" style={{userSelect: "none"}}>Product Summary</label>
                    <textarea id="productDescription" cols="25"
                    value={summaryProduct}
                    onChange={(e) => setSummaryProduct(e.target.value)}
                      rows="5" className="col-md-12 form-control">

                    </textarea>
                </div>
                <div className="d-flex">
                    <div>
                        <button className="btn btn-success" onClick={handleCreate}>Create
                        &nbsp;
                          {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
                          ) : (
                            <i className="fa-solid fa-circle-plus"></i>
                          )}
                        </button>
                    </div>
                    <div className="mx-4">
                        <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
            <div className="inputGroup1 py-3">
                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product Name</label>
                <input
                  class="input-category col-md-12"
                    value={nameProduct}
                    onChange={(e) => setNameProduct(e.target.value)}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />
                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product Slug</label>
                <input
                  class="input-category col-md-12"
                  value={slugProduct}
                    onChange={(e) => setSlugProduct(e.target.value)}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />
                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product Stock</label>
                <input
                  class="input-category col-md-12"
                  value={stockProduct}
                    onChange={(e) => setStockProduct(e.target.value)}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />
                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product Price</label>
                <input
                  class="input-category col-md-12"
                  value={priceProduct}
                    onChange={(e) => setPriceProduct(e.target.value)}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />
                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product discount</label>
                <input
                  class="input-category col-md-12"
                  value={discountedPriceProduct}
                    onChange={(e) => setDiscountedPriceProduct(e.target.value)}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />
                <div className="d-flex justify-content-around">
                  <div className="flex-column col-md-4">
                    <label>Brand</label>
                      <select
                        id="gender"
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value)}
                        className="form-control"
                      >
                        {listBrand && listBrand.map((brands)=>(
                          <option key={brands.id} value={brands.id}>{brands.name}</option> 
                        ))}
                      </select>
                  </div>
                  <div className="flex-column col-md-4">
                    <label>Category</label>
                      <select
                        id="gender"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="form-control"
                      >
                        {listCategory && listCategory.map((categories) =>(
                          <option key={categories.id} value={categories.id}>{categories.name}</option>
                        ))}
                      </select>
                  </div>
                  <div className="flex-column col-md-4">
                    <label>Status</label>
                      <select
                        id="gender"
                        value={statusProduct}
                        onChange={(e) => setStatusProduct(e.target.value)}
                        className="form-control"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                  </div>
                </div>
                <div className="inputGroup1 py-3 col-md-12 d-flex flex-column">
                    <input 
                    class= "input-category" 
                    name="text" 
                    type="file"
                    onChange={handleImageChange} 
                    />
                    {previewImage && (
                      <img src={previewImage} alt="Xem trước" style={{ marginTop: '10px', maxWidth: '100%' }} />
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
