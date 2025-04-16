import { Button, CardBody, Chip } from "@nextui-org/react";


export default function ProjectListtile({ data }) {
    return <div className="rounded-xl bg-black flex justify-between p-5 items-center" >

        <p className="font-bold text-white">{data.title}</p>
        <Chip className="bg-green-300 "><p className="font-semibold overflow-ellipsis">{data.company}</p></Chip>


    </div>
}