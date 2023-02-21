import UserModel from "../Models/UserModal";

 const Block = async (req, res, next) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  try {
    const userBlock = UserModel.findById(user._id);
    next();
  } catch (error) {
    console.log(error, "-------block middle");
    res.status(500).json("error");
  }
};

export default Block;
