import React, { useState, useRef } from 'react'
import './signup.css'
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { signUpSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp, otpVerification } from "../../Actions/AuthAction";


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const userData = useSelector((state) => state.authReducer.authData)
    const userId = userData?.user?._id
    const [isSignUp, setIsSignUp] = useState(false)
    const [isOtp, setisOtp] = useState(false)
    const [show, setShow] = useState(false)
    const desc = useRef()
    const [initValue,setInitValue] = useState(null)

    const initialValues = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpassword: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            console.log(values, '---------values')
            const user = values.username
            console.log(user, '-----------user')
            setInitValue(values)
            dispatch(signUp(values))
            setShow(true)
            action.resetForm()
        },
        onClick: (action) => {
            action.resetForm()
        }
    })
    console.log(initValue,'-----55-----initvalues')
    const handleSubmit2 = async () => {
        if (desc.current.value) {
            const otp = desc.current.value
            console.log(otp)
            dispatch(otpVerification(userId, otp))
        }
    }
    const handleLogin = () => {
        navigate('/login')
    }
    return (

        <div className="Auth">
            {/* Left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>SocialME</h1>
                    <h6>Explore The World Through AmazeME</h6>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                {!show ?
                    <form className="infoForm authForm" onSubmit={handleSubmit}>
                        <h3>SignUp</h3>
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


                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="email"
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
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={handleLogin}>
                            Already have account Login Now...
                            </span>
                        </div>
                        <button className="button infoButton" type="submit" disabled={loading} >
                            {loading ? "Loading..." : isSignUp ? 'Sign Up' : 'Sign in'}
                        </button>
                    </form>
                    :
                    <form onSubmit={handleSubmit2}>
                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="number"
                                    className="infoInput"
                                    name="otp"
                                    placeholder="OTP"
                                    ref={desc}
                                />
                            </div>
                        </div>
                        <button className="button infoButton" type="submit" >Otp Verify</button>
                    </form>
                }
            </div>
        </div>
    );
}

export default SignUp


// import React, { useState, useRef } from 'react'
// import './signup.css'
// import Logo from "../../img/hlogol.png";
// import { useFormik } from "formik"
// import { signUpSchema } from "../../schemas";
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { signUp, otpVerification } from "../../Actions/AuthAction";


// const SignUp = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const loading = useSelector((state) => state.authReducer.loading)
//     const userData = useSelector((state) => state.authReducer.authData)
//     const userId = userData?.user._id
//     const [isSignUp, setIsSignUp] = useState(false)
//     const [isOtp, setisOtp] = useState(false)
//     const [show, setShow] = useState(false)
//     const desc = useRef()

//     const initialValues = {
//         firstName: '',
//         lastName: '',
//         userName: '',
//         password: '',
//         confirmpass: '',
//     }
//     const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//         initialValues: initialValues,
//         validationSchema: signUpSchema,
//         onSubmit: (values, action) => {
//             console.log(values, '---------values')
//             const user = values.userName
//             console.log(user, '-----------user')
//             dispatch(signUp(values))

//             setShow(true)
//             action.resetForm()
//         },
//         onClick: (action) => {
//             action.resetForm()
//         }
//     })
//     // console.log(errors)  
//     const handleSubmit2 = async (e) => {
//         e.preventDefault()
//         if (desc.current.value) {
//             const otp = desc.current.value
//             console.log(otp)
//             console.log(userId,otp,'user id and otp at signupu.jsx...............')
//             dispatch(otpVerification(userId, otp))

//         }
//     }
//     const handleLogin = () => {
//         navigate('/login')
//     }
//     return (

//         <div className="Auth">
//             {/* Left side */}
//             <div className="a-left">
//                 <img src={Logo} alt="" />
//                 <div className="Webname">
//                     <h1>Dots</h1>
//                     <h6>Start connecting your dots..</h6>
//                 </div>
//             </div>
//             {/* Right Side */}
//             <div className="a-right">
//                 {!show?
//                     <form className="infoForm authForm" onSubmit={handleSubmit}>
//                         <h3>SignUp</h3>
//                         <div className="inputfields">
//                             <div className="inputname">
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     id="firstName"
//                                     placeholder="First Name"
//                                     value={values.firstName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}

//                                     className="infoInput"

//                                 />
//                                 {errors.firstName && touched.firstName ? (
//                                     <span className="form-error">{errors.firstName}</span>) : null}

//                             </div>
//                             <div className="inputname">
//                                 <input

//                                     type="text"
//                                     placeholder="Last Name"
//                                     className="infoInput"
//                                     name="lastName"
//                                     id="lastName"
//                                     value={values.lastName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.lastName && touched.lastName ? (
//                                     <span className="form-error">{errors.lastName}</span>) : null}
//                             </div>

//                         </div>


//                         <div className="inputfields">
//                             <div className="inputname">
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     className="infoInput"
//                                     name="userName"
//                                     id="userName"
//                                     value={values.userName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.userName && touched.userName ? (
//                                     <span className="form-error">{errors.userName}</span>) : null}
//                             </div>
//                         </div>

//                         <div className="inputfields">
//                             <div className="inputname">
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     className="infoInput"
//                                     name="password"
//                                     id="password"
//                                     value={values.password}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.password && touched.password ? (
//                                     <span className="form-error">{errors.password}</span>) : null}
//                             </div>

//                             <div className="inputname">
//                                 <input

//                                     type="password"
//                                     placeholder="Confirm Password"
//                                     className="infoInput"
//                                     name="confirmpass"
//                                     id="confirmpass"
//                                     value={values.confirmpass}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.confirmpass && touched.confirmpass ? (
//                                     <span className="form-error">{errors.confirmpass}</span>) : null}
//                             </div>
//                         </div>
//                         <div>
//                             <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={handleLogin}>
//                                 {isSignUp ? "Already Have Account Login here..!" : isOtp ? "Not Received OTP ? Resend here" : "Don't have an account Sign Up"}
//                             </span>
//                         </div>
//                         <button className="button infoButton" type="submit" disabled={loading} >
//                             {loading ? "Loading..." : isSignUp ? 'Sign Up' : 'Sign in'}
//                         </button>
//                     </form>
//                     :
//                     <form onSubmit={handleSubmit2}>
//                         <div className="inputfields">
//                             <div className="inputname">
//                                 <input
//                                     type="number"
//                                     className="infoInput"
//                                     name="otp"
//                                     placeholder="OTP"
//                                     ref={desc}
//                                 />
//                             </div>
//                         </div>
//                         <button className="button infoButton" type="submit" >Otp Verify</button>
//                     </form>
//                 }
//             </div>
//         </div>
//     );
// }

// export default SignUp