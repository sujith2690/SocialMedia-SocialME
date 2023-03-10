import UserModel from "../Models/UserModal";

 const Block = async (req, res, next) => {
   try {
    const { user } = useSelector((state) => state.authReducer.authData);
    const userBlock = UserModel.findById(user._id);
    next();
  } catch (error) {
    console.log(error, "-------block middle");
    res.status(500).json("error");
  }
};

export default Block;
