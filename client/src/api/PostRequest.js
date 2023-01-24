import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000" });

export const getTimelinePosts = (id) =>API.get(`/post/${id}/timeline`)

export const otherUserPosts = (id)=> API.get(`/post/${id}/otherUserposts`)

export const likePost = (id, userId) => API.put(`/post/${id}/like`,{userId:userId})

export const fetchComments = (id) => API.get(`/post/${id}/commnets`).then((result)=>{
  return  result
})

export const savepost = (id,userId)=> API.put(`/post/${id}/save`,{userId:userId})

