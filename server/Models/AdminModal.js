import mongoose from "mongoose";

const AdminSchema = mongoose.Schema(
  {
    adminname: {
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
    reportedposts: [
      {
        postId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        userId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        createdAt:Date
      },
    ],

    profilePicture: String,
    coverPicture: String,
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admins", AdminSchema);
export default AdminModel;
