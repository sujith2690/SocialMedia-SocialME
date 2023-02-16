import React, { useRef, useState } from 'react'
import './login.css'
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { loginSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from "../../Actions/AuthAction";
import toast, { Toaster } from 'react-hot-toast';
import {  verifyEmails, verifyOtp } from '../../api/UserRequest';
import { changePassword, resendOtp } from '../../api/AuthRequest';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const [forgot, setForgot] = useState(false)
    const [otpSend, setOtpSend] = useState(false)
    const [Password, setPassword] = useState(false)
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
            const response = await dispatch(logIn(values))
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
            action.resetForm()
            console.log('--------irs herer')
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
        console.log(otp, '-----otp')
        const Otpverify = await verifyOtp(Userid, otp)
        console.log(Otpverify.data, '-------Otpverify')
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
            console.log('-its here')
            const Change = await changePassword(Userid, newPassword)
            console.log(Change, '----------changed')
            if (Change.data.success) toast.success(Change.data.message)
            setPasswordChanged(true);
            // if (passwordChanged) {
            //     console.log('changed')
            //     return redirect("/login");
            // }
        } else {
            toast.error('Password Not Match !')
        }
    }
    if (passwordChanged) {
        console.log('changed')
        navigate("/");
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
                {!forgot ?
                    <form className="infoForm authForm" onSubmit={handleSubmit}>
                        <h3>Login</h3>
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
                                Don't have an account <b><span style={{ color: 'blue', fontSize: '15px' }}>Sign Up </span></b>

                            </span>
                        </div>
                        <div style={{ fontSize: '12px', marginTop: '-30px', textAlign: 'start', cursor: "pointer" }}>
                            <p onClick={handleForgot}>forgot Password</p>
                        </div>

                        <button className="button infoButton" type="submit" disabled={loading} >
                            {loading ? "Loading..." : 'Sign in'}
                        </button>
                    </form>
                    :
                    < >
                        {!Password ?
                            <>
                                <h3>Forgot Password</h3>

                                <div className="inputfields">

                                    {!otpSend ?
                                        <div className="inputname">
                                            <input
                                                type="text"
                                                placeholder="Your Valid Email"
                                                className="infoInput"
                                                name="username"
                                                id="username"
                                                onChange={(e) => { setEmail(e.target.value); }}
                                            />
                                            {errors.username && touched.username ? (
                                                <span className="form-error">{errors.username}</span>) : null}
                                        </div>
                                        :
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="Your Valid OTP"
                                                className="infoInput"
                                                name="otp"
                                                id="otp"
                                                ref={desc}
                                            />
                                        </div>
                                    }
                                </div>
                                {!otpSend ?
                                    <button onClick={verifyEmail} className="button infoButton" type="submit" disabled={loading} >
                                        Send OTP
                                    </button> :
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ fontSize: 14, marginRight: '5px' }} onClick={resendOtps} >Rend OTP</p>
                                        <button onClick={verifyOtps} className="button infoButton" type="submit" disabled={loading} >
                                            Verify OTP
                                        </button>
                                    </div>
                                }
                            </> :
                            <>
                                <h3>Change Password</h3>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="infoInput"
                                        name="password"
                                        id="password"
                                        onChange={handleChanges}
                                        value={data.password}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="infoInput"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        // ref={desc}
                                        onChange={handleChanges}
                                        value={data.confirmpassword}
                                        style={{ marginTop: '10px' }}
                                    />
                                </div>
                                <button style={{ marginTop: '10px' }} onClick={changePasswords} className="button infoButton" type="submit" disabled={loading} >
                                    Change Password
                                </button>
                            </>
                        }

                    </>
                }
            </div>
        </div>
    );
}

export default Login