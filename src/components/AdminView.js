import { collection,getDocs,getFirestore,updateDoc,doc,query,where,documentId,writeBatch } from 'firebase/firestore';
import React,{ useEffect,useState } from 'react'
import '../Styles/adminView.scss'

const AdminView = () => {

    const [mangasAdmin,setMangasAdmin] = useState([]);
    const [editar,setEditar] = useState(false);
    useEffect(() => {
        const db = getFirestore();
        const queryCollection = collection(db,'mangas');
        getDocs(queryCollection)
            .then(res => setMangasAdmin(res.docs.map(item => ({ id: item.id,...item.data() }))))
    },[]);


    let newDb = [];
    const editantoInputs = (e) => {
        console.log(e.target);
        let inputId = e.target.id;
        let inputValue = e.target.value;
        let inputLiId = e.target.parentNode.parentNode.id;
        newDb = mangasAdmin.map(item => (item.id === inputLiId ? { ...item,[inputId]: Number(inputValue) } : item));

        return newDb;
    }

    const editarDb = async (e) => {
        e.preventDefault();

        const db = getFirestore();
        // const queryUpdate = doc(db,'mangas');
        // updateDoc(queryUpdate,{
        //     title: e.target.title.value,
        // })


        const queryCollection = collection(db,'mangas');
        const queryActualizarStock = await query(
            queryCollection,
            where(documentId(),'in',newDb.map(item => item.id))
        );

        const batch = writeBatch(db)

        await getDocs(queryActualizarStock)
            .then(resp => resp.docs.forEach(res => batch.update(res.ref,
                {
                    price: newDb.find(item => item.id === res.id).price,
                    stock: newDb.find(item => item.id === res.id).stock
                }
            ))).finally(console.log('Edit completado'))
        batch.commit();
        setEditar(false);
        setMangasAdmin(newDb);
    }


    return (
        <div className='adminView'>

            <h1>Perfil del administrador</h1>
            <h2>Configuración de productos en la base de datos</h2>
            <form onSubmit={editarDb} className='adminViewProducts'>
                {
                    mangasAdmin.map(item =>
                        !editar ?
                            <li id={item.id} key={item.id}>
                                <h5>Nombre: {item.title}</h5>
                                <h6>Genero: {item.genero}</h6>
                                <p>Stock disponible: {item.stock}</p>
                                <span>Precio: $ {item.price}</span>
                                <button type='text'>Eliminar</button>
                            </li>
                            :
                            <li id={item.id} key={item.id}>
                                <h5>Nombre: {item.title}</h5>
                                <h6>Genero: {item.genero}</h6>
                                <p>Stock disponible: <input id='stock' type="number" placeholder={item.stock} onChange={editantoInputs} /></p>
                                <span>Precio: $ <input id='price' type="number" placeholder={item.price} onChange={editantoInputs} /></span>
                                <button type='text'>Eliminar</button>
                            </li>
                    )
                }
                {!editar ?
                    <button className='editarDB' type='text' onClick={() => setEditar(true)}>Editar base de datos</button>
                    :
                    <div>
                        <button type='submit'>Aplicar cambios</button>
                        <button type='text' onClick={() => setEditar(false)}>Cancelar</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default AdminView