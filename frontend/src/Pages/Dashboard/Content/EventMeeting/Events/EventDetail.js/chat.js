import { Button, Input } from "@nextui-org/react";
import PaperAirPlane from "../../../../../../assets/icons/paperAirplaneIcon";
import PaperClipIcon from "../../../../../../assets/icons/paperClipIcon";

export default function EventChat() {
    return (
        <div className="flex flex-col h-full bg-black">
            {/* Chat Messages Container */}
            <div className="flex-grow overflow-y-auto p-5">
                {/* Replace this comment with actual chat messages */}
                <p className="text-white">Chat messages will appear here.</p>

            </div>

            {/* Input Bar (Fixed at the Bottom) */}
            <div className="flex items-center space-x-2 p-3 border-t border-gray-700">
                <Button className="bg-primary" isIconOnly>
                    <PaperClipIcon />
                </Button>
                <Input
                    placeholder="Enter your message"
                    className="flex-grow"
                />
                <Button className="bg-primary" isIconOnly>
                    <PaperAirPlane />
                </Button>
            </div>
        </div>
    );
}