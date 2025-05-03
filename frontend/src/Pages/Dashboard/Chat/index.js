import { Button, Image, Input, User, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import FilterIcon from "../../../assets/icons/filterIcon";
import SearchIcon from "../../../assets/icons/searchIcon";
import getUsers from "../../../backendRequest/getUsers";
import { FETCH_USER } from "../../../utils/apiStrings";
import MoreIcon from "../../../assets/icons/moreIcon";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState('All')

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(FETCH_USER);
      setUsers(response.data.User);
    } catch (error) {
      console.log("Error in fetching User List.");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-1/3 h-screen border-r-2 border-gray p-4">
        <div className="flex justify-between py-3">
          <p className="font-bold text-3xl">Chats</p>
          <Tabs
            size="md"
            color="primary"
            variant="bordered"
            className=""
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key={"All"} title={<div className="flex items-center space-x-2">
              <span className="text-white">All</span>
            </div>} />
            <Tab key={"Unread"} title={<div className="flex items-center space-x-2">
              <span className="text-white">Unread</span>
            </div>} />
            <Tab key={"Favorite"} title={<div className="flex items-center space-x-2">
              <span className="text-white">Favorites</span>
            </div>} />
          </Tabs>

          <Button isIconOnly className="bg-primary">
            <FilterIcon />
          </Button>
        </div>

        <Input
          className="py-3"
          placeholder="Search or start a new Chat"
          startContent={<SearchIcon color="black" />}
          onChange={(e) => {
            
          }}
        />
        {users.map((user) => (
          <a
            key={user.phone}
            href={`tel:${user.phone}`}
            className="w-full block hover:bg-gray hover:cursor-pointer rounded-xl  justify-between items-center no-underline"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <User
              className="text-white font-semibold py-3"
              avatarProps={{
                showFallback: true,
                isBordered: true,
                src: `https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName + user.lastName}`
              }}
              name={user.firstName + " " + user.lastName}
              description={user.phone}
            />
            <Button className="bg-transparent" isIconOnly>
              <MoreIcon />
            </Button>
          </a>
        ))}
        {users.length === 0 && <p className="text-gray-400 text-center">No users found</p>}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-2/3 h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <p className="text-lightGray font-lg text-xl py-10 px-32 text-center">
            <span className="text-primary font-bold">commUnity</span> ensures your conversations are protected with end-to-end encryption and multi-factor authentication, keeping your data safe from unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
}
