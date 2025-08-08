// signup.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
        console.log('Signup Info', copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Please fill all the fields');
        }

        try {
            const url = 'https://mernlogin-9cvy.onrender.com';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(signupInfo)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Signup Failed');
            }
            const { success, message, error } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            // else if (error) {
            //     const details = error?.details[0].message;
            //     handleError(details);
            // }
            else if (error) {
                const details = typeof error === 'object' ? error?.details?.[0]?.message : error;
                handleError(details || "Unknown error occurred");
            }
            else if (!success) {
                handleError(message);
            }
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'Signup Failed');
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
                    <h2 className='text-center mb-4 fw-bold'>Create Account </h2>


                    <form className='signup-wrapper' onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label htmlFor="name" className='form-label text-white'>Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                className="form-control form-control-lg bg-transparent text-white border-white"
                                placeholder='Enter Your Name'
                                value={signupInfo.name}
                            >
                            </input>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className='form-label text-white'>Email</label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                className="form-control form-control-lg bg-transparent text-white border-white"
                                placeholder='Enter Your Email'
                                value={signupInfo.email}
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
                                value={signupInfo.password}
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
                        <button type='submit' className='btn btn-light w-100 py-2 fw-semibold'> Sign Up</button>
                    </form>
                    <div className="text-center mt-4">
                        <span className="text-white-50"> Already have an Account? <Link to='/login ' className='text-white fw-semibold'>Login </Link></span>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Signup
