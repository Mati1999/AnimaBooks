import React,{ useState } from 'react'
import '../Styles/NavBar.scss'
import { FaBook,FaHome } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import CartWidget from './CartWidget';
import { NavLink } from 'react-router-dom';
// import { auth } from '../firebase/config';
// import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";

const Menu = () => {
    const [widthMenu,setwidthMenu] = useState('6%');
    // const [userImg,setUserImg] = useState('');

    const growMenu = {
        width: widthMenu
    };


    // const signIngWithGoogle = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth,provider)
    //         .then((res) => {
    //             const user = res.user;
    //             setUserImg(user.photoURL)
    //             console.log(user);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }


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
                        {/* <img src={userImg} alt="" /> */}
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
                                <p
                                    className='menu__listaA'
                                // onClick={() => { signIngWithGoogle() }}
                                >
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