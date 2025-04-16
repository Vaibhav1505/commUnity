import { Popover, PopoverTrigger, PopoverContent, Button,  } from "@nextui-org/react";
import MoreIcon from "../assets/icons/moreIcon";
import DeleteIcon from "../assets/icons/deleteIcon"
import PencilIcon from "../assets/icons/pencilIcon"

export default function TaskListTileMorePopover({onDeleteClick}) {
    return <Popover placement="bottom">
        <PopoverTrigger>
            <Button className="bg-black hover:bg-black hover:text-white" isIconOnly><MoreIcon></MoreIcon></Button>
        </PopoverTrigger>
        <PopoverContent className="p-3  space-y-2 bg-white">
            <Button className="bg-black text-white hover:bg-danger font-semibold" onClick={onDeleteClick} fullWidth endContent={<DeleteIcon></DeleteIcon>}>Delete</Button>
            <Button className="bg-black text-white  font-semibold" fullWidth endContent={<PencilIcon></PencilIcon>}>Edit</Button>
        </PopoverContent>
    </Popover>

}