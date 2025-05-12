import { Router } from 'express'
import { prismaClient } from './config';
const router = Router()

router.get('/userId', async(req,res)=>{
    const user = await prismaClient.user.findFirst({
        where:{
            username: req.username
        }
    })
    res.json({
        userId: user?.id
    })
})

router.post('/create', async(req,res)=>{
    const userId = req.body;
    const { title, link } = req.body;
    await prismaClient.card.create({
        data:{
            title,
            link,
            userId
        }
    })

    res.json({
        message:"creating your qr"
    })

})

router.get('/generate', async(req,res)=>{
    const userId = req.body;
    const card = await prismaClient.card.findMany({
        where:{
            userId   
        }
    })

    res.json({
        message:"qr card generated",
        card
    })

})



export default router;