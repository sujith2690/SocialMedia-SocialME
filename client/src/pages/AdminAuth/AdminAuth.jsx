import React, { useState } from "react";
import "./AdminAuth.css"
import Logo from "../../img/hlogol.png";
import { useDispatch, useSelector } from 'react-redux'
import { AdminLogIn, AdminSignUp } from "../../Actions/AuthAction";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)

  const [data, setData] = useState({
    adminname: '',
    password: '',
  });
const handleSubmit=(e)=>{
  e.preventDefault();

  dispatch(AdminLogIn(data))
  
}
const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};


  return (

    <div className="AdminAuth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>AmazeME</h1>
          <h6>Explore The World Through AmazeME</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Admin Login</h3>

          <div>
            <input
              type="text"
              placeholder="Admin Name"
              className="infoInput"
              name="adminname"
              onChange={handleChange}
              value={data.adminname}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />

          </div>


          <button className="button infoButton" type="submit" disabled={loading} >
            {loading ? "Loading..." : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};


export default AdminAuth