import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path';
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {
    connectTimeoutMS: 20000, // Timeout increased to 20 seconds
  })
  .then(() => {
    console.log('Connected to database'
    );
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit if connection fails
  });
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(express.static(path.join(__dirname,"../../frontend/dist")))
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the MERN Booking App API");
  });
  
app.listen(7000,() =>{
console.log("server running on Localhost:7000");
});