import express from 'express';
import { prismaClient } from './config';
import cors from 'cors';
import { authMiddleware } from './middleware';
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://openqr-oayn.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
  })); 


app.get('/', (req,res)=>{
    res.send('backend is running')
})


app.post('/create', authMiddleware,  async(req,res)=>{
    const { title, link } = req.body;
    await prismaClient.card.create({
        data:{
            title,
            link,
            userId: req.userId
        }
    })

    res.json({
        message:"qr created"
    })

})

app.get('/generate', authMiddleware,  async(req,res)=>{
    const card = await prismaClient.card.findMany({
        where:{
           userId: req.userId
        }
    })

    res.json({
        message:"qr card generated",
        card
    })

})

app.get('/search', authMiddleware,  async (req, res) => {
    const title = req.query.title as string;

    const card = await prismaClient.card.findFirst({
        where: { title }
    });

    res.json({ card });
});

app.post('/delete', authMiddleware,  async (req, res) => {
    const { id } = req.body;

    await prismaClient.card.delete({
        where: { id }
    });

    res.json({
        message:"card deleted"
    })
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
