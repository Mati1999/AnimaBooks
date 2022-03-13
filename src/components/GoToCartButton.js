import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/GoToCartButton.scss'

const GoToCartButton = () => {
    return (
        <>
            <Link to='/cart'>
                <button className='goToCartButton'>Ir al carrito</button>
            </Link>
        </>
    )
}

export default GoToCartButton