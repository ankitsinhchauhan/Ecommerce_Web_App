import UserModel from "./../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import VerificationEmail from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
import sendEmailFun from "./../config/sendEmail.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

// Register
export async function registerUserController(req, res) {
  try {
    let user;

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ email: email });
    if (user) {
      return res.json({
        message: "User already Registered with this email",
        error: true,
        success: false,
      });
    }

    // Generate OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    user = new UserModel({
      email: email,
      password: hashPassword,
      name: name,
      otp: verifyCode,
      otpExpires: Date.now() + 600000,
    });
    await user.save();

    // Send verification email fuction
    await sendEmailFun({
      sendTo: email,
      subject: "Verify email from ShopNest App",
      text: "",
      html: VerificationEmail(name, verifyCode),
    });

    // Create a JWT token for verification pupose
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully ! Please verify your email",
      token: token, // include this if needed for verification
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Verify email

export async function verifyEmailController(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "User not found",
      });
    }
    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpires > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return res.status(200).json({
        error: false,
        success: true,
        message: "Email verified successfully",
      });
    } else if (!isCodeValid) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid OTP",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "OTP expired",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Login

export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to admin",
        error: true,
        success: false,
      });
    }

    if (user.verify_email !== true) {
      return res.status(400).json({
        message: "Your Email is not verify yet please verify your email first",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshtoken = await generatedRefreshToken(user._id);

    //update user
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);

    return res.json({
      message: "Login Successfully!",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshtoken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Logout controller
export async function logoutController(req, res) {
  try {
    const userid = req.userId; //middleware
    console.log("user id:", userid);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Image Upload
var imagesArr = [];
export async function userImageController(req, res) {
  try {
    imagesArr = [];

    const userid = req.userId; // auth middleware
    const image = req.files;

    // Get & Check user
    const user = await UserModel.findOne({ _id: userid });

    if (!user) {
      return res.status(500).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // First remove image from cloudinary

    const imgUrl = user.avatar;
    const urlArr = imgUrl.split("/");
    const avtarImg = urlArr[urlArr.length - 1];

    const imageName = avtarImg.split(".")[0];

    if (imageName) {
      const resDelete = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {}
      );
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${req.files[i].filename}`);
        }
      );
    }

    user.avatar = imagesArr[0];
    await user.save();

    return res.status(200).json({
      _id: userid,
      avtar: imagesArr[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Image Remove
export async function removeImageFromCloudinary(req, res) {
  const imgUrl = req.query.img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];

  const imageName = image.split(".")[0];

  if (imageName) {
    const resDelete = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {}
    );
    if (resDelete) {
      res.status(200).send(resDelete);
    }
  }
}

//Update User details
export async function updateUserDetailsController(req, res) {
  try {
    const userid = req.userId; // auth middleware
    const { name, email, mobile, password } = req.body;

    const userExist = await UserModel.findById(userid);
    if (!userExist) {
      return res.status(400).send("User can not be updated!");
    }

    let verifyCode = "";
    if (email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    } else {
      hashPassword = userExist.password;
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userid,
      {
        name: name,
        mobile: mobile,
        email: email,
        verify_email: email !== userExist.email ? false : true,
        password: hashPassword,
        otp: verifyCode !== "" ? verifyCode : null,
        otpExpires: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
    );

    if (email !== userExist.email) {
      // Send Email function
      await sendEmailFun({
        sendTo: email,
        subject: "Verify email from ShopNest App",
        text: "",
        html: VerificationEmail(name, verifyCode),
      });
    }

    return res.json({
      message: "User Update Successfully",
      error: false,
      success: true,
      user: {
        name: updateUser?.name,
        _id: updateUser?._id,
        email: updateUser?.email,
        mobile: updateUser?.mobile,
        avatar: updateUser?.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Forgot Password
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    } else {
      //generate otp
      let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      user.otp = verifyCode;
      user.otpExpires = Date.now() + 600000;
      await user.save();

      await sendEmailFun({
        sendTo: email,
        subject: "Verify OTP from ShopNest App",
        text: "",
        html: VerificationEmail(user.name, verifyCode),
      });

      return res.json({
        message: "Check your email",
        error: false,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//forgot password verify otp
export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    if (!email || !otp) {
      res.status(400).json({
        message: "Provide required field email and otp",
        error: true,
        success: false,
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    // expire otp
    const currentTime = new Date().toISOString();
    if (user.otpExpires < currentTime) {
      res.status(400).json({
        message: "OTP is expired",
        error: true,
        success: false,
      });
    }

    user.otp = "";
    user.otpExpires = "";

    await user.save();

    return res.status(200).json({
      message: "Verify OTP successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Reset Password
export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide required fields email, newPassword, confirmPassword",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not availabel",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);

    user.password = hashPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// change Password
export async function changePassowrd(req, res) {
  try {
    const { email, OldPassword, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Provide required fields email, newPassword, confirmPassword",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not availabel",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(OldPassword, user.password);
    if (!checkPassword) {
      return res.status(500).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);

    user.password = hashPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// refresh Token
export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split("")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Token is expire",
        error: true,
        success: false,
      });
    }

    const userid = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userid);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOption);

    return res.status(200).json({
      success: true,
      error: false,
      message: "New Access Token generated",
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get login user details
export async function userDetails(req, res) {
  try {
    const userid = req.userId;

    const user = await UserModel.findById(userid).select(
      "-password -refresh_token"
    );

    return res.json({
      message: "User details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
