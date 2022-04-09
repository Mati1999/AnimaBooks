import React,{ useState } from 'react'
import { useCartContext } from '../context/CartContext';
import '../Styles/ItemDetail.scss'
import { Link } from 'react-router-dom'
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
                <p className='detailDataGenre'><span>Genero:</span>{itemDetail.genre}</p>
                <span className='detailDataPrice'><span>Precio:</span> ${itemDetail.price}</span>
                {!addOnCart
                    ?
                    <ItemCount stock={itemDetail.stock} addOnCart={setAddOnCart} initial={1} prodInfo={itemDetail} itemAdd={itemAdd} />
                    :
                    <Link className="linkButtons" to='/cart'>
                        <button className="goToCartButton" type='text'>Ir al carrito</button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default ItemDetail