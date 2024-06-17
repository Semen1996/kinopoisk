import './Modal.css';
import Rating from '../Filters/Rating';
import { observer } from 'mobx-react-lite';
import ModalStore from '../../../../store/modal-store';
import { MouseEvent } from 'react';
import Year from '../Filters/Year';
import Genres from '../Filters/Genres';
import RemoveFilters from '../Filters/RemoveFilters';

const Modal = observer(() => {
  const { modal, closeModal } = ModalStore;

  function modalHandler(event:  MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const target = event.target as HTMLElement;
    if(target.classList.contains('modal')) {
      closeModal();
    }
  }

  return(
    <div className={`modal ${!modal && 'modal_hide'}`} onClick={modalHandler}>
      <div className="modal__container">
        <h2 className="modal__title">Фильтры</h2>
        <div className="modal__filters">
          <Genres/>
          <Rating/>
          <Year/>
          <RemoveFilters/>
        </div>
        <button className='modal__close' onClick={closeModal}>+</button>
      </div>
    </div>
  )
});

export default Modal;