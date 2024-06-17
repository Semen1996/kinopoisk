import ModalStore from '../../../store/modal-store';
import '../btn.css';
import { observer } from 'mobx-react-lite';

const FiltersBtn = observer(() => {
  const { openModal } = ModalStore;
  return(
    <button className="btn" onClick={openModal}>Фильтры</button>
  )
});

export default FiltersBtn;