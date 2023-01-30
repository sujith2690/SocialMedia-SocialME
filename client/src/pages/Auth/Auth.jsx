import React, { useState } from "react";
import "./Auth.css"
import Logo from "../../img/hlogol.png";
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp, otpVerification } from "../../Actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const userData = useSelector((state) => state.authReducer.authData)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isOtp, setisOtp] = useState(false)
  const userId = userData?.user._id
  console.log(loading, '----------loading')
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: '',
    otp: ''
  });
  const otp = data.otp
  const [confirmpassword, setConfirmpassword] = useState(true);
  console.log(data.username, otp, '--------user and otp')
  console.log(data, '-------eeeee----data')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {

      if (data.password === data.confirmpassword) {
        dispatch(signUp(data))
        setIsSignUp(false)
        setisOtp(true)
      } else {
        setConfirmpassword(false)
      }
    } else if (isOtp) {
      dispatch(otpVerification(userId, otp))
    }
    else {
      dispatch(logIn(data))
    }
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setConfirmpassword(true)
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmpassword: '',
      otp: ''
    })
  }

  return (

    <div className="Auth">
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
          <h3>{isSignUp ? "Sign Up" : isOtp ? "Enter OTP" : "Log In"}</h3>
          
          {isSignUp && !isOtp &&
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          }
          {!isOtp &&
            <div>
              <input
                required
                type="text"
                placeholder="Email"
                className="infoInput"
                name="username"
                onChange={handleChange}
                value={data.username}
              />
            </div>
          }
          {!isOtp &&
            <div>
              <input
                required
                type="password"
                placeholder="Password"
                className="infoInput"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
              {isSignUp && !isOtp &&
                <input
                  required
                  type="password"
                  placeholder="Confirm Password"
                  className="infoInput"
                  name="confirmpassword"
                  onChange={handleChange}
                  value={data.confirmpassword}
                />
              }
            </div>
          }
          {isOtp &&
            <div>
              <input type="text"
                className="infoInput"
                name="otp"
                placeholder="OTP"
                onChange={handleChange}
                value={data.otp}
              />
            </div>
          }
          <span
            style={{
              display: confirmpassword ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px'
            }}>
            Password not Matching..!
          </span>
          <div>
            <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => { setIsSignUp((prev) => !prev); resetForm() }}>
              {isSignUp ? "Already Have Account Login here..!" : isOtp ? "Not Received OTP ? Resend here" : "Don't have an account Sign Up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading} >
            {loading ? "Loading..." : isSignUp ? 'Sign Up' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth
