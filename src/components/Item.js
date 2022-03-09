import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Item.scss'
import ItemCount from './ItemCount';

const Item = ({ id,title,genero,price,picture }) => {


    return (
        <div className='item'>
            <Link to={`detalleId/${id}`}>
                <img src={picture} alt="" />
                <h2>{title}</h2>
                <p>{genero}</p>
                <span>${price}</span>
            </Link>
        </div>
    )
}

export default Item