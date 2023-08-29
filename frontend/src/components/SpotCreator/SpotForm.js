import React from 'react'
import './SpotForm.css'

function SpotForm() {
  return (
    <div className='form-container'>
      <h1>Create a new Tree</h1>
      <h2>Where's your treehouse located?</h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <form>

        <label>Country</label>
        <input type='text' name='Country' placeholder='Country'/>

        <label>Street Address</label>
        <input type='text' name='Address' placeholder='Address'/>

        <label>City</label>
        <input type='text' name='city' placeholder='City'/>

        <label>State</label>
        <input type='text' name='state' placeholder='STATE'/>

        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and tree shape or wood.</p>
        <textarea placeholder='Please write at least 30 characters'/>

        <label>Create a title for your treehome</label>
        <p>Catch guests attention with a title that highlights what makes your tree special.</p>
        <input type='text' name='title' placeholder='Name of your spot'/>

        <label>Set a base price for your tree</label>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <input type='number' name='price' placeholder='Price per night (USD)'/>

        <label>Liven up your tree with photos</label>
        <p>Submit a link to at least one photo to publish your treehouse.</p>
        <input type='url' name='previewURL' placeholder='Preview Image URL'/>
        <input type='url' name='additionalURL' placeholder='Image URL'/>
        <input type='url' name='additionalURL' placeholder='Image URL'/>
        <input type='url' name='additionalURL' placeholder='Image URL'/>
        <input type='url' name='additionalURL' placeholder='Image URL'/>
      </form>

      <button>Submit</button>
    </div>
  )
}

export default SpotForm
