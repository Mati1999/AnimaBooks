import React,{ useState,createContext,useContext } from "react";
import { auth } from '../firebase/config';
import { onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);


function UserContextProvider({ children }) {
    const [user,setUser] = useState(false);
    const [rol,setRol] = useState('');
    const [cart,setCart] = useState([]);
    const [userOrders,setUserOrders] = useState([]);

    const db = getFirestore();

    const getCartYRol = async (uid) => {
        const docuRef = doc(db,`usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const finalInfo = docuCifrada.data().rol;
        const finalCart = docuCifrada.data().cart;
        const userOrders = docuCifrada.data().orders;
        setRol(finalInfo);
        setCart(finalCart);
        setUserOrders(userOrders);
        return [finalInfo,finalCart,userOrders];
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

    async function signUpUser(email,password) {
        const infoUsuario = await createUserWithEmailAndPassword(auth,email,password).then((usuarioFirabase) => {
            return usuarioFirabase;
        });
        const docRef = doc(db,`usuarios/${infoUsuario.user.uid}`);
        setDoc(docRef,{ correo: email,rol: 'usuario',cart: [],orders: [] });
    }

    return (
        <UserContext.Provider value={
            {
                user,
                rol,
                cart,
                userOrders,
                setRol,
                signUpUser,
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;