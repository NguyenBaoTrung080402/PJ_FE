import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/IMG/logo-admin.png";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import {
    UilEstate,
    UilUsersAlt,
    UilPackage,
    UilChart,
  } from "@iconscout/react-unicons";
// import User from "../User/User";
// import User from "../User/User";

const Sidebar = () => {
//   const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <Link to="/" className="logo text-decoration-none">
        <img src={Logo} alt="logo" />
        <span className="text-dark">
          Sh<span>o</span>ps
        </span>
      </Link>

      <div className="menu">
        <div className="selected d-flex flex-column ">
            <Link className="active sidebar text-dark text-decoration-none py-4" to="/admin-page"><span className="mx-3 fs-4"><UilEstate/> Dashboard</span></Link>
            <Link className="active sidebar text-dark text-decoration-none py-4" to="/list-user"><span className="mx-3 fs-4"><UilUsersAlt/>Customer</span></Link>
            <Link className="active sidebar text-dark text-decoration-none py-4" to="/category-admin"><span className="mx-3 fs-4"><UilPackage/> Categories</span></Link>
            <Link className="active sidebar text-dark text-decoration-none py-4" to="/brands-admin"><span className="mx-3 fs-4"><UilChart/>Brands</span></Link>
            <Link className="active sidebar text-dark text-decoration-none py-4" to="/product-admin"><span className="mx-3 fs-4"><UilChart/>Product</span></Link>
            <Link className="active sidebar text-dark text-decoration-none py-4" to="/accept-order"><span className="mx-3 fs-4"><UilChart/>Accept Order</span></Link>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;