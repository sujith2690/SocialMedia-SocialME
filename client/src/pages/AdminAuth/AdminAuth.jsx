import React from 'react'
import './AdminAuth.css'
import Logo from "../../img/hlogol.png";
import { useFormik } from "formik"
import { adminSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { AdminLogIn } from '../../Actions/AuthAction';



const AdminAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)

    const initialValues = {
        adminname: '',
        password: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit  } = useFormik({
        initialValues: initialValues,
        validationSchema: adminSchema,
        onSubmit: async(values, action) => {
         const response = await  dispatch(AdminLogIn(values))
            if(response.success){
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
            action.resetForm()
        },
    })
    console.log(errors)
    
    return (

        <div className="Auth">
            <Toaster position="top-right" />
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
                    <h3>Admin Login</h3>
                    <div className="inputfields">
                        <div className="inputname">
                            <input
                                type="text"
                                placeholder="Email"
                                className="infoInput"
                                name="adminname"
                                id="adminname"
                                value={values.adminname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.adminname && touched.adminname ? (
                                <span className="form-error">{errors.adminname}</span>) : null}
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

                    <button className="button infoButton" type="submit" disabled={loading} >
                        {loading ? "Loading..." :  'Login' }
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminAuth