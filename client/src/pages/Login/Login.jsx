import React, { useRef, useState } from 'react'
import './login.css'
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { loginSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from "../../Actions/AuthAction";
import toast, { Toaster } from 'react-hot-toast';
import { getUser, verifyEmails, verifyOtp } from '../../api/UserRequest';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const [forgot, setForgot] = useState(false)
    const [otpSend, setOtpSend] = useState(false)
    const [Password, setPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [Otp, setOtp] = useState('')
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



    // const handleVerifyEmail = async () => {
    //     const email = desc.current.value
    //     console.log("VERIFY EMAIL")
    //     if (email) {
    //         const response = await verifyEmail(email)
    //         console.log(response, '------------user')

    //         // if (otpSend === false) setOtpSend(true)
    //     }

    // }
    const handleConfirmOTP = async () => {
        console.log('otp verified');
    }

    const verifyEmail = async () => {
        console.log('-----1...')
        const userDetails = await verifyEmails(email)
        console.log(userDetails.data.success, '-----user...')
        const response = userDetails.data.success
        setUserid(userDetails.data.userDetails._id)
        if (response === true) {
            setOtpSend(true)
        }
    }
    const verifyOtps = async () => {
        const otp = desc.current.value
        console.log(otp, '---------otp')
        const Otpverify = await verifyOtp(Userid, otp)
        console.log(Otpverify,'-------Otpverify')
        const verified = Otpverify.data.token
        if (verified) {
            setPassword(true)
        }
    }
    const handleChanges = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    const changePassword =async()=>{
        console.log(data.password,'------',data.confirmpassword)
        if (data.password === data.confirmpassword){

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
                                        // ref={desc}
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
                                    // onChange={(e) => { setOtp(e.target.value); }}
                                    />
                                </div>
                            }
                        </div>
                        {!otpSend ?
                            <button onClick={verifyEmail} className="button infoButton" type="submit" disabled={loading} >
                                Send OTP
                            </button> :
                            <button onClick={verifyOtps} className="button infoButton" type="submit" disabled={loading} >
                                Verify OTP
                            </button>}
                        {Password ?
                            <div>
                                <input
                                    type="number"
                                    placeholder="Password"
                                    className="infoInput"
                                    name="password"
                                    id="password"
                                    // ref={desc}
                                    onChange={handleChanges}
                                    value={data.password}
                                />
                                {/* <input
                                    type="number"
                                    placeholder="Confirm Password"
                                    className="infoInput"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    // ref={desc}
                                    onChange={handleChanges}
                                    value={data.confirmpassword}
                                /> */}
                            </div>
                            : ''}
                        {Password ?
                            <button onClick={changePassword} className="button infoButton" type="submit" disabled={loading} >
                                Change Password
                            </button> :
                            ''}

                    </>
                }
            </div>
        </div>
    );
}

export default Login