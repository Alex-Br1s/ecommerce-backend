import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectionDB from './connection/connection'
import productRouter from './routes/products'
import categoryRouter from './routes/categories'
import userRouter from './routes/user'

dotenv.config()
const PORT = process.env.PORT ?? 3001

const app = express()
//* middlewares
app.use(express.json())
app.use(cors())
app.use(express.json())

//* conexión a la db
void connectionDB()

//* rutas
app.use('/api', productRouter)
app.use('/api', categoryRouter)
app.use('/api', userRouter)

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
