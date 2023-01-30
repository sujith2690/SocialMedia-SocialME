import React, { useState } from 'react'
import './login.css'
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { loginSchema, signUpSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { logIn } from "../../Actions/AuthAction";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const userData = useSelector((state) => state.authReducer.authData)

    const [isSignUp, setIsSignUp] = useState(false)
    const [isOtp, setisOtp] = useState(false)

    const initialValues = {
        username: '',
        password: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            dispatch(logIn(values))
            console.log(values, '---------values')
            action.resetForm()
        },
        onClick: (values, action) => {
            action.resetForm()
        }
    })
    console.log(errors)
    const handleLogin = () => {
        navigate('/signup')
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
                    <h3>Login</h3>
                    {/* <h3>{isSignUp ? "Sign Up" : isOtp ? "Enter OTP" : "Log In"}</h3> */}
                    <div className="inputfields">
                        <div className="inputname">
                            <input
                                type="text"
                                placeholder="Email"
                                className="infoInput"
                                name="username"
                                id="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.username && touched.username ? (
                                <span className="form-error">{errors.username}</span>) : null}
                        </div>
                    </div>
                    <div className="inputfields">
                        <div className="inputname">
                            <input
                                type="password"
                                placeholder="Password"
                                className="infoInput"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <span className="form-error">{errors.password}</span>) : null}
                        </div>
                    </div>
                    

                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={handleLogin}>
                            {isSignUp ? "Already Have Account Login here..!" : isOtp ? "Not Received OTP ? Resend here" : "Don't have an account Sign Up"}
                        </span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading} >
                        {loading ? "Loading..." : isSignUp ? 'Sign Up' : 'Sign in'}
                    </button>
                    {/* <button className="button infoButton" type="submit">Sign in</button> */}
                </form>
            </div>
        </div>
    );
}

export default Login