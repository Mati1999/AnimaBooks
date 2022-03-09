import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import '../Styles/CartWidget.scss'

const CartWidget = () => {
    return (
        <div className='cartWidget'>
            <NavLink to='/cart'>
                <FaShoppingCart className='cart' />
            </NavLink>
        </div>
    )
}

export default CartWidget