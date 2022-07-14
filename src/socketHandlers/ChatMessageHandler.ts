import { Server, Socket } from "socket.io";
import { Message } from "src/models/Message";
import SocketEvent from "../SocketEvent";

const chatMessageHandler = (io: Server, socket: Socket) => {
  const handleNewMessage = (message: Message) => {
    console.log("send text message");
    console.log(message);
  }

  socket.on(SocketEvent.newMessage, handleNewMessage);
}

export default chatMessageHandler;