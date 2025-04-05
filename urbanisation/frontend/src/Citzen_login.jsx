import { useState } from "react";
import axios from "axios";


function CitizenLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [responseMessage, setResponseMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/user/citzen/login/', formData);
            setResponseMessage('Login successful!');
            console.log('Login Response:', response.data);

            
            // Redirect to dashboard or home page after successful login
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setResponseMessage('Invalid email or password.');
            } else {
                setResponseMessage('Login failed. Please try again.');
            }
            console.error('Login Error:', error.response?.data || error.message);
        }
    }
    return (
        <>
        <div className="login-form">
            <h2>Citizen Login</h2>
            {responseMessage && <p>{responseMessage}</p>}
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
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </form>
        </div>
        <p className="staff-redirect">Are you a staff member? <a href="/staff-login">Click here</a></p>
        </>
    );
}

export default CitizenLogin;