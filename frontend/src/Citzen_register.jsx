import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function CitizenRegister() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/user/citzen/signup/', formData);
      setResponseMessage('Registration successful!');
      console.log('Register Response:', response.data);
       // Redirect to login page after successful registration
    } catch (error) {
        if (error.response && error.response.status === 400) {
          // Verificăm dacă serverul returnează eroarea pentru email duplicat
          if (error.response.data.error && error.response.data.error.includes('UNIQUE constraint failed: user_citzen.email')) {
            setResponseMessage('An account with this email already exists.');
          } 
          // Verificăm dacă serverul returnează eroarea pentru username duplicat
          else if (error.response.data.error && error.response.data.error.includes('UNIQUE constraint failed: user_citzen.username')) {
            setResponseMessage('An account with this username already exists.');
          } 
          else {
            setResponseMessage('Registration failed. Please try again.');
          }
        } else {
          setResponseMessage('An unexpected error occurred. Please try again later.');
        }
        console.error('Register Error:', error.response?.data || error.message);
      }
  };

  let message = null;
    if (responseMessage) {
        message = <p>{responseMessage}</p>;
    }
    return (
    <div className="register-form">
      <h2>Citizen Registration</h2>
      {message}
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor = "first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div>
            <label htmlFor = "last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    
    );
  };

export default CitizenRegister;