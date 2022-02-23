import React,{ useState } from 'react'
import '../Styles/ItemCount.scss'

const ItemCount = ({ stock,initial,onAdd }) => {

  const [count,setCount] = useState(initial)
  const [mensaje,setMensaje] = useState('')

  const restarUno = () => {
    if (count > initial) {
      setCount(count - 1)
      setMensaje('')
    } else {
      setMensaje('Lo lamento, no puede seleccionar 0 productos')
    }
  }

  const sumarUno = () => {
    if (count < stock) {
      setCount(count + 1)
      setMensaje('')
    } else {
      setMensaje('Lo lamento, no tenemos mas stock por el momento')
    }
  }


  return (
    <div className='producto'>
      <h4>Remera Nike</h4>
      <div>
        <button className='btnContador' type='text' onClick={restarUno}>-</button>
        <span>{count}</span>
        <button className='btnContador' type='text' onClick={sumarUno}>+</button>
      </div>
      <div className='btnAgregarCarritoContainer'>
        <button className='btnAgregarCarrito' type='text' onClick={() => { onAdd(count) }}>Añadir al carrito</button>
      </div>
      <h2>{mensaje}</h2>
    </div>
  )
}

export default ItemCount