import UserModel from "../Models/UserModal.js";
import bcrypt from "bcrypt";
import AdminModel from "../Models/AdminModal.js";
import nodemailer from "nodemailer";
import pkg from "jsonwebtoken";
import otpVerificationModel from "../Models/OtpVerifyModal.js";
import mongoose, { Types } from "mongoose";

// Registering New User

export const registerUser = async (req, res) => {
  try {
    const jwt = pkg;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const newUser = new UserModel(req.body);
    const { username } = req.body;
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "Email is already regiserd" });
    }
    const user = await newUser.save();
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

    res.status(200).json({ message: "OTP Send", success: true, user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const sendOtpVerificationEmail = async (user) => {
  console.log(
    user,
    "---------id and user name at send otp verifunction............."
  );
  return new Promise(async (resolve, reject) => {
    try {
      const userEmail = user.username;
      const userid = user._id.toString();
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.NDMILR_PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,

        subject: "Subject",
        text: "Email content",
        html: `<p>Email verification Code is <b>${otp}</b> from AmazeME. Ignore this mail if this is not done by you. </p>`,
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
      // console.log("---------00------");
      const saltRound = 10;
      const hashedOtp = bcrypt.hashSync(otp, saltRound);
      // const hashedOtp = otp
      const newOtpVerification = await new otpVerificationModel({
        userId: userid,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });
      await newOtpVerification.save();
      console.log(newOtpVerification, "---------OTP send success------");
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
  const userId = req.body.userId;
  console.log(userId, "----------user---id");
  try {
    let { userId, otp } = req.body;
    console.log(userId, otp, "userid and otp at authcontroller");
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const otpVerificationData = await otpVerificationModel.findOne({
        userId,
      });
      console.log(otpVerificationData, "----otpVerificationData");
      if (otpVerificationData) {
        const { expiresAt } = otpVerificationData;
        const hashedOtp = otpVerificationData.otp;
        if (expiresAt < Date.now()) {
          await otpVerificationModel.deleteMany({ userId });
          res.status(200).json({ message: "OTP expires", success: false });
        } else {
          console.log(otp, "---------otp", hashedOtp, "---55---hashedotp");
          const vaildOtp = bcrypt.compareSync(otp, hashedOtp);
          console.log(vaildOtp, "--------------------");
          if (!vaildOtp) {
            const user = await UserModel.findOne({ _id: userId });
            res
              .status(200)
              .json({ message: "Invalid OTP", success: false, user });
          } else {
            console.log("else ccase otp valid");
            await UserModel.updateOne({ _id: userId }, { isUser: true });
            await otpVerificationModel.deleteMany({ userId });
            const user = await UserModel.findOne({ _id: userId });
            console.log(user, "----- user at otpverify....");
            const jwt = pkg;
            const token = jwt.sign(
              {
                username: user.userName,
                id: user._id,
              },
              process.env.JWT_KEY,
              { expiresIn: "24h" }
            );
            res
              .status(200)
              .json({ user, token, message: "OTP Matched", success: true });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "UnMatched OTP",
    });
    // res.status(500).json({ user, token,message: "UnMatched OTP", success: false,status: "Failed" });
  }
};

// resend OTP

export const resendOtp = async (req, res) => {
  try {
    console.log("resend otp ");
    const id = req.body.userId;
    const username = req.body.userEmail;
    let user = {
      _id: new mongoose.Types.ObjectId(id),
      username: username,
    };
    const userid = req.body.userId;
    if (!user._id || !user.username) {
      throw Error("Empty user Details");
    } else {
      await otpVerificationModel.deleteMany({ userid });
      sendOtpVerificationEmail(user);
    }
    res.status(200).json({ message: "Otp Resend Sucess", success: true });
  } catch (error) {
    console.log(error, "----errererer");
    // res.status(200).json({ message: "Otp Resend failed", success: false });
    res.json({ status: "Failed", message: error.message });
  }
};

// Login User

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const jwt = pkg;
    const user = await UserModel.findOne({ username: username });

    if (user) {
      if (user.isBlock === true) {
        res.status(200).json({ message: "User Blocked", success: false });
      } else {
        const validity = await bcrypt.compare(password, user.password);
        if (!validity) {
          res.status(200).json({ message: "Wrong Password", success: false });
        } else {
          const token = jwt.sign(
            {
              username: user.username,
              id: user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );
          res
            .status(200)
            .json({ user, token, success: true, message: "Login Success" });
        }
      }
    } else {
      res.status(200).json({ message: "User does not Exist", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//       google

export const googleUser = async (req, res) => {
  try {
    const jwt = pkg;
    const email = req.body.email;
    const user = await UserModel.findOne({ username: email });
    if (user) {
      if (user.isBlock) {
        res.status(200).json({ message: "User Blocked", success: false });
      } else {
        const token = jwt.sign(
          {
            username: email,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "24h" }
        );
        res
          .status(200)
          .json({ user, token, success: true, message: "Login Success" });
        console.log("token sented");
      }
    } else {
      console.log("else part of google");
      const user = await new UserModel({
        firstname: req.body.given_name,
        lastname: req.body.family_name,
        username: req.body.email,
        isUser: req.body.email_verified,
        password: "google",
      }).save();
      console.log(user, "-----save user google");
      const token = jwt.sign(
        {
          username: email,
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );

      res
        .status(200)
        .json({ message: "Succesfully Login", success: true, user, token });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

//  searchUser

export const verifyEmail = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await UserModel.findOne({ username: userEmail });
    if (user) {
      const userDetails = {
        username: user.username,
        _id: user._id,
      };
      const response = sendOtpVerificationEmail(userDetails);
      res.status(200).json({ message: "OTP SEND", success: true, userDetails });
      if (response) {
      }
    } else {
      res.status(200).json({ message: "Invalid Email", success: false });
    }
  } catch (error) {}
};

//Change password
export const changePassword = async (req, res) => {
  
  try {
    let { userId, newPassword } = req.body;
    newPassword = await bcrypt.hash(newPassword, 10);
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { password: newPassword } }
    );
    res.status(200).json({ message: "Password Changed", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const searchUser = async (req, res) => {

  const user = req.body.data.desc;
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

// Registering New Admin ..........................................

export const registerAdmin = async (req, res) => {
  const jwt = pkg;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newAdmin = new AdminModel(req.body);
  const { adminname } = req.body;
  try {
    const oldAdmin = await AdminModel.findOne({ adminname });
    if (oldAdmin) {
      return res.status(400).json({ message: "Admin is already registered" });
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
  try {
    const { adminname, password } = req.body;
    const jwt = pkg;
    const admin = await AdminModel.findOne({ adminname: adminname });
    if (admin) {
      if (admin.isAdmin === false) {
        res.status(200).json({ message: "Admin Blocked", success: false });
      } else {
        const validity = await bcrypt.compare(password, admin.password);
        if (!validity) {
          res.status(200).json({ message: "Wrong Password", success: false });
        } else {
          const token = jwt.sign(
            {
              adminname: admin.adminname,
              id: admin._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );
          res
            .status(200)
            .json({ admin, token, success: true, message: "Login Success" });
        }
      }
    } else {
      res.status(200).json({ message: "Admin does not Exist", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
