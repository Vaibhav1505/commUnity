// EventChat.js
import { Avatar, Button, Input } from "@nextui-org/react";
import PaperAirPlane from "../../../../../../assets/icons/paperAirplaneIcon";
import PaperClipIcon from "../../../../../../assets/icons/paperClipIcon";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import sendMessage from "../../../../../../backendRequest/sendMessage";
import getUserDetail from "../../../../../../backendRequest/getUserDetail";
import { FETCH_MEETING_CHAT_HISTORY, FETCH_USER_BY_ID } from "../../../../../../utils/apiStrings";
import getChatHistory from "../../../../../../backendRequest/getChatHistory";
import getMessage from "../../../../../../backendRequest/getMessage";

export default function EventChat() {
    const [oldChats, setOldChats] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userDetailsMap, setUserDetailsMap] = useState({});

    const [searchParams] = useSearchParams();
    const eventId = searchParams.get("meetingId");

    const chatEndRef = useRef(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        console.log("EventChat mounted with eventId:", eventId);
        fetchChatHistory();

        const cleanup = getMessage(eventId, setOldChats);

        return () => {
            cleanup();
        };
    }, [eventId]); // Add eventId as a dependency

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [oldChats]);

    const fetchChatHistory = async () => {
        const eventIdNumber = Number(eventId);
        try {
            const response = await getChatHistory(
                FETCH_MEETING_CHAT_HISTORY,
                { meetingId: eventIdNumber }
            );
            const responseData = response.data;

            const messages = Array.isArray(responseData.messages) ? responseData.messages : [];
            setOldChats(messages);

            const uniqueSenderIds = Array.from(new Set(messages.map(msg => msg.senderId)));
            await fetchSenderDetails(uniqueSenderIds);
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const fetchSenderDetails = async (senderIds) => {
        const promises = senderIds.map(async (senderId) => {
            if (senderId && !userDetailsMap[senderId]) {
                try {
                    const userDetail = await getUserDetail(FETCH_USER_BY_ID(senderId));
                    setUserDetailsMap((prevValue) => ({ ...prevValue, [senderId]: userDetail }));
                } catch (error) {
                    console.log("Error fetching user detail for sender id:", error.message);
                }
            }
        });
        await Promise.all(promises);
    };

    const handleSendMessage = async () => {
        try {
            if (newMessage.trim()) {
                const messageObject = {
                    content: newMessage,
                    senderId: Number(userId),
                    createdat: new Date().toISOString()
                };

                setOldChats((prevChats) => [...prevChats, messageObject]);

                sendMessage({
                    meetingId: eventId,
                    content: newMessage
                });

                setNewMessage("");
            }
        } catch (error) {
            console.log("Error sending Message");
        }
    };

    return (
        <div className="flex flex-col h-full bg-black">
            {/* Chat Messages Container */}
            <div className="flex-grow overflow-y-auto p-5 space-y-2">
                {oldChats.length === 0 ? (
                    <p className="text-gray-400 text-center mt-4">No Chats Available</p>
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

            {/* Input Bar (Fixed at the Bottom) */}
            <div className="flex items-center space-x-2 p-3 border-t border-gray-700">
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
                />
                <Button className="bg-primary" onClick={handleSendMessage} isIconOnly>
                    <PaperAirPlane />
                </Button>
            </div>
        </div>
    );
}
