import React,{ useState,createContext,useContext } from "react";
import { auth } from '../firebase/config';
import { signInWithPopup,GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

function UserContextProvider({ children }) {
    const [user,setUser] = useState(null);
    const [isLogged,setIsLogged] = useState(false);

    onAuthStateChanged(auth,(usuarioFirabase) => {
        if (usuarioFirabase) {
            setUser(usuarioFirabase);
            setIsLogged(true);
        } else {
            setUser(null);
            setIsLogged(false);
        }
    })

    //  Authentication
    const signIngWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
            .then((res) => {
                const user = res.user;
                console.log(user);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <UserContext.Provider value={
            {
                user,
                isLogged,
                signIngWithGoogle
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;