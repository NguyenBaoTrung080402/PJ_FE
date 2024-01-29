import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/SideBar";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Modal, Table } from "react-bootstrap";
import "./Category.css"
import { toast } from "react-toastify";
import { f_deleteCategory_api, f_getAllCategory_api } from "../../../config/api";
import axios from '../../../config/customAxios'

const Category = () => {
  const [listCategories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imgCategory, setImgCategory] = useState(null);
  const [nameCategory,setNameCategory] = useState('');
  const [slugCategory, setSlugCategory] = useState('');
  const [dataCategoryUpdate, setDataCategoryUpdate] = useState({
    name: '',
    slug: '',
    avatar: null,
  })
  const [previewImage, setPreviewImage] = useState('');
  
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

  // Create a new category
  const handleAdd = () => {
    setShowAddModal(true)
  };

  const handleAddCategory = async ()=>{
    if(!imgCategory || !nameCategory || !slugCategory){
      toast.warning("Input is not blank. Please enter again!")
    }
    
    setIsLoading(true)
    const formData = new FormData();
    formData.append('avatar', imgCategory);
    formData.append('name', nameCategory);
    formData.append('slug', slugCategory);
    try {
      const res = await axios.post("/manager/add-categories", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if(res.data.status === 'error'){
        toast.error(res.data.message)
      }else if(res.data.status === 'success'){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
      setShowAddModal(false)
      getListCategories()
    }
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
    setImgCategory(selectedImage);
  };

  const handCancelAdd = () =>{
    setNameCategory('')
    setImgCategory('')
    setSlugCategory('')
    setShowAddModal(false)
  }
  // Update the categories
  const handleUpdate = (id) => {
    setSelectedCategoriesId(id)
    const categoryToUpdate = listCategories.find((category) => category.id === id);
    setDataCategoryUpdate({
      name: categoryToUpdate.name,
      slug: categoryToUpdate.slug,
      avatar: categoryToUpdate.avatar,
    });
    setShowUpdateModal(true)
  }

  const handleUpdateCategories = async() =>{
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", dataCategoryUpdate.avatar);
    formData.append("name", dataCategoryUpdate.name);
    formData.append("slug", dataCategoryUpdate.slug);

    try {
      const res = await axios.post(`/manager/update-category/${selectedCategoriesId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status === "error") {
        toast.error(res.data.message);
      } else if (res.data.status === "success") {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setShowUpdateModal(false);
      getListCategories();
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
    setDataCategoryUpdate((prevData) => ({ ...prevData, avatar: selectedImage }));
  };

  const handCancelUpdate = () =>{
    setShowUpdateModal(false)
  }

  // Delete the existing categories

  const handleDelete = (id) => {
    setSelectedCategoriesId(id)
    setShowDeleteModal(true)
  }

  const handleConfirmDeleteCategory = async() => {
    setIsLoading(true);
      try {
        const res = await f_deleteCategory_api(selectedCategoriesId);
        if(res.data.status === 'not found') {
          toast.warning(res.data.message)
        }else if(res.data.status === 'success') {
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }finally{
        setIsLoading(false);
        getListCategories()
        setShowDeleteModal(false)
      }
  }

  const handCancelDelete = () =>{
    setShowDeleteModal(false)
  }
  return (
    <div className="admin" >
      <div className="adminGlass" style={{minHeight: "100vh"}}>
        <Sidebar />
        <div className="Table py-5">
          <div className="d-flex justify-content-between align-items-end py-3">
            <div>
              <h3>List Categories</h3>
            </div>
            <div>
                <button className="btn btn-info" onClick={handleAdd}>Add New Category</button>
            </div>
          </div>
          <TableContainer
            style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius:"20px" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">##</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Slug</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {isLoading ? (
                    <TableRow className="d-flex justify-content-center">
                      <TableCell colSpan={8} align="center" >
                        <div className="custom-loader"></div>
                      </TableCell>
                  </TableRow>
                ): listCategories && listCategories.length === 0 ?(
                  <TableRow>
                    <TableCell colSpan={8} align="center">No data</TableCell>
                  </TableRow>
                ):(
                  listCategories &&
                    listCategories.map((categories, index) => (
                      <TableRow
                        key={categories.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" style={{verticalAlign: "middle"}}>
                          {index + 1}
                        </TableCell>
                        <TableCell align="left" style={{verticalAlign: "middle"}}>{categories.name}</TableCell>
                        <TableCell align="left" style={{verticalAlign: "middle"}}>{categories.slug}</TableCell>
                        <TableCell align="left" className="Details d-flex">
                          <div>
                              <button className="btn btn-secondary" onClick={() => handleUpdate(categories.id)}>Update</button>
                          </div>
                          <div className="mx-3">
                              <button className="btn btn-danger" onClick={() => handleDelete(categories.id)}>Delete</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
                {showAddModal && (
                  <Modal show={showAddModal} onHide={handCancelAdd}>
                  <Modal.Header closeButton >
                    <Modal.Title>Create Categories</Modal.Title>
                  </Modal.Header>
                  <div className="d-flex">
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="nameCate">Name Category<span className="text-danger" style={{fontSize: "15px", fontWeight:"bolder"}}>*</span></label>
                      <input 
                      class= "input-category" 
                      value={nameCategory} 
                      onChange={(e) => setNameCategory(e.target.value)} 
                      name="text" 
                      id="nameCate" 
                      placeholder="Jeans...." 
                      type="text"/>
                    </div>
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="slugCate">Slug Category<span className="text-danger" style={{fontSize: "15px", fontWeight:"bolder"}}>*</span></label>
                      <input 
                      class="input-category text-uppercase" 
                      name="text" 
                      id="slugCate" 
                      placeholder="JEANS..." 
                      value={slugCategory}
                      onChange={(e) => setSlugCategory(e.target.value)}
                      type="text"
                      />
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
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handCancelAdd}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleAddCategory}>
                      Create
                    </Button>
                  </Modal.Footer>
                </Modal>
                )}
                {showUpdateModal && (
                  <Modal show={showUpdateModal} onHide={handCancelUpdate}>
                  <Modal.Header closeButton >
                    <Modal.Title>Confirm Update Category</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div className="d-flex">
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="nameCate">Name Category<span className="text-danger" style={{fontSize: "15px", fontWeight:"bolder"}}>*</span></label>
                      <input 
                      class= "input-category" 
                      value={dataCategoryUpdate.name} 
                      onChange={(e) => setDataCategoryUpdate((prevData) => ({ ...prevData, name: e.target.value }))} 
                      name="text" 
                      id="nameCate" 
                      placeholder="Jeans...." 
                      type="text"/>
                    </div>
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="slugCate">Slug Category<span className="text-danger" style={{fontSize: "15px", fontWeight:"bolder"}}>*</span></label>
                      <input 
                      class="input-category text-uppercase" 
                      name="text" 
                      id="slugCate" 
                      placeholder="JEANS..." 
                      value={dataCategoryUpdate.slug}
                      onChange={(e) => setDataCategoryUpdate((prevData) => ({ ...prevData, slug: e.target.value }))} 
                      type="text"
                      />
                    </div>
                  </div>
                  <div className="inputGroup1 py-3 col-md-12 d-flex flex-column">
                    <input 
                    class= "input-category" 
                    name="text" 
                    type="file"
                    onChange={handleImageChangeUpdate} 
                    />
                    {previewImage ? (
                      <img src={previewImage} alt="Xem trước" style={{ marginTop: '10px', maxWidth: '100%' }} />
                    ):(
                      <img src={`http://127.0.0.1:8000/${dataCategoryUpdate.avatar}`} alt="" style={{ marginTop: '10px', maxWidth: '100%' }}/>
                    )}
                  </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handCancelUpdate}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleUpdateCategories}>
                      Update
                    </Button>
                  </Modal.Footer>
                </Modal>
                )}
                {showDeleteModal && (
                  <Modal show={showDeleteModal} onHide={handCancelDelete}>
                  <Modal.Header closeButton >
                    <Modal.Title>Confirm Deletion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handCancelDelete}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteCategory}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
                )}
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Category;
