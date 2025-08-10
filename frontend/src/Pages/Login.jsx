// login.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: ''
    });


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value;
        setloginInfo(copyloginInfo);
        console.log('Login Info', copyloginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Please Enter Both Email and Password');
        }

        try {
            // const url = 'https://mernlogin-9cvy.onrender.com/auth/login';
            // const response = await fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },

            //     body: JSON.stringify(loginInfo)
            // });
            fetch("https://mernlogin-9cvy.onrender.com/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login Failed');
            }
            const { success, message, jwtToken, name, error } = data;
            if (success) {
                handleSuccess(message);
                // localStorage.setItem('jwtToken', jwtToken);
                // localStorage.setItem('name', name);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/index');
                }, 1000);
            }
            else if (error) {
                const details = error?.details[0] || 'Login Failed';
                handleError(details);
            }
            // else if (error) {
            //     const details = typeof error === 'object' ? error?.details?.[0]?.message : error;
            //     handleError(details || "Unknown error occurred");
            // }
            else if (!success) {
                handleError(message || 'Invalid Credentails');
            }
            if (!response.ok) {
                throw new Error(data.message || 'Login Request Failed');
            }
        } catch (err) {
            handleError(err.message || ' Something went wrong')
        }
    };
    const [showpassword, setShowpassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword);
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100 modern-bg">
                <div className='modern-glass border-0 shadow p-5 rounded-4 text-white' style={{ width: '100%', maxWidth: '420px' }}>
                    <h2 className='text-center mb-4 fw-bold'>Welcome Back  </h2>


                    <form className='signup-wrapper' onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="name" className='form-label text-white'>Email</label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                className="form-control form-control-lg bg-transparent text-white border-white"
                                placeholder='Enter Your Email'
                                value={loginInfo.email}
                            >
                            </input>
                        </div>
                        <div className="mb-4 position-relative">
                            <label htmlFor="name" className='form-label text-white'>Password</label>
                            <input
                                onChange={handleChange}
                                type={showpassword ? 'text' : 'password'}
                                name="password"
                                className="form-control form-control-lg bg-transparent text-white border-white"
                                placeholder='Enter Password'
                                value={loginInfo.password}
                            >
                            </input>
                            <i
                                className={`bi ${showpassword ? 'bi-eye-slash' : 'bi-eye'}`}
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '15px',
                                    top: '50%',
                                    cursor: 'pointer',
                                    color: 'white',
                                    fontSize: '1.2rem'
                                }}
                            ></i>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe"/>
                                <label className="form-check-lable text-white" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <a href="#" className="text-decoration-mone text-white-50">Forget Password</a>                          
                        </div>
                        <button type='submit' className='btn btn-light w-100 py-2 fw-semibold'> Login</button>
                    </form>
                    <div className="text-center mt-4">
                        <span className="text-white-50"> Do not have Account? <Link to='/signup ' className='text-white fw-semibold'>Signup </Link></span>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Login
