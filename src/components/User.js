import React from 'react'
import '../Styles/User.scss'
import { useUserContext } from '../context/UserContext';
import Login from './Login';
import Home from './Home';


const User = () => {
    const { user } = useUserContext();

    return (
        <>
            {user ?
                <div className='userProfile'>
                    <Home />
                </div>
                :
                <div className='userProfile'>
                    <Login />
                </div>
            }
        </>
    )
}

export default User;