import React from 'react'
import Item from './Item'
import '../Styles/ItemList.scss'

const ItemList = ({ mangas }) => {
    return (
        <div className='itemList'>
            {mangas.map((manga,i) => {
                return (
                    <Item key={i} id={manga.id} title={manga.title} genre={manga.genre} price={manga.price} picture={manga.picture} />
                )
            })}
        </div>
    )
}

export default ItemList