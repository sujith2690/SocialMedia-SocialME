import AdminModel from "../Models/AdminModal.js";
import bcrypt from "bcrypt";
import UserModel from "../Models/UserModal.js";
import PostModal from "../Models/PostModal.js"
import ReportModel from "../Models/ReportModal.js";

//get Admin

export const getAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const admin = await AdminModel.findById(id);
    if (admin) {
      const {
        password,
        adminType,
        totalUsers,
        activeUsers,
        blockedUsers,
        onlineUsers,
        ...otherDetails
      } = admin._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("Admin Not Exist");
    }
  } catch (error) {
    res.status(500).json(error);
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

//get all user
export const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getReportedPost = async (req, res) => {
  // const posts = await ReportModel.find().populate("postId").populate("users.userId")

  const reportPost = await ReportModel.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "postId",
        foreignField: "_id",
        as: "postDetails",
      },
    },
    {
      $unwind: {
        path: "$postDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "users.userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $project: {
        "userDetails.firstname": 1,
        "userDetails.lastname": 1,
        "userDetails.username": 1,
        "userDetails._id": 1,
        "userDetails.profilePicture": 1,
        "postDetails.desc": 1,
        "postDetails.image": 1,
        "postDetails._id": 1,
        "postDetails.isremoved": 1,
      },
    },
  ]);
  try {
    if (reportPost) {
      res.status(200).json(reportPost);
    } else {
      res.status(200).json("No Reports");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Block user

export const blockUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId, "-------------user block");
  const user = await UserModel.findById(userId);
  try {
    if (user.isBlock === false) {
      const blockuser = await user.updateOne({ isBlock: true });
      res.status(200).json(blockuser);
    } else {
      const blockuser = await user.updateOne({ isBlock: false });
      res.status(200).json(blockuser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Verify user

export const verifyUser = async (req, res) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  try {
    if (user.verified === false) {
      const updateUser = await user.updateOne({ verified: true });
      res.status(200).json(updateUser);
    } else {
      const updateUser = await user.updateOne({ verified: false });
      res.status(200).json(updateUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};



export const removePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body
  // console.log(postId,'---------postId')
  console.log(userId,'---------userId')
  const Admin = await AdminModel.findById(userId)
  const post = await PostModal.findById(postId)
  console.log(post,'----------post----')

  try {
      if (Admin) {
          if (post.isremoved) {
              await PostModal.updateOne({ _id: postId }, { isremoved: false });
              await ReportModel.deleteOne({postId:postId})
              console.log('---1')
          }
          else {
              await PostModal.updateOne({ _id: postId }, { isremoved: true });
              console.log('---2...')
          }
          res.status(200).json('Post Removed Succesfully')
      }
  } catch (error) {
      res.status(500).json(error)

  }

}
