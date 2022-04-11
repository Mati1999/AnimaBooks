import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import '../Styles/CartWidget.scss'

const CartWidget = ({ menuWidt }) => {

    const { quantity } = useCartContext()

    return (
        <>
            {quantity === 0
                ?
                <div className='cartWidget'>
                    <NavLink to='/cart' onClick={menuWidt}>
                        <FaShoppingCart className='cartIcon' />
                        <p>Carrito</p>
                    </NavLink>
                </div>
                :
                <div className='cartWidget'>
                    <NavLink to='/cart'>
                        <div>
                            <FaShoppingCart className='cartIcon' />
                            <span className='cartIconSpan'>{quantity}</span>
                        </div>

                        <p>Carrito</p>
                    </NavLink>
                </div>
            }
        </>
    )
}

export default CartWidget