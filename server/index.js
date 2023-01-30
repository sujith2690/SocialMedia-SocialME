import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import cors from 'cors'
import UploadRoute from './Routes/UploadRoute.js'

import MessageRoute from './Routes/MessageRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import AdminRoute from './Routes/AdminRoute.js'

// Routes 

const app = express();

// to serve images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))




// Middleware 

app.use(bodyParser.json({ limit: "30 mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30 mb", extended: true }));
app.use(cors())

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ----- ${process.env.PORT}`)
    )
  ).catch((error)=> console.log(error));


  // usage of routes

  app.use('/',AuthRoute)
  app.use('/user',UserRoute)
  app.use('/post',PostRoute)
  
  app.use('/upload',UploadRoute)
  app.use('/chat',ChatRoute)
  app.use('/message',MessageRoute)
  
  app.use('/admin', AdminRoute)
  

