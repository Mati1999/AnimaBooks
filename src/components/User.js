import React from 'react'
import getFirestoreApp from '../firebase/config';
import { getAuth,signOut } from 'firebase/auth';
import AdminView from './AdminView';
import UserView from './UserView';
import { useCartContext } from '../context/CartContext';
import { useUserContext } from '../context/UserContext';
import Login from './Login';

const auth = getAuth(getFirestoreApp());

const User = () => {
    const { user,rol } = useUserContext();
    const { clearCartStatus } = useCartContext();
    return (
        <>
            {user ?
                <>
                    {rol === 'admin' ?
                        <AdminView />
                        :
                        <UserView />
                    }

                    <button className='btnLogOut' onClick={() => {
                        signOut(auth)
                        clearCartStatus()
                    }}>Cerrar Sesión</button>
                </>
                :
                <Login />}
        </>
    )
}

export default User;