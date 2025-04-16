import { Switch } from "@nextui-org/react"
import SunIconSolid from "../assets/icons/sunIconSolid"
import MoonIconSolid from "../assets/icons/moonIconSolid"


export default function ThemeSwitch() {
    return <Switch
        defaultSelected
        size="lg"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
            isSelected ? (
                <MoonIconSolid></MoonIconSolid>
            ) : (
                <SunIconSolid className='text-black' />)
        }
    >
       
    </Switch>
}