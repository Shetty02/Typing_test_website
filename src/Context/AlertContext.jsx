import { createContext, useState ,useContext} from "react";


const AlertContext = createContext();

export const AlertContextProvider = ({children}) =>{

    const [alert,setAlert] = useState({
        open: false,
        type: '',
        message: '',
    })
    const values = {
        alert,
        setAlert
    }

    return(<AlertContext.Provider value={values}>{children}</AlertContext.Provider>);
}

//below is the user made hook . if we add "use" word before any thing that is user made hook.
export const useAlert = () => useContext(AlertContext);