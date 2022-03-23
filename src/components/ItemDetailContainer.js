import React,{ useEffect,useState } from 'react'
import ItemDetail from './ItemDetail'
import '../Styles/ItemDetailContainer.scss'
import Titulo from './Titulo';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { doc,getDoc,getFirestore } from 'firebase/firestore';

const ItemDetailContainer = () => {
    const [mangaDetail,setmangaDetail] = useState([]);
    const [loading,setloading] = useState(true);


    const { detalleId } = useParams()

    useEffect(() => {
        const db = getFirestore();
        const queryDb = doc(db,'mangas',detalleId);
        getDoc(queryDb)
            .then(res => setmangaDetail({ id: res.id,...res.data() }))
            .catch(err => { console.log(err); })
            .finally(() => setloading(false))
    },[detalleId]);

    return (

        <div className='ItemDetailContainer'>

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
        </div>



    )
}

export default ItemDetailContainer