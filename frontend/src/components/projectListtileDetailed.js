import { CircularProgress,Chip, Button } from "@nextui-org/react";
import MoreIcon from "../assets/icons/moreIcon";

export default function DetailedProjectListTile({ projectName, Customer, assignedTo, completion, status, dueDate }) {
    return <div className="border-2 border-gray w-full flex justify-between p-3 items-center">
        <div>
            <p className="font-bold text-lg text-white">{projectName}</p>
            <p className="font-semibold text-white">{Customer}</p>
        </div>
        <p className="font-semibold text-white">{assignedTo}</p>
        <CircularProgress className="text-white"
            aria-label="Loading..."
            color="primary"
            showValueLabel={true}
            size="lg"
            value={completion}>
        </CircularProgress>
        <Chip className="bg-green-300 text-black">{status}</Chip>
        <p className="font-semibold text-white">{dueDate}</p>
        <Button className="bg-primary" isIconOnly>{<MoreIcon color="white"/>}</Button>
    </div>
}