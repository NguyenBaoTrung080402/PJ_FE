// import React from "react";
import SideBar from "../SideBar/SideBar";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { f_deleteUser_api, f_getAllUser_api, f_updateRole_api } from "../../../config/api";
import { toast } from "react-toastify";
import './User.css'
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-router-dom";

const User = () => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [listUser, setListUser] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getListUser = async () =>{
    setIsLoading(true)
    try {
      const res = await f_getAllUser_api();
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'success'){
        setListUser(res.data.result)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  React.useEffect(()=>{
    getListUser()
  }, [])

  const makeStyle=(role)=>{
    if(role === 'CUSTOMER')
    {
      return {
        color: '#33CC00',
        borderRadius: "50% 10%",
      }
    }
    else if(role === 'ADMIN')
    {
      return{
        color: 'red',
        borderRadius: "50% 10%",
      }
    }
  }

  const genderName = (gender) =>{
    if(gender === 'F'){
      return 'Female'
    }
    else if(gender === 'M'){
      return 'Male'
    }
  }
  
  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete  = async() =>{
    setIsLoading(true)
    try {
      const res = await f_deleteUser_api(selectedUserId);
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'success'){
        toast.success(res.data.message)
        getListUser()
        // showDeleteModal(false)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
      setShowDeleteModal(false);
    }
  }
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleUpdate = (id) => {
    setSelectedUserId(id);
    setShowUpdateModal(true);
  };

  const handleEdit = async() => {
    setIsLoading(true)
    try {
      const res = await f_updateRole_api(selectedUserId);
      if(res.data.status === 'not found'){
        toast.warning(res.data.message)
      }else if(res.data.status === 'success'){
        toast.success(res.data.message)
        getListUser()
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
      setShowUpdateModal(false);
    }
  }

  const handleCancelUpdate = () => {
    setShowUpdateModal(false);
  };
  return (
    <div className="admin" >
      <div className="adminGlass" style={{minHeight: "100vh"}}>
        <SideBar />
        <div className="Table py-5">
          <h3 className="text-center py-3">LIST USER CUSTOMER</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius:"20px" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">DOB</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
              {isLoading ? (
                <TableRow className="d-flex justify-content-center">
                  <TableCell colSpan={8} align="center" >
                    {/* <Spinner animation="border" variant="warning" /> */}
                    <div class="custom-loader"></div>
                  </TableCell>
                </TableRow>
              ) : listUser && listUser.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">No data</TableCell>
                </TableRow>
              ) : (
                listUser && listUser.map((user, index) => (
                  <TableRow key={user.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.phone}</TableCell>
                    <TableCell align="left">{user.dob}</TableCell>
                    <TableCell align="left">{genderName(user.gender)}</TableCell>
                    <TableCell align="left">{user.address}</TableCell>
                    <TableCell align="left" style={makeStyle(user.role)}>{user.role}</TableCell>
                    <TableCell align="left" className="Details d-flex">
                      <div className="mx-2">
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                      </div>
                      <div className="mx-2">
                        <button type="button" className="btn btn-info" onClick={() => handleUpdate(user.id)}>Update Admin</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {showDeleteModal && (
                <Modal show={showDeleteModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton >
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete ?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancelDelete}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleConfirmDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {showUpdateModal && (
                <Modal show={showUpdateModal} onHide={handleCancelUpdate}>
                <Modal.Header closeButton >
                  <Modal.Title>Update Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to update role?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancelUpdate}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleEdit}>
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

export default User;
