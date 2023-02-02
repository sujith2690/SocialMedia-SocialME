import axios from "axios";

const API = axios.create({baseURL:'https://back.amazemen.shop'})

export const userChats = (id)=> API.get(`/chat/${id}`)

export const createChat = (data)=> API.post(`/chat/`,data)