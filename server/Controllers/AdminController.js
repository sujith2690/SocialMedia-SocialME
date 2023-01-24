import AdminModel from "../Models/AdminModal";
import bcrypt from 'bcrypt'

//get Admin

export const getAdmin = async (req,res)=>{
    const id = req.params.id;

    try {
        const admin = await AdminModel.findById(id)
        if (admin) {
            const{ password,adminType,totalUsers,activeUsers,blockedUsers,onlineUsers, ...otherDetails} = admin._doc;
            res.status(200).json(otherDetails)
        } else { 
            res.status(404).json("Admin Not Exist")
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

// update Admin

export const updateAdmin = async (req, res) => {
    const id = req.params.id;
    const { currentAdminId, currentAdminStatus, password } = req.body;
  
    if (id === currentAdminId || currentAdminStatus) {
      try {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
        const admin = await UserModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(admin);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res
        .status(403)
        .json("Access Denied ...? You can only Update Your own Profile");
    }
  };
  
  // Delete Admin
  
  export const deleteAdmin = async (req, res) => {
    const id = req.params.id;
  
    const { currentAdminId, currentAdminStatus } = req.body;
    if (currentAdminId === id || currentAdminStatus) {
      try {
        await AdminModel.findByIdAndDelete(id);
        res.status(200).json("User Deleted Successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res
        .status(403)
        .json("Access Denied ...? You can only Delete Your own Profile");
    }
  };
  
