import mongoose from "mongoose";

const ReportSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    users: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        desc:{
          type:String
        }
      },
    ],
  },
  { timestamps: true }
);

const ReportModel = mongoose.model("Reports", ReportSchema);
export default ReportModel;
