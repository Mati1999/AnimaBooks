import React from 'react'
import getFirestoreApp from '../firebase/config';
import { getAuth,signOut } from 'firebase/auth';
import { useUserContext } from '../context/UserContext';
import AdminView from './AdminView';
import UserView from './UserView';
import { useCartContext } from '../context/CartContext';

const auth = getAuth(getFirestoreApp());

const Home = () => {

    const { rol } = useUserContext();
    const { clearCartStatus } = useCartContext();
    return (
        <>
            {rol === 'admin' ?
                <AdminView />
                :
                <UserView />
            }

            <button onClick={() => {
                signOut(auth)
                clearCartStatus()
            }}>Cerrar Sesión</button>
        </>
    )
}

export default Home