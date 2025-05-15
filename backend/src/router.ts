import { Router } from 'express'
import { prismaClient } from './config';
const router = Router()

router.get('/user', async(req,res)=>{
    const user = await prismaClient.user.findFirst({
        where:{
            id: req.userId
        }
    })
    res.json({
        username: user?.username
    })
})

router.post('/create', async(req,res)=>{
    const { title, link} = req.body;
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

router.get('/generate', async(req,res)=>{
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

router.get('/search', async (req, res) => {
    const title = req.query.title as string;

    const card = await prismaClient.card.findFirst({
        where: { title }
    });

    res.json({ card });
});




export default router;