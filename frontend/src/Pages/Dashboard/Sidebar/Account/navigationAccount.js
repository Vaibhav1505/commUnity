import { Popover, PopoverTrigger, PopoverContent, Button, Avatar, Card } from "@nextui-org/react";
import AccountPopoverContent from "./accountPopoverContent";

export default function NavigationAccount({accountData}) {
  return <Popover placement="right-end" showArrow={true}>
    <PopoverTrigger>
      <Avatar radius="lg" showFallback name={accountData.firstname} isBordered src=""></Avatar>
    </PopoverTrigger>
    <AccountPopoverContent PopoverContentData={accountData}></AccountPopoverContent>
  </Popover>
}