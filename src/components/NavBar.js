import React from 'react'
import { useRef,useEffect } from "react";
import '../Styles/NavBar.scss'
import { FaBook,FaHome } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import CartWidget from './CartWidget';


const Menu = () => {

    // Logica para hacer un menú dinámico
    // Cuando haga mouseOver sobre el navbar, que se estire el menú horizontalmente

    const menuRef = useRef(null);
    useEffect(() => {
        let menu = menuRef.current;
        const menuExpand = () => {
            menu.style.width = 10 + 'rem';
        }

    },[]);

    // toggler.addEventListener("click",() => {
    //     toggler.classList.toggle("active");
    //     const nav = document.querySelector(".nav");
    //     nav.classList.toggle("open");
    //     if (nav.classList.contains("open")) {
    //         nav.style.maxHeight = nav.scrollHeight + "px";
    //     } else {
    //         nav.removeAttribute("style");
    //     }
    // })

    return (
        <div className='menu' ref={menuRef}>
            <div className='menu__marca'>
                <FaBook className='menu__marcaIcon marginIcon' />
                <h4>AnimaBooks</h4>
            </div>
            <ul className='menu__lista'>
                <li><FaHome className='menuLiIcon marginIcon' /><a href=''>Inicio</a></li>
                <li><BiCategory className='menuLiIcon marginIcon' /><a href=''>Categorias</a></li>
                <li><FiUsers className='menuLiIcon marginIcon' /><a href=''>Sobre nosotros</a></li>
                <li><AiOutlineMessage className='menuLiIcon marginIcon' /><a href=''>Contacto</a></li>
            </ul>
        </div>
    )
}

export default Menu