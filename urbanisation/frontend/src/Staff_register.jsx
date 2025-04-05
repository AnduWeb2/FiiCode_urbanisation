import { use, useState } from "react";
import axios from "axios";


function StaffRegister() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/user/staff/signup/', formData);
            console.log('Registration Response:', response.data);
            // Redirect to login page or show success message
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Registration Error:', error.response.data);
            } else {
                console.error('Registration Error:', error.message);
            }
        }
    }
}

export default StaffRegister;