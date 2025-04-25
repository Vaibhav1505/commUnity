import { io } from 'socket.io-client';
import { BASE_URL } from '../utils/apiStrings';

const socket = io(BASE_URL, {
    auth: {
        token: localStorage.getItem('accessToken')
    }
});

export default function sendMessage({ projectId, meetingId, content }) {
    console.log("Sending message:", { projectId, meetingId, content });
    socket.emit("newMessage", {
        projectId: projectId,
        meetingId: meetingId,
        content: content
    })
    console.log("Sending message:", { projectId, meetingId, content });



}

