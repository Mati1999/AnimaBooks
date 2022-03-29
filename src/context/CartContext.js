import { createContext,useState,useContext,useEffect } from 'react'
import { toast } from 'react-toastify';
import { useUserContext } from './UserContext';
import { addDoc,getDoc,getDocs,getFirestore,query,where,documentId,writeBatch,collection,doc } from 'firebase/firestore';


const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);
function CartContextPrvovider({ children }) {
    const [cartList,setCartList] = useState([]);
    const [cantidad,setCantidad] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [emptyCart,setEmptyCart] = useState(true);
    const [userOrders,setUserOrders] = useState([]);
    const [orderId,setOrderId] = useState('');


    const { user,cart } = useUserContext()

    const db = getFirestore();

    useEffect(() => {
        if (cart.length >= 1) {
            setCartList(cart);
            let cantidad = cart.reduce((total,item) => total + item.cantidad,0);
            setCantidad(cantidad);
            setTotalPrice(cart.reduce((acc,item) => acc + (item.price * item.cantidad),0));
            setEmptyCart(false);
        } else {
            setCartList([]);
            setCantidad(0);
            setTotalPrice(0);
            setEmptyCart(true);
        }
    },[cart]);

    const addItem = async (item) => {
        setCartList([...cartList,item])
        setEmptyCart(false);
        const queryDb = doc(db,'usuarios',user.uid);
        const batch = writeBatch(db)
        batch.update(queryDb,{ 'cart': [...cartList,item] });
        batch.commit();
    }

    const clear = () => {
        setCartList([]);
        setEmptyCart(true);
        setCantidad(0);
        getTotalPrice(0)
        const queryDb = doc(db,'usuarios',user.uid);
        const batch = writeBatch(db)
        batch.update(queryDb,{ 'cart': [] });
        batch.commit();
    }

    const clearCartStatus = () => {
        setCartList([]);
        setEmptyCart(true);
        setCantidad(0);
        getTotalPrice(0)
    }

    const clearWithoutEmptyCart = () => {
        setCartList([]);
        setCantidad(0);
        getTotalPrice(0)
        const queryDb = doc(db,'usuarios',user.uid);
        const batch = writeBatch(db)
        batch.update(queryDb,{ 'cart': [] });
        batch.commit();
    }

    const removeItem = (item) => {
        setCartList(cartList.filter(manga => manga.id !== item.id));
        setCantidad(cantidad - item.cantidad);
        precioTotal = totalPrice - (item.price * item.cantidad);
        getTotalPrice(precioTotal)
        const queryDb = doc(db,'usuarios',user.uid);
        const batch = writeBatch(db)
        batch.update(queryDb,{ 'cart': cartList.filter(manga => manga.id !== item.id) });
        batch.commit();
        if (cartList.length === 1) {
            setEmptyCart(true)
        }
    }

    const isInCart = (item) => {
        return cartList.find(manga => manga.id === item.id) === undefined;
    }

    const getCantidad = (cant) => {
        setCantidad(cantidad + cant);
    }

    const getTotalPrice = (price) => {
        setTotalPrice(price);
    }

    let stockSobrante = 0;
    const isStock = (prod,cant) => {

        let manga = cartList.find(manga => manga.id === prod.id);

        stockSobrante = (manga.stock - manga.cantidad);

        if (stockSobrante < cant) {
            return false;
        } else {
            return true;
        }
    }

    let precioTotal = 0;
    const onAddExtraFunctions = (cant,itemDetail) => {
        addItemNotification(cant,itemDetail.title);
        getCantidad(cant);
        precioTotal = totalPrice + (itemDetail.price * cant);
        getTotalPrice(precioTotal)
    }

    const addItemNotification = (count,nombre) => {
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

    const noMoreStockNotification = () => {
        toast.info('Lo lamento, la cantidad que quiere agregar supera al stock disponible',{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: '#5a004e',
                color: 'white'
            }
        })
    }

    //Función que me ejecuta la funcíon isInCart y luego agrega un producto al carrito o le aumenta la cantidad. Luego setea la variable addOnCart para verificar si se añadió un producto y también envía los datos del nombre y cantidad a la función de la notificación (addItemToCart) que se reproduce cuando agregamos un producto al carrito.

    const itemAdd = (cant,itemDetail) => {
        if (isInCart(itemDetail)) {
            addItem({ ...itemDetail,cantidad: cant })
            onAddExtraFunctions(cant,itemDetail);
        } else {
            if (isStock(itemDetail,cant)) {
                cartList.find(item => item.id === itemDetail.id).cantidad += cant;
                onAddExtraFunctions(cant,itemDetail);
                setCartList([...cartList]);
                const queryDb = doc(db,'usuarios',user.uid);
                const batch = writeBatch(db)
                batch.update(queryDb,{ 'cart': [...cartList] });
                batch.commit();
            } else noMoreStockNotification();
        }
    }

    const buyCart = async (e) => {
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

        const batch = writeBatch(db)
        const queryDb = doc(db,'usuarios',user.uid);
        getDoc(queryDb)
            .then(res => batch.update(queryDb,{ 'orders': [...res.data().orders,order] }))


        const queryMangasCollection = collection(db,'mangas')
        const queryActulizarStock = await query(queryMangasCollection,
            where(documentId(),'in',cartList.map(item => item.id)))
        await getDocs(queryActulizarStock)
            .then(resp => resp.docs.forEach(res => batch.update(res.ref,
                {
                    stock: res.data().stock - cartList.find(item => item.id === res.id).cantidad
                }
            )))
        batch.commit()

    }



    return (
        <CartContext.Provider value={{
            cartList,
            addItem,
            cantidad,
            totalPrice,
            emptyCart,
            orderId,
            clear,
            isInCart,
            removeItem,
            itemAdd,
            buyCart,
            clearCartStatus,
            clearWithoutEmptyCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextPrvovider;