import React, { useEffect, useState } from 'react'
import Sidebar from '../../SideBar/SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { f_getAllBrands_api, f_getAllCategory_api, f_getAllColor_api, f_getAllProductId_api, f_getAllSize_api } from '../../../../config/api';
import { toast } from 'react-toastify';
import axios from '../../../../config/customAxios'

const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listBrand, setListBrand] = useState([])
  const [listCategory, setListCategory] = useState([])
  const {id} = useParams()
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();
  const [sizeName, setSizeName] = useState();
  const [colorName, setColorName] = useState();
  const [size, setSizes] = useState();
  const [color, setColors] = useState();
  const [productData, setProductData] = useState({
    name: "",
    information: "",
    description: "",
    slug: "",
    summary: "",
    stock: "",
    price: "",
    discountedPrice: "",
    brandsId: "",
    categoriesId: "",
    colorId: "",
    sizeId: "",
    image: "",
    status: "",
  })

  const getSize = async () =>{
    setIsLoading(true)
    try {
      const res = await f_getAllSize_api();
      if(res.data.status === 'not-found'){
        toast.warning(res.data.message)
      }else if (res.data.status === 'success'){
        setSizeName(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  const getColors = async () =>{
    setIsLoading(true)
    try {
      const res = await f_getAllColor_api();
      if(res.data.status === 'not-found'){
        toast.warning(res.data.message)
      }else if (res.data.status === 'success'){
        setColorName(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  const handleColorChange = (colorId) => {
    const updatedColorIds = [...productData.colorId];
    if (updatedColorIds.includes(colorId)) {
      updatedColorIds.splice(updatedColorIds.indexOf(colorId), 1);
    } else {
      updatedColorIds.push(colorId);
    }
    setProductData({ ...productData, colorId: updatedColorIds });
  };
  
  const handleSizeChange = (sizeId) => {
    const updatedSizeIds = [...productData.sizeId];
    if (updatedSizeIds.includes(sizeId)) {
      updatedSizeIds.splice(updatedSizeIds.indexOf(sizeId), 1);
    } else {
      updatedSizeIds.push(sizeId);
    }
    setProductData({ ...productData, sizeId: updatedSizeIds });
  };

  useEffect(()=>{
    getListBrand()
    getListCategory()
    getProductById()
    getColors()
    getSize()
  },[])

  const getProductById = async() =>{
    setIsLoading(true)
    try {
      const res = await f_getAllProductId_api(id);
      if(res.data.status === 'not found'){
        toast.warning(res.data.message);
      }else if(res.data.status === 'success'){
        // setProductData(res.data.result.product)
        // setSizeName(res.data.result.sizes)
        // setColorName(res.data.result.colors)
        const { product, colors, sizes } = res.data.result;
        const colorIds = colors.map((color) => color.id);
        const sizeIds = sizes.map((size) => size.id);
        setProductData({ ...product, colorId: colorIds, sizeId: sizeIds });
        setColors(colors);
        setSizes(sizes);
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
    const formData = new FormData()
    formData.append('image', productData.image)
    formData.append('product', JSON.stringify({
      'name': productData.name,
      'information': productData.information,
      'description': productData.description,
      'slug': productData.slug,
      'summary': productData.summary,
      'stock': productData.stock,
      'price': productData.price,
      'discountedPrice': productData.discountedPrice,
      'brandsId': productData.brandsId,
      'categoriesId': productData.categoriesId,
      'colorId': JSON.stringify(productData.colorId),
      'sizeId': JSON.stringify(productData.sizeId),
      'status': productData.status,
    }))

    try {
      console.log(formData)
      const res = await axios.put(`/product/update-product/${id}`, formData,{
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
                  value={productData.discountedPrice}
                  onChange={(e) =>setProductData({...productData, discountedPrice: e.target.value})}
                  name="text"
                  id="nameCate"
                  placeholder="how you like that...."
                  type="text"
                />
                <div className="d-flex justify-content-around py-2">
                  {colorName?.map((color, index)=>{
                    return(
                      <div key={index} className="d-flex flex-column align-items-center">
                        <label htmlFor={color.name}>{color.name}</label>
                        <input 
                        id={color.name} 
                        className="checkbox" 
                        type="checkbox" 
                        value={color.id}
                        // onChange={(e) => setProductData({...productData, colorsId: e.target.value})}
                        onChange={() => handleColorChange(color.id)}
                        checked={productData.colorId.includes(color.id)}
                        />
                      </div>
                    )
                  })}
                  
                </div>
                <div className="d-flex justify-content-around">
                  <div className="flex-column col-md-4">
                    <label>Brand</label>
                      <select
                        id="gender"
                        value={productData.brandsId}
                        onChange={(e) =>setProductData({...productData, brandsId: e.target.value})}
                        className="form-control"
                      >
                        {listBrand?.map((brands)=>(
                          <option key={brands.id} value={brands.id}>{brands.nameBrand}</option> 
                        ))}
                      </select>
                  </div>
                  <div className="flex-column col-md-4">
                    <label>Category</label>
                      <select
                        id="gender"
                        value={productData.categoriesId}
                        onChange={(e) =>setProductData({...productData, categoriesId: e.target.value})}
                        className="form-control"
                      >
                        {listCategory?.map((categories) =>(
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
                <div className="d-flex justify-content-around py-2">
                  {sizeName?.map((size, index)=>{
                    return(
                    <div key={index} className="d-flex flex-column align-items-center">
                      <label htmlFor={size.name}>Size {size.name}</label>
                      <input 
                      id={size.name} 
                      className="checkbox" 
                      type="checkbox" 
                      value={size.id}
                      // onChange={(e) => setProductData({...productData, sizeId: e.target.value})}
                      onChange={() => handleSizeChange(size.id)}
                      checked={productData.sizeId.includes(size.id)}
                      />
                    </div>
                    )
                  })}
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