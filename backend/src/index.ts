import express from 'express';
import jwt from 'jsonwebtoken';
import router from './router';
import { prismaClient } from './config';
import { compare, hash } from 'bcryptjs';
import middleware from './middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }));
  

app.use(cookieParser());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('backend is running')
})

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 2);

    await prismaClient.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });

    res.json({
        message: "User created"
    });
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = await prismaClient.user.findFirst({
        where: {
            username,
        }
    });

    if (!user){
        res.status(401).json({ message: 'User not found' });
        return;
    } 

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        res.status(401).json({
            message: "Password invalid"
        });
        return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? "");

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        domain: '.fri.is'
      });
      

    
    res.json({
        message: "Signin success",
        token
    });
});

app.post('/logout',  (req,res)=>{
    console.log(req.cookies.token)
    res.clearCookie('token')

    res.json({
        message:"logout success"
    })
})



app.use('/', middleware, router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
