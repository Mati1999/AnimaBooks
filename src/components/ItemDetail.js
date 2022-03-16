import React,{ useState } from 'react'
import '../Styles/ItemDetail.scss'
import Button from './Button';
import ItemCount from './ItemCount';
import { toast } from 'react-toastify';
import { useCartContext } from '../context/CartContext';

const ItemDetail = ({ itemDetail }) => {
    const [addOnCart,setAddOnCart] = useState(false);

    const { addItem,cartList,isInCart } = useCartContext()

    const addItemToCart = (count,nombre) => {
        toast.success(`Se ha agregado ${count} mangas de ${nombre} al carrito`,{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: 'white',
                color: 'black'
            }
        })
    }

    const itemAdd = (cant,nombre) => {
        isInCart(itemDetail) ?
            addItem({ ...itemDetail,cantidad: cant })
            :
            cartList.find(item => item.id === itemDetail.id).cantidad += cant
            ;
        setAddOnCart(true);
        addItemToCart(cant,nombre);
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
                {!addOnCart
                    ?
                    <ItemCount stock={itemDetail.stock} initial={1} nombre={itemDetail.title} itemAdd={itemAdd} />
                    :
                    <Button clase={"goToCartButton"} content={'Ir al carrito'} event={() => { '' }} goTo={'/cart'} />
                }
            </div>
        </div>
    )
}

export default ItemDetail