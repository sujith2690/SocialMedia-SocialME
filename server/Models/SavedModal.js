import mongoose from "mongoose";

const savedPostSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  savedusers: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
    },
  ],
});
var SavedPostModel = mongoose.model("savedposts", savedPostSchema);
export default SavedPostModel;
