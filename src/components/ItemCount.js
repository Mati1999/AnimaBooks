import React,{ useState } from 'react'
import '../Styles/ItemCount.scss'
import { toast } from 'react-toastify';
import Button from './Button';
import { useUserContext } from '../context/UserContext';

const ItemCount = ({ stock,initial,addOnCart,prodInfo,itemAdd }) => {

  const [count,setCount] = useState(initial)
  const { user } = useUserContext();

  const noStock = () => {
    toast.info('Lo lamento, no tenemos mas stock por el momento',{
      position: "top-right",
      autoClose: 2500,
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
  const cantBeCero = () => {
    toast.info('Lo lamento, no puede seleccionar 0 productos',{
      position: "top-right",
      autoClose: 2500,
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

  const logInToAddItem = () => {
    toast.info('Debes iniciar sesión o registrarte para añadir productos al carrito.',{
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

  const restarUno = () => {
    if (count > initial) setCount(count - 1)
    else cantBeCero();
  }

  const sumarUno = () => {
    if (count < stock) setCount(count + 1)
    else noStock()
  }

  return (
    <div className='contador'>
      <div className='btnContadorContainer'>
        <button className='btnContador' type='text' onClick={restarUno}>-</button>
        <span>{count}</span>
        <button className='btnContador' type='text' onClick={sumarUno}>+</button>
      </div>
      <div className='btnAgregarCarritoContainer'>
        <Button clase={"btnAgregarCarrito"} type={'text'} content={'Agregar al carrito'} event={() => {
          if (user) {
            itemAdd(count,prodInfo)
            addOnCart(true);
          } else {
            logInToAddItem()
          }
        }} goTo={''} />
      </div>
    </div>
  )
}

export default ItemCount