import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectionDB from './connection/connection'
import router from './routes/router'

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
app.use('/api', router)

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
