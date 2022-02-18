import './App.scss';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className='AppContainer'>
      <NavBar />

      <main className='AppMain'>
        <ItemListContainer />
      </main>
    </div>

  )
}

export default App