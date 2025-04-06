import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



function StaffLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/user/staff/login/', formData);
            toast.success('Login successful!'); 
            console.log('Login Response:', response.data);
            localStorage.setItem('access_token', response.data.token);
            navigate('/dashboard'); // Redirect to dashboard or home page after successful login
            // Redirect to dashboard or home page after successful login
        } catch (error) {
            if(error.response.status == 412) {
                toast.error('Wait for verification from admin.');
            }
            else if (error.response && error.response.status === 401 || error.response.status === 404) {
                toast.error('Invalid username or password. Please try again.');
            } else {
                toast.error('Login failed. Please try again later.');
            }
            console.error('Login Error:', error.response?.data || error.message);
        }
    }
    return (
        <>
        <div className="login-form">
            <h2>Citizen Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/staff-register">Register here</a></p>
            </form>
        </div>
        
        </>
    );    
}

export default StaffLogin;