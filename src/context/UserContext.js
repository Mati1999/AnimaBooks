import React,{ useState,createContext,useContext } from "react";
import { auth } from '../firebase/config';
import { signInWithPopup,GoogleAuthProvider,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

function UserContextProvider({ children }) {
    const [user,setUser] = useState(null);
    const [rol,setRol] = useState('');

    const db = getFirestore();
    async function getRol(uid) {
        const docuRef = doc(db,`usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data().rol;
        setRol(infoFinal);
        return infoFinal;
    }

    const setUserWithFirebaseAndRol = (usuarioFirebase) => {
        const userData = {
            uid: usuarioFirebase.uid,
            email: usuarioFirebase.email,
            rol: getRol(usuarioFirebase.uid)
        };
        setUser(userData);
    }

    onAuthStateChanged(auth,(usuarioFirebase) => {
        if (usuarioFirebase) {
            if (!user) {
                setUserWithFirebaseAndRol(usuarioFirebase);
            }
        } else {
            setUser(null);
            setRol(null)
        }
    })

    // Registrar usuario nuevo

    async function registrarUsuario(email,password) {
        const infoUsuario = await createUserWithEmailAndPassword(auth,email,password).then((usuarioFirabase) => {
            return usuarioFirabase;
        });
        const docuRef = doc(db,`usuarios/${infoUsuario.user.uid}`);
        setDoc(docuRef,{ correo: email,rol: 'usuario' });
    }

    //  Authentication
    // const signIngWithGoogle = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth,provider)
    //         .then((res) => {
    //             const user = res.user;
    //             console.log(user);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }

    return (
        <UserContext.Provider value={
            {
                user,
                rol,
                setRol,
                registrarUsuario,
                // signIngWithGoogle
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;