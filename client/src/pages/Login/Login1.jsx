import React, { useEffect, useRef, useState } from 'react'
import './login1.css'
import Logo from '../../img/hlogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import { changePassword, resendOtp } from '../../api/AuthRequest'
import { logIn, googleUser } from "../../Actions/AuthAction";
import { loginSchema } from '../../schemas'
import { verifyEmails, verifyOtp } from '../../api/UserRequest'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast';
import jwt_decode from 'jwt-decode'
const GoogleClientId = process.env.REACT_APP_GClientID

const Login1 = () => {
    // ////////////////////////////////////  

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const [forgot, setForgot] = useState(false)
    const [otpSend, setOtpSend] = useState(false)
    const [Password, setPassword] = useState(false)
    const [load, setLoad] = useState(false)
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [email, setEmail] = useState('')
    const [Userid, setUserid] = useState('')
    const desc = useRef()
    const [data, setData] = useState({
        password: '',
        confirmpassword: '',
    });
    const initialValues = {
        username: '',
        password: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {
            setLoad(true)
            const response = await dispatch(logIn(values))
            console.log(response, '----------------response')
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error("User Not Found!")
            }
            setLoad(false)
            action.resetForm()
        },
        onClick: (values, action) => {
            action.resetForm()
            console.log(errors)
        }
    })

    const handleLogin = () => {
        navigate('/signup')
    }
    const handleForgot = () => {
        if (forgot === false) setForgot(true)
        else setForgot(false)
    }

    const verifyEmail = async () => {
        const response = await verifyEmails(email)
        if (response.data.success) {
            toast.success(response.data.message)
            setOtpSend(true)
            setUserid(response.data.userDetails._id)
        } else {
            toast.error(response.data.message)
        }
    }
    const resendOtps = async () => {
        const resend = await resendOtp(Userid, email)
        if (resend.data.success) {
            toast.success(resend.data.message)
        } else {
            toast.error(resend.data.message)
        }
    }
    const verifyOtps = async () => {
        const otp = desc.current.value
        const Otpverify = await verifyOtp(Userid, otp)
        if (Otpverify.data.success) {
            toast.success(Otpverify.data.message)
            if (Otpverify.data.success === "OTP expires") {
                setOtpSend(false)
            } else {
                setPassword(true)
            }
        } else {
            toast.error(Otpverify.data.message)
        }
    }
    const handleChanges = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const changePasswords = async () => {
        if (data.password === data.confirmpassword) {
            const newPassword = data.confirmpassword
            const Change = await changePassword(Userid, newPassword)
            if (Change.data.success) toast.success(Change.data.message)
            setPasswordChanged(true);
        } else {
            toast.error('Password Not Match !')
        }
    }
    if (passwordChanged) {
        navigate("/");
    }


    //..................Gooooogle..........................
    function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);
        const google = dispatch(googleUser(userObject))
    }
    function GVerify() {
        /*global  google*/
        try {
            google.accounts.id.initialize({
                client_id: GoogleClientId,
                callback: handleCallbackResponse,
            });

            google.accounts.id.renderButton(
                document.getElementById("googleBtn"),
                { theme: "outline", size: "large", shape: "rectangle" }
            );
            //google.accounts.id.prompt();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GVerify()
    }, [])
    /////////////////////////////////////////////////////

    return (
        <div className='loginPage'>
            <div className="box">
                <Toaster />
                {!forgot ?
                    <form className="form" onSubmit={handleSubmit} >
                        <h2>SocialME</h2>
                        <div className="inputBox">
                            <input
                                required='required'
                                type="text"
                                className="infoInput"
                                name="username"
                                id="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.username && touched.username ? (
                                <span className="form-error">{errors.username}</span>) : <span>User Name</span>}
                            <i></i>
                        </div>
                        <div className="inputBox">
                            <input
                                type="password"
                                required='required'
                                // placeholder="Password"
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
                        <div className="links">
                            <a onClick={handleForgot}>Forgot Password</a>
                            <a onClick={handleLogin}>Sign Up</a>
                        </div>
                        {/* <input type="submit" value='Login' /> */}
                        {
                            load ? <button className="loading-btn" disabled>
                                <span className="spinner" />

                            </button>
                                :
                                <>
                                    <button type='submit' className='loginBtn'>Login</button>
                                    <div style={{ marginTop: '10px' }} className='' id='googleBtn'></div>
                                </>
                        }
                        {/* <button type='submit' className='button logbtn'>Login</button> */}

                    </form>
                    :

                    <div className="form">
                        {!Password ?
                            <>
                                <h2>Forgot Password</h2>
                                <div className="inputBox">
                                    {!otpSend ?
                                        <input
                                            required='required'
                                            placeholder="Your Valid Email"
                                            type="text"
                                            className="infoInput"
                                            name="username"
                                            id="username"
                                            onChange={(e) => { setEmail(e.target.value); }}
                                        />
                                        :
                                        <input
                                            required='required'
                                            type="number"
                                            placeholder="Your Valid OTP"
                                            className="infoInput"
                                            name="otp"
                                            id="otp"
                                            ref={desc}
                                        />
                                    }
                                    {errors.username && touched.username ? (
                                        <span className="form-error">{errors.username}</span>) : null}
                                    <i></i>
                                </div>
                                <br />
                                {!otpSend ?
                                    <button onClick={verifyEmail} className="button infoButton" type="submit" disabled={loading} >
                                        Send OTP
                                    </button> :
                                    <>
                                        <p style={{ cursor: 'pointer' }} onClick={resendOtps} >Rend OTP</p>
                                        <button onClick={verifyOtps} className="button infoButton" type="submit" disabled={loading} >
                                            Verify OTP
                                        </button>
                                    </>
                                }
                            </> :
                            <>
                                <h2>Change Password</h2>
                                <div className="inputBox">
                                    <input
                                        required='required'
                                        type="password"
                                        className="infoInput"
                                        name="password"
                                        id="password"
                                        onChange={handleChanges}
                                        value={data.password}
                                    />
                                    {errors.username && touched.username ? (
                                        <span className="form-error">{errors.username}</span>) : <span>New Password</span>}
                                    <i></i>
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="password"
                                        required='required'
                                        className="infoInput"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        onChange={handleChanges}
                                        value={data.confirmpassword}
                                    />
                                    {errors.password && touched.password ? (
                                        <span className="form-error">{errors.password}</span>) : <span>Password</span>}

                                    <i></i>
                                </div>
                                <button style={{ marginTop: '10px' }} onClick={changePasswords} className="button infoButton" type="submit" disabled={loading} >
                                    Change Password
                                </button>

                            </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Login1