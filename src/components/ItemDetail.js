import React,{ useState } from 'react'
import '../Styles/ItemDetail.scss'
import Button from './Button';
import ItemCount from './ItemCount';

const ItemDetail = ({ itemDetail }) => {
    const [addOnCart,setAddOnCart] = useState(false);


    // Cambiar estado de boton de agregar al carrito


    return (
        <div className='itemDetail'>
            <div className='detailImgContainer'>
                <img src={itemDetail.picture} alt="" />
            </div>
            <div className='detailDataContainer'>
                <h2 className='detailDataTitle'>{itemDetail.title}</h2>
                <p className='detailDataGenero'><span>Genero:</span>{itemDetail.genero}</p>
                <span className='detailDataPrecio'><span>Precio:</span> ${itemDetail.price}</span>
                {!addOnCart
                    ?
                    <ItemCount stock={itemDetail.stock} initial={1} nombre={itemDetail.title} setAddOnCart={setAddOnCart} />
                    :
                    <Button clase={"goToCartButton"} content={'Ir al carrito'} event={() => { '' }} goTo={'/cart'} />

                }
            </div>
        </div>
    )
}

export default ItemDetail