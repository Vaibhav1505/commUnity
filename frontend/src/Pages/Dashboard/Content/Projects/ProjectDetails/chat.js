import { Button, Input, Avatar } from "@nextui-org/react";
import PaperClipIcon from "../../../../../assets/icons/paperClipIcon";
import PaperAirPlane from "../../../../../assets/icons/paperAirplaneIcon";
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import sendMessage from "../../../../../backendRequest/sendMessage";
import getChatHistory from "../../../../../backendRequest/getChatHistory";
import getUserDetail from "../../../../../backendRequest/getUserDetail";
import { BASE_URL, FETCH_PROJECT_CHAT_HISTORY, FETCH_USER_BY_ID } from "../../../../../utils/apiStrings";
import getMessage from "../../../../../backendRequest/getMessage";


export default function ProjectChat({ meetingId }) {

  const [oldChats, setOldChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)


  const { projectId } = useParams();

  const chatEndRef = useRef(null);
  const userId = localStorage.getItem('userId');
  

  useEffect(() => {
    fetchChatHistory();
    const cleanup = getMessage(projectId, setOldChats);
    return () => { cleanup(); };
  }, [projectId]);
  


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [oldChats]);


  const fetchChatHistory = async () => {
    setLoading(true);
    setMessage("");
    try {
      const projectIdNumber = Number(projectId);
      const response = await getChatHistory(
        FETCH_PROJECT_CHAT_HISTORY,
        { projectId: projectIdNumber }
      );

      if (
        response.status === 404 ||
        response.data?.success === false ||
        !Array.isArray(response.data?.messages) ||
        response.data.messages.length === 0
      ) {
        setOldChats([]);
        setMessage("No chats found for this project.");
        setLoading(false);
        return;
      }

      setOldChats(response.data.messages);
      setMessage("");
      const uniqueSenderIds = Array.from(new Set(response.data.messages.map(msg => msg.senderId)));
      fetchUserDetails(uniqueSenderIds);
    } catch (error) {
      if (error.response?.status === 404) {
        setOldChats([]);
        setMessage("No chats found for this project.");
      } else {
        setMessage("Failed to load chat history.");
      }
      setOldChats([]);
    } finally {
      setLoading(false);
    }
  };


  const fetchUserDetails = async (senderIds) => {
    const promises = senderIds.map(async (senderId) => {
      if (senderId && !userDetailsMap[senderId]) {
        try {
          const userDetails = await getUserDetail(FETCH_USER_BY_ID(senderId));
          setUserDetailsMap(prevMap => ({
            ...prevMap,
            [senderId]: userDetails
          }));
        } catch (error) {
          console.error(`Error fetching user details for senderId ${senderId}:`, error);
        }
      }
    });
    await Promise.all(promises);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage({
        projectId,
        meetingId,
        content: newMessage,
      });
      setNewMessage("");
    }
  };



  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      {/* Chat Messages Container */}
      <div className="flex-grow overflow-y-auto p-5 mb-10 space-y-2">
        {loading ? (
          <p className="text-gray-400 text-center mt-4">Loading chats...</p>
        ) : message ? (
          <p className="text-gray-400 text-center mt-4">{message}</p>
        ) : (
          oldChats.map((msg, index) => {
            const isCurrentUser = msg.senderId === Number(userId);
            const userDetails = userDetailsMap[msg.senderId] || {};
            return (
              <div
                key={index}
                className={`flex items-end ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                {!isCurrentUser && (
                  <Avatar
                    isBordered
                    showFallback
                    name={userDetails.firstname || ""}
                    src={userDetails.avatar || ""}
                    size="sm"
                    className="mr-2"
                  />
                )}
                <div
                  className={`rounded-2xl px-4 py-2 max-w-xs shadow-md
                    ${isCurrentUser
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-gray text-white rounded-bl-none"
                    }`}
                >
                  <div>{msg.content}</div>
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {new Date(msg.createdat).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {isCurrentUser && (
                  <Avatar
                    src={userDetails.avatar || ""}
                    showFallback
                    name={userDetails.firstname || ""}
                    size="sm"
                    isBordered
                    className="ml-2"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={chatEndRef} />
      </div>


      {/* Sticky Input Bar */}
      <div className="flex items-center space-x-2 p-3 border-t border-gray-700 sticky bottom-0 z-10 bg-gray-900">
        <Button className="bg-primary" isIconOnly>
          <PaperClipIcon />
        </Button>
        <Input
          placeholder="Enter your message"
          className="flex-grow"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          endContent={
            <Button className="bg-primary" onClick={handleSendMessage} isIconOnly>
              <PaperAirPlane />
            </Button>
          }
        />
      </div>
    </div>
  );
}
