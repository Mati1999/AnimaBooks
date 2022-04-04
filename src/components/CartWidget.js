import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import '../Styles/CartWidget.scss'

const CartWidget = () => {

    const { cantidad } = useCartContext()

    return (
        <>
            {cantidad === 0
                ?
                <div className='cartWidget'>
                    <NavLink to='/cart'>
                        <FaShoppingCart className='cart' />
                        <p>Carrito</p>
                    </NavLink>
                </div>
                :
                <div className='cartWidget'>
                    <NavLink to='/cart'>
                        <FaShoppingCart className='cart' />
                        <p>Carrito</p>
                    </NavLink>

                    <span className='iconoCarrito'>{cantidad}</span>
                </div>
            }
        </>
    )
}

export default CartWidget