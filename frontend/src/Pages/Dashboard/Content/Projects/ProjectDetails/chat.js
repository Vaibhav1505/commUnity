import { Button, Input, Avatar } from "@nextui-org/react";
import PaperClipIcon from "../../../../../assets/icons/paperClipIcon";
import PaperAirPlane from "../../../../../assets/icons/paperAirplaneIcon";

const messages = [
  { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  { id: 2, text: "I have a question about the project.", sender: "user" },
];

export default function ProjectChat() {
  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Chat Messages Container */}
      <div className="flex-grow overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== "user" && (
              <Avatar
                src="/avatar-bot.png"
                size="sm"
                className="mr-2"
              />
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-xs ${
                msg.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <Avatar
                src="/avatar-user.png"
                size="sm"
                className="ml-2"
              />
            )}
          </div>
        ))}
        {/* Typing indicator example */}
        <div className="flex rounded-lg px-4 py-2 bg-gray max-w-xs  text-white items-center space-x-2">
          <Avatar src="/avatar-bot.png" size="sm" />
          <span className="text-gray-400 italic animate-pulse">Bot is typing...</span>
        </div>
      </div>

      {/* Sticky Input Bar */}
      <div className="flex items-center space-x-2 p-3 border-t border-gray-700 sticky bottom-0 z-10 bg-gray-800">
        <Button className="bg-primary" isIconOnly>
          <PaperClipIcon />
        </Button>
        <Input
          placeholder="Enter your message"
          className="flex-grow"
          endContent={
            <Button className="bg-primary" isIconOnly>
              <PaperAirPlane />
            </Button>
          }
        />
      </div>
    </div>
  );
}
