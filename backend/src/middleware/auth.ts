import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    console.log("no token ");
    console.log("Cookies received:", req.cookies);

    return res.status(401).json({ message: "unauthorized no token " , req});
  }
  // Ensure JWT_SECRET_KEY is loaded
  if (!process.env.JWT_SECRET_KEY) {
    console.error("JWT_SECRET_KEY is not defined");
    return res.status(500).json({ message: "Internal server error: Missing JWT_SECRET_KEY" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized with error" , error });
  }
};
export default verifyToken;