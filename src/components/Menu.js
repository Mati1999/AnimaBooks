import React from 'react'
import '../Styles/Menu.scss'
import { FaBook } from 'react-icons/fa';

const Menu = () => {
    return (
        <div className='menu'>
            {/* <img className='menu__logo' src='' alt='logo' /> */}
            <FaBook className='menu__logo' />
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