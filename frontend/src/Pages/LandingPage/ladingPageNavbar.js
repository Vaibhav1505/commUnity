import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import WebsiteName from "../../components/websiteName.js";
import { useNavigate } from "react-router-dom";

export default function LandingPageNavbar() {

    const navigate = useNavigate();

    return (
        <Navbar position="static" className="bg-transparent">
            <NavbarBrand>
                <Link href="#"><WebsiteName></WebsiteName></Link>

            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarItem>
                    <Link className="text-white" color="foreground" href="#">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link className="text-white" href="#" aria-current="page">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white" color="foreground" href="#">
                        Pricing
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/signin">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} size="" color="primary" className="text-white bg-primary font-semibold" href="/signup" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        
    );
}