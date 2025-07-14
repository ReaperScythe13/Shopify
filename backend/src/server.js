import express from 'express'
import authRoutes from './routes/authRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5003

app.use(express.json())


app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.get("/", (req, res) => {
    res.header('Content-type','text/html')
    res.send('<p>hello</p>')
})

app.use('/auth', authRoutes)
app.use('/shop', shopRoutes)
app.use('/orders', authMiddleware, orderRoutes)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`)) 