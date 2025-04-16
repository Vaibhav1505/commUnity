import EventMeetingCard from "./EventMeeting";
import PeopleCard from "./People/PeopleCard";
import ProjectCard from "./Projects/projectCard";
import TaskCard from "./Tasks/taskCard";


export default function DashboardContent() {
    return (
        <div className="bg-black w-full h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 p-5 h-full">
                <PeopleCard />
                <EventMeetingCard />
                <ProjectCard />
                <TaskCard />
            </div>
        </div>
    );
}