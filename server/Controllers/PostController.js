import PostModel from "../Models/PostModal.js";
import UserModel from "../Models/UserModal.js";
import mongoose from "mongoose";
import ReportModel from "../Models/ReportModal.js";

const ObjectId = mongoose.Types.ObjectId;

// Create New Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  console.log(req.body,'-------body--')
  try {
    await newPost.save();
    console.log(newPost, "--------new post");
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error,'-----post controller')
    res.status(500).json(error);

  }
};

// Get a Post

export const getPost = async (req, res) => {
  const id = req.params.id;
  console.log(id, "----------postid");
  try {
    const post = await PostModel.findById(id);
    console.log(post, "----------post");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user userPost

export const userPosts = async(req,res)=>{
  const userId = req.userId
  try {
    const userPost = PostModel.findById({userId:{ $in: [userId] }})
    console.log(userPost,'------------------userpost')
    res.status(200).json(userPost)
  } catch (error) {
    res.status(500).json(error)
  }
}


// Get saved post

export const savedPost = async (req, res) => {
  const id = req.params.id;
  console.log(id, "----------postid");
  try {
    const savedPosts = await PostModel.find({ savedusers: { $in: [id] } });
    console.log(savedPosts, "---------savedPosts");
    res.status(200).json(savedPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const  userId  = req.userId;

  try {
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
  console.log("KAAAAAAAAAAAAAAAAAAAAAAA");
  const comment = req.body.desc;
  // console.log(comment, "------comment");
  const userid = req.userId;
  const postId = req.body.postId;

  try {
    const post = await PostModel.findById(postId);
    console.log(post, "---------post");
    if (post?.comments) {
      const update = {
        comment: comment,
        userId: userid,
        createdAt: Date.now(),
      };
      const app = await post?.updateOne({ $push: { comments: update } });
      const User = await UserModel.findById(userid);
      console.log(User, "------------user");
      const postUserId = post.userId;
      const postUser = await UserModel.findById(postUserId);
      const data = {
        content: `${User.firstname} ${User.lastname} commented on Your Post`,
        userId: new mongoose.Types.ObjectId(userid),
        createdAt: new Date(),
        seen: false,
      };
      await postUser.updateOne({ $push: { unseenNotifications: data } });
      res.status(200).json(app);
    }
    console.log(post, "-----pooooo");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a Post

export const deletePost = async (req, res) => {
  const id = req.params.id;
  console.log("-----------------deleting post");
  try {
    const Post = await PostModel.findByIdAndDelete(id);
    res.status(200).json("Post Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like / Dislike a Post

export const likePost = async (req, res) => {
  const id = req.params.id;
  const  userId  = req.userId;
  // const { userId } = req.user;
  console.log(req.user,'------------userId') 
  try {
    const post = await PostModel.findById(id);
    const postUserId = post.userId;
    const User = await UserModel.findById(userId);
    const postUser = await UserModel.findById(postUserId);
    if (!post.likes.includes(userId)) {
      const data = {
        content: `${User.firstname} ${User.lastname} Liked Your Post`,
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: new Date(),
        seen: false,
      };
      await postUser.updateOne({ $push: { unseenNotifications: data } });
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
  const id = req.params.id;
  const  userId  = req.userId;
  console.log(id, "----postid");
  console.log(userId, "------userid");
  try {
    const saveOnpost = await PostModel.findById(id);
    console.log(saveOnpost, "--------- post");
    if (!saveOnpost.savedusers.includes(userId)) {
      await saveOnpost.updateOne({ $push: { savedusers: userId } });
      // const app = await save?.updateOne({ $push: { saved: update } });
      res.status(200).json("Post Saved");
    } else {
      await saveOnpost.updateOne({ $pull: { savedusers: userId } });
      res.status(200).json("Post Unsaved");
    }
    // console.log(save, "-------save postcontroller");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// Get TimeLine Posts

export const getTimeLinePosts = async (req, res) => {
  const userId = req.userId;
  console.log(userId, "----timeline posts");
  try {
    const timelinePosts = await UserModel.aggregate([
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
    // console.log(timelinePosts,'-------------timelinepost controller..')
    const realPost = timelinePosts.filter((post)=>{
      return !post.isremoved
    })
    // console.log(realPost,'--------post after filter')
    res.status(200).json(realPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get comment

export const getComments = async (req, res) => {
  const postID = req.params.id;
  console.log(postID, "---------postid contr");
  const post = PostModel.findById({ _id: postID });
  try {
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
  console.log('------------------------')
  const postId = req.params.id;
  const userId = req.userId;
  const { desc } = req.body;
  const user = { userId, desc };
  console.log(postId, "--------postid");
  console.log(userId, "********userid");

  try {
    const report = await ReportModel.findOne({ postId });

    if (report) {
      report.users.push(user);
      report.save();
      res.status(200).json(report)
    } else {
      const report = await ReportModel.create({ users: user, postId });
      console.log(report);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Remove Post

export const removePost = async (req, res) => {
  const postId = req.params.id
  const  userId  = req.userId
  const user = await UserModel.findById(userId)
  console.log(user, 'user at removepost')
  console.log(userId, postId, 'userid,isadminnn,postid...........at controller.....')
  const post = await PostModel.findById(postId)
  console.log(post, 'post at removepost post controller..................')

  try {
      console.log(user.isAdmin, 'usr.isadmin............')
      if (post.userId === userId || user.isAdmin) {
          if (post.isRemoved) {
              await PostModel.updateOne({ _id: postId }, { isRemoved: false });
              await ReportModel.deleteOne({postId:postId})
          }
          else {
              await PostModel.updateOne({ _id: postId }, { isRemoved: true });
          }

          res.status(200).json('Post Removed Succesfully')
      }
  } catch (error) {
      res.status(500).json(error)

  }

}