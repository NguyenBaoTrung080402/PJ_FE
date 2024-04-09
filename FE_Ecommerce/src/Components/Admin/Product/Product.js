import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/SideBar";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Modal, Table } from "react-bootstrap";
import { f_deleteProduct_api, f_getAllProduct_api } from "../../../config/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pagination from "react-paginate"
import { formatCurrency } from "../../../Validate/Validate";

const ProductAdmin = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);

  const makeStyle=(status)=>{
    if(status === 'Active')
    {
      return {
        borderRadius: '10px',
        background: 'rgb(145 254 159 / 47%)',
        color: '#33CC00',
      }
    }
    else if(status === 'Inactive')
    {
      return{
        borderRadius: '5px',
        background: '#ffadad8f',
        color: '#DD0000',
      }
    }
  }

  // add product
  const handleAddProduct = () =>{
    navigate("/add-product")
  }
  // update product
  const handleUpdate = (id) =>{
    navigate(`/update-product/${id}`)
  }
  // delete product
  const handleDelete = (id) =>{
    setSelectedProductId(id)
    setShowDeleteModal(true)
  }
  const handleCancel = () =>{
    setShowDeleteModal(false)
  }
  const handleConfirmDelete = async() =>{
    setIsLoading(true)
    try {
      const res = await f_deleteProduct_api(selectedProductId)
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'error'){
        toast.error(res.data.message)
      }else if(res.data.status === 'success'){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setShowDeleteModal(false)
      setIsLoading(false)
      getAllProducts()
    }
  }
  // get all products
  const getAllProducts = async(pageNumber = 1) =>{
    setIsLoading(true)
    try {
      const res = await f_getAllProduct_api(pageNumber);
      if(res.data.status === "not found"){
        toast.warning(res.data.message)
      }else if(res.data.status === "error"){
        toast.error(res.data.message)
      }else if(res.data.status === "success"){
        setProducts(res.data.result.content)
        setPage(res.data.result)
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

  return (
    <div className="admin">
      <div className="adminGlass" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className="py-5">
          <div className="d-flex flex-row justify-content-between">
              <div className="py-3">
                  <h3>List Product</h3>
              </div>
              <div className="py-3">
                  <button className="btn btn-info" onClick={handleAddProduct}>Add New Product <i style={{color: "white"}} class="fa-solid fa-circle-plus fa-spin"></i></button>
              </div>
          </div>
          <TableContainer
            component={Paper}
            style={{
              boxShadow: "0px 13px 20px 0px #80808029",
              borderRadius: "20px",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">##</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Slug</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Summary</TableCell>
                  <TableCell align="left">Information</TableCell>
                  <TableCell align="left">Stock</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Discounted</TableCell>
                  <TableCell align="left">Brand</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                  {isLoading ? (
                    <TableRow className="d-flex justify-content-center">
                      <TableCell colSpan={29} align="center" >
                        <div className="custom-loader"></div>
                      </TableCell>
                  </TableRow>
                  ): products && products.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={8} align="center">No data</TableCell>
                  </TableRow>
                  ) :(
                    products && products.map((listProduct, index)=>(
                      <TableRow
                        key={listProduct.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" style={{verticalAlign: "middle"}}>
                          {index + 1}
                        </TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>{listProduct.name}</TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>{listProduct.slug}</TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>
                            {listProduct.description && listProduct.description.length > 50
                              ? `${listProduct.description.slice(0, 19)}...`
                              : listProduct.description}
                          </TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>
                            {listProduct.summary && listProduct.summary.length > 50
                              ? `${listProduct.summary.slice(0, 19)}...`
                              : listProduct.summary}
                          </TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>
                            {listProduct.information && listProduct.information.length > 50
                              ? `${listProduct.information.slice(0, 19)}...`
                              : listProduct.information}
                          </TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>{listProduct.stock}</TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>{formatCurrency(listProduct.price)}</TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>{formatCurrency(listProduct.discounted_price)}</TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>{listProduct.brandsId}</TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>{listProduct.categoriesId}</TableCell>
                          <TableCell align="left" style={{verticalAlign: "middle"}}>
                            <span className="status" style={makeStyle(listProduct.status)}>{listProduct.status}</span>
                          </TableCell>
                        <TableCell align="left" className="Details d-flex">
                          <div>
                              <button className="btn btn-secondary" onClick={() => handleUpdate(listProduct.id)}>Update</button>
                          </div>
                          <div className="mx-3">
                              <button className="btn btn-danger" onClick={() => handleDelete(listProduct.id)}>Delete</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
              {showDeleteModal && (
                  <Modal show={showDeleteModal} onHide={handleCancel}>
                  <Modal.Header closeButton >
                    <Modal.Title>Confirm Delete Brand</Modal.Title>
                  </Modal.Header>
                    <div className="py-3 text-center">
                        Are you sure you want to delete ?
                    </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
                )}
            </Table>
            <Pagination
              pageCount={page.totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => getAllProducts(selected + 1)}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
