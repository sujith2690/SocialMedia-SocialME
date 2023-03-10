import PostModel from "../Models/PostModal.js";
import UserModel from "../Models/UserModal.js";
import mongoose from "mongoose";
import ReportModel from "../Models/ReportModal.js";
import fs from "fs";
const ObjectId = mongoose.Types.ObjectId;

// Create New Post
export const createPost = async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error, "-----post controller");
    res.status(500).json(error);
  }
};

// Get a Post

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findById(id);
    // const post = await PostModel.findById.sort( [['id', -1]] )
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user userPost

export const userPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const userPost = PostModel.findById({ userId: { $in: [userId] } }).sort({
      createdAt: -1,
    });
    res.status(200).json(userPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get saved post

export const savedPost = async (req, res) => {
  try {
    const id = req.params.id;
    const savedPosts = await PostModel.find({ savedusers: { $in: [id] } });
    res.status(200).json(savedPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action Forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//  comment a post
export const commentPost = async (req, res) => {
  try {
    const comment = req.body.desc;
    const userid = req.userId;
    const postId = req.body.postId;
    const post = await PostModel.findById(postId);
    if (post?.comments) {
      const update = {
        comment: comment,
        userId: userid,
        createdAt: Date.now(),
      };
      const app = await post?.updateOne({ $push: { comments: update } });
      const User = await UserModel.findById(userid);
      const postUserId = post.userId;
      const postUser = await UserModel.findById(postUserId);
      const data = {
        content: `${User.firstname} ${User.lastname} commented on Your Post`,
        userId: new mongoose.Types.ObjectId(userid),
        createdAt: new Date(),
      };
      await postUser.updateOne({ $push: { unseenNotifications: data } });
      res.status(200).json(app);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a Post

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const Post = await PostModel.findByIdAndDelete(id);
    // const Post = await PostModel.findById(id);
    const image = Post.image;
    if (image) {
      fs.unlink("public/images/" + image, (error) => {
        if (error) {
          throw error;
        }
      });
    }
    res.status(200).json("Post Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like / Dislike a Post

export const likePost = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const post = await PostModel.findById(id);
    const postUserId = post.userId;
    const User = await UserModel.findById(userId);
    const postUser = await UserModel.findById(postUserId);
    if (!post.likes.includes(userId)) {
      const data = {
        content: `${User.firstname} ${User.lastname} Liked Your Post`,
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: new Date(),
      };
      await postUser.updateOne({ $push: { Notifications: data } });
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post UnLiked");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// save post
export const savePost = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const saveOnpost = await PostModel.findById(id);
    if (!saveOnpost.savedusers.includes(userId)) {
      await saveOnpost.updateOne({ $push: { savedusers: userId } });
      res.status(200).json("Post Saved");
    } else {
      await saveOnpost.updateOne({ $pull: { savedusers: userId } });
      res.status(200).json("Post Unsaved");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// Get TimeLine Posts

export const getTimeLinePosts = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId, "----timeline posts");
    let timelinePosts = await UserModel.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $addFields: {
          stringId: {
            $toString: "$_id",
          },
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "stringId",
          foreignField: "userId",
          as: "myPosts",
        },
      },
      {
        $project: {
          _id: 0,
          allposts: {
            $concatArrays: ["$myPosts", "$followingPosts"],
          },
        },
      },
      {
        $unwind: {
          path: "$allposts",
        },
      },
      {
        $addFields: {
          objId: {
            $toObjectId: "$allposts.userId",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "objId",
          foreignField: "_id",
          as: "userData",
          pipeline: [
            {
              $project: {
                _id: 0,
                username: 1,
                firstname: 1,
                lastname: 1,
                profilePicture: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$userData",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$userData", "$allposts"],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    if (timelinePosts.length === 0) {
      let timelinePosts = await PostModel.aggregate([
        {
          $sample:{
            size:5
          }
        },
        {
          $set: {
            userId: { $toObjectId: "$userId" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  username: 1,
                  firstname: 1,
                  lastname: 1,
                  profilePicture: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$userDetails",
          },
        },
      ]);
      console.log(timelinePosts[0],'----ZERO----vv')
      const realPost = timelinePosts.filter((post) => {
        return !post.isremoved;
      });
      res.status(200).json(realPost);
    }else{
      const realPost = timelinePosts.filter((post) => {
        return !post.isremoved;
      });
      console.log(realPost,'------timeline')
      res.status(200).json(realPost);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get comment

export const getComments = async (req, res) => {
  try {
    const postID = req.params.id;
    const post = PostModel.findById({ _id: postID });
    const comments = await PostModel.aggregate([
      {
        $match: {
          _id: ObjectId(postID),
        },
      },
      {
        $unwind: {
          path: "$comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $project: {
          "userData.firstname": 1,
          "userData.lastname": 1,
          "userData.profilePicture": 1,
          "comments.comment": 1,
          "comments.createdAt": 1,
        },
      },
      {
        $unwind: {
          path: "$userData",
        },
      },
      {
        $sort: {
          "comments.createdAt": -1,
        },
      },
    ]);

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Report post

export const postReport = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const desc = req.body.data;
    const user = { userId, desc };
    const post = await PostModel.findById(postId);
    const postUserId = post.userId;
    const postUser = await UserModel.findById(postUserId);
    const User = await UserModel.findById(userId);
    const data = {
      content: `${User.firstname} ${User.lastname} Reported Your Post`,
      userId: new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
    };
    const report = await ReportModel.findOne({ postId });
    if (report) {
      report.users.push(user);
      report.save();
      await postUser.updateOne({ $push: { Notifications: data } });
      res.status(200).json(report);
    } else {
      const report = await ReportModel.create({ users: user, postId });
      await postUser.updateOne({ $push: { Notifications: data } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Remove Post

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);
    if (post.userId === userId || user.isAdmin) {
      if (post.isRemoved) {
        await PostModel.updateOne({ _id: postId }, { isRemoved: false });
        await ReportModel.deleteOne({ postId: postId });
      } else {
        await PostModel.updateOne({ _id: postId }, { isRemoved: true });
      }

      res.status(200).json("Post Removed Succesfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
