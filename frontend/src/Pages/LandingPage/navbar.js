import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import WebsiteName from "../../components/websiteName";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingPageNavbar() {

    const navigate = useNavigate();
    const [selectedNav, setSelectedNav] = useState('home')

    return (
        <Navbar position="static" className="bg-black">
            <NavbarBrand>
                <Link href="#"><WebsiteName /></Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarItem isActive>
                    <Link
                        href="#"
                        onClick={() => setSelectedNav("home")}
                        className={`text-white hover:text-primary transition-all pb-1 ${selectedNav === "home" ? "border-b-2 border-primary" : ""
                            }`}
                    >
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link
                        href="#features"
                        onClick={() => setSelectedNav("features")}
                        className={`text-white hover:text-primary transition-all pb-1 ${selectedNav === "features" ? "border-b-2 border-primary" : ""
                            }`}
                    >
                        Features
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/signin" className="text-white hover:text-primary">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        size="md"
                        color="primary"
                        className="text-white bg-primary font-semibold transition-all hover:scale-105"
                        href="/signup"
                        variant="flat"
                    >
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
