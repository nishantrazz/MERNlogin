import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const storeName = localStorage.getItem('loggedInUser');
        const token = localStorage.getItem('token');

        if (!storeName || !token) {
            navigate('/login');
        }
        else {
            setUserName(storeName);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        toast.warn('Logged Out!', {
            position: "top-right",
            autoClose: 1000,
        });
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    return (
        <div>
            {/* Hero */}
            <div className="hero">
                <nav className="navbar navbar-expand-lg w-100 px-5 py-3">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <div className="logo fw-bold fs-1 text-white">
                            <a href='#' className="text-white text-decoration-none">Lo<span className='text-danger'>go</span></a>

                        </div>
                        <ul className='navbar-nav flex-row gap-4 mx-auto'>
                            <li className='nav-item'>
                                <a className='nav-link fs-5 fw-bold text-white' href='#'>Home</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link fs-5 fw-bold text-white' href='#'>Services</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link fs-5 fw-bold text-white' href='#'>Blog</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link fs-5 fw-bold text-white' href='#'>Contact Us</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link fs-5 fw-bold text-white' href='#'>About US</a>
                            </li>
                        </ul>
                        {/* <button className='btn btn-danger px-5 py-2 fs-5'> LOGOUT</button> */}
                        <button onClick={handleLogout} className='btn btn-danger px-5 py-2 fs-5'>LOGOUT</button>

                    </div>
                </nav>

                <div className="hero d-flex justify-content-center align-items-center flex-column bg-dark" >
                    <h1 className="fw-bold text-white title">Welcome {userName} 🎉 </h1>
                </div>

            </div>

        </div>
    )
}

export default Index