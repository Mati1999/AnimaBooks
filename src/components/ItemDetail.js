import React from 'react'
import '../Styles/ItemDetail.scss'
import ItemCount from './ItemCount';

const ItemDetail = ({ itemDetail }) => {

    //función onAdd para contador
    const onAdd = (cantidad) => {
        console.log(cantidad);
    }

    return (
        <div className='itemDetail'>
            <div className='detailImgContainer'>
                <img src={itemDetail.picture} alt="" />
            </div>
            <div className='detailDataContainer'>
                <h2 className='detailDataTitle'>{itemDetail.title}</h2>
                <p className='detailDataGenero'><span>Genero:</span>{itemDetail.genero}</p>
                <span className='detailDataPrecio'><span>Precio:</span> ${itemDetail.price}</span>
                <ItemCount stock={itemDetail.stock} initial={1} onAdd={onAdd} />
            </div>
        </div>
    )
}

export default ItemDetail