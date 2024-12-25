import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      minlength: 3,
      maxlength: 12,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 4,
      maxlength: 60,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// // Hash password
// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.getName = function () {
//   return this.name;
// };

// UserSchema.methods.createJWT = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.username },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN }
//   );
// };

// // Validate password
// UserSchema.methods.checkPassword = async function (userPassword) {
//   const isMatch = await bcrypt.compare(userPassword, this.password);
//   return isMatch;
// };

export default mongoose.model("User", UserSchema);
