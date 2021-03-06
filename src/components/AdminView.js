import { collection,getDocs,getFirestore,updateDoc,doc,query,where,documentId,writeBatch,deleteDoc,getDoc,addDoc } from 'firebase/firestore';
import React,{ useEffect,useState } from 'react'
import '../Styles/adminView.scss'
import { getDownloadURL,getStorage,uploadBytes } from "firebase/storage";
import { ref } from 'firebase/storage';


const AdminView = () => {
    const [mangasAdmin,setMangasAdmin] = useState([]);
    const [edit,setEdit] = useState(false);
    const [DbEdited,setDbEdited] = useState(false);
    const [newDb,setNewDb] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const queryCollection = collection(db,'mangas');
        getDocs(queryCollection)
            .then(res => setMangasAdmin(res.docs.map(item => ({ id: item.id,...item.data() }))))
    },[]);

    const editingInputs = (e) => {
        let inputId = e.target.id;
        let inputValue = e.target.value;
        let inputLiId = e.target.parentNode.parentNode.id;
        if (DbEdited) {
            setNewDb(newDb.map(item => (item.id === inputLiId ? { ...item,[inputId]: Number(inputValue) } : item)))
        } else {
            setNewDb(mangasAdmin.map(item => (item.id === inputLiId ? { ...item,[inputId]: Number(inputValue) } : item)))
            setDbEdited(true)
        }

        return newDb;
    }

    const editDb = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        const queryCollection = collection(db,'mangas');
        const queryUpdateStock = await query(
            queryCollection,
            where(documentId(),'in',newDb.map(item => item.id))
        );
        const batch = writeBatch(db)
        await getDocs(queryUpdateStock)
            .then(resp => resp.docs.forEach(res => batch.update(res.ref,
                {
                    price: newDb.find(item => item.id === res.id).price,
                    stock: newDb.find(item => item.id === res.id).stock
                }
            ))).finally(console.log('Edit completado'))
        batch.commit();
        setEdit(false);
        setMangasAdmin(newDb);
    }

    const deleteMangaFromDb = async (itemId) => {
        const db = getFirestore();
        let mangaToDelete = doc(db,'mangas',itemId);
        deleteDoc(mangaToDelete);
        setMangasAdmin(mangasAdmin.filter(item => item.id !== itemId));
    }

    const createNewManga = async (e) => {
        let newMangaTitle = e.target.parentNode.children.title.value;
        let newMangaPrice = e.target.parentNode.children.price.value;
        let newMangaStock = e.target.parentNode.children.stock.value;
        let newMangaGenre = e.target.parentNode.children.genre.value;
        let newMangaPictureFile = e.target.parentNode.children.img.files[0];
        let newMangaPicture = e.target.parentNode.children.img.files[0].name;

        // USO DEL STORAGE
        let newMangaPictureUrl = '';
        const storage = getStorage();
        const storageRef = ref(storage,newMangaPicture);
        await uploadBytes(storageRef,newMangaPictureFile)
        await getDownloadURL(storageRef)
            .then(url => newMangaPictureUrl = url)

        let newManga = {
            title: newMangaTitle,
            price: newMangaPrice,
            stock: newMangaStock,
            genre: newMangaGenre,
            picture: newMangaPictureUrl
        }
        const db = getFirestore();
        const queryCollection = collection(db,'mangas');
        addDoc(queryCollection,newManga)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => console.log('Manga creado'))
        setEdit(false);
        setMangasAdmin([...mangasAdmin,newManga]);
    }

    return (
        <div className='adminView'>

            <h1>Perfil del administrador</h1>
            <h2>Configuraci??n de productos en la base de datos</h2>
            <form onSubmit={editDb} className='adminViewProducts'>
                {
                    mangasAdmin.map(item =>
                        !edit ?
                            <li id={item.id} key={item.id}>
                                <h5>Nombre: {item.title}</h5>
                                <h6>Genero: {item.genre}</h6>
                                <p>Stock disponible: {item.stock}</p>
                                <span>Precio: $ {item.price}</span>
                                <button type='text' onClick={() => deleteMangaFromDb(item.id)}>Eliminar</button>
                            </li>
                            :
                            <li id={item.id} key={item.id}>
                                <h5>Nombre: {item.title}</h5>
                                <h6>Genero: {item.genre}</h6>
                                <p>Stock disponible: <input id='stock' type="number" placeholder={item.stock} onChange={editingInputs} /></p>
                                <span>Precio: $ <input id='price' type="number" placeholder={item.price} onChange={editingInputs} /></span>
                                <button type='text' onClick={() => deleteMangaFromDb(item.id)}>Eliminar</button>
                            </li>
                    )
                }
                {
                    edit ?
                        <div className='createNewMangaInDb'>
                            <h3>Crear nuevo producto</h3>
                            <li>
                                <input id='img' type="file" />
                                <input id='title' type="text" placeholder='Nombre' />
                                <input id='genre' type="text" placeholder='Genero' />
                                <input id='stock' type="number" placeholder='Stock' />
                                <input id='price' type="number" placeholder='Precio' />
                                <button type='text' onClick={createNewManga}>Crear nuevo producto</button>
                            </li>
                        </div>
                        :
                        ''
                }
                {!edit ?
                    <button className='editDB' type='text' onClick={() => setEdit(true)}>Editar base de datos</button>
                    :
                    <div className='addCancelChanges'>
                        <button type='submit'>Aplicar cambios</button>
                        <button type='text' onClick={() => {
                            setEdit(false)
                            setDbEdited(false)
                        }
                        }>Cancelar</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default AdminView