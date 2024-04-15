import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  // Check if the email consists of "@brainwareuniversity.ac.in"
  if (!email.endsWith("@brainwareuniversity.ac.in")) {
    return next(errorHandler("Email must be from Brainware University domain", 400));
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET);
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.SECRET);
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};