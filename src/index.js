import { createServer } from 'http'
import { Server } from 'socket.io'
import Sockets from './sockets'
import app from './app'
import { PORT } from './config'
import dbConnection from './db'

const server = createServer(app)
dbConnection()

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const io = new Server(server, { cors: { origin: '*' } })
Sockets(io)