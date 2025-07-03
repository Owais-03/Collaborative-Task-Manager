import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import nodemailer from "nodemailer";


const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password } = req.body;

        if (!fullname || !email || !phoneNumber || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const file = req.file;

        let profilePhotoUrl = "https://res.cloudinary.com/dmf0l0i74/image/upload/v1745593402/ogsonegnvsdtgaif1px9.jpg";
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }
        const createdAt = Date.now();
        const updatedAt = null;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // FIX: Use fullname, not username, for user creation
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            profile:{
                profilePhoto: profilePhotoUrl,
            },
            createdAt,
            updatedAt
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

 const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
  
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            token, // <-- Add this line
            success: true
        })
    } catch (error) {
        console.log(error);
    }
 }

const logout = async (req, res) => {
    try {
        //clear the jwt token to logout from backend
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio } = req.body;
        
        const file = req.file;
        if(file){
            const fileUri = getDataUri(file);
            var cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }
        const updatedAt = Date.now();
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if (updatedAt) user.updatedAt = updatedAt

        if(cloudResponse){
            user.profile.profilePhoto = cloudResponse.secure_url
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile,
            updatedAt: user.updatedAt
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found with this email.",
                success: false,
            });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send email with reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        // Assuming you have a sendEmail utility function
        const sendEmail = async ({ to, subject, text }) => {
            const transporter = nodemailer.createTransport({
                service: "gmail", // Use your email service provider
                auth: {
                    user: process.env.EMAIL_USER, // Your Gmail address
                    pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
                },
            });

            const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            };

            await transporter.sendMail(mailOptions);
        };

        await sendEmail({
            to: email,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
        });

        return res.status(200).json({
            message: "Password reset link sent to your email.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error.",
            success: false,
        });
    }
  };

const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token." });
        }

        user.password = password; // Hash the password before saving
        await user.save();

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to reset password." });
    }
};


export { register, signin, logout, updateProfile, forgetPassword, resetPassword};