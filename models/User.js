import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "email must be unique"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: [true, "mobile number is required"],
      trim: true,
      match: [/^\+?[1-9]\d{7,14}$/, "Please enter a valid mobile number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
