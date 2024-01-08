import React from 'react'
import Sidebar from '../SideBar/SideBar'

const ProductAdmin = () => {
  return (
    <div className='admin'>
        <div className='adminGlass' style={{minHeight:"100vh"}}>
            <Sidebar/>
            <div className='py-5'>
                <h1>Hello world</h1>
            </div>
        </div>
    </div>
  )
}

export default ProductAdmin