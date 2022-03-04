import React from 'react'
import '../Styles/Item.scss'
import ItemCount from './ItemCount';

const Item = ({ id,title,genero,price,picture }) => {


    return (
        <div className='item'>
            <img src={picture} alt="" />
            <h2>{title}</h2>
            <p>{genero}</p>
            <span>${price}</span>
        </div>
    )
}

export default Item