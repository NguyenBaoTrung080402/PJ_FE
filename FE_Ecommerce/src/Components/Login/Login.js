import React, { useEffect, useState } from 'react';
import './login.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import wave from '../../assets/IMG/wave.png';
import bg from '../../assets/IMG/bg.svg';
import logo from '../../assets/IMG/logo-multi.png';
import { toast } from 'react-toastify';
import { f_login_api } from '../../config/api';
import axios from "../../config/customAxios"

function Login() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();

  const loginContext = (email, token, name, role, phone, dob, avatar, gender, address) => {
    localStorage.setItem('token', token);
    localStorage.setItem(
      'current-account',
      JSON.stringify({
        email: email,
        name: name,
        role: role,
        phone: phone,
        dob: dob,
        avatar: avatar,
        gender: gender,
        address: address,
      })
    );
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleLogin = async () =>{
    if(!username || !password){
      toast.warning("Please enter a username and password")
      return;
    }
    setLoadingApi(true)
    try {
      const res = await f_login_api(username, password)
      if(res.data.status === "error"){
        toast.error(res.data.message)
      }else if (res.data.status === "success"){
        const token = res.data.authorisation.token;
        // localStorage.setItem('token', token);
        // localStorage.setItem(
        //   'current-account',
        //   JSON.stringify({
        //     email: res.data.result.email,
        //     name: res.data.result.name,
        //   })
        // );
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        loginContext(res.data.result.email, token, res.data.result.name, res.data.result.role, res.data.result.phone, res.data.result.dob, res.data.result.avatar, res.data.result.gender, res.data.result.address);
        toast.success(res.data.message)
        navigate('/')
      }else if(res.data.status === "not found"){
        toast.warning(res.data.message)
      }
    } catch (error) {  
      toast.error(error.message)
    }
    finally{
      setLoadingApi(false);
      setUsername('');
      setPassword('');
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navigate('/');
    }
  },[navigate])

  return (
    <div className="container-login">
      <img className="wave" src={wave} alt="Wave" />
      <div className="img">
        <img src={bg} alt="Background" />
      </div>
      <div className="login-content">
        <div className="login-form">
          <form>
            <NavLink className="nav-link text-center link-login fadeInUp" to="/">
              <img src={logo} alt="Avatar" />
            </NavLink>
            <h2 className="title fadeInUp">Welcome</h2>
            <div
              className={`input-div fadeInUp one ${focusedInput === 'username' || username ? 'focus' : ''}`}
              onClick={() => handleFocus('username')}
            >
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  onFocus={() => handleFocus('username')}
                  onBlur={handleBlur}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div
              className={`input-div fadeInUp pass ${focusedInput === 'password' || password ? 'focus' : ''}`}
              onClick={() => handleFocus('password')}
            >
              <div className="i">
                <i className={isShowPassword === true ? 'fa-solid fa-lock-open' : 'fa-solid fa-lock'} onClick={() => setIsShowPassword(!isShowPassword)}></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type={isShowPassword === true ? 'text' : 'password'}
                  className="input"
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <NavLink className="text-decoration-none link-login" to="/">
                <span style={{ color: 'red' }}></span> Forgot password
              </NavLink>
            </div>
            <button type="button" className="btn-login fadeInUp" onClick={() => handleLogin()}>
              Login &nbsp;
              {loadingApi ? (
                <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
              ) : (
                <i className="fa-solid fa-right-to-bracket"></i>
              )}
            </button>
            <div className="d-flex justify-content-start fadeInUp">
              <NavLink className="text-decoration-none link-login" to='/register'>
                <span style={{ color: 'red' }}>Don't have an account?</span> Register
              </NavLink>
            </div>
            <div className='d-flex justify-content-between mt-2 gg-fb '>
              <div>
                <button type="button" className="btn-login-gg fadeInUp">
                  {loadingApi ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
                  ) : (
                    <i style={{ fontSize: '18px' }} className="fa-brands fa-google"></i>
                  )}
                  &nbsp;Log in with Google
                </button>
              </div>
              <div>
                <button type="button" className="btn-login-fb fadeInUp">
                  {loadingApi ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
                  ) : (
                    <i style={{ fontSize: '18px' }} className="fa-brands fa-facebook"></i>
                  )}
                  &nbsp;Log in with FaceBook
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
