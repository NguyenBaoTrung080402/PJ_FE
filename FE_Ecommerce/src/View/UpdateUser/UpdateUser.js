/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./update.css";
import SideBar from "../SideBar/SideBar";
import { toast } from "react-toastify";
import axios from '../../config/customAxios'

const UpdateUser = () => {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("current-account"));

  const navigate = useNavigate();
  const [loadingApi, setLoadingApi] = useState(false);
  const [nameUpdate, setName] = useState(currentUser.name);
  const [dob, setDob] = useState(currentUser.dob);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address);
  const [selectedGender, setSelectedGender] = useState(currentUser.gender);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  
  
  const handleUpdate = async () => {
    if (!nameUpdate || !phone || !address || !avatar || !dob) {
      toast.warning("Input not blank, Please");
      return;
    }
    
    setLoadingApi(true);
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('name', nameUpdate);
      formData.append('phone', phone);
      formData.append('dob', dob);
      formData.append('gender', selectedGender);
      formData.append('address', address);
      formData.append('_method', 'PUT');
    try {
      const res = await axios.post('/update-information' , formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
      });
      
      if (res.data.status === "error") {
        toast.error(res.data.message);

      } else if (res.data.status === "success") {
        toast.success(res.data.message) 
        window.location.reload(true);   
        // navigate('/account')
        const updatedCurrentUser = {
          ...currentUser,
          name: nameUpdate,
          dob: dob,
          phone: phone,
          address: address,
          gender: selectedGender,
          // avatar: avatar,
        };

        setName(updatedCurrentUser.name);
        setDob(updatedCurrentUser.dob);
        setPhone(updatedCurrentUser.phone);
        setAddress(updatedCurrentUser.address);
        setSelectedGender(updatedCurrentUser.gender);
        setAvatar(updatedCurrentUser.avatar);

        // Update the currentUser object in localStorage if needed
        localStorage.setItem("current-account", JSON.stringify(updatedCurrentUser));
      }
    } catch (error) {
      // toast.error(error.message);
    } finally {
      setLoadingApi(false);
    }
  };
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="container-fluid">
        <div className="row">
          <SideBar />

          <div className=" col-xl-9 col-lg-9 col-md-8">
            <div className="card">
              <div className="container-fluid profile-form">
                <div className="row">
                  <div className="col-sm-4 my-4 col-lg-4">
                    <div className="img-user fadeInLeft">
                      <ul>
                        <li>
                          <img
                            src={`http://127.0.0.1:8000/${currentUser.avatar}`}
                            // src={currentUser.avatar}
                            className="avatar img-circle img-thumbnail"
                            alt="avatar"
                          />
                        </li>
                        <li>
                          <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => setAvatar(e.target.files[0])}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <div className="form userProfile m-auto ">
                      <div className="col-12 fadeInLeft">
                        <label htmlFor="user_name">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="user_name"
                          value={nameUpdate}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group form-infor ">
                        <div className="col-sm-6 col-6 input-infor fadeInLeft">
                          <label>Gender</label>
                          <select
                            id="gender"
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="form-control"
                          >
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-6 input-infor fadeInLeft">
                          <label>Date of birth</label>
                          <input
                            required
                            name="dob"
                            type="date"
                            className="form-control"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group form-infor">
                        <div className="col-sm-6 col-6 input-infor fadeInLeft">
                          <label>Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            id="mobile"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-6 col-6 input-infor fadeInLeft">
                          <label>Address</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="example@yahoo.com"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group form-infor">
                        <div className="col-sm-12">
                          <br />
                          <button
                            className="btn-update fadeInUp" style={{outline: "none"}}
                            type="button"
                            onClick={() => handleUpdate()}
                          >
                            Update&nbsp;
                            {loadingApi ? (
                              <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
                            ) : (
                              <i className="fa-solid fa-right-to-bracket"></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
