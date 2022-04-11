import React,{ useEffect,useState } from 'react'
import ItemDetail from './ItemDetail'
import '../Styles/ItemDetailContainer.scss'
import Titulo from './Title';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { doc,getDoc,getFirestore } from 'firebase/firestore';

const ItemDetailContainer = () => {
    const [mangaDetail,setmangaDetail] = useState([]);
    const [loading,setloading] = useState(true);

    const { detailId } = useParams()

    useEffect(() => {
        const db = getFirestore();
        const queryDb = doc(db,'mangas',detailId);
        getDoc(queryDb)
            .then(res => setmangaDetail({ id: res.id,...res.data() }))
            .catch(err => { console.log(err); })
            .finally(() => setloading(false))
    },[detailId]);

    return (

        <>

            {loading
                ?
                <div className='itemListContainerLoader'>
                    <Titulo contenido='Descargando contenido' />
                    <Loader />
                </div>
                :
                <div className='ItemDetailContainer'>
                    <ItemDetail itemDetail={mangaDetail} />
                </div>
            }
        </>



    )
}

export default ItemDetailContainer