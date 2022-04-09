import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Item.scss'

const Item = ({ id,title,genre,price,picture }) => {


    return (
        <Link className='item' to={`/item/${id}`}>
            <img src={picture} alt="" />
            <div >
                <h2>{title}</h2>
                <p>{genre}</p>
                <span>${price}</span>
            </div>
        </Link>
    )
}

export default Item