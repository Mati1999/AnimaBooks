import React from 'react'
import { useCartContext } from '../context/CartContext';

const Carrito = () => {

    const { cartList,clear,removerItem } = useCartContext();

    return (
        <div>
            {cartList.map((item,key) =>
                <li key={item.id}>{`${item.title}, cantidad: ${item.cantidad}`} <button type='text' onClick={() => { removerItem(item.id) }}>eliminar</button></li>
            )}

            <button onClick={() => { clear() }}>Vaciar carrito</button>
        </div>
    )
}

export default Carrito