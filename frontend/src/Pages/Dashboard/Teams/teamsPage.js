import { Input, Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import SearchIcon from "../../../assets/icons/searchIcon";
import HashIcon from "../../../assets/icons/hashIcon";
import GroupIcon from "../../../assets/icons/groupIcon";
import RectangleGroupIcon from "../../../assets/icons/rectangleGroupIcon";

export default function TeamsPage() {
    return <div className="">
        {/* HEADER */}
        <div className="flex justify-between border-2 p-4">
            <p className="font-bold text-2xl text-white">Teams</p>

        </div>
        {/* CONTENT */}
        <div className="flex">

            {/* LEFT SIDE */}
            <div className="border-r-2 w-1/4 p-4 h-screen">
                <p className="font-semibold text-white py-2">Search Your Team</p>
                <Input className="" placeholder="Type to Search..." startContent={<SearchIcon color="black" />}></Input>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-center justify-center h-full">
                <p className="font-semibold text-white text-2xl w-1/2 py-10">You don't have any teams discoverable
                    Try searching, join with a code, or create one.</p>
                <div className="flex space-x-5">

                    {/* JOIN TEAM VIA Code */}
                    <Card className="bg-darkGray flex flex-col items-center p-3 w-60">
                        <CardHeader className="flex justify-center">
                            <div className="bg-gray p-6 rounded-xl">
                                <HashIcon color={"white"}></HashIcon>
                            </div>
                        </CardHeader>
                        <CardBody className="space-y-3">
                            <p className="text-white font-semibold">Join a Team With a Code</p>
                            <Input placeholder="Enter join Code"></Input>
                        </CardBody>
                        <CardFooter>
                            <Button className='bg-primary text-white font-semibold w-full'>Add Team</Button>
                        </CardFooter>
                    </Card>


                    {/* CREATE OWN TEAM */}
                    <Card className="bg-darkGray flex flex-col items-center p-3 w-60">
                        <CardHeader className="flex justify-center">
                            <div className="bg-gray p-6 rounded-xl">
                                <GroupIcon size={42} color="white"></GroupIcon>
                            </div>
                        </CardHeader>
                        <CardBody className="space-y-3">
                            <p className="text-white font-semibold">Create your own Team</p>
                            {/* <Input placeholder="Enter join Code"></Input> */}
                        </CardBody>
                        <CardFooter>
                            <Button className='bg-primary text-white font-semibold w-full'>Create a Team</Button>
                        </CardFooter>
                    </Card>


                    {/* BROWSE TEAM TEMPLATE */}
                    <Card className="bg-darkGray flex flex-col items-center p-3 w-60">
                        <CardHeader className="flex justify-center">
                            <div className="bg-gray p-6 rounded-xl">
                                <RectangleGroupIcon></RectangleGroupIcon>
                            </div>
                        </CardHeader>
                        <CardBody className="space-y-3">
                            <p className="text-white font-semibold">Browse multiple Team template and create your own Team according to your needs</p>
                            
                        </CardBody>
                        <CardFooter>
                            <Button className='bg-primary text-white font-semibold w-full'>Browser Team Templates</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>

    </div>
}
