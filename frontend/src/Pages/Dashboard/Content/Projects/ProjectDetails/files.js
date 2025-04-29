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
import { useEffect, useState } from "react";
import GetFiles from "../../../../../backendRequest/getFiles";
import getUserDetail from "../../../../../backendRequest/getUserDetail";
import { DELETE_PROJECT_FILES, FETCH_PROJECT_DETAILS, FETCH_PROJECT_FILES, FETCH_USER_BY_ID, UPLOAD_FILE_IN_PROJECT } from "../../../../../utils/apiStrings";
import DeleteIcon from "../../../../../assets/icons/deleteIcon";
import AddFiles from "../../../../../assets/icons/addFileIcon";
import DocumentIcon from "../../../../../assets/icons/documentIcon";
import SearchIcon from "../../../../../assets/icons/searchIcon";
import DeleteFile from "../../../../../backendRequest/deleteFile";
import UploadFile from "../../../../../backendRequest/uploadFile";


export default function ProjectFiles({ projectData }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [file, setFile] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => {
        console.log("ProjectID:", projectData?.project_id)
        if (projectData?.project_id) {
            fetchProjectFiles();
        }
    }, [projectData?.project_id]);


    const fetchProjectFiles = async () => {
        try {
            const responseData = await GetFiles(FETCH_PROJECT_FILES, { projectId: projectData.project_id });
            if (responseData.status === 404 || (responseData.data && responseData.data.success === false)) {
                setMessage("No files found for this project.");
                setTableData([]);
                return;
            }
            const files = responseData.data.files || [];
            const uniqueUploaderIds = [...new Set(files.map(file => file.uploadedBy))];
            const userDetailsArray = await Promise.all(
                uniqueUploaderIds.map(id => getUserDetail(FETCH_USER_BY_ID(id)).catch(() => null))
            );
            const userDetailsMap = {};
            uniqueUploaderIds.forEach((id, idx) => {
                userDetailsMap[id] = userDetailsArray[idx];
            });
            const tableData = files.map(file => ({
                id: file.id,
                name: file.name,
                modified: new Date(file.createdAt).toLocaleDateString(),
                modifiedBy: userDetailsMap[file.uploadedBy]?.firstname || "Unknown",
                size: file.size ? `${(file.size / 1024).toFixed(2)} KB` : "",
                category: file.category || "Project File"
            }));
            setTableData(tableData);
            setMessage('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage("No files found for this project.");
                setTableData([]);
            } else {
                setMessage("Error fetching files.");
                setTableData([]);
            }
        }
    };


    const deleteProjectFile = async (id) => {
        try {
            const response = await DeleteFile(DELETE_PROJECT_FILES, { fileId: id });
            if (response.data.success) {
                setMessage("File deleted successfully");
                fetchProjectFiles();
            } else {
                setMessage(response.data.message || "Failed to delete file");
            }
        } catch (error) {
            setMessage("Failed to delete file");
        }
    };


    const handleFormChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userid', localStorage.getItem('userId'));
        formData.append('projectid', projectData.project_id);

        try {
            const responseData = await UploadFile(UPLOAD_FILE_IN_PROJECT, formData);
            setMessage("File uploaded successfully");
            setFileName('');
            setFile(null);
            fetchProjectFiles();
        } catch (error) {
            if (error?.response?.status === 500) {
                setMessage("Error with the Server");
            } else {
                setMessage(error?.response?.data?.msg || "Upload failed");
            }
        } finally {
            setIsUploading(false);
        }
    };

    const columns = [
        { name: "ID", uid: "id" },
        { name: "NAME", uid: "name" },
        { name: "MODIFIED", uid: "modified" },
        { name: "MODIFIED BY", uid: "modifiedBy" },
        { name: "SIZE", uid: "size" },
        { name: "CATEGORY", uid: "category" },
        { name: "ACTIONS", uid: "actions" },
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
                        <Button className="bg-transparent hover:bg-danger" onClick={() => deleteProjectFile(file.id)} isIconOnly>
                            <DeleteIcon color="white" />
                        </Button>
                    </div>
                );
            default:
                return <p className="text-white">{value}</p>;
        }
    };

    return (
        <div className="flex flex-col h-full gap-3 p-5 bg-black">
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
                    {message && (
                        <div className="mt-4">
                            <Chip
                                color={message.includes("success") ? "success" : "danger"}
                                variant="flat"
                                classNames={{
                                    base: "max-w-full",
                                    content: "truncate"
                                }}
                            >
                                {message}
                            </Chip>
                        </div>
                    )}
                    <form onSubmit={handleOnSubmit} className="flex gap-2 items-center">
                        <Button as="label" htmlFor="file-upload" color="primary" startContent={<AddFiles />} isLoading={isUploading}>
                            {isUploading ? "Uploading..." : "Add Files"}
                        </Button>
                        <input id="file-upload" type="file" onChange={handleFormChange} className="hidden" disabled={isUploading} />
                        {file && (
                            <Button
                                type="submit"
                                color="success"
                                isLoading={isUploading}
                            >
                                Upload
                            </Button>
                        )}
                    </form>
                </div>
            </div>
            <div className="flex justify-end">
                {fileName && (
                    <Chip startContent={<DocumentIcon color="black" />} isCloseable onClose={() => { setFile(null); setFileName(''); }} size="md" className="p-2 bg-green-500" variant="flat">
                        {fileName}
                    </Chip>
                )}
            </div>
            <Table
                aria-label="Files table"
                isHeaderSticky
                removeWrapper="true"
            >
                <TableHeader className="" columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} className="text-white dark:bg-black dark:text-white bg-gray">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No Files Uploaded"} items={filteredData}>
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
