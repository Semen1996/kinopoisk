import './Filter.css';
import FiltersStore from '../../../../store/filters-store';
import { observer } from 'mobx-react-lite';

const RemoveFilters = observer(() => {
  const {removeFilters} = FiltersStore;

  function deleteAll() {
    removeFilters();
  }

  return (
    <button className="filter__btn filter__btn_green filter__btn_rigth" onClick={deleteAll}>Очистить фильтры</button>
  )
});

export default RemoveFilters;