import React from 'react'
import Item from './Item'
import '../Styles/ItemList.scss'

const ItemList = ({ mangas }) => {
    return (
        <div className='itemList'>
            {mangas.map((manga,i) => {
                return (
                    // <Item key={i} id={manga.id} title={manga.attributes.altTitles[0].en == null ? manga.attributes.altTitles[0].ja : manga.attributes.altTitles[0].en} genero={manga.attributes.publicationDemographic} price={manga.attributes.price} picture={manga.attributes.picture} />
                    <Item key={i} id={manga.id} title={manga.title} genero={manga.genero} price={manga.price} picture={manga.picture} />
                )
            })}
        </div>
    )
}

export default ItemList