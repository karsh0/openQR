import express from 'express'
import jwt from 'jsonwebtoken'
import router from './router'
import { prismaClient } from './config'
import { compare, hash } from 'bcryptjs'
require('dotenv').config()  
const app = express()
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
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET || "")
    res.json({
        message:"signin success",
        token
    })
})


app.use('/', router)
app.listen(3000)