import { ROUTE_FILM } from '../../constants/routes';
import './Card.css';
import { useNavigate } from 'react-router-dom';

interface ICard {
  id: number;
  title: string;
  rating: number;
  year: number;
  img: string | undefined;
}

function Card ({title, rating, year, img, id}: ICard) {
  const navigation = useNavigate();
  function clickCard() {
    navigation(`${ROUTE_FILM}/${id}`);
  }

  return(
    <article className='card' onClick={clickCard}>
      <img className='card__img'src={img ? img : 'https://dissertations.tsu.ru/Content/no-avatar.png'} alt={title} loading="lazy"/>
      <div className='card__description'>
        <h3 className='card__title'>{title}</h3>
        <p className='card__item'>Год выпуска: {year}</p>
        <p className='card__item'>Рейтинг фильма: {rating}</p>
      </div>
    </article>
  )
}

export default Card;