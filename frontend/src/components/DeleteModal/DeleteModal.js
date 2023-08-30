import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './DeleteModal.css'

function DeleteModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteSpot(spot.id));
    closeModal();
  };

  return (
    <div className='delete-modal-popup'>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from listings? </h2>

      <button id='confirm-button' className='modal-button' onClick={handleDelete}> Confirm (Delete Spot) </button>
      <button id='cancel-button' className='modal-button' onClick={handleCancel}> Cancel (Keep Spot) </button>
    </div>
  )
}

export default DeleteModal
