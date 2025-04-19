import { Button, ButtonGroup, Input } from "@nextui-org/react"
import Pattern from "../../components/PracticeDemo/acertinityDemoComponent/Pattern"
import { useNavigate } from "react-router-dom"
import ArrowRight from "../../assets/icons/arrowRightIcon";

export default function LandingPageMain() {

    const navigate = useNavigate();

    return <div className="h-full  w-full p-32 ">
        <div>
            <p className="text-7xl text-center text-white px-32 font-extrabold">Collaboration Starts with <span className="text-primary">commUnity</span>.</p>
        </div>
        <div className="px-72 py-24"><p className="text-white text-xl">Unite your team with seamless communication and powerful collaboration tools. Boost productivity and innovation, no matter where you are! This keeps it brief while still conveying the essence of your platform!</p></div>
        <div className="flex px-72">
            <Input placeholder="Enter your email" size="lg" endContent={
                <Button onClick={() => {
                    navigate("/signin")
                }}
                
                 className="bg-primary text-white font-semibold ">Get Started</Button>}></Input>
        </div>
        <div>

        </div>
    </div>

}