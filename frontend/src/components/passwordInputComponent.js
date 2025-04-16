import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import EyeIcon from "../assets/icons/eyeIcon";
import EyeCloseIcon from "../assets/icons/eyeCloseIcon";
import HashIcon from "../assets/icons/hashIcon";

export default function PasswordInput({ value, onChange }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value); // Call the onChange function passed from the parent
        }
    };

    return (
        <Input
            label="Password"
            fullWidth
            labelPlacement="outside"
            color="white"
            placeholder="Enter your password"
            startContent={<HashIcon />}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                        <EyeCloseIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
            value={value} // Set the input value to the passed value prop
            onChange={handleChange} // Handle input changes
        />
    );
}