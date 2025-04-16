import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function DropdownComponent({
    dropDownTriggerButtonTitle,
    dropDownTriggerButtonEndContent,
    firstButtonText,
    secondButtonText,
    thirdButtonText,
    firstButtonStartContent,
    secondButtonStartContent,
    thirdButtonStartContent,
    firstButtonOnClick,
    secondButtonOnClick,
    thirdButtonOnClick,
    currentStatus 
}) {
    
    const [status, setStatus] = useState(currentStatus);
    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus]);

    const handleFirstButtonClick = () => {
        setStatus(firstButtonText); 
        if (firstButtonOnClick) {
            firstButtonOnClick(firstButtonText);
        }
    };
    const handleSecondButtonClick = () => {
        setStatus(secondButtonText); 
        if (secondButtonOnClick) {
            secondButtonOnClick(secondButtonText); 
        }
    };
    const handleThirdButtonClick = () => {
        setStatus(thirdButtonText);
        if (thirdButtonOnClick) {
            thirdButtonOnClick(thirdButtonText);
        }
    };
    const getButtonColor = () => {
        switch (status) {
            case "Complete":
                return "bg-green-500";
            case "Pending":
                return "bg-yellow-500";
            case "InProgress":
                return "bg-blue-600";
            default:
                return "bg-gray-600";
        }
    };

    return (
        <Dropdown className="bg-black" >
            <DropdownTrigger>
                <Button
                    
                    className={`text-white ${getButtonColor()}`}
                    endContent={dropDownTriggerButtonEndContent}
                >
                    {status??"Status"}
                </Button>
            </DropdownTrigger>
            <DropdownMenu className="font-bold" aria-label="Dropdown menu with shortcut" variant="flat">
                <DropdownItem onClick={handleFirstButtonClick} className=" text-white fpnt-semibold" key="new" startContent={firstButtonStartContent}>
                    {firstButtonText}
                </DropdownItem>
                <DropdownItem onClick={handleSecondButtonClick} className=" text-white font-semibold" key="copy" startContent={secondButtonStartContent} >
                    {secondButtonText}
                </DropdownItem>
                <DropdownItem onClick={handleThirdButtonClick} className=" text-white font-semibold" key="copy" startContent={thirdButtonStartContent} >
                    {thirdButtonText}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

DropdownComponent.propTypes = {
    dropDownTriggerButtonTitle: PropTypes.string,
    dropDownTriggerButtonEndContent: PropTypes.node,
    firstButtonText: PropTypes.string,
    secondButtonText: PropTypes.string,
    thirdButtonText: PropTypes.string,
    firstButtonStartContent: PropTypes.node,
    secondButtonStartContent: PropTypes.node,
    thirdButtonStartContent: PropTypes.node,
    firstButtonOnClick: PropTypes.func,
    secondButtonOnClick: PropTypes.func,
    thirdButtonOnClick: PropTypes.func,
    currentStatus: PropTypes.string.isRequired
};
