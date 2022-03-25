import '../Styles/ItemListContainer.scss'
import React,{ useState,useEffect } from 'react'
import Titulo from './Titulo';
import ItemList from './ItemList';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { collection,getDocs,getFirestore,query,where } from 'firebase/firestore';



const ItemListContainer = () => {
    const [mangas,setmangas] = useState([]);
    const [loading,setloading] = useState(true);

    const { categoriaId } = useParams()


    useEffect(() => {
        const db = getFirestore();
        const queryCollection = collection(db,'mangas');
        if (categoriaId) {
            // lógica para traer la categoria de mangas
            const queryFilter = query(queryCollection,where('genero','==',categoriaId));
            getDocs(queryFilter)
                .then(res => setmangas(res.docs.map(item => ({ id: item.id,...item.data() }))))
                .catch(err => console.log(err))
                .finally(() => setloading(false))
        } else {
            // lógica para traer mangas
            getDocs(queryCollection)
                .then(res => setmangas(res.docs.map(item => ({ id: item.id,...item.data() }))))
                .catch(err => console.log(err))
                .finally(() => setloading(false))
        }
    },[categoriaId]);

    return (
        <div className='listContainer'>

            {/* Pregunto si está gargando, si lo está muestro un mensaje de cargando, si no lo está, muestro los productos */}
            {loading
                ?
                <div className='itemListContainerLoader'>
                    <Titulo contenido='Descargando contenido' />
                    <Loader />
                </div>
                :
                <div className='listContainerContent'>
                    <Titulo contenido={categoriaId ? categoriaId : 'Inicio'} />
                    <ItemList mangas={mangas} />
                </div>
            }

        </div>
    )
}

export default ItemListContainer