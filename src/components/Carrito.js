import React,{ useState } from 'react'
import { useCartContext } from '../context/CartContext';
import '../Styles/Carrito.scss';
import Button from './Button';

const Carrito = () => {
    const { cartList,totalPrice,emptyCart,clear,removeItem } = useCartContext();

    return (

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
                        <div className='carritoDetalleGral'>
                            <span>Precio total: {totalPrice}</span>
                        </div>
                    </div>
                    <button className='btnVaciarCarrito' onClick={() => { clear() }}>Vaciar carrito</button>
                </div>
            }
        </>
    )
}

export default Carrito