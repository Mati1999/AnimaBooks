import '../Styles/ItemListContainer.scss'
import React,{ useState,useEffect } from 'react'
import Titulo from './Titulo';
import ItemList from './ItemList';
import { getMangas } from '../helpers/getMangas';
import Loader from './Loader';
import { Link } from 'react-router-dom';


const ItemListContainer = () => {
    const [mangas,setmangas] = useState([]);
    const [loading,setloading] = useState(true);


    useEffect(() => {
        //lógica para traer mangas
        getMangas.then((res) => {
            setmangas(res)

        }).catch(err => { console.log(err); })
            .finally(() => setloading(false))
    },[]);

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
                    <Titulo contenido='Inicio' />
                    <ItemList mangas={mangas} />
                </div>
            }

        </div>
    )
}

export default ItemListContainer