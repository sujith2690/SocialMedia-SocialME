
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.JWT_KEY;
const authMiddleWare = async(req,res,next)=>{
    console.log(req.headers.authorization,'-----------token without split')
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token,'-----------token')
        console.log('token --exist -- at authmiddleware')
        if(token){
            const decoded = jwt.verify(token, secret)
            req.body._id = decoded?.id;
        }
        next();
     } catch (error) {
         console.log(error,'-----authMiddleWare')
    }

}


export default authMiddleWare;