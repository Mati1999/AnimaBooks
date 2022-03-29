import React,{ useState,useEffect } from 'react'
import getFirestoreApp,{ auth } from '../firebase/config';
import { signInWithEmailAndPassword,setPersistence,browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';


const Login = () => {
    const [isRegistrando,setIsRegistrando] = useState(false);

    const { registrarUsuario } = useUserContext();

    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (isRegistrando) {
            //registramos
            registrarUsuario(email,password);
        } else {
            //login
            setPersistence(auth,browserSessionPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth,email,password);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        }
    }

    return (
        <div>

            <h1>{isRegistrando ? 'Registrate' : 'Inicia Sesión'}</h1>

            <form onSubmit={submitHandler}>
                <label>
                    Correo Electrónico:
                    <input type="email" id='email' />
                </label>

                <label>
                    Contraseña:
                    <input type="password" id='password' />
                </label>
                <input
                    type="submit"
                    value={isRegistrando ? 'Registrar' : 'Iniciar Sesión'}
                />
            </form>

            <button onClick={() => setIsRegistrando(!isRegistrando)}>
                {isRegistrando ? 'Ya tengo una cuenta' : 'Quiero registrarme'}
            </button>
        </div>
    )
}

export default Login