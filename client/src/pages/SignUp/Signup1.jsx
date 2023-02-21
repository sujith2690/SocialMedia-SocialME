import React, { useState, useRef } from 'react'
import './signup1.css'
import { useFormik } from "formik"
import { signUpSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp, otpVerification } from "../../Actions/AuthAction";
import { resendOtp } from '../../api/AuthRequest';
import toast, { Toaster } from 'react-hot-toast';

const Signup1 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const userData = useSelector((state) => state.authReducer.authData)
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
        onSubmit: (values, action) => {
            console.log(values, '---------values')
            const user = values.username
            console.log(user, '-----------user')
            setInitValue(values)
            const response = dispatch(signUp(values))
            console.log(values.password, '-----resppppp---')
            if (response) toast.success(userData.message)
            else toast.error(userData.message)
            setShow(true)
            action.resetForm()
        },
        onClick: (action) => {
            action.resetForm()
        }
    })

    const handleSubmit2 = async () => {
        if (desc.current.value) {
            const otp = desc.current.value
            const jjjj = await dispatch(otpVerification(userId, otp))
            if (userData.success) toast.success(userData.message)
            else toast.error(userData.message)
        }
    }
    const handleLogin = () => {
        navigate('/login')
    }
    const handleResendotp = async () => {
        if (userId && userEmail) {
            await resendOtp(userId, userEmail)
            toast.success("OTP send, Please Check Your Email")
        }
        else {
            console.log('--**********     nothing')
        }
    }

    return (
        <div className='SignUpPage'>
            <div className="box1">
                <Toaster />
                {!show ?
                    <form className="form1" onSubmit={handleSubmit}>
                        <h2>SocialME</h2>
                        <div className="inputBox1">
                            <input
                                required='required'
                                type="text"
                                className="infoInput"
                                name="firstname"
                                id="firstname"
                                value={values.firstname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstname && touched.firstname ? (
                                <span className="form-error">{errors.firstname}</span>) : <span>First Name</span>}
                            <i></i>
                        </div>
                        <div className="inputBox1">
                            <input
                                required='required'
                                type="text"
                                className="infoInput"
                                name="lastname"
                                id="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastname && touched.lastname ? (
                                <span className="form-error">{errors.lastname}</span>) : <span>Last Name</span>}
                            <i></i>
                        </div>
                        <div className="inputBox1">
                            <input
                                required='required'
                                type="email"
                                className="infoInput"
                                name="username"
                                id="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.username && touched.username ? (
                                <span className="form-error">{errors.username}</span>) : <span>Email</span>}
                            <i></i>
                        </div>
                        <div className="inputBox1">
                            <input
                                required='required'
                                type="password"
                                className="infoInput"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <span className="form-error">{errors.password}</span>) : <span>Password</span>}
                            <i></i>
                        </div>
                        <div className="inputBox1">
                            <input
                                required='required'
                                type="password"
                                className="infoInput"
                                name="confirmpassword"
                                id="confirmpassword"
                                value={values.confirmpassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.confirmpassword && touched.confirmpassword ? (
                                <span className="form-error">{errors.confirmpassword}</span>) : <span>Confirm Password</span>}
                            <i></i>
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', cursor: "pointer", margin: 'auto' }} onClick={handleLogin}>
                                Already have account <b><a style={{ color: 'blue', fontSize: '15px' }}>Login</a></b> Now...
                            </span>
                        </div>
                        <button style={{ marginRight: '20px', marginBottom: '20px' }} className="button infoButton" type="submit" disabled={loading} >
                            {loading ? "Loading..." : 'Sign Up'}
                        </button>
                    </form>
                    :
                    <div className="form">
                        <h2>OTP Verify</h2>
                        <div className="inputBox">
                            <input
                                required='required'
                                type="number"
                                placeholder="Your Valid OTP"
                                className="infoInput"
                                name="otp"
                                id="otp"
                                ref={desc}
                            />
                                    
                            {errors.username && touched.username ? (
                                <span className="form-error">{errors.username}</span>) : null}
                            <div>
                                <p style={{ fontSize: '14px', cursor: 'pointer', margin: 'auto', marginTop: '20px' }} onClick={handleResendotp} >Resend Otp Now</p>
                            </div>
                            <button style={{ margin: 'auto', marginBottom: '10px' }} className="button infoButton" type="submit" onClick={handleSubmit2} >Otp Verify</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Signup1