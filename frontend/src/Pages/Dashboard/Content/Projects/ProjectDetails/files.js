import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Chip,
    Button,
} from "@nextui-org/react";
import { useState } from "react";
import AddFiles from "../../../../../assets/icons/addFileIcon";
import ShareIcon from "../../../../../assets/icons/shareIcon";
import FilterIcon from "../../../../../assets/icons/filterIcon";
import SearchIcon from "../../../../../assets/icons/searchIcon";
import DownloadIcon from "../../../../../assets/icons/downloadIcon";
import DeleteIcon from "../../../../../assets/icons/deleteIcon";

export default function ProjectFiles() {
    const [searchQuery, setSearchQuery] = useState("");

    const columns = [
        { name: "NAME", uid: "name" },
        { name: "MODIFIED", uid: "modified" },
        { name: "MODIFIED BY", uid: "modifiedBy" },
        { name: "SIZE", uid: "size" },
        { name: "CATEGORY", uid: "category" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const tableData = [
        {
            id: "1",
            name: "Bug Files 1",
            modified: "3 days ago",
            modifiedBy: "Shubham Chauhan",
            size: "25 KB",
            category: "Critical",
        },
        {
            id: "2",
            name: "Bug Files 2",
            modified: "12/04/2025",
            modifiedBy: "Saurabh Kumar Verma",
            size: "15 MB",
            category: "Major",
        },
        {
            id: "3",
            name: "Bug Files 3",
            modified: "08/03/2025",
            modifiedBy: "Vaibhav Singh",
            size: "2 KB",
            category: "Minor",
        },
        {
            id: "4",
            name: "Bug Files 4",
            modified: "28/02/2025",
            modifiedBy: "Yogi ji",
            size: "8 MB",
            category: "Critical",
        },
        {
            id: "5",
            name: "Bug Files 5",
            modified: "15/01/2025",
            modifiedBy: "John Doe",
            size: "1 GB",
            category: "Major",
        },
        {
            id: "6",
            name: "Bug Files 6",
            modified: "01/01/2025",
            modifiedBy: "Jane Doe",
            size: "500 MB",
            category: "Minor",
        },
    ];

    const filteredData = tableData.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCell = (file, columnKey) => {
        const value = file[columnKey];

        switch (columnKey) {
            case "category":
                return (
                    <Chip color={
                        file.category === "Critical"
                            ? "danger"
                            : file.category === "Major"
                            ? "warning"
                            : "success"
                    }>
                        {value}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex space-x-2">
                        <Button className="bg-transparent hover:bg-primary" isIconOnly>
                            <DownloadIcon color="white" />
                        </Button>
                        <Button className="bg-transparent hover:bg-danger" isIconOnly>
                            <DeleteIcon color="white" />
                        </Button>
                    </div>
                );
            default:
                return <p className="text-white">{value}</p>;
        }
    };

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="flex justify-between space-x-3">
                <Input
                    className="w-1/5"
                    endContent={<SearchIcon size={30} />}
                    variant="bordered"
                    color="primary"
                    size="sm"
                    label="Type to search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="flex items-center space-x-3">
                    <Button className="bg-primary text-white font-semibold" startContent={<AddFiles />}>
                        Add Files
                    </Button>
                    <Button className="bg-primary text-white font-semibold" startContent={<FilterIcon />}>
                        Filters
                    </Button>
                    <Button className="bg-primary text-white font-semibold" startContent={<ShareIcon />}>
                        Share
                    </Button>
                </div>
            </div>

            <Table
                aria-label="Files table"
                isHeaderSticky
                removeWrapper="true"
                
            >
                <TableHeader className="" columns={columns}>
                    {(column) => (
                        <TableColumn  key={column.uid} className="text-white dark:bg-black dark:text-white bg-gray">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={filteredData}>
                    {(item) => (
                        <TableRow key={item.id} className="text-white hover:bg-gray hover:rounded-lg">
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
