import axios from "axios";

const API = axios.create({ baseURL: "https://back.amazemen.shop" });

export const logIn = (formData) => API.post("/login", formData);

export const signUp = (formData) => API.post("/register", formData);

export const otpVerify = async(userId,otp)=>await API.post("/otpverify",{userId,otp})
console.log('---otp verify path----')


export const AdminLogIn = (formData) => API.post("/admin/adminlogin", formData);

export const AdminSignUp = (formData) => API.post("/admin/adminregister", formData);

