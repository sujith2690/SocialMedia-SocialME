import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`);


export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);



// export const getAllFollowUser = (id)=> API.get("/user/allfollow",{id})

export const getAllFollowUser = (id)=> API.get(`/user/${id}/allfollow`)

export const getUnfollowedUsers = (id) => API.get(`/user/${id}/UnfollowedUser`)

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);

export const searchUser = (data)=> API.post('/user/searchUser',data)
console.log('----5----')



// Notifications 

export const getNotifications = (id)=> API.get(`/user/${id}/notifications`)

export const ClearNotifications=(id)=> API.get(`/user/${id}/clearNotifications`)




