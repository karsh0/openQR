import express from 'express'
import jwt from 'jsonwebtoken'
import router from './router'
import { prismaClient } from './config'
import { compare, hash } from 'bcryptjs'
import middleware from './middleware'
import cors from 'cors'
import cookieParser from 'cookie-parser';
require('dotenv').config()  
const app = express()
app.use(cors({
    origin: '*', 
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())


app.post('/signup', async(req,res)=>{
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 2);
    await prismaClient.user.create({
        data:{
            username,
            password: hashedPassword
        }
    })

    res.json({
        message:"User created"
    })
})

app.post('/signin', async (req,res)=>{
    const { username, password } = req.body;

    const user = await prismaClient.user.findFirst({
        where:{
            username,
        }
    })
    if(!user) return;

    const passwordMatch = compare(password, user.password)

    if(!passwordMatch){
        res.json({
            message:"password invalid"
        })
    }
    const token = jwt.sign({username: user.username}, process.env.JWT_SECRET ?? "")
     res.cookie('token', token);
    res.json({
        message: "Signin success",
        token
      });
})

app.use('/', middleware, router)
app.listen(3000, ()=>{
    console.log('server running on port 3000')
})