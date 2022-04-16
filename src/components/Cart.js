import React,{ useState } from 'react'
import { useCartContext } from '../context/CartContext';
import '../Styles/Carrito.scss';
import { AiOutlineUser } from 'react-icons/ai';
import { useUserContext } from '../context/UserContext';
import { Formik } from 'formik';
import { Link,NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


const Cart = () => {
    const [bought,setBought] = useState(false);
    const [isErrors,setIsErrors] = useState(true);
    const { cartList,totalPrice,emptyCart,orderId,clear,removeItem,buyCart,clearWithoutEmptyCart } = useCartContext();

    const { user } = useUserContext();

    const changeSetBought = () => {
        if (isErrors) {
            console.log('hay que terminar de completar el formulario');
        } else {
            setTimeout(() => {
                setBought(true);
                clearWithoutEmptyCart();
            },4000);
        }
    }

    const errorsInFormNotification = () => {
        toast.info('Lo lamento, debes completar los campos de forma correcta.',{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: '#2B494B',
                color: '#fdfffa'
            }
        })
    }

    const errorsInForm = (e) => {
        e.preventDefault();
        errorsInFormNotification();
    }

    return (

        <>
            {!user ?
                <div className='cartNoUserMsj'>
                    <h3>Para agregar productos al carrito necesitas iniciar sesión</h3>
                    <NavLink className='userLoginCart' to='/user'>
                        <p>Inicia Sesión</p>
                    </NavLink>
                </div>
                :
                <>
                    {emptyCart
                        ?
                        <div className='noItemsInCart'>
                            <h2> No hay Items en el carrito</h2>
                            <Link className="linkButtons" to='/'>
                                <button className="goToCartButtonOnCart">Ir al catálogo</button>
                            </Link>
                        </div>
                        :
                        <div className='cart'>
                            <h2>Carrito de compras</h2>
                            <div className='cartDetail'>
                                <div className='cartProducts'>
                                    {cartList.map((item) =>
                                        <li className='cartProduct' key={item.id}>
                                            <div className='productImgCont'>
                                                <img src={item.picture} alt="" />
                                            </div>
                                            <div className='productDetail'>
                                                <h3>{item.title}</h3>
                                                <p>Cantidad: {item.quantity} </p>
                                                <span>$ {item.price * item.quantity}</span>
                                            </div>
                                            <button type='text' onClick={() => { removeItem(item) }}>Eliminar</button>
                                        </li>
                                    )}
                                </div>
                                {!bought
                                    ?
                                    <div className='cartGeneralDetail'>
                                        <span>Precio total: $ {totalPrice}</span>

                                        <Formik
                                            initialValues={{
                                                name: '',
                                                phone: '',
                                                email: ''
                                            }}
                                            validate={(valores) => {
                                                let errores = {};
                                                // Validar password
                                                if (!valores.name) {
                                                    errores.name = 'Porfavor ingrese un nombre';
                                                } else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(valores.name)) {
                                                    errores.name = 'Ingrese un nombre válido';
                                                }
                                                if (!valores.phone) {
                                                    errores.phone = 'Porfavor ingrese un telefono celular';
                                                } else if (!/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(valores.phone)) {
                                                    errores.phone = 'El número de teléfono debe tener 10 dígitos';
                                                }
                                                // Validar correo
                                                if (!valores.email) {
                                                    errores.email = 'Porfavor, ingrese un correo electrónico';
                                                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                                                    errores.email = 'El correo solo puede contener letras, números, puntos, guiones y guión bajo. Y no te olvides del @';
                                                }
                                                if (Object.keys(errores).length > 0) {
                                                    setIsErrors(true);
                                                } else {
                                                    setIsErrors(false);
                                                }
                                                return errores;
                                            }}
                                        >
                                            {({ values,errors,touched,handleChange,handleBlur }) => (
                                                <form id='formValid' className='buyCartForm' onSubmit={isErrors ? errorsInForm : buyCart}>
                                                    <div>
                                                        <input id='name' type='text' values={values.name} onChange={handleChange} onBlur={handleBlur} placeholder='Ingrese su nombre' />
                                                        {touched.name && errors.name && <p>{errors.name}</p>}
                                                    </div>

                                                    <div>
                                                        <input id='phone' type='number' values={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder='Ingrese su teléfono' />
                                                        {touched.phone && errors.phone && <p>{errors.phone}</p>}
                                                    </div>

                                                    <div>
                                                        <input id='email' type='email' values={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='Ingrese su email' />
                                                        {touched.email && errors.email && <p>{errors.email}</p>}
                                                    </div>
                                                    <button type='submit' onClick={() => { changeSetBought() }}>Comprar productos</button>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                    :
                                    <div className='cartGeneralDetail'>
                                        <div className='cartPurchaseId'>
                                            <h3>Muchas gracias por adquirir nuestros productos</h3>
                                            <p>Este es el código único para tu compra: <span>{orderId}</span> </p>
                                        </div>
                                    </div>
                                }
                            </div>
                            <button className='btnEmptyCart' onClick={() => { clear() }}>Vaciar carrito</button>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Cart