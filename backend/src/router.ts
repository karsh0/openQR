import { Router } from 'express'
import { prismaClient } from './config';
const router = Router()

router.post('/create', async(req,res)=>{
    const { title, link } = req.body;
    await prismaClient.card.create({
        data:{
            title,
            link
        }
    })

})

export default router;