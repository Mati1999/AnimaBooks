import React,{ useState } from 'react'
import '../Styles/NavBar.scss'
import { FaBook,FaHome } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineMessage,AiOutlineUser } from 'react-icons/ai';
import CartWidget from './CartWidget';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';


const Menu = () => {
    const [widthMenu,setwidthMenu] = useState('6%');
    const [userImg,setUserImg] = useState('');

    // const { signIngWithGoogle } = useUserContext();

    const growMenu = {
        width: widthMenu
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
                <NavLink className='linkUserLogIn' to='/user'
                //  onClick={() => { signIngWithGoogle() }}
                >
                    <div className='user'>
                        <AiOutlineUser className='userIcon' />
                        <p>Iniciar Sesión</p>
                    </div>
                </NavLink>
                <ul className='menu__lista'>
                    <NavLink className='menuNavLinks' to='/'>
                        <li className='menu__listaLi'>
                            <div>
                                <FaHome className='menuLiIcon marginIcon' />
                                <p className='menu__listaA'>Inicio</p>
                            </div>
                        </li>
                    </NavLink>
                    <li className='menu__listaLi'>
                        <div>
                            <BiCategory className='menuLiIcon marginIcon' />
                            <p className='menu__listaA'>Categorias</p>
                        </div>
                        <ul>
                            <NavLink to='categoria/Shounen'>
                                <li>Shounen</li>
                            </NavLink>
                            <NavLink to='categoria/Shojo'>
                                <li>Shojo</li>
                            </NavLink>
                        </ul>
                    </li>
                    <li className='menu__listaLi'>
                        <div>
                            <FiUsers className='menuLiIcon marginIcon' />
                            <a className='menu__listaA' href=''>Sobre nosotros</a>
                        </div>
                    </li>
                    <NavLink className='menuNavLinks' to='/'>
                        <li className='menu__listaLi'>
                            <div>
                                <AiOutlineMessage className='menuLiIcon marginIcon' />
                                <p className='menu__listaA'>
                                    Contacto
                                </p>
                            </div>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Menu