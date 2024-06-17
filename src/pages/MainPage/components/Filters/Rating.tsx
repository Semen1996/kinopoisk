import './Filter.css';
import { allRatingList } from "../../../../constants/filters";
import FiltersStore from '../../../../store/filters-store';
import { observer } from 'mobx-react-lite';
import Filter from "./Filter";
import { useState } from "react";

const Rating = observer(() => {
  const {rating, addMinRating, addMaxRating} = FiltersStore;
  const [interval, setInterval] = useState(false);
  
  function changeMinRaiting(item: string) {
    addMinRating(item);
  }

  function changeMaxRaiting(item: string) {
    addMaxRating(item);
  }

  function addInterval() {
    setInterval(true);
  }

  function removeInterval() {
    setInterval(false);
    changeMaxRaiting('');
  }

  return(
    <div className="filters">
      <Filter
        title={`По рейтингу ${ interval === true ? 'c' : ''}`}
        itemsList={allRatingList}
        activeItem={rating.min}
        changeActiveItem={changeMinRaiting}
      />
      {
        interval && 
          <>
            <Filter
              title={"По рейтингу до"}
              itemsList={allRatingList}
              activeItem={rating.max}
              changeActiveItem={changeMaxRaiting}
            />
            <button
              className="filter__btn filter__btn_red"
              onClick={removeInterval}
            >
              Удалить
            </button>
          </>
      }
      {
        (rating.min && !interval) &&
          <button
            className="filter__btn filter__btn_grey"
            onClick={addInterval}
          >
            +
          </button>
      }
    </div>

  );
});

export default Rating;