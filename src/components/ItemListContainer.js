import '../Styles/ItemListContainer.scss'
import React,{ useState,useEffect } from 'react'
import Title from './Title';
import ItemList from './ItemList';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { collection,getDocs,getFirestore,query,where } from 'firebase/firestore';



const ItemListContainer = () => {
    const [mangas,setmangas] = useState([]);
    const [loading,setloading] = useState(true);

    const { categoryId } = useParams()


    useEffect(() => {
        const db = getFirestore();
        const queryCollection = collection(db,'mangas');

        const getQueryDocs = (query) => {
            getDocs(query)
                .then(res => setmangas(res.docs.map(item => ({ id: item.id,...item.data() }))))
                .catch(err => console.log(err))
                .finally(() => setloading(false))
        }

        if (categoryId) {
            // lógica para traer la categoria de mangas
            const queryFilter = query(queryCollection,where('genre','==',categoryId));
            getQueryDocs(queryFilter)
        } else {
            // lógica para traer mangas
            getQueryDocs(queryCollection)
        }
    },[categoryId]);

    return (
        <div className='listContainer'>

            {/* Pregunto si está gargando, si lo está muestro un mensaje de cargando, si no lo está, muestro los productos */}
            {loading
                ?
                <div className='itemListContainerLoader'>
                    <Title contenido='Descargando contenido' />
                    <Loader />
                </div>
                :
                <div className='listContainerContent'>
                    <Title contenido={categoryId ? categoryId : 'Catálogo'} />
                    <ItemList mangas={mangas} />
                </div>
            }

        </div>
    )
}

export default ItemListContainer