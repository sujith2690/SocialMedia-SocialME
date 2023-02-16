import React, { useState, useRef } from 'react'
import './signup.css'
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { signUpSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp, otpVerification } from "../../Actions/AuthAction";
import { resendOtp } from '../../api/AuthRequest';
import toast, { Toaster } from 'react-hot-toast';


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const userData = useSelector((state) => state.authReducer.authData)
    // const [userDetails, setUserDetails] = useState('')
    // setUserDetails(userData)
    const userId = userData?.user?._id
    const userEmail = userData?.user?.username
    const [show, setShow] = useState(false)
    const desc = useRef()
    const [initialValues, setInitValue] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpassword: '',
    })
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit:  (values, action) => {
            console.log(values, '---------values')
            const user = values.username
            console.log(user, '-----------user')
            setInitValue(values)
            // toast.success('OTP Send To Your Email')
             dispatch(signUp(values))
            console.log(userData, '-------userDetails------')
            if (userData.success) toast.success(userData.message)
            else toast.error(userData.message)
            setShow(true)
            action.resetForm()
        },
        onClick: (action) => {
            action.resetForm()
        }
    })

    const handleSubmit2 = async() => {
        if (desc.current.value) {
            const otp = desc.current.value
            console.log(otp, '----------otp')
            const jjjj = await dispatch(otpVerification(userId, otp))
            console.log(jjjj, '-555555555---')
            if (userData.success) toast.success(userData.message)
            else toast.error(userData.message)
        }
    }
    const handleLogin = () => {
        navigate('/login')
    }
    const handleResendotp = async () => {
        console.log(initialValues, '------------initialValues')
        if (userId && userEmail) {
            await resendOtp(userId, userEmail)
            toast.success("OTP send, Please Check Your Email")
        }
        else {
            console.log('--**********     nothing')
        }
    }
    return (

        <div className="Auth">
            <Toaster />
            {/* Left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>SocialME</h1>
                    <h6>Explore The World Through SocialME</h6>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                {!show ?
                    <form className="infoForm" onSubmit={handleSubmit}>
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
                            <span style={{ fontSize: '12px', cursor: "pointer", margin: 'auto' }} onClick={handleLogin}>
                                Already have account <b><span style={{ color: 'blue', fontSize: '15px' }}>Login</span></b> Now...
                            </span>
                        </div>
                        <button style={{ marginRight: '20px', marginBottom: '20px' }} className="button infoButton" type="submit" disabled={loading} >
                            {loading ? "Loading..." : 'Sign Up'}
                        </button>
                    </form>
                    :
                    <div className="infoForm" >
                        <div >
                            <div style={{ padding: '10px' }}>
                                <input
                                    type="number"
                                    className="infoInput"
                                    name="otp"
                                    placeholder="OTP"
                                    ref={desc}
                                />
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: '14px', cursor: 'pointer', margin: 'auto', marginTop: '20px' }} onClick={handleResendotp} >Resend Otp Now</p>
                        </div>
                        <button style={{ margin: 'auto', marginBottom: '10px' }} className="button infoButton" type="submit" onClick={handleSubmit2} >Otp Verify</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default SignUp

