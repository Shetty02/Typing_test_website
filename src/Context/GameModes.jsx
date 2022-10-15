import { createContext, useState ,useContext} from "react";


const GameModeContext = createContext();

export const GameModeContextProvider = ({children}) =>{

    const[gameTime,setGameTime] = useState(15);

    const values = {
        gameTime,
        setGameTime
    }

    return(<GameModeContext.Provider value={values}>{children}</GameModeContext.Provider>);
}

//below is the user made hook . if we add "use" word before any thing that is user made hook.
export const useGameMode = () => useContext(GameModeContext);