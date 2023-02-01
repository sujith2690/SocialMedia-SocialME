import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const logIn = (formData) => API.post("/login", formData);

export const signUp = (formData) => API.post("/register", formData);

export const otpVerify = async(userId,otp)=>await API.post("/otpverify",{userId,otp})
console.log('---otp verify path----')


export const AdminLogIn = (formData) => API.post("/admin/adminlogin", formData);

export const AdminSignUp = (formData) => API.post("/admin/adminregister", formData);

