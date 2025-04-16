import { Button, ButtonGroup, Input } from "@nextui-org/react"
import Pattern from "../../components/PracticeDemo/acertinityDemoComponent/Pattern"
import { useNavigate } from "react-router-dom"
import ArrowRight from "../../assets/icons/arrowRightIcon";

export default function LandingPageMain() {

    const navigate = useNavigate();

    return <div className="h-full  w-full p-48 ">
        <div>
            <p className="text-6xl text-white px-32 font-extrabold">Effortlessly Task Management for Teams and Individuals with <span className="text-primary">commUnity</span></p>
        </div>
        <div className="px-52 py-16"><p className="text-white text-lg">Unite your team with seamless communication and powerful collaboration tools. Boost productivity and innovation, no matter where you are! This keeps it brief while still conveying the essence of your platform!</p></div>
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