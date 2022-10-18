import { createContext, useState ,useContext} from "react";


const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) =>{

    const[theme,setTheme] = useState({
        background:"black",
        color:"white"
    });

    const values = { 
        theme,
        setTheme
    }

    return(<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>);
}

//below is the user made hook . if we add "use" word before any thing that is user made hook.
export const useTheme = () => useContext(ThemeContext);