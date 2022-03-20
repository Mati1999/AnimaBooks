import React,{ useState } from 'react'
import { useCartContext } from '../context/CartContext';
import '../Styles/ItemDetail.scss'
import Button from './Button';
import ItemCount from './ItemCount';

const ItemDetail = ({ itemDetail }) => {
    const [addOnCart,setAddOnCart] = useState(false);

    const { itemAdd } = useCartContext()

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
                    <ItemCount stock={itemDetail.stock} addOnCart={setAddOnCart} initial={1} prodInfo={itemDetail} itemAdd={itemAdd} />
                    :
                    <Button clase={"goToCartButton"} content={'Ir al carrito'} event={() => { '' }} goTo={'/cart'} />
                }
            </div>
        </div>
    )
}

export default ItemDetail