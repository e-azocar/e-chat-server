import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user'

const app = express()

app.use(morgan('dev'))
app.use(json())
app.use(cors())

// routes
app.use('/api/user/', userRoutes)

export default app