import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import { StatusCodes } from "http-status-codes";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Not authorized, token failed");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send("Not authorized as admin");
  }
};

export { authenticate, authorizeAdmin };
