import React, { useEffect, useState } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import wave from '../../assets/IMG/wave.png';
import bg from '../../assets/IMG/bg.svg';
import logo from '../../assets/IMG/logo-multi.png';
import { toast } from 'react-toastify';
import { f_login_api } from '../../config/api';
import axios from "../../config/customAxios"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

function Login() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  const navigate = useNavigate();

  const loginContext = (email, token, name, authority, phone, dob, avatar, gender, address) => {
    localStorage.setItem('token', token);
    localStorage.setItem(
      'current-account',
      JSON.stringify({
        email: email,
        name: name,
        authority: authority,
        tel: phone,
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

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warning("Please enter a username and password")
      return;
    }
    setLoadingApi(true)
    try {
      const res = await f_login_api(username, password)
      if (res.data.status === "error") {
        toast.error(res.data.message)
      } else if (res.data.status === "success") {
        const token = res.data.result.token;
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        loginContext(res.data.result.account.email, token, res.data.result.account.name, res.data.result.account.authority, res.data.result.account.tel, res.data.result.account.dob, res.data.result.account.avatar, res.data.result.account.gender, res.data.result.account.address);
        toast.success(res.data.message)
        navigate('/')
      } else if (res.data.status === "not found") {
        toast.warning(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoadingApi(false);
      setUsername('');
      setPassword('');
    }
  }

  const responseGoogle = (response) => {
    if (response.profileObj) {
      const { email, name, imageUrl } = response.profileObj;
      console.log("Google response:", response);
      console.log("Email:", email);
      console.log("Name:", name);
      console.log("Image URL:", imageUrl);
      // Thực hiện các hành động cần thiết sau khi đăng nhập thành công với Google
    } else {
      console.log("Google login failed");
    }
  };

  const responseFacebook = (response) => {
    if (response.status === 'connected') {
      const { id, email, name, picture } = response;
      console.log("Facebook response:", response);
      console.log("ID:", id);
      console.log("Email:", email);
      console.log("Name:", name);
      console.log("Picture URL:", picture.data.url);
      // Thực hiện các hành động cần thiết sau khi đăng nhập thành công với Facebook
    } else {
      console.log("Facebook login failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate])

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
                <GoogleLogin
                  clientId="230981102224-gnos7d825h88tctqb9jnjo10h9l3d2ar.apps.googleusercontent.com"
                  buttonText="Log in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  redirectUri="http://localhost:3000/auth/google/callback"
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <div>
                  <FacebookLogin
            appId="421226950497392"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btn-login-fb fadeInUp"
            textButton="Log in with Facebook"
          />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
