import { createContext, useState ,useContext} from "react";


const GameModeContext = createContext();

export const GameModeContextProvider = ({children}) =>{
    // const defaultTheme = JSON.parse(localStorage.getItem('theme')) || themeOptions[2].value
    // const[theme,setTheme] = useState(defaultTheme);
    // const defaultGameMode = JSON.parse(localStorage.getItem('time')) 
    // const[gameMode,setGameMode] = useState(defaultGameMode);
    const[gameMode,setGameMode] = useState('time'); 
    const[gameTime,setGameTime] = useState(15);
    const[gameWords, setGameWords] = useState(10);

    const values = {
        gameTime,
        gameMode,
        gameWords,
        // defaultGameMode,
        setGameMode,
        setGameTime,
        setGameWords
    }

    return(<GameModeContext.Provider value={values}>{children}</GameModeContext.Provider>);
}

//below is the user made hook . if we add "use" word before any thing that is user made hook.
export const useGameMode = () => useContext(GameModeContext);