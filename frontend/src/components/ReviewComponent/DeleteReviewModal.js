import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteReview } from '../../store/reviews';
import { thunkGetSpotDetails } from '../../store/spots';

function DeleteReviewModal({ user, review, spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(thunkDeleteReview(review.id)).then(dispatch(thunkGetSpotDetails(spot.id)))
    closeModal();
  };

  return (
    <div className='delete-modal-popup'>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>

      <button id='confirm-button' className='modal-button' onClick={handleDelete}> Yes (Delete Review) </button>
      <button id='cancel-button' className='modal-button' onClick={handleCancel}> No (Keep Review) </button>
    </div>
  )
}

export default DeleteReviewModal
