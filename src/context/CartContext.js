import { createContext,useState,useContext,useEffect } from 'react'
import { toast } from 'react-toastify';
import { useUserContext } from './UserContext';
import { addDoc,getDoc,getDocs,getFirestore,query,where,documentId,writeBatch,collection,doc } from 'firebase/firestore';


const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);
function CartContextPrvovider({ children }) {
    const [cartList,setCartList] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [emptyCart,setEmptyCart] = useState(true);
    const [orderId,setOrderId] = useState('');


    const { user,cart } = useUserContext()

    const db = getFirestore();

    useEffect(() => {
        if (cart.length >= 1) {
            setCartList(cart);
            let quantity = cart.reduce((total,item) => total + item.quantity,0);
            setQuantity(quantity);
            setTotalPrice(cart.reduce((acc,item) => acc + (item.price * item.quantity),0));
            setEmptyCart(false);
        } else {
            setCartList([]);
            setQuantity(0);
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
        setQuantity(0);
        getTotalPrice(0)
        const queryDb = doc(db,'usuarios',user.uid);
        const batch = writeBatch(db)
        batch.update(queryDb,{ 'cart': [] });
        batch.commit();
    }

    const clearCartStatus = () => {
        setCartList([]);
        setEmptyCart(true);
        setQuantity(0);
        getTotalPrice(0)
    }

    const clearWithoutEmptyCart = () => {
        setCartList([]);
        setQuantity(0);
        getTotalPrice(0)
        const queryDb = doc(db,'usuarios',user.uid);
        const batch = writeBatch(db)
        batch.update(queryDb,{ 'cart': [] });
        batch.commit();
        setTimeout(() => {
            setEmptyCart(true);
        },20000);
    }

    const removeItem = (item) => {
        setCartList(cartList.filter(manga => manga.id !== item.id));
        setQuantity(quantity - item.quantity);
        precioTotal = totalPrice - (item.price * item.quantity);
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
        setQuantity(quantity + cant);
    }

    const getTotalPrice = (price) => {
        setTotalPrice(price);
    }

    let stockSobrante = 0;
    const isStockInCart = (prod,cant) => {
        let manga = cartList.find(manga => manga.id === prod.id);

        stockSobrante = (manga.stock - manga.quantity);

        if (stockSobrante < cant) {
            return false;
        } else {
            return true;
        }
    }

    const isStockInDb = async (prod,cant) => {
        const db = getFirestore();
        const queryDb = doc(db,'mangas',prod.id);
        const prodStock = await getDoc(queryDb);
        const stockInDb = prodStock.data().stock;
        // if (stockinDb < cant) {
        //     return false;
        // } else {
        //     return true;
        // }
        return stockInDb
    }

    let precioTotal = 0;
    const onAddExtraFunctions = (cant,itemDetail) => {
        addItemNotification(cant,itemDetail.title);
        getCantidad(cant);
        precioTotal = totalPrice + (itemDetail.price * cant);
        getTotalPrice(precioTotal)
    }

    const addItemNotification = (count,nombre) => {
        toast.success(`Se ${count === 1 ? 'ha' : 'han'} agregado ${count} ${count === 1 ? 'manga' : 'mangas'} de ${nombre} al carrito`,{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: '#fdfffa',
                color: '#2B494B'
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
                background: '#2B494B',
                color: '#fdfffa'
            }
        })
    }

    //Funci??n que me ejecuta la func??on isInCart y luego agrega un producto al carrito o le aumenta la quantity. Luego setea la variable addOnCart para verificar si se a??adi?? un producto y tambi??n env??a los datos del nombre y quantity a la funci??n de la notificaci??n (addItemToCart) que se reproduce cuando agregamos un producto al carrito.

    const itemAdd = async (cant,itemDetail) => {
        if (isInCart(itemDetail)) {

            if (await isStockInDb(itemDetail,cant) < cant) noMoreStockNotification()
            else {
                addItem({ ...itemDetail,quantity: cant })
                onAddExtraFunctions(cant,itemDetail);
            }
        } else {
            if (isStockInCart(itemDetail,cant)) {
                cartList.find(item => item.id === itemDetail.id).quantity += cant;
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

        let userName = e.target.name.value;
        let userEmail = e.target.email.value;
        let userPhone = e.target.phone.value;

        let order = {
            buyer: {
                name: userName,
                phone: userPhone,
                email: userEmail
            },
            items:
                cartList.map(item => (
                    { id: item.id,title: item.title,amount: item.quantity,price: (item.price * item.quantity),image: item.picture }
                ))
            ,
            date: new Date().toLocaleDateString()
            ,
            total: totalPrice
        }
        const db = getFirestore();
        // PARA CREAR UN NUEVO REGISTRO EN LA COLECCION ORDERS, SI NO EST?? CREADA LA COLECCION ORDERS, SE CREA Y SE INGRESA ESE REGISTRO
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
                    stock: res.data().stock - cartList.find(item => item.id === res.id).quantity
                }
            )))
        batch.commit()
    }



    return (
        <CartContext.Provider value={{
            cartList,
            addItem,
            quantity,
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