import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Full name is required"],
    minlength: [3, "Name should have at least 3 characters"],
    maxlength: [50, "Name should not exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  phoneNumber: {
    type: String,
    required: true,
    maxlength: [10, "Phone No. must be 10 characters Only"],
  },
  profile: {
    bio: { type: String },
    profilePhoto: {
      type: String,
      default: "https://res.cloudinary.com/dmf0l0i74/image/upload/v1745593402/ogsonegnvsdtgaif1px9.jpg",
    },
  }
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User',userSchema);
export default User;

