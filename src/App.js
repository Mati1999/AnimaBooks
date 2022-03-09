import './App.scss';
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemDetailContainer from './components/ItemDetailContainer';
import Carrito from './components/Carrito';
const App = () => {
  return (
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
          <Route path='/detalle/:detalleId' element={<main className='AppMain'><ItemDetailContainer /></main>} />
          <Route path='/cart' element={<main className='AppMain'><Carrito /></main>} />
          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App