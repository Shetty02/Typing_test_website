import { createContext, useState ,useContext} from "react";
import { themeOptions } from "../style/theme";


const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) =>{

    const defaultTheme = JSON.parse(localStorage.getItem('theme')) || themeOptions[2].value
    const[theme,setTheme] = useState(defaultTheme);

    const values = { 
        theme,
        setTheme,
        defaultTheme
    }

    return(<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>);
}

//below is the user made hook . if we add "use" word before any thing that is user made hook.
export const useTheme = () => useContext(ThemeContext);