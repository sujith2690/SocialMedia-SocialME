import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    firstname: Yup.string().min(2).max(25).required("Please enter your First name"),
    lastname: Yup.string().min(1).max(25).required("Please enter your Last name"),
    username: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
    confirmpassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Password Must match")
})
export const loginSchema = Yup.object({
    username: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
})
export const adminSchema = Yup.object({
    adminname: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
})

export const profileSchema = Yup.object({
    firstname: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .max(25, "First name can't exceed 25 characters")
        .required("First name is required"),

    lastname: Yup.string()
        .min(1, "Last name must be at least 1 character")
        .max(25, "Last name can't exceed 25 characters")
        .required("Last name is required"),

    worksAt: Yup.string()
        .max(20, "Works at can't exceed 20 characters")
        .nullable(),

    livesIn: Yup.string()
        .max(15, "Lives in can't exceed 15 characters")
        .nullable(),

    country: Yup.string()
        .max(15, "Country can't exceed 15 characters")
        .nullable(),

    relationship: Yup.string()
        .max(8, "Relationship status can't exceed 8 characters")
        .nullable(),
})