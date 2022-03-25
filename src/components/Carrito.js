import React,{ useState } from 'react'
import { useCartContext } from '../context/CartContext';
import { collection,getFirestore,addDoc,doc,updateDoc,query,where,documentId,writeBatch,getDocs } from 'firebase/firestore';
import '../Styles/Carrito.scss';
import Button from './Button';

const Carrito = () => {
    const [comprado,setComprado] = useState(false);
    const [orderId,setOrderId] = useState('');
    const { cartList,totalPrice,emptyCart,clear,removeItem } = useCartContext();

    const changeSetComprado = () => {
        setTimeout(() => {
            setComprado(true);
        },4000);
    }

    const buyCart = (e) => {
        e.preventDefault();

        let userName = e.target.userName.value;
        let userEmail = e.target.userEmail.value;
        let userPhone = e.target.userPhone.value;

        let order = {
            buyer: {
                name: userName,
                phone: userPhone,
                email: userEmail
            },
            items:
                cartList.map(item => (
                    { id: item.id,title: item.title,price: (item.price * item.cantidad) }
                ))
            ,
            date: new Date().toLocaleDateString()
            ,
            total: totalPrice
        }

        const db = getFirestore();

        // PARA CREAR UN NUEVO REGISTRO EN LA COLECCION ORDERS, SI NO ESTÁ CREADA LA COLECCION ORDERS, SE CREA Y SE INGRESA ESE REGISTRO

        const queryCollection = collection(db,'orders');
        addDoc(queryCollection,order)
            .then(res => setOrderId(res.id))
            .catch(err => console.log(err))
            .finally(console.log('terminado'));


        //  Update
        // const queryUpdate = doc(db,'orders','EiJG5TpiibiYFIr418Re');
        // updateDoc(queryUpdate,{
        //     buyer: {
        //         name: 'Matias Aguiera',
        //         phone: '+54 9 11 5555-5555',
        //         email: 'jaja@gmail.com'
        //     }
        // })


        //Opcional para actualizar la cantidad de un stock cuando se hace la compra

        // const queryCollection = collection(db,'mangas');
        // const queryActualizarStock = await query(
        //     queryCollection,
        //     where(documentId(),'in',cartList.map(item => item.id))
        // );

        // const batch = writeBatch(db)

        // await getDocs(queryActualizarStock)
        //     .then(resp => resp.docs.forEach(res => batch.update(res.ref,
        //         {
        //             stock: res.data().stock - cartList.find(item => item.id === res.id).cantidad
        //         }
        //     )))
        // batch.commit();

    }

    return (

        <>
            {emptyCart
                ?
                <div className='noItemsInCart'>
                    <h2> No hay Items en el carrito</h2>

                    <Button clase={"goToCartButton"} content={'Ir al catálogo'} event={() => { '' }} goTo={'/'} />
                </div>
                :
                <div className='carrito'>
                    <h2>Carrito de compras</h2>
                    <div className='carritoDetalle'>
                        <div className='carritoProductos'>
                            {cartList.map((item) =>
                                <li className='carritoProducto' key={item.id}>
                                    <div className='productoImgCont'>
                                        <img src={item.picture} alt="" />
                                    </div>
                                    <div className='productoDetalle'>
                                        <h3>{item.title}</h3>
                                        <p>Cantidad: {item.cantidad} </p>
                                        <span>$ {item.price * item.cantidad}</span>
                                    </div>
                                    <button type='text' onClick={() => { removeItem(item) }}>Eliminar</button>
                                </li>
                            )}
                        </div>
                        {!comprado
                            ?
                            <div className='carritoDetalleGral'>
                                <span>Precio total: $ {totalPrice}</span>
                                <form onSubmit={buyCart} className='buyCartForm'>
                                    <input id='userName' type='text' placeholder='Ingrese su nombre' />
                                    <input id='userPhone' type='text' placeholder='Ingrese su teléfono' />
                                    <input id='userEmail' type='text' placeholder='Ingrese su email' />
                                    <button type='submit' onClick={() => changeSetComprado()}>Comprar productos</button>
                                </form>
                            </div>
                            :
                            <div className='carritoDetalleGral'>
                                <div>
                                    <h3>Muchas gracias por adquirir nuestros productos</h3>
                                    <p>{`Este es código único para tu compra: 
                                    ${orderId}`}</p>
                                </div>
                            </div>
                        }
                    </div>
                    <button className='btnVaciarCarrito' onClick={() => { clear() }}>Vaciar carrito</button>
                </div>
            }
        </>
    )
}

export default Carrito