import React,{ useState } from 'react'
import { useCartContext } from '../context/CartContext';
import { collection,getFirestore,addDoc,doc,updateDoc,query,where,documentId,writeBatch,getDocs } from 'firebase/firestore';
import '../Styles/Carrito.scss';
import Button from './Button';
import { useUserContext } from '../context/UserContext';

const Carrito = () => {
    const [comprado,setComprado] = useState(false);
    const { cartList,totalPrice,emptyCart,orderId,clear,removeItem,buyCart,clearWithoutEmptyCart } = useCartContext();

    const { user } = useUserContext();

    const changeSetComprado = () => {
        setTimeout(() => {
            setComprado(true);
            clearWithoutEmptyCart();
        },4000);
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
                                        <form onSubmit={buyCart} className='buyCartForm'>
                                            <input id='userName' type='text' placeholder='Ingrese su nombre' />
                                            <input id='userPhone' type='number' placeholder='Ingrese su teléfono' />
                                            <input id='userEmail' type='email' placeholder='Ingrese su email' />
                                            <button type='submit' onClick={() => {
                                                changeSetComprado()
                                            }
                                            }>Comprar productos</button>
                                        </form>
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