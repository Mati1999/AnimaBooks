import React,{ useState } from 'react'
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword,setPersistence,browserSessionPersistence } from 'firebase/auth';
import { useUserContext } from '../context/UserContext';
import { Formik } from 'formik';

const Login = () => {
    const [isRegistrando,setIsRegistrando] = useState(false);

    const { registrarUsuario } = useUserContext();

    const submitHandler = (email,password) => {
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

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={(valores) => {
                    let errores = {};

                    // Validar password
                    if (!valores.password) {
                        errores.password = 'Porfavor ingrese una contraseña';
                    } else if (!/^(?=.*\d)(?=.*[a-zA-Z]).{6,15}$/.test(valores.password)) {
                        errores.password = 'La contraseña debe tener entre 6 y 15 caracteres, debe contener al menos, 1 número y 1 minúscula o 1 mayúscula.';
                    }


                    // Validar correo
                    if (!valores.email) {
                        errores.email = 'Porfavor, ingrese un correo electrónico';
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                        errores.email = 'El correo solo puede contener letras, números, puntos, guiones y guión bajo. Y no te olvides del @';
                    }
                    return errores;
                }}
                onSubmit={(valores) => {
                    console.log('formulario enviado');
                    submitHandler(valores.email,valores.password);
                }}
            >
                {({ values,errors,touched,handleSubmit,handleChange,handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Correo Electrónico:
                            <input type="email" id='email' placeholder='Email' values={values.email} onChange={handleChange} onBlur={handleBlur} />
                        </label>
                        {touched.email && errors.email && <p>{errors.email}</p>}
                        <label>
                            Contraseña:
                            <input type="password" id='password' placeholder='Password' values={values.password} onChange={handleChange} onBlur={handleBlur} />
                        </label>
                        {touched.password && errors.password && <p>{errors.password}</p>}

                        <input
                            type="submit"
                            value={isRegistrando ? 'Registrar' : 'Iniciar Sesión'}
                        />
                    </form>
                )}
            </Formik>
            <button onClick={() => setIsRegistrando(!isRegistrando)}>
                {isRegistrando ? 'Ya tengo una cuenta' : 'Quiero registrarme'}
            </button>
        </div>
    )
}

export default Login