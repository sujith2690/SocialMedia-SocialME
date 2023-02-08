import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    firstname: Yup.string().min(2).max(25).required("Please enter your First name"),
    lastname: Yup.string().min(1).max(25).required("Please enter your Last name"),
    username: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
    confirmpassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Password Must match")
})
export const  loginSchema = Yup.object({
    username:Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
})
export const  adminSchema = Yup.object({
    adminname:Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
})