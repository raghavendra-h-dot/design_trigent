import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[a-zA-Z0-9._%+-]+@trigent\.com$/.test(values.email)) {
            toast.error("Only @trigent.com emails are allowed");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/login', values);
            if (response.status === 200) {
                toast.success("Login Successful!");
                sessionStorage.setItem('token', response.data.token);
                setTimeout(() => navigate('/'), 1000);
            }
        } catch (err) {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border p-4 shadow rounded" style={{ width: '300px' }}>
                <h2 className="mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" onChange={handleChanges} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={handleChanges} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>

                {/* Added "Don't have an account? Signup" section */}
                <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-decoration-none">Signup</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
