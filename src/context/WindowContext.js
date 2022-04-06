import React,{ createContext,useContext } from "react";

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);


function WindowContextProvider({ children }) {

    let windowWidth = window.innerWidth;
    return (
        <WindowContext.Provider value={
            {
                windowWidth
            }}>
            {children}
        </WindowContext.Provider>
    )
}

export default WindowContextProvider;