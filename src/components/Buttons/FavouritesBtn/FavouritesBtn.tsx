import { useNavigate } from 'react-router-dom';
import '../btn.css';
import { ROUTE_FAVOURITES } from '../../../constants/routes';

const FavouritesBtn = () => {
  const navigate = useNavigate();

  function clickBtn() {
    navigate(ROUTE_FAVOURITES);
  }

  return(
    <button className="btn btn_green" onClick={clickBtn}>Избранное</button>
  )
};

export default FavouritesBtn;