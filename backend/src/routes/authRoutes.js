import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prismaClient.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    try{
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email
         }
        })
        //create a token
        const token = jwt.sign({ id:user.id },
        process.env.JWT_SECRET, { expiresIn: '24hr'}) 
        res.json({ token }).status(201)

    }catch(err){
        res.sendStatus(503).send(err)
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
   const {username, password} = req.body

   try{
        const user = await prisma.user.findUnique({
            where:{
                username: username
            }
        })
        if(!user){
            return res.status(404).send({ message: "User not found" })
        }

        const passCheck = bcrypt.compareSync(password, user.password)

        if(!passCheck){
            return res.status(404).send('Wrong password')
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24hrs'})
        res.json({ token })

   } catch (err){
    res.status(503).send('Not found')
   }

})

export default router