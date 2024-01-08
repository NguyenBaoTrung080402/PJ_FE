import React, { useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { toast } from 'react-toastify';
import "./ChangePass.css"

const ChangePass = () => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [reNewPass, setReNewPass] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);


    const onSubmit = async (e) => {
        // e.preventDefault();
        // if (newPass != reNewPass) {
        //     toast.error("The new pass is different from renew pass")
        // } else if (newPass.length < 5 || reNewPass.length < 5) {
        //     toast.error("The length of the new password must be greater than five")
        // } else {
        //     const res = await changePassApi(oldPass, newPass, reNewPass);
        //     console.log("check dieu kien", res.data.message)
        //     if (res && res.data && res.data.status === 'success') {
        //         toast.success("Change password is successful")
        //         navigate(appRoutes.HOME);
        //     } else {
        //         toast.error("Wrong password")
        //         setNewPass('');
        //         setOldPass('');
        //         setReNewPass('');
        //         navigate(appRoutes.CHANGE_PASS);
        //     }

        // }

    }
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
        <div className='container-fluid'>
            <div className='row'>
                <SideBar/>
                <div className=" col-xl-9 col-lg-9 col-md-8">
                            <div className="card">
                                <div className="container-fluid profile-form">

                                    <div className="row">                                 
                                        <div className="col-sm-4 mt-4 fadeInLeft">
                                            <img className='imgFogotPass' src='http://www.imperialpublicschool.org/static/images/login_img.jpg' alt='' style={{height:"300px", width:"350px"}} />
                                        </div>
                                        <div className="col-sm-6 m-auto">                                          
                                            <form className="m-auto w-100" onSubmit={(e) => onSubmit(e)}>
                                                <div className="div-pass fadeInDown">
                                                    <label className="label-changePass" htmlFor="currentPassword">Current Password:</label>
                                                    <input className="input-changePass" id="currentPassword" name="oldPass" required
                                                        value={oldPass}
                                                        onChange={(e) => setOldPass(e.target.value)}
                                                        type={showPassword1 === true ? "text" : "password"}
                                                    /><i className={showPassword1 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                                        onClick={() => setShowPassword1(!showPassword1)}></i>
                                                </div>
                                                <div className="div-pass fadeInDown">
                                                    <label className="label-changePass" htmlFor="newPassword">New Password:</label>
                                                    <input className="input-changePass" id="newPassword" name="newPass" required
                                                        value={newPass}
                                                        onChange={(e) => setNewPass(e.target.value)}
                                                        type={showPassword2 === true ? "text" : "password"}
                                                    /><i className={showPassword2 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                                        onClick={() => setShowPassword2(!showPassword2)}></i>
                                                </div>
                                                <div className="div-pass fadeInDown">
                                                    <label className="label-changePass" htmlFor="confirmPassword">Confirm New Password:</label>
                                                    <input className="input-changePass" id="confirmPassword" name="ReNewPass" required
                                                        value={reNewPass}
                                                        onChange={(e) => setReNewPass(e.target.value)}
                                                        type={showPassword3 === true ? "text" : "password"}
                                                    /><i className={showPassword3 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                                        onClick={() => setShowPassword3(!showPassword3)}></i>
                                                </div>
                                                <div className="changepass-btn fadeInUp">
                                                    <button type="submit" value="Change Password"
                                                        className={oldPass && newPass && reNewPass ? "active" : ""}
                                                        disabled={oldPass && newPass && reNewPass ? false : true} >Change Password</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePass