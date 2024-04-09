import React, { useEffect, useState } from 'react'
import Sidebar from './../SideBar/SideBar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { f_getAllCart_api, f_updateStatus_api, f_getAllOrder_api } from '../../../config/api';
import { toast } from 'react-toastify';
import { formatCurrency, formatDateTime } from '../../../Validate/Validate';
import Pagination from 'react-paginate';
import { Button, Modal } from 'react-bootstrap';

const AcceptOrder = () => {
    const [orderStatus, setOrderStatus] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedID, setSelectedID] = useState(null);
    const [page, setPage] = useState(1);
    const [statusUpdate, setStatusUpdate] = useState({
        status: '',
    });

    const getAllCart = async(pageNumber = 1) =>{
        setIsLoading(true);
        try {
            const res = await f_getAllOrder_api(pageNumber);
            if(res.data.status === 'not found'){
                toast.warning(res.data.message)
            }else if (res.data.status === 'success'){
                setOrderStatus(res.data.result.content)
                setPage(res.data.result)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getAllCart()
    },[])
    // 
    const handleOpen = (id) =>{
        setSelectedID(id);
        setIsOpen(true);
    }
    const handCancel = ()=>{
        setIsOpen(false);
        setStatusUpdate(...orderStatus)
    }
    const handleConfirmUpdate = async() =>{
        setIsLoading(true);
        try {
            const res = await f_updateStatus_api(selectedID, statusUpdate.status);
            if(res.data.status ==='not found'){
                toast.warning(res.data.message)
            }else if(res.data.status === 'success'){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            getAllCart()
            setIsLoading(false)
            handCancel()
        }
    }
    const makeStyle=(status)=>{
        if(status === 'Processing')
        {
          return {
            background: '#FFFF00',
            color: 'black',
          }
        }
        else if(status === 'Confirmed')
        {
          return{
            background: '#7CFC00',
            color: 'black',
          }
        }
        else if(status === 'Shipping')
        {
          return{
            background: '#00BFFF',
            color: 'black',
          }
        }
        else if(status === 'Delivered')
        {
          return{
            background: '#C0C0C0',
            color: 'black',
          }
        }
        else{
          return{
            background: '#FF0000',
            color: 'white',
          }
        }
      }
  return (
    <div className='admin'>
        <div className='adminGlass' style={{minHeight: "100vh"}}>
            <Sidebar/>
            <div className='Table py-5'>
                <h3 className='text-center py-3'>Accept Order</h3>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius:"20px" }}
            >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">##</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Date Time</TableCell>
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
              ) : orderStatus && orderStatus.length < 0 ?(
                <TableRow>
                    <TableCell colSpan={8} align="center">No data</TableCell>
                </TableRow>
              ):(
                orderStatus && orderStatus.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell component="th" scope="row" style={{verticalAlign: "middle"}}>
                        {index + 1}
                    </TableCell>
                  <TableCell component="th" scope="row">{row.userName} </TableCell>
                  <TableCell align="left">{row.productName}</TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">{formatCurrency(row.total)}</TableCell>
                  <TableCell align="left">{formatDateTime(row.created_at)}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">
                    <div className='d-flex'>
                        <div>
                            <button className='btn btn-info' onClick={() =>handleOpen(row.id)}>Update</button>
                        </div>
                        <div className='mx-3'>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                  </TableCell>
                </TableRow>
                )
              ))}
            </TableBody>
            {isOpen && (
                <Modal show={isOpen} onHide={handCancel}>
                <Modal.Header closeButton >
                  <Modal.Title>Update Order Status</Modal.Title>
                </Modal.Header>
                <div className="inputGroup1 py-3 col-md-12 d-flex flex-column">
                  <label>Status<span className="text-danger" style={{fontSize: "15px", fontWeight:"bolder"}}>*</span></label>
                      <select
                          id="gender"
                          value={statusUpdate.status}
                          onChange={(e) => setStatusUpdate((prevData)=> ({...prevData, status: e.target.value}))}
                          className="form-control"
                      >
                          <option value="Processing" className='text-uppercase'>Processing</option>
                          <option value="Confirmed" className='text-uppercase'>Confirmed</option>
                          <option value="Shipping" className='text-uppercase'>Shipping</option>
                          <option value="Delivered" className='text-uppercase'>Delivered</option>
                          <option value="Canceled" className='text-uppercase'>Canceled</option>
                      </select>
                </div> 
                <Modal.Footer>
                  <Button variant="secondary" onClick={handCancel}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleConfirmUpdate}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Table>
          <Pagination
              pageCount={page.last_page}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => getAllCart(selected + 1)}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
        </TableContainer>
            </div>
        </div>
    </div>
  )
}

export default AcceptOrder