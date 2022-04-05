import React,{ useState } from 'react'
import { useCartContext } from '../context/CartContext';
import { collection,getFirestore,addDoc,doc,updateDoc,query,where,documentId,writeBatch,getDocs } from 'firebase/firestore';
import '../Styles/Carrito.scss';
import Button from './Button';
import { useUserContext } from '../context/UserContext';
import { Formik } from 'formik';


const Carrito = () => {
    const [comprado,setComprado] = useState(false);
    const [isErrors,setIsErrors] = useState(true);
    const { cartList,totalPrice,emptyCart,orderId,clear,removeItem,buyCart,clearWithoutEmptyCart } = useCartContext();

    const { user } = useUserContext();

    const changeSetComprado = () => {
        if (isErrors) {
            console.log('hay que terminar de completar el formulario');
        } else {
            setTimeout(() => {
                setComprado(true);
                clearWithoutEmptyCart();
            },4000);
        }

    }

    return (

        <>
            {!user ?
                <div>
                    <h3>Para agregar productos al carrito necesitas iniciar sesión</h3>
                </div>
                :
                <>
                    {emptyCart
                        ?
                        <div className='noItemsInCart'>
                            <h2> No hay Items en el carrito</h2>

                            <Button clase={"goToCartButton"} content={'Ir al catálogo'} event={() => { '' }} goTo={'/'} />
                        </div>
                        :
                        <div className='carrito'>
                            <h2>Carrito de compras</h2>
                            <div className='carritoDetalle'>
                                <div className='carritoProductos'>
                                    {cartList.map((item) =>
                                        <li className='carritoProducto' key={item.id}>
                                            <div className='productoImgCont'>
                                                <img src={item.picture} alt="" />
                                            </div>
                                            <div className='productoDetalle'>
                                                <h3>{item.title}</h3>
                                                <p>Cantidad: {item.cantidad} </p>
                                                <span>$ {item.price * item.cantidad}</span>
                                            </div>
                                            <button type='text' onClick={() => { removeItem(item) }}>Eliminar</button>
                                        </li>
                                    )}
                                </div>
                                {!comprado
                                    ?
                                    <div className='carritoDetalleGral'>
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
                                                <form className='buyCartForm' onSubmit={buyCart}>
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
                                                    <button type='submit' onClick={() => { changeSetComprado(errors) }}>Comprar productos</button>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                    :
                                    <div className='carritoDetalleGral'>
                                        <div>
                                            <h3>Muchas gracias por adquirir nuestros productos</h3>
                                            <p>{`Este es el código único para tu compra: 
                                            ${orderId}`}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            <button className='btnVaciarCarrito' onClick={() => { clear() }}>Vaciar carrito</button>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Carrito