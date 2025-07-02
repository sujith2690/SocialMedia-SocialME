import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import cors from 'cors'
import UploadRoute from './Routes/UploadRoute.js'
import { createServer } from 'http'
import MessageRoute from './Routes/MessageRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import AdminRoute from './Routes/AdminRoute.js'
import Socket from "./socket.js";
import { connectDB } from "./database.js";

// Routes 

const app = express();

// to serve images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

const server = createServer(app)


// Middleware 

app.use(bodyParser.json({ limit: "30 mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30 mb", extended: true }));
app.use(cors({ origin: ["https://socialmeconnect.netlify.app", "http://localhost:3000"] }))
Socket(server)
dotenv.config();

// mongoose
//   .connect(process.env.MONGO_DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() =>
//     server.listen(process.env.PORT, () =>
//       console.log(`Listening at ----- ${process.env.PORT}`)
//     )
//   ).catch((error)=> console.log(error));

connectDB()


// usage of routes

app.use('/', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)

app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)

app.use('/admin', AdminRoute)

// const PORT = process.env.PORT 
// app.listen(PORT, () => { console.log(`App is running on ${PORT}`) })

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server (with Socket.IO) is running on port ${PORT}`);
});


