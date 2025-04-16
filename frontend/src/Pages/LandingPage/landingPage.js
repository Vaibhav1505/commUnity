
import LandingPageNavbar from "./ladingPageNavbar.js";
import LandingPageMain from "./landingPageMain.js";


export default function LandingPage() {
    return <>
        <div className=" overflow-hidden h-screen w-full" style={{
          backgroundColor: '#000000',
          '--gap': '5em',
          '--line': '1px',
          '--color': 'rgba(255, 255, 255, 0.2)',
          backgroundImage: `
            linear-gradient(
              -90deg,
              transparent calc(var(--gap) - var(--line)),
              var(--color) calc(var(--gap) - var(--line) + 1px),
              var(--color) var(--gap)
            ),
            linear-gradient(
              0deg,
              transparent calc(var(--gap) - var(--line)),
              var(--color) calc(var(--gap) - var(--line) + 1px),
              var(--color) var(--gap)
            )
          `,
          backgroundSize: 'var(--gap) var(--gap)',
        }}>
            <LandingPageNavbar></LandingPageNavbar>
            <LandingPageMain></LandingPageMain>
            
        </div>
        
    </>
}