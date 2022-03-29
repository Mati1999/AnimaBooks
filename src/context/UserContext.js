import React,{ useState,createContext,useContext } from "react";
import { auth } from '../firebase/config';
import { signInWithPopup,GoogleAuthProvider,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";
import { useCartContext } from "./CartContext";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);


function UserContextProvider({ children }) {
    const [user,setUser] = useState(false);
    const [rol,setRol] = useState('');
    const [cart,setCart] = useState([]);

    const db = getFirestore();

    const getCartYRol = async (uid) => {
        const docuRef = doc(db,`usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data().rol;
        const cartFinal = docuCifrada.data().cart;
        const userOrders = docuCifrada.data().orders;
        setRol(infoFinal);
        setCart(cartFinal);
        return [infoFinal,cartFinal,userOrders];
    }

    const setUserWithFirebaseAndRol = (usuarioFirebase) => {
        let cartYRol = getCartYRol(usuarioFirebase.uid)
        const userData = {
            uid: usuarioFirebase.uid,
            email: usuarioFirebase.email,
            rol: cartYRol[0],
            cart: cartYRol[1],
            orders: cartYRol[2]
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
        const docRef = doc(db,`usuarios/${infoUsuario.user.uid}`);
        setDoc(docRef,{ correo: email,rol: 'usuario',cart: [],orders: [] });
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
                cart,
                setRol,
                registrarUsuario,
                // signIngWithGoogle
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;