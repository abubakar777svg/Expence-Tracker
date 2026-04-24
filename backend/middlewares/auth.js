import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }
    const token = headers.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ success: false, message: "Error in Authentication" });
  }
};
