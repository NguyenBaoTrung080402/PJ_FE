import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/IMG/logo-admin.png";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
    UilEstate,
    UilUsersAlt,
    UilPackage,
    UilChart,
} from "@iconscout/react-unicons";

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState("");
    const location = useLocation();

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <>
            <div className="bars">
                <UilBars />
            </div>
            <motion.div className="sidebar">
                <Link to="/" className="logo text-decoration-none">
                    <img src={Logo} alt="logo" />
                    <span className="text-dark">
                        Sh<span>o</span>ps
                    </span>
                </Link>

                <div className="menu">
                    <div className="selected d-flex flex-column">
                        <Link
                            className={`text-dark text-decoration-none py-4 ${
                                selectedItem === "dashboard" ? "actived" : ""
                            }`}
                            onClick={() => handleItemClick("dashboard")}
                            to="/admin-page"
                        >
                            <span className="mx-3 fs-4">
                                <UilEstate /> Dashboard
                            </span>
                        </Link>
                        <Link
                            className={`text-dark text-decoration-none py-4 ${
                                selectedItem === "customer" ? "actived" : ""
                            }`}
                            onClick={() => handleItemClick("customer")}
                            to="/list-user"
                        >
                            <span className="mx-3 fs-4">
                                <UilUsersAlt /> Customer
                            </span>
                        </Link>
                        <Link
                            className={`text-dark text-decoration-none py-4 ${
                                selectedItem === "categories" ? "actived" : ""
                            }`}
                            onClick={() => handleItemClick("categories")}
                            to="/category-admin"
                        >
                            <span className="mx-3 fs-4">
                                <UilPackage /> Categories
                            </span>
                        </Link>
                        <Link
                            className={`text-dark text-decoration-none py-4 ${
                                selectedItem === "brands" ? "actived" : ""
                            }`}
                            onClick={() => handleItemClick("brands")}
                            to="/brands-admin"
                        >
                            <span className="mx-3 fs-4">
                                <UilChart /> Brands
                            </span>
                        </Link>
                        <Link
                            className={`text-dark text-decoration-none py-4 ${
                                selectedItem === "products" ? "actived" : ""
                            }`}
                            onClick={() => handleItemClick("products")}
                            to="/product-admin"
                        >
                            <span className="mx-3 fs-4">
                                <UilChart /> Products
                            </span>
                        </Link>
                        <Link
                            className={`text-dark text-decoration-none py-4 ${
                                selectedItem === "acceptOrder" ? "actived" : ""
                            }`}
                            onClick={() => handleItemClick("acceptOrder")}
                            to="/accept-order"
                        >
                            <span className="mx-3 fs-4">
                                <UilChart /> Accept Order
                            </span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
