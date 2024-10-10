import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";

dotenv.config();

const router = express.Router();
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 8 or more characters required").isLength({
      min: 8,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ message: errors.array() });
    }
    try {
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user
      user = new User(req.body);
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      // Set the JWT in the cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        maxAge: 86400000, // 1 day
      });

      // Respond with success and user info
      return res.status(200).json({
        message: "User registered successfully",
        user: { email: user.email, id: user.id },
      });
    } catch (error) {
      console.error("Error during registration: ", error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
