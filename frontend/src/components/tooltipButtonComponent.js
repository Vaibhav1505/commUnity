import { Tooltip,Button } from "@nextui-org/react"

export default function ToolTipIconButtonComponent({icon,tooltipContent,onClick, className,size="sm",placement='right'}){
    return <Tooltip className="text-white bg-black" placement={placement} content={tooltipContent}>
    <Button size={size} onClick={onClick} className={className} isIconOnly>{icon}</Button>
  </Tooltip>
}