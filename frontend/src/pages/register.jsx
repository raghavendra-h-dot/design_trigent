import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

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
            const response = await axios.post('http://localhost:5000/auth/register', values);
            if (response.status === 201) {
                toast.success("Registration Successful!");
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border p-4 shadow rounded" style={{ width: '300px' }}>
                <h2 className="mb-4 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" onChange={handleChanges} required />
                    </div>
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
                <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-decoration-none">Login</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
