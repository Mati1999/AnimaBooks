import React from 'react'
import '../Styles/Item.scss'
import ItemCount from './ItemCount';

const Item = ({ id,title,genero,price,picture,stock }) => {
    console.log(id);

    //función onAdd para contador
    const onAdd = (cantidad) => {
        console.log(cantidad);
    }

    return (
        <div className='item'>
            <img src={picture} alt="" />
            <h2>{title}</h2>
            <p>{genero}</p>
            <span>${price}</span>
            <ItemCount stock={stock} initial={1} onAdd={onAdd} />
        </div>
    )
}

export default Item