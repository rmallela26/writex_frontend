import { useState, createContext } from "react";

export const Context = createContext();

const Store = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    
    return (
        <Context.Provider value={[accessToken, setAccessToken]}>
            {children}
        </Context.Provider>
    )
}

export default Store;