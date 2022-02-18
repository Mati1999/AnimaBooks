import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import '../Styles/CartWidget.scss'

const CartWidget = () => {
    return (
        <div className='cartWidget'>
            <FaShoppingCart className='cart' />
        </div>
    )
}

export default CartWidget