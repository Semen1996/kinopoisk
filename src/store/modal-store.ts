import { makeAutoObservable } from "mobx";

type ModalType =  boolean;

class ModalStore {
  modal: ModalType = false;

  constructor() {
    makeAutoObservable(this);
  }

  openModal = () => {
    this.modal = true;
  }

  closeModal = () => {
    this.modal = false;
  }
}

export default new ModalStore;