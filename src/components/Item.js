import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Item.scss'
import ItemCount from './ItemCount';

const Item = ({ id,title,genero,price,picture }) => {


    return (
        <Link className='item' to={`/item/${id}`}>
            <img src={picture} alt="" />
            <div >
                <h2>{title}</h2>
                <p>{genero}</p>
                <span>${price}</span>
            </div>
        </Link>
    )
}

export default Item