import './App.scss';
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import CartContextPrvovider from './context/CartContext';
import User from './components/User';
import UserContextProvider from './context/UserContext';
import WindowContextProvider from './context/WindowContext';
const App = () => {


  return (
    <WindowContextProvider>
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
                <Route path='/categoria/:categoryId' element={<main className='AppMain'><ItemListContainer /></main>} />
                <Route path='/item/:detailId' element={<main className='AppMain'><ItemDetailContainer /></main>} />
                <Route path='/cart' element={<main className='AppMain'><Cart /></main>} />
                <Route path='/user' element={<main className='AppMain'><User /></main>} />
                <Route path='/*' element={<Navigate to='/' replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CartContextPrvovider>
      </UserContextProvider>
    </WindowContextProvider>

  )
}

export default App