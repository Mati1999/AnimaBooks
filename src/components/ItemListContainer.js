import '../Styles/ItemListContainer.scss'
import React,{ useState,useEffect } from 'react'
import Titulo from './Titulo';
import ItemList from './ItemList';
import { getMangas } from '../helpers/getMangas';


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
            <Titulo contenido='Inicio' />

            {/* Pregunto si está gargando, si lo está muestro un mensaje de cargando, si no lo está, muestro los productos */}
            {loading
                ?
                <h1>Cargando...</h1>
                :
                <ItemList mangas={mangas} />
            }
        </div>
    )
}

export default ItemListContainer