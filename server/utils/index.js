import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.log("MongoDB connection FAIL");
    }
}


export const createJWT = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    // Change sameSite from strict to none when you deploy your app
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict", //prevent CSRF attack
      maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
    });
};

export default dbConnection;
    