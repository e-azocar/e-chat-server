import { createServer } from 'http'
import { Server } from 'socket.io'
import Sockets from './sockets'
import app from './app'
import { PORT } from './config'

const server = createServer(app)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const io = new Server(server, { cors: { origin: '*' } })
Sockets(io)