import express from "express"
import prisma from "../prismaClient.js"

const router = express.Router()


router.get("/", async(req, res) => {
    try{
        const items = await prisma.item.findMany()
        res.status(200).json({ items })
    } catch (err){
        return res.status(500).send(err)
    }
})


router.post("/item", async (req, res) => {
    const { description, name, brand, quantity, imageUrl } = req.body
try{
     await prisma.item.create({
        data: {
            description,
            name,
            brand,
            quantity,
            imageUrl
        }
    })
     res.status(201).json({ message: "Item created" })
  } catch (err){
        return res.status(500).send(err)
  }     
})


router.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
try{
    const item = await prisma.item.findUnique({
        where:{
            id: id
        }
    })

    if(!item){
        return res.status(404).json({message: "Item not found"})
    }
    res.status(200).json(item)
} catch (err) {
    return res.status(500).send(err)
  }
})

export default router


