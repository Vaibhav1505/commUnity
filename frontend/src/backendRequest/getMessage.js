import { io } from 'socket.io-client';
import { BASE_URL } from '../utils/apiStrings';

const socket = io(BASE_URL, {
    auth: {
        token: localStorage.getItem('accessToken')
    }
});

export default function getMessage(roomId,setOldChats) {
    socket.emit("joinRoom",roomId)
    socket.on("message", (incomingMessage) => {
        setOldChats((prevMessage) => [...prevMessage, incomingMessage]);
    });;
    return()=>{
        socket.off("message")
    }
}