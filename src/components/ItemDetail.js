import React from 'react'
import '../Styles/ItemDetail.scss'
import ItemCount from './ItemCount';

const ItemDetail = ({ itemDetail }) => {

    return (
        <div className='itemDetail'>
            <div className='detailImgContainer'>
                <img src={itemDetail.picture} alt="" />
            </div>
            <div className='detailDataContainer'>
                <h2 className='detailDataTitle'>{itemDetail.title}</h2>
                <p className='detailDataGenero'><span>Genero:</span>{itemDetail.genero}</p>
                <span className='detailDataPrecio'><span>Precio:</span> ${itemDetail.price}</span>
                <ItemCount stock={itemDetail.stock} initial={1} nombre={itemDetail.title} />
            </div>
        </div>
    )
}

export default ItemDetail