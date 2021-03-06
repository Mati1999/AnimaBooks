import React,{ useState } from 'react'
import '../Styles/NavBar.scss'
import { FaBook,FaHome } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineMessage,AiOutlineUser } from 'react-icons/ai';
import CartWidget from './CartWidget';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useWindowContext } from '../context/WindowContext';


const Menu = () => {
    const { windowWidth } = useWindowContext();
    const [widthMenu,setwidthMenu] = useState('4.5rem');
    const [translateMiniMenu,setTranslateMiniMenu] = useState('100%');
    const [menuButtonClass,setMenuButtonClass] = useState('menuButton');
    const { user } = useUserContext();

    const growMenu = {
        width: widthMenu
    };

    const clickOpenMenu = () => {
        if (translateMiniMenu === '0%') {
            setTranslateMiniMenu('100%');
            setMenuButtonClass('menuButton');
        } else {
            setTranslateMiniMenu('0%');
            setMenuButtonClass('menuButton active');
        }
    }

    const moveMiniMenu = {
        left: translateMiniMenu
    }

    return (
        <>
            {(windowWidth > 768)
                ?
                <div
                    className='menu'
                    style={growMenu}
                    onMouseOver={() => { setwidthMenu('15rem') }}
                    onMouseLeave={() => { setwidthMenu('4.5rem') }}
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
                                <p>{user ? 'Ir al perfil' : 'Inicia Sesi??n'}</p>
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
                                    <NavLink to='categoria/SliceOfLife'>
                                        <li>Slice Of Life</li>
                                    </NavLink>
                                    <NavLink to='categoria/Coming-of-age'>
                                        <li>Coming-of-age</li>
                                    </NavLink>
                                    <NavLink to='categoria/Romance'>
                                        <li>Romance</li>
                                    </NavLink>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>


                :
                <>
                    <div className='menuButtonContainer'>
                        <button className={menuButtonClass} onClick={() => clickOpenMenu()}>
                            <span></span>
                        </button>
                    </div>
                    <div
                        className='menu'
                        style={moveMiniMenu}
                    >
                        <div className='menuDivItems'>
                            <NavLink className='menu__marca' to='/' onClick={() => clickOpenMenu()}>
                                <div className='menu__marcaDiv'>
                                    <FaBook className='menu__marcaIcon marginIcon' />
                                    <h4>AnimaBooks</h4>
                                </div>
                            </NavLink>

                            <CartWidget menuWidth={clickOpenMenu}></CartWidget>
                            <NavLink className='linkUserLogIn' to='/user' onClick={() => clickOpenMenu()}
                            //  onClick={() => { signIngWithGoogle() }}
                            >
                                <div className='user'>
                                    <AiOutlineUser className='userIcon' />
                                    <p>{user ? 'Ir al perfil' : 'Inicia Sesi??n'}</p>
                                </div>
                            </NavLink>
                            <ul className='menu__lista'>
                                <NavLink className='menuNavLinks' to='/' onClick={() => clickOpenMenu()}>
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
                                        <NavLink to='categoria/Shounen' onClick={() => clickOpenMenu()}>
                                            <li>Shounen</li>
                                        </NavLink>
                                        <NavLink to='categoria/SliceOfLife' onClick={() => clickOpenMenu()}>
                                            <li>Slice Of Life</li>
                                        </NavLink>
                                        <NavLink to='categoria/Coming-of-age' onClick={() => clickOpenMenu()}>
                                            <li>Coming-of-age</li>
                                        </NavLink>
                                        <NavLink to='categoria/Romance' onClick={() => clickOpenMenu()}>
                                            <li>Romance</li>
                                        </NavLink>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>

    )
}

export default Menu