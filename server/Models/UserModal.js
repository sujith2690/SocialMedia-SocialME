import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    seenNotifications: [
      {
        content: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Schema.ObjectId,
          ref: 'users',
        },
        date: Date,
        seen: {
          type: Boolean,
          default: false,
        },
      },
    ],
    unseenNotifications: [
      {
        content: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Schema.ObjectId,
          ref: 'users',
        },
        createdAt:Date,
        seen: {
          type: Boolean,
          default: false,
        },
      },
    ],
    saved: [
      {
        postId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        createdAt: Date,
      },
    ],

    worksAt: String,
    livesIn: String,
    country: String,
    relationship: String,
    profilePicture: String,
    coverPicture: String,
    about: String,

    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
