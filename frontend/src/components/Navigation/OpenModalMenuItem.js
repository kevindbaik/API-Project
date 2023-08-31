import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const checkItemText = (text) => {
    if(text === 'Delete') return 'manage-deletebutton'
    else if(text = 'Post Your Review') return 'review-createbutton'
    else return 'modal-text'
  }

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <div className={checkItemText(itemText)} onClick={onClick}>{itemText}</div>
  );
}

export default OpenModalMenuItem;
