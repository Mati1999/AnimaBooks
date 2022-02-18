import React from 'react'
import '../Styles/NavBar.scss'
import { FaBook } from 'react-icons/fa';
import CartWidget from './CartWidget';


const Menu = () => {
    return (
        <div className='menu'>
            <FaBook className='menu__logo' />
            <CartWidget />
            <h4>AnimaBooks</h4>
            <ul className='menu__lista'>
                <li><a href=''>Inicio</a></li>
                <li><a href=''>Categorias</a></li>
                <li><a href=''>Sobre nosotros</a></li>
                <li><a href=''>Contacto</a></li>
            </ul>
        </div>
    )
}

export default Menu