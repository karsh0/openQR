import { Router } from 'express'
import { prismaClient } from './config';
const router = Router()

// router.get('/userId', async(req,res)=>{
//     const user = await prismaClient.user.findFirst({
//         where:{
//             id: req.userId
//         }
//     })
//     res.json({
//         userId: user?.id
//     })
// })

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



export default router;