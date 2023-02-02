import React from 'react'
import './login.css'
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { loginSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from "../../Actions/AuthAction";
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)

    const initialValues = {
        username: '',
        password: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit  } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async(values, action) => {
         const response = await  dispatch(logIn(values))
            if(response.success){
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
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
            <Toaster/>
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
                             Don't have an account <b><span style={{color:'blue',fontSize:'15px'}}>Sign Up</span></b>
                        </span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading} >
                        {loading ? "Loading..." :  'Sign in' }
                    </button>
                    {/* <button className="button infoButton" type="submit">Sign in</button> */}
                </form>
            </div>
        </div>
    );
}

export default Login