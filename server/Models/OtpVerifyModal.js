import mongoose  from "mongoose";

const otpVerificationSchema = mongoose.Schema({
    userEmail:{
        type:String
    },
    createdAt:{
        type:Date
    },
    expiresAt:{
        type:Date
    },
    otp:{
        type:String
    }
},
{
    timestamps:true
});

var otpVerificationModel = mongoose.model("otpverifiaction",otpVerificationSchema)
export default otpVerificationModel