import './Filter.css';
import { allYearList } from "../../../../constants/filters";
import FiltersStore from '../../../../store/filters-store';
import { observer } from 'mobx-react-lite';
import Filter from "./Filter";
import { useState } from "react";

const Year = observer(() => {
  const {year, addMinYear, addMaxYear} = FiltersStore;
  const [interval, setInterval] = useState(false);
  
  function changeMinYear(item: string) {
    addMinYear(item);
  }

  function changeMaxYear(item: string) {
    addMaxYear(item);
  }

  function addInterval() {
    setInterval(true);
  }

  function removeInterval() {
    setInterval(false);
    changeMaxYear('');
  }

  return(
    <div className="filters">
      <Filter
        title={`По году ${ interval === true ? 'c' : ''}`}
        itemsList={allYearList}
        activeItem={year.min}
        changeActiveItem={changeMinYear}
      />
      {
        interval && 
          <>
            <Filter
              title={"По году до"}
              itemsList={allYearList}
              activeItem={year.max}
              changeActiveItem={changeMaxYear}
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
        (year.min && !interval) &&
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

export default Year;