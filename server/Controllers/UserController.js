import UserModel from "../Models/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import ReportModel from "../Models/ReportModal.js";

// get All unfollow users

export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find({ followers: { $nin: [req.body._id] } });
    users = users.map((user) => {
      const { password, isAdmin, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get All follow users

export const getAllFollowUser = async (req, res) => {
  try {
    let users = await UserModel.find({ followers: { $in: [req.body._id] } });

    users = users.map((user) => {
      const { password, isAdmin, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a user
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No User exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// get unfollowed user
export const getUnfollowedUser = async (req, res) => {
  try {
    const agggre = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.body.userid),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "followeruser",
        },
      },
    ]);
    console.log(agggre, "-------555");
  } catch (error) {
    console.log(error);
  }
};

// update user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      console.log(user);

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied ...? You can only Update Your own Profile");
  }
};

// Delete User

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
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

// Follow User

export const followUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User Followed");
      } else {
        res.status(403).json("User Already Followed by You");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow User

export const UnFollowUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User UnFollowed");
      } else {
        res.status(403).json("User Not Followed by You");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
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

export const blockUser = async (req, res) => {
  const userId = req.params.id;
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

// Report post

export const postReport = async (req, res) => {
  const postId = req.params.id;
  const userId =Types.ObjectId( req.body._id)
  const {desc} = req.body
  const user = {userId,desc}
  console.log(postId, "--------postid");
  console.log(userId, "********userid");
  try {
    const report = await ReportModel.findOne({postId});
    if (report) {
  
       report.users.push(user)
       report.save()
    }else{
      
const report =await ReportModel.create({users:user,postId})
console.log(report)

    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};
