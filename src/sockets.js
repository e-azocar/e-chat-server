import { newMessage } from "./controllers/chat";

export default (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)
    socket.on('message:new', (data) => {
      newMessage(data, socket, io)
    });
  })
}