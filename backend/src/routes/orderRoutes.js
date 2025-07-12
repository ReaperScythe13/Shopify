import express, { Router } from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

//Get all orders for user
router.get('/', async (req, res) => {
  try{
        const orders = await prisma.order.findMany({
            where: {
                userId: req.userId
            },
            include: { orderItems: true }
        })
        if(!orders){
            res.status(200).send("No orders found!")
        }
        res.json(orders)
   }catch(err){
        res.status(503).send(err)
        console.log(err)
   }

})

//Create a order
router.post('/', async (req, res) => {
    const userId = req.userId
    const { items } = req.body
try{
    for (const { id: itemId, quantity } of items){
        const item = await prisma.item.findUnique({ where: { id:itemId } })

        //Set up quantity logic so you can buy more than what we have
        if(!item || item.quantity < quantity){
            return res.status(503).json({ message: "We don't have the amount requested in stock"})
        }
    }
    const newOrder = await prisma.order.create({
        data: {
            userId
        }
    })
    //For loop of each order item to store in db
    for (const { id: itemId, quantity } of items){
        const item = await prisma.item.findUnique({ where: { id:itemId } })

        //Set up quantity logic so you can buy more than what we have
        if(!item || item.quantity < quantity){
            return res.status(503).json({ message: "We don't have the amount requested in stock"})
        }

        await prisma.item.update({ 
                    where:{
                        id:itemId
                    },
                    data:{
                        quantity: item.quantity - quantity,
                        stock: item.quantity - quantity > 0
                    }
                })
        await prisma.orderItem.create({
            data:{
                orderId: newOrder.id,
                itemId,
                quantity 
            }
        })
    }
        const fullOrder = await prisma.order.findUnique({
            where: {
                id: newOrder.id
            },
            include: {
                orderItems: {
                    include:{ item: true }
                }
            }
        })
    res.status(201).json(fullOrder)

}catch(err){
        console.log(err)
        res.status(503).json({ message: 'Failed to create order' })
    }
})

export default router
