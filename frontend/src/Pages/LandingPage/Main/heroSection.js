import { Button } from "@nextui-org/react";
import ArrowRight from "../../../assets/icons/arrowRightIcon";
import landingPageVideo from "../../../assets/videos/tech.mp4";
import { useNavigate } from "react-router-dom";

export default function LandingPageHeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden text-white flex items-center justify-center px-6 sm:px-16 lg:px-32">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm brightness-50 z-0"
      >
        <source src={landingPageVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-10">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold">
          Collaboration Starts with <span className="text-primary">CommUnity</span>.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-3xl">
          Unite your team with seamless communication and powerful collaboration tools. Boost productivity and innovation, no matter where you are!
        </p>
        <Button
          size="lg"
          endContent={<ArrowRight />}
          onClick={() => navigate("/signin")}
          className="bg-primary text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Get Started for Free
        </Button>
      </div>
    </div>
  );
}
