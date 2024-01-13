import React, { useEffect, useState } from 'react'
import Sidebar from '../../SideBar/SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { f_getAllBrands_api, f_getAllCategory_api, f_getAllProductId_api } from '../../../../config/api';
import { toast } from 'react-toastify';
import axios from '../../../../config/customAxios'

const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listBrand, setListBrand] = useState([])
  const [listCategory, setListCategory] = useState([])
  const {id} = useParams()
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();
  // const [name, setName] = useState('');
  const [productData, setProductData] = useState({
    name: "",
    information: "",
    description: "",
    slug: "",
    summary: "",
    stock: "",
    price: "",
    discounted_price: "",
    brands_id: "",
    categories_id: "",
    image: "",
    status: "",
  })
  // console.log(productData.name)
  useEffect(()=>{
    getListBrand()
    getListCategory()
    getProductById()
  },[])

  const getProductById = async() =>{
    setIsLoading(true)
    try {
      const res = await f_getAllProductId_api(id);
      if(res.data.status === 'not found'){
        toast.warning(res.data.message);
      }else if(res.data.status === 'success'){
        setProductData(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
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

  const handleImageChangeUpdate = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
    setProductData({...productData, image: selectedImage});
  };



  // update
  const handleUpdateProduct = async () => {
    // if(!productData.name || !productData.information || !productData.description || !productData.image || !productData.slug ||
    //   !productData.price || !productData.discounted_price || !productData.summary || !productData.stock){
    //     return toast.warning("Input is required")
    //   }
    setIsLoading(true)
    console.log('pD', productData);
    const formData = new FormData()
    formData.append('name', productData.name)
    formData.append('information', productData.information)
    formData.append('description', productData.description)
    formData.append('slug', productData.slug)
    formData.append('summary', productData.summary)
    formData.append('stock', productData.stock)
    formData.append('price', productData.price)
    formData.append('discounted_price', productData.discounted_price)
    formData.append('brands_id', productData.brands_id)
    formData.append('categories_id', productData.categories_id)
    formData.append('image', productData.image)
    formData.append('status', productData.status)
    formData.append('_method', 'PUT' )

    try {
      console.log(formData)
      const res = await axios.post(`/manager/update-product/${id}`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'error'){
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

  const handleCancel = () => {
    navigate("/product-admin")
  }
  // console.log('v', productData)
  return (
    <div className='admin'>
      <div className='adminGlass' style={{minHeight: "100vh"}}>
          <Sidebar/>
          <div className="py-4">
          <h1 className="text-center fw-bolder">Update Product</h1>
          <div className="d-flex justify-content-around">
            <div className="col-md-5">
                <div className="inputGroup1 py-3">

                      {/* ================= Product Description ==================*/}
                    <label htmlFor="productDescription" style={{userSelect: "none"}}>Product Description</label>
                    <textarea id="productDescription" cols="25"
                      value={productData.description}
                      onChange={(e) =>setProductData({...productData, description: e.target.value})}
                      rows="5" className="col-md-12 form-control">
                    </textarea>

                      {/* ================= Product Information ==================*/}
                    <label htmlFor="productDescription" style={{userSelect: "none"}}>Product Information</label>
                    <textarea id="productDescription" cols="25"
                    value={productData.information}
                    onChange={(e) =>setProductData({...productData, information: e.target.value})}
                      rows="5" className="col-md-12 form-control">
                    </textarea>

                      {/* ================= Product Summary ==================*/}
                    <label htmlFor="productDescription" style={{userSelect: "none"}}>Product Summary</label>
                    <textarea id="productDescription" cols="25"
                    value={productData.summary}
                    onChange={(e) =>setProductData({...productData, summary: e.target.value})}
                      rows="5" className="col-md-12 form-control">

                    </textarea>
                </div>
                <div className="d-flex">
                    <div>
                        <button className="btn btn-success" onClick={handleUpdateProduct}>Update
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
                    value={productData.name}
                    onChange={(e) =>setProductData({...productData, name: e.target.value})}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />


                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product Slug</label>
                <input
                  class="input-category col-md-12"
                  value={productData.slug}
                  onChange={(e) =>setProductData({...productData, slug: e.target.value})}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />

                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product Stock</label>
                <input
                  class="input-category col-md-12"
                  value={productData.stock}
                  onChange={(e) =>setProductData({...productData, stock: e.target.value})}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />

                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product Price</label>
                <input
                  class="input-category col-md-12"
                  value={productData.price}
                  onChange={(e) =>setProductData({...productData, price: e.target.value})}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />

                <label htmlFor="nameCate" style={{userSelect: "none"}}>Product discount</label>
                <input
                  class="input-category col-md-12"
                  value={productData.discounted_price}
                  onChange={(e) =>setProductData({...productData, discounted_price: e.target.value})}
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
                        value={productData.brands_id}
                        onChange={(e) =>setProductData({...productData, brands_id: e.target.value})}
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
                        value={productData.categories_id}
                        onChange={(e) =>setProductData({...productData, categories_id: e.target.value})}
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
                        value={productData.status}
                        onChange={(e) =>setProductData({...productData, status: e.target.value})}
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
                    // value={productData.image}
                    onChange={handleImageChangeUpdate} 
                    />
                    {previewImage ? (
                      <img src={previewImage} alt="Xem trước" style={{ marginTop: '10px', maxWidth: '100%' }} />
                    ):(
                      <img src={`http://127.0.0.1:8000/${productData.image}`} alt="bug" style={{ marginTop: '10px', maxWidth: '100%' }}/>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct