import './Filter.css';
import { allGenresList } from "../../../../constants/filters";
import FiltersStore from '../../../../store/filters-store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";



const Genres = observer(() => {
  const {genres, addOrRemoveGenres} = FiltersStore;
  const [isOpenList, setIsOpenList] = useState(false);

  useEffect(() => {
    function closeList(evt: Event) {
      const target = evt.target as HTMLElement;
      if(!target.classList.contains('filter__btn')) {
        setIsOpenList(false);
      }
    }

    window.addEventListener('click', closeList);

    return () => {
      window.removeEventListener('click', closeList);
    }
  }, []);
  
  function handleList() {
    setIsOpenList(!isOpenList);
  }

  function changeGenres(item: string) {
    addOrRemoveGenres(item);
  }

  return(
    <div className="filter">
      <button className="filter__btn" onClick={handleList}>По жанру</button>
      <div className="filter__list-wrap">
        <ul className={`filter__list ${isOpenList && 'filter__list_active'}`}>
          {
            allGenresList.map( item => 
              <li
                key={item}
                className={`filter__item ${genres?.includes(item) && 'filter__item_active'}`}
                onClick={() => changeGenres(item)}
              >
                {item}
              </li> 
            )
          }
        </ul>
      </div>
    </div>
  )
});

export default Genres;