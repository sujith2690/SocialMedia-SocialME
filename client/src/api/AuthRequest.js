import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const logIn = (formData) => API.post("/auth/login", formData);

export const signUp = (formData) => API.post("/auth/register", formData);

export const otpVerify = (userId,otp)=> API.post("/auth/otpverify",{userId,otp})

export const searchUser = (data)=> API.post(`/auth/user`,{data})




export const AdminLogIn = (formData) => API.post("/admin/adminlogin", formData);

export const AdminSignUp = (formData) => API.post("/admin/adminregister", formData);

