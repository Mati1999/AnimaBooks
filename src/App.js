import './App.scss';
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemDetailContainer from './components/ItemDetailContainer';
import Carrito from './components/Carrito';
import CartContextPrvovider from './context/CartContext';
import User from './components/User';
import UserContextProvider from './context/UserContext';
const App = () => {


  return (
    <UserContextProvider>
      <CartContextPrvovider>
        <BrowserRouter>
          <div className='AppContainer'>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <NavBar />
            <Routes>
              <Route path='/' element={<main className='AppMain'><ItemListContainer /></main>} />
              <Route path='/categoria/:categoriaId' element={<main className='AppMain'><ItemListContainer /></main>} />
              <Route path='/item/:detalleId' element={<main className='AppMain'><ItemDetailContainer /></main>} />
              <Route path='/cart' element={<main className='AppMain'><Carrito /></main>} />
              <Route path='/user' element={<main className='AppMain'><User /></main>} />
              <Route path='/*' element={<Navigate to='/' replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartContextPrvovider>
    </UserContextProvider>

  )
}

export default App