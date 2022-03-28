import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { join } from 'path'

const app = express()

app.use(morgan('dev'))
app.use(json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
})

export default app