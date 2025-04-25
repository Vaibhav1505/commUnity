import { Button, Card, Image } from "@nextui-org/react";
import ChattingImage from '../../../assets/photos/chatting.svg'
import VideoCallingImage from '../../../assets/photos/videoCall.svg'
import FileShareImage from '../../../assets/photos/fileShare.svg'
import TaskManageImage from '../../../assets/photos/tasks.svg';
import IntegrationImage from '../../../assets/photos/integration.svg';
import ArrowRight from "../../../assets/icons/arrowRightIcon";
import ChattingVideo from '../../../assets/videos/chat.mp4';
import VideoCallVideo from '../../../assets/videos/videoCall.mp4'
import FileSharingVideo from '../../../assets/videos/fileUpload.mp4';
import TaskVideo from '../../../assets/videos/task.mp4';
import IntegrationVideo from '../../../assets/videos/integation.mp4';
import { Link } from "react-router-dom";



export default function LandingPageFeature() {

    const features = [
        {
            title: "Real-Time Messaging",
            description: "Instant chat with channels, threads, and @mentions. Stay connected with persistent conversation history and smart notifications.",
            image: ChattingImage,
            exploreLink: "https://www.techtarget.com/whatis/definition/chatting"
        },
        {
            title: "Video Meetings",
            description: "HD video conferencing with screen sharing, recording, and virtual backgrounds. Supports up to 100 participants with breakout rooms.",
            image: VideoCallingImage,
            exploreLink: "https://en.wikipedia.org/wiki/Videotelephony"
        },
        {
            title: "File Uploading",
            description: "Secure document sharing with version control. Supports all file types (PDFs, images, code) with 256-bit encryption and access controls.",
            image: FileShareImage,
            exploreLink: "https://cointelegraph.com/news/faster-cheaper-smarter-optimizing-file-sharing-for-the-real-world-with-web3"
        },
        {
            title: "Task Management",
            description: "Kanban boards, due dates, and assignments. Integrate tasks with chat conversations and set automated reminders.",
            image: TaskManageImage,
            exploreLink: "https://www.microsoft.com/en-us/microsoft-365/task-management-in-microsoft-365"
        },
        {
            title: "Integrations",
            description: "Connect with 50+ tools like Google Workspace, GitHub, and Slack. Build custom workflows with our API and webhooks.",
            image: IntegrationImage,
            exploreLink: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-data-integration"
        },
    ];

    return (
        <div className="bg-black py-20 px-4">
            <div className="max-w-5xl mx-auto text-center py-24 space-y-12">
                <h2 className="text-5xl sm:text-5xl  font-extrabold text-white mb-4">
                    Everything Your Team Needs, All in One Place
                </h2>
                <p className="text-lightGray text-xl max-w-2xl mx-auto">
                    Unified workspace combining communication, file management, and project tools—designed for modern hybrid teams and enterprise security.
                </p>

                <Button size="lg" color="primary" endContent={<ArrowRight />}>Gets Started</Button>
            </div>
            <div className="space-y-16">
                {features.map((feature, idx) => (
                    <div
                        key={feature.title}
                        className={`flex flex-col mx-32 p-12 bg-gray rounded-lg md:flex-row items-center md:justify-evenly ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div className="flex-1 flex justify-center">
                            <Card className='bg-black p-12'>
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-72 h-72 md:w-56 md:h-56 object-contain p-4 rounded-xl"
                                />
                            </Card>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-4xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-lightGray text-xl mb-6">{feature.description}</p>
                            <Button
                                className="  transition-colors"
                                color="primary"
                                endContent={<ArrowRight className="w-4 h-4" />}
                                size="md"

                            >
                                <a href={feature.exploreLink}>Explore Feature</a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
