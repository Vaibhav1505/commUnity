import { createContext } from "react";

const ThemeContext = createContext({});

export function ThemeContextProvider(props) {






    return <ThemeContext.Provider>
        {props.children}
    </ThemeContext.Provider>
}

export default ThemeContext;