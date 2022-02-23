import '../Styles/ItemListContainer.scss'
import React from 'react'
import Titulo from './Titulo';
import ItemCount from './ItemCount';


const ItemListContainer = () => {

    const onAdd = (cantidad) => {
        console.log(cantidad);
    }

    return (
        <div className='listContainer'>
            <Titulo contenido='Inicio' />

            <ItemCount stock={5} initial={1} onAdd={onAdd} />
        </div>
    )
}

export default ItemListContainer