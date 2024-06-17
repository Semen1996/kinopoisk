import './Filter.css';
import { useEffect, useState } from "react";


type FilterType = {
  title: string;
  itemsList: string[];
  activeItem: string;
  changeActiveItem: (item: string) => void
};

const Filter = ({changeActiveItem, itemsList, activeItem, title}: FilterType) => {
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

  return(
    <div className="filter">
      <button className="filter__btn" onClick={handleList}>{title}</button>
      <div className="filter__list-wrap">
        <ul className={`filter__list ${isOpenList && 'filter__list_active'}`}>
          {
            itemsList.map( item => 
              <li
                key={item}
                className={`filter__item ${activeItem === item && 'filter__item_active'}`}
                onClick={() => changeActiveItem(item)}
              >
                {item}
              </li> 
            )
          }
        </ul>
      </div>
    </div>
  )
};

export default Filter;