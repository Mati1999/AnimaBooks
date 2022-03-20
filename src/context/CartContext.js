import { createContext,useState,useContext } from 'react'
import { toast } from 'react-toastify';


const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

function CartContextPrvovider({ children }) {
    const [cartList,setCartList] = useState([]);
    const [cantidad,setCantidad] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [emptyCart,setEmptyCart] = useState(true);

    const addItem = (item) => {
        setCartList([...cartList,item])
        setEmptyCart(false);
    }

    const clear = () => {
        setCartList([]);
        setEmptyCart(true);
        setCantidad(0);
        getTotalPrice(0)
    }

    const removeItem = (item) => {
        setCartList(cartList.filter(manga => manga.id !== item.id));
        setCantidad(cantidad - item.cantidad);
        precioTotal = totalPrice - (item.price * item.cantidad);
        getTotalPrice(precioTotal)
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
        console.log(manga);

        stockSobrante = (manga.stock - manga.cantidad);
        console.log(`Stock sobrante: ${stockSobrante}`);

        if (stockSobrante < cant) {
            console.log('cant mayor al stock');
            return false;
        } else {
            console.log('cant menor al stock');
            return true;
        }
    }

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

    let precioTotal = 0;
    const itemAdd = (cant,itemDetail) => {
        if (isInCart(itemDetail)) {
            addItem({ ...itemDetail,cantidad: cant })
            onAddExtraFunctions(cant,itemDetail);
        } else {
            if (isStock(itemDetail,cant)) {
                cartList.find(item => item.id === itemDetail.id).cantidad += cant;
                onAddExtraFunctions(cant,itemDetail);
                setCartList([...cartList]);
            } else noMoreStockNotification();
        }
    }

    return (
        <CartContext.Provider value={{
            cartList,
            addItem,
            cantidad,
            totalPrice,
            emptyCart,
            clear,
            isInCart,
            removeItem,
            itemAdd
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextPrvovider;