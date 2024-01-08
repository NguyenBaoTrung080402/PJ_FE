import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/SideBar";
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Modal, Table } from "react-bootstrap";
import { f_addBrand_api, f_deleteBrand_api, f_getAllBrands_api, f_updateBrand_api } from "../../../config/api";
import { toast } from "react-toastify";
import "./Brand.css"

const Brands = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listBrands, setListBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [nameBrand,setNameBrand] = useState('');
  const [slugBrand, setSlugBrand] = useState('');
  const [statusBrand, setStatusBrand] = useState('Active');
  const [brandUpdate, setBrandUpdate] = useState({
    nameBrand: '',
    slugBrand: '',
    statusBrand: '',
  })


    // common
    const makeStyle=(status)=>{
        if(status === 'Active')
        {
          return {
            color: '#33CC00',
          }
        }
        else if(status === 'Inactive')
        {
          return{
            color: '#DD0000',
          }
        }
      }

    // get list brands
    const getListBrand = async() =>{
        setIsLoading(true)
        try {
            const res = await f_getAllBrands_api();
            if(res.data.status === " not found"){
                toast.warning(res.data.message)
            }else if(res.data.status === "success"){
                setListBrands(res.data.result)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getListBrand()
    },[])


    // add brands
    const openModel = () =>{
        setShowAddModal(true)
    }

    const closeModel = () =>{
        setNameBrand("")
        setSlugBrand("")
        setStatusBrand("Active")
        setShowAddModal(false);
    }
    const handleAdd = async() =>{
        if(!nameBrand || !slugBrand){
            toast.warning("Please enter name and slug brand")
            return;
        }
        setIsLoading(true)
        try {
            const res = await f_addBrand_api(nameBrand, slugBrand, statusBrand);
            if(res.data.status === 'error'){
                toast.error(res.data.message)
            }else if(res.data.status === 'success'){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setNameBrand("")
            setSlugBrand("")
            setStatusBrand("Active")
            getListBrand();
            setIsLoading(false)
            setShowAddModal(false)
        }
    }

    // update brands
    const handleUpdate = (id) => {
        setSelectedBrandId(id)
        const brandUpdate = listBrands.find((brand) => brand.id === id);
            setBrandUpdate({
                nameBrand: brandUpdate.name,
                slugBrand: brandUpdate.slug,
                statusBrand: brandUpdate.status,
            });
        setShowUpdateModal(true);
    }

    const handCancelUpdate = () =>{
        setShowUpdateModal(false);
    }

    const handConfirmUpdateBrands = async() =>{
        if(!brandUpdate.nameBrand || !brandUpdate.slugBrand){
            toast.warning("Please enter name and slug brand")
            return
        }
        setIsLoading(true)
        try {
            const res = await f_updateBrand_api(selectedBrandId, brandUpdate.nameBrand, brandUpdate.slugBrand, brandUpdate.statusBrand)
            if(res.data.status === 'error'){
                toast.error(res.data.message)
            }else if(res.data.status === "success"){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
            setShowUpdateModal(false)
            getListBrand()
        }
    }

    // delete brands
    const handleDelete = (id) =>{
        setSelectedBrandId(id);
        setShowDeleteModal(true);
    }

    const handleCancel = () => {
        setShowDeleteModal(false);
    }
    const handConfirmDeleteBrands = async() =>{
        setIsLoading(true)
        try {
            const res = await f_deleteBrand_api(selectedBrandId);
            if(res.data.status === 'error'){
                toast.error(res.data.message)
            }else if (res.data.status === 'not found'){
                toast.warning(res.data.message)
            }else if(res.data.status === 'success'){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
            setShowDeleteModal(false)
            getListBrand();
        }
    }
   
  return (
    <div className="admin">
      <div className="adminGlass" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className=" Table py-5">
          <div className="d-flex justify-content-between">
            <div className="py-2">
              <h3>Brands</h3>
            </div>
            <div className="py-2">
              <button className="btn btn-info" onClick={openModel}>Add New Brands</button>
            </div>
          </div>
          <TableContainer
            style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "20px" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                    <TableCell align="left">##</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Slug</TableCell>
                    <TableCell align="left">Status</TableCell>
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
                ) : listBrands && listBrands.length === 0 ?(
                    <TableRow>
                        <TableCell colSpan={8} align="center">No data</TableCell>
                  </TableRow>
                ) :(
                    listBrands && listBrands.map((brands, index) =>(
                        <TableRow
                        key={brands.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" style={{verticalAlign: "middle"}}>
                          {index + 1}
                        </TableCell>
                        <TableCell align="left" style={{verticalAlign: "middle"}}>{brands.name}</TableCell>
                        <TableCell align="left" style={{verticalAlign: "middle"}}>{brands.slug}</TableCell>
                        <TableCell align="left" style={makeStyle(brands.status)}>{brands.status}</TableCell>
                        <TableCell align="left" className="Details d-flex">
                          <div>
                              <button className="btn btn-secondary" onClick={() => handleUpdate(brands.id)}>Update</button>
                          </div>
                          <div className="mx-3">
                              <button className="btn btn-danger" onClick={() => handleDelete(brands.id)}>Delete</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
              {showAddModal && (
                  <Modal show={showAddModal} onHide={closeModel}>
                  <Modal.Header closeButton >
                    <Modal.Title>Create Brand</Modal.Title>
                  </Modal.Header>
                  <div className="d-flex">
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="nameCate">Name Brand</label>
                      <input 
                      class= "input-category" 
                      value={nameBrand} 
                      onChange={(e) => setNameBrand(e.target.value)} 
                      name="text" 
                      id="nameCate" 
                      placeholder="Jeans...." 
                      type="text"/>
                    </div>
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="slugCate">Slug Brand</label>
                      <input 
                      class="input-category" 
                      name="text" 
                      id="slugCate" 
                      placeholder="JEANS..." 
                      value={slugBrand}
                      onChange={(e) => setSlugBrand(e.target.value)}
                      type="search"
                      />
                    </div>
                  </div>
                  <div className="inputGroup1 py-3 col-md-12 d-flex flex-column">
                    <label>Status</label>
                        <select
                            id="gender"
                            value={statusBrand}
                            onChange={(e) => setStatusBrand(e.target.value)}
                            className="form-control"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                  </div> 
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeModel}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleAdd}>
                      Create
                    </Button>
                  </Modal.Footer>
                </Modal>
                )}
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
                    <Button variant="danger" onClick={handConfirmDeleteBrands}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
                )}
                {showUpdateModal && (
                  <Modal show={showUpdateModal} onHide={handCancelUpdate}>
                  <Modal.Header closeButton >
                    <Modal.Title>Update Brand</Modal.Title>
                  </Modal.Header>
                  <div className="d-flex">
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="nameCate">Name Brand</label>
                      <input 
                      class= "input-category" 
                      value={brandUpdate.nameBrand}
                      onChange={(e) => setBrandUpdate((prevData)=> ({...prevData, nameBrand: e.target.value}))} 
                      name="text" 
                      id="nameCate" 
                      placeholder="Jeans...." 
                      type="text"/>
                    </div>
                    <div className="inputGroup1 py-3 col-md-6">
                      <label htmlFor="slugCate">Slug Brand</label>
                      <input 
                      class="input-category" 
                      name="text" 
                      id="slugCate" 
                      placeholder="JEANS..." 
                      value={brandUpdate.slugBrand}
                      onChange={(e) => setBrandUpdate((prevData)=> ({...prevData, slugBrand: e.target.value}))}
                      type="search"
                      />
                    </div>
                  </div>
                  <div className="inputGroup1 py-3 col-md-12 d-flex flex-column">
                    <label>Status</label>
                        <select
                            id="gender"
                            value={brandUpdate.statusBrand}
                            onChange={(e) => setBrandUpdate((prevData)=> ({...prevData, statusBrand: e.target.value}))}
                            className="form-control"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                  </div> 
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handCancelUpdate}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handConfirmUpdateBrands}>
                      Update
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

export default Brands;
