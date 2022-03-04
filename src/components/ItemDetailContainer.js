import React,{ useEffect,useState } from 'react'
import { getMangaDetail } from '../helpers/getMangas';
import ItemDetail from './ItemDetail'
import '../Styles/ItemDetailContainer.scss'

const ItemDetailContainer = () => {
    const [mangaDetail,setmangaDetail] = useState([]);

    useEffect(() => {
        getMangaDetail
            .then((res) => {
                return (
                    res.find(manga => manga.title === 'Shingeki no Kyojin')
                )
            })
            .then(res => setmangaDetail(res))
    },[]);


    return (

        <div className='ItemDetailContainer'>
            <ItemDetail itemDetail={mangaDetail} />
        </div>
    )
}

export default ItemDetailContainer