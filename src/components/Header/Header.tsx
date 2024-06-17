import './Header.css';
import FiltersBtn from '../Buttons/FiltersBtn/FiltersBtn';
import { useLocation } from 'react-router-dom';
import BackBtn from '../Buttons/BackBtn/BackBtn';
import FavouritesBtn from '../Buttons/FavouritesBtn/FavouritesBtn';
import { ROUTE_FAVOURITES } from '../../constants/routes';

function Header() {
  const {pathname} = useLocation();
  return(
    <header className="header">
      <h1 className="header__title">Фильмы</h1>
      <div className='header__btns'>
        {
          pathname !== ROUTE_FAVOURITES && <FavouritesBtn/>
        }
        {
        pathname === '/'
          ?
            <FiltersBtn/>
          :
            <BackBtn/>
        }
      </div>
    </header>
  )
}

export default Header;