import { createContext,useState,useContext } from 'react'


const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

function CartContextPrvovider({ children }) {
    const [cartList,setCartList] = useState([]);

    const addItem = (item) => {
        setCartList([...cartList,item])
    }

    const clear = () => {
        setCartList([]);
    }

    const removerItem = (item) => {
        setCartList(cartList.filter(manga => manga.id !== item))
    }

    const isInCart = (item) => {
        return cartList.find(manga => manga.id === item.id) === undefined;
    }

    return (
        <CartContext.Provider value={{
            cartList,
            addItem,
            clear,
            isInCart,
            removerItem
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextPrvovider;