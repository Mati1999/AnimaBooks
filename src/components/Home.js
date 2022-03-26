import React from 'react'
import getFirestoreApp from '../firebase/config';
import { getAuth,signOut } from 'firebase/auth';
import { useUserContext } from '../context/UserContext';
import AdminView from './AdminView';
import UserView from './UserView';

const auth = getAuth(getFirestoreApp());

const Home = () => {

    const { rol } = useUserContext();

    return (
        <div>

            {rol === 'admin' ?
                <AdminView />
                :
                <UserView />
            }

            <button onClick={() => signOut(auth)}>Cerrar Sesión</button>
        </div>
    )
}

export default Home