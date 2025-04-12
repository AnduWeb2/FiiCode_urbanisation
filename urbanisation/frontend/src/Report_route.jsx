import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function RouteReport() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [formData, setFormData] = React.useState({
    routeName: "",
    reportDetails: "",
    username: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  useEffect(() => {
          const token = localStorage.getItem("access_token");
          if (!token) {
              navigate("/login");
          } else {
              setUsername(localStorage.getItem("username"));
          }
      }, [navigate]);
  
  const handleHomeClick = () => {
    navigate('/dashboard'); // Redirect to the dashboard or home page
  }
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to the login page
  }
  return (
    <div className="report-route">
      <header>
        <nav className="navbar-links">
          <button className="navbar-button" onClick={handleHomeClick}> Go back Home</button>
          <button className="navbar-button-logout">Logout</button>
        </nav>
      </header>
      <main>
        <h1>Report Route</h1>
        <p>Please provide the details of the route you want to report:</p>
        <form className="report-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="route-name">Route Name:</label>
            <input type="text" id="route-name" name="route-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="report-details">Report Details:</label>
            <textarea id="report-details" name="report-details" required></textarea>
          </div>
          <button type="submit">Submit Report</button>
        </form>
      </main>
      
    </div>
  );
}
export default RouteReport;