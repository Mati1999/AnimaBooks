import React from 'react'
import '../Styles/User.scss'
import { useUserContext } from '../context/UserContext';
import Login from './Login';


const User = () => {
    const { user,isLogged } = useUserContext();

    return (
        <>
            {isLogged ?
                <div>
                    <h2>Perfil del usuario</h2>
                </div>
                :
                <div>
                    <Login />
                </div>
            }
        </>
    )
}

export default User;