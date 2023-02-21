import UserModel from "../Models/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import PostModel from "../Models/PostModal.js";

// get All unfollow users

export const getAllUnfollowUsers = async (req, res) => {
  try {
    let users = await UserModel.find({ followers: { $nin: [req.body._id] } });
    users = users.map((user) => {
      const { password, isBlock, verified, saved, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get All follow users

export const getAllFollowUser = async (req, res) => {
  const User = req.params.id;
  try {
    let users = await UserModel.find({ followers: { $in: [User] } });
    users = users.map((user) => {
      const { password, isBlock, verified, saved, ...otherDetails } = user._doc;
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
      const { password, isBlock, verified, saved, ...otherDetails } = user._doc;
      const userPost = await PostModel.find({ userId: id });
      otherDetails.allPosts = userPost;
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
  const UserId = req.params.id;
  try {
    let users = await UserModel.find({ followers: { $nin: [UserId] } });
    users = users.map((user) => {
      const { password, isBlock, verified, saved, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users)
  } catch (error) {
    console.log(error);
  }
};

// update user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

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

// search user

export const searchUser = async (req, res) => {
  const user = req.body.desc
  try {
    let findUser = await UserModel.find({
      firstname: { $regex: new RegExp(user), $options: "si" },
    });
    findUser = findUser.map((item) => {
      const { password, verified, saved, isAdmin, isBlock, ...otherDetails } =
        item._doc;
      return otherDetails;
    });
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
        const data = {
          content: `${followingUser.firstname} ${followingUser.lastname} started following you`,
          userId: new mongoose.Types.ObjectId(_id),
          createdAt: new Date(),
        };
        await followUser.updateOne({ $push: { Notifications: data } });
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

// Notifications

export const getNotifications = async (req, res) => {
  const userId = req.params.id;
  try {
    const userDetails = await UserModel.aggregate([
      {
        $match: {
          _id: Types.ObjectId(userId),
        },
      },
      {
        $unwind: {
          path: "$Notifications",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Notifications.userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $project: {
          "userData.firstname": 1,
          "userData.lastname": 1,
          "userData.profilePicture": 1,
          "Notifications.content": 1,
          "Notifications.createdAt": 1,
        },
      },
      {
        $unwind: {
          path: "$userData",
        },
      },
      {
        $sort: {
          "Notifications.createdAt": -1,
        },
      },
    ]);
    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const clearNotifications = async (req, res) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  try {
    const clear = await user.updateOne({ $unset: { Notifications: "" } });
    res.status(200).json(clear);
  } catch (error) {
    res.status(500).json(error);
  }
};
