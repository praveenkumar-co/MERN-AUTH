import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
//URL of frontend 
 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://mern-auth-frontend-3umi.onrender.com",
    credentials: true
}));

app.get('/', (req, res) => {
  res.send('API working');
});

//Routes to handle 
app.use('/api/auth', authRouter);
// user details - >
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

// after getting token from cookie after login then send it to verify-otp url to confirm your email verification part .. now u can get otp so enter - >
