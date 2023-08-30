import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';

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
    <div>
      <h1> Are you sure you want to remove this spot? </h1>
      <button onClick={handleDelete}> Confirm </button>
      <button onClick={handleCancel}> Cancel </button>
    </div>
  )
}

export default DeleteModal
