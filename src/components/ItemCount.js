import React,{ useState } from 'react'
import '../Styles/ItemCount.scss'
import { toast } from 'react-toastify';
import Button from './Button';

const ItemCount = ({ stock,initial,nombre,itemAdd }) => {

  const [count,setCount] = useState(initial)

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
        <Button clase={"btnAgregarCarrito"} content={'Agregar al carrito'} event={() => { itemAdd(count,nombre) }} goTo={''} />
      </div>
    </div>
  )
}

export default ItemCount