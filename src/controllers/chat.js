import { Socket } from 'socket.io'

/**
 * 
 * @param {{text: String, user: String}} data 
 * @param {Socket} socket 
 */
export const newMessage = (data, socket, io) => {
  console.log(data)
  io.emit('message:new', data)
}