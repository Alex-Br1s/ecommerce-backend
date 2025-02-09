import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectionDB from './connection/connection'
import productRouter from './routes/products'
import categoryRouter from './routes/categories'
import userRouter from './routes/user'
import cartRouter from './routes/cart'
import favoriteRouter from './routes/favorites'
import orderRouter from './routes/order'
import { handlerError } from './middleware/errorHandler'

dotenv.config()
const PORT = process.env.PORT ?? 3001

const app = express()
//* middlewares
app.use(express.json())
app.use(cors())

app.use((req, _res, next) => {
  console.log(`Request: ${req.method} ${req.url}`)
  next()
})

//* conexión a la db
void connectionDB()

//* rutas
const api = '/api'
app.use(api, productRouter)
app.use(api, categoryRouter)
app.use(api, cartRouter)
app.use(api, userRouter)
app.use(api, favoriteRouter)
app.use(api, orderRouter)

app.use(handlerError)

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
