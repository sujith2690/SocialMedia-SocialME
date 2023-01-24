import mongoose from "mongoose";

const postSchema =  mongoose.Schema ({
    userId:{
        type: String,
        required:true,
    },
    desc: String,
    image: String,
    likes:[],
    comments: [
        {
            userId:{
                type:mongoose.Schema.ObjectId,
                required:true
                
            },
            comment:{
                type:String,
                required:true
            },
           createdAt:Date
        }
    ],savedusers:[]
},
{ timestamps: true }
);
var PostModel = mongoose.model("Posts",postSchema)
export default PostModel;