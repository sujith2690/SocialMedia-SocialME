import UserModel from "../Models/UserModal.js";
import bcrypt from "bcrypt";
import AdminModel from "../Models/AdminModal.js";
import nodemailer from "nodemailer";
import pkg from "jsonwebtoken";
import otpVerificationModel from "../Models/OtpVerifyModal.js";

// Registering New User

export const registerUser = async (req, res) => {
  console.log('--------its here')
  const jwt = pkg;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "Email is already regiserd" });
    }
    console.log(newUser, "----new user signup");
    const user = await newUser.save();
    // console.log(newUser,'----------coming user details')
    // console.log(user,'-----------saved user details')
    const otpSend = await sendOtpVerificationEmail(user);

    //  T O K E N
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const sendOtpVerificationEmail = async (user) => {
  
  console.log(
    user,
    "---------id and user namea at sendotpverifunction............."
  );
  return new Promise(async (resolve, reject) => {
    const userEmail = user.username;
    const userid = user._id.toString();
    console.log(userid.toString(), "------id");

    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.NDMILR_PASS,
        },
      });
      console.log(userEmail, "--------email");
      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,

        subject: "Subject",
        text: "Email content",
        html: `<p>Email verification Code is <b> ${otp} </b> from AmazeME. Ignore this mail if this is not done by you. </p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      resolve({
        status: "pending",
        message: "verification otp mail is send",
        data: {
          userId: userid,
          email: userEmail,
        },
      });
      console.log("---------00------");
      const saltRound = 10;
      const hashedOtp = await bcrypt.hash(otp, saltRound);
      const newOtpVerification = await new otpVerificationModel({
        userId: userid,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });
      await newOtpVerification.save();
      await transporter.sendMail(mailOptions);

      console.log("---------11------");
    } catch (error) {
      console.log(error);
      reject({
        status: "otp send failed",
        message: error.message,
      });
    }
  });
};

export const otpVerify = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    
    const jwt = pkg;
    console.log(userId, otp, "userid and otp at authcontroller");
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const otpVerificationData = await otpVerificationModel.find({ userId });
      console.log(otpVerificationData, "otp verification data");
      if (otpVerificationData) {
        const { expiresAt } = otpVerificationData[0];
        const hashedOtp = otpVerificationData[0].otp;
        console.log(hashedOtp, "hashed otp");

        if (expiresAt < Date.now()) {
          await otpVerificationModel.deleteMany({ userId });
          throw new Error("OTP expires. Please request again");
        } else {
          console.log(otp, hashedOtp, "otp,hashedotp");
          const vaildOtp = await bcrypt.compare(otp, hashedOtp);
          if (!vaildOtp) {
            throw new Error(" Invalied otp. check and Enter correct OTP");
          } else {
            await UserModel.updateOne({ _id: userId }, { isUser: true });
            await otpVerificationModel.deleteMany({ userId });
            const user = await UserModel.findOne({ _id: userId });
            console.log(
              user,
              "user at authcontroller, otpverify function ..............."
            );
            const token = jwt.sign(
              {
                username: user.userName,
                id: user._id,
              },
              process.env.JWT_KEY,
              { expiresIn: "24h" }
            );
            res.status(200).json({ user, token });
          }
        }
      }else{
      
        res.status(200).json('Wrong Otp')
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};

// Login User

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, "--------login details");
  const jwt = pkg;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      if (user.isBlock === true) {
        res.status(400).json("user Blocked");
      } else {
        const validity = await bcrypt.compare(password, user.password);
        if (!validity) {
          res.status(400).json("Wrong Password");
        } else {
          const token = jwt.sign(
            {
              username: user.username,
              id: user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );
          res.status(200).json({ user, token });
        }
      }
    } else {
      res.status(404).json("User does not Exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  searchUser

export const searchUser = async (req, res) => {
  console.log(req.body, "---------serch controller");
  const user = req.body.data.desc;
  console.log(user, "---------serch controller");
  try {
    let findUser = await UserModel.find({
      firstname: { $regex: new RegExp(user), $options: "si" },
    });
    findUser = findUser.map((item) => {
      const { password, verified, saved, isAdmin, isBlock, ...otherDetails } =
        item._doc;
      return otherDetails;
    });
    console.log(findUser, "-----findUser");
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Registering New Admin ..........................................

export const registerAdmin = async (req, res) => {
  console.log(req.body, "--------admin controller");
  const jwt = pkg;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newAdmin = new AdminModel(req.body);
  const { adminname } = req.body;
  console.log(adminname, "--------adminname");
  try {
    const oldAdmin = await AdminModel.findOne({ adminname });
    if (oldAdmin) {
      return res.status(400).json({ message: "Admin is already regiserd" });
    }
    const admin = await newAdmin.save();

    //  T O K E N

    const token = jwt.sign(
      {
        adminname: admin.adminname,
        id: admin._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Admin

export const loginAdmin = async (req, res) => {
  console.log(req.body, "---------------login admin");
  const { adminname, password } = req.body;
  const jwt = pkg;
  try {
    const admin = await AdminModel.findOne({ adminname: adminname });
    if (admin) {
      if (admin.isAdmin === false) {
        res.status(400).json("Not Admin");
      } else {
        const validity = await bcrypt.compare(password, admin.password);
        if (!validity) {
          res.status(400).json("Wrong Password");
        } else {
          const token = jwt.sign(
            {
              adminname: admin.adminname,
              id: admin._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );
          res.status(200).json({ admin, token });
        }
      }
    } else {
      res.status(404).json("Admin does not Exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
