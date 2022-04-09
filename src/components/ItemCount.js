import React,{ useState } from 'react'
import '../Styles/ItemCount.scss'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
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
        background: '#2B494B',
        color: '#fdfffa'
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
        background: '#2B494B',
        color: '#fdfffa'
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
        background: '#2B494B',
        color: '#fdfffa'
      }
    })
  }

  const minusOne = () => {
    if (count > initial) setCount(count - 1)
    else cantBeCero();
  }

  const plusOne = () => {
    if (count < stock) setCount(count + 1)
    else noStock()
  }

  return (
    <div className='counter'>
      <div className='btnCounterContainer'>
        <button className='btnCounter' type='text' onClick={minusOne}>-</button>
        <span>{count}</span>
        <button className='btnCounter' type='text' onClick={plusOne}>+</button>
      </div>
      <div className='btnAddCounterContainer'>
        <Link className="linkButtons" to=''>
          <button className="btnAddCart" type='text' onClick={() => {
            if (user) {
              itemAdd(count,prodInfo)
              addOnCart(true);
            } else {
              logInToAddItem()
            }
          }}>Agregar al carrito</button>
        </Link>
      </div>
    </div >
  )
}

export default ItemCount