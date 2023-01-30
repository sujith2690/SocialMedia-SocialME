import React, { useState } from "react";
import "./Auth2.css"
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { signUpSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'

const Auth = () => {
    const loading = useSelector((state) => state.authReducer.loading)
  const userData = useSelector((state) => state.authReducer.authData)

    const [isSignUp, setIsSignUp] = useState(false)
    const [isOtp, setisOtp] = useState(false)

    const initialValues = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpassword: '',
        otp: ''
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: initialValues,
        // if(isSignUp){
            validationSchema: signUpSchema,
            onSubmit: (values, action) => {
                console.log(values, '---------values')
                action.resetForm()
            },
            onClick:(values,action)=>{
                action.resetForm()
            }
        // }
    })
    console.log(errors)


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
                        <div className="inputfields">
                            <div className="inputname">
                                <input

                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="First Name"
                                    value={values.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    className="infoInput"

                                />
                                {errors.firstname && touched.firstname ? (
                                    <span className="form-error">{errors.firstname}</span>) : null}

                            </div>
                            <div className="inputname">
                                <input

                                    type="text"
                                    placeholder="Last Name"
                                    className="infoInput"
                                    name="lastname"
                                    id="lastname"
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.lastname && touched.lastname ? (
                                    <span className="form-error">{errors.lastname}</span>) : null}
                            </div>

                        </div>
                    }
                    {!isOtp &&

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
                    }
                    {!isOtp &&
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
                            {isSignUp && !isOtp &&
                                <div className="inputname">
                                    <input

                                        type="password"
                                        placeholder="Confirm Password"
                                        className="infoInput"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        value={values.confirmpassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                    {errors.confirmpassword && touched.confirmpassword ? (
                                        <span className="form-error">{errors.confirmpassword}</span>) : null}


                                </div>
                            }

                        </div>
                    }
                    {isOtp &&
                        <div className="inputfields">
                            <div className="inputname">
                                <input type="text"
                                    className="infoInput"
                                    name="otp"
                                    placeholder="OTP"
                                    value={values.otp}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                <label htmlFor="">Valid Otp</label>
                            </div>
                        </div>
                    }
                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => { setIsSignUp((prev) => !prev); handleReset() }}>
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
};

export default Auth
