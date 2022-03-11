import React,{ useState } from 'react'
import '../Styles/NavBar.scss'
import { FaBook,FaHome } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import CartWidget from './CartWidget';
import { NavLink } from 'react-router-dom';


const Menu = () => {
    const [widthMenu,setwidthMenu] = useState('6%');

    const growMenu = {
        width: widthMenu,
    };

    return (
        <div
            className='menu'
            style={growMenu}
            onMouseOver={() => { setwidthMenu('18%') }}
            onMouseLeave={() => { setwidthMenu('6%') }}
        >
            <div className='menuDivItems'>
                <NavLink className='menu__marca' to='/'>
                    <div className='menu__marcaDiv'>
                        <FaBook className='menu__marcaIcon marginIcon' />
                        <h4>AnimaBooks</h4>
                    </div>
                </NavLink>

                <CartWidget></CartWidget>
                <ul className='menu__lista'>
                    <NavLink className='menuNavLinks' to='/'>
                        <li className='menu__listaLi'>
                            <div>
                                <FaHome className='menuLiIcon marginIcon' />
                                <a className='menu__listaA' href=''>Inicio</a>
                            </div>
                        </li>
                    </NavLink>
                    <li className='menu__listaLi'>
                        <div>
                            <BiCategory className='menuLiIcon marginIcon' />
                            <a className='menu__listaA' href=''>
                                Categorias
                            </a>
                        </div>
                        <ul>
                            <NavLink to='categoria/Shounen'>
                                <a href=""><li>Shounen</li></a>
                            </NavLink>
                            <NavLink to='categoria/Shojo'>
                                <a href=""><li>Shojo</li></a>
                            </NavLink>
                        </ul>
                    </li>
                    <li className='menu__listaLi'>
                        <div>
                            <FiUsers className='menuLiIcon marginIcon' /><a className='menu__listaA' href=''>Sobre nosotros</a>
                        </div>
                    </li>
                    <li className='menu__listaLi'>
                        <div>
                            <AiOutlineMessage className='menuLiIcon marginIcon' /><a href='' className='menu__listaA' >Contacto</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu