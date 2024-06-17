import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from "./pages/MainPage/MainPage"
import FilmPage from './pages/FilmPage/FilmPage';
import Header from './components/Header/Header';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import { ROUTE_FAVOURITES, ROUTE_FILM } from './constants/routes';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path={ROUTE_FAVOURITES} element={<FavouritesPage/>}/>
        <Route path={`${ROUTE_FILM}/:id`} element={<FilmPage/>}/>
      </Routes>
    </>
  )
}

export default App
