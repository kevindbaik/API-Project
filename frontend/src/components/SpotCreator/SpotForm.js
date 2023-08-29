import React from 'react';
import './SpotForm.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SpotForm() {
  const history = useHistory();
  const [ country, setCountry ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ city, setCity ] = useState("");
  const [ state, setState ] = useState("")
  const [ description, setDescription ] = useState("");
  const [ title, setTitle ] = useState("");
  const [ price, setPrice ] = useState(0);
  const [ preview, setPreview ] = useState("");
  const [ urlOne, setUrlOne ] = useState("");
  const [ urlTwo, setUrlTwo ] = useState("");
  const [ urlThree, setUrlThree ] = useState("");
  const [ urlFour, setUrlFour ] = useState("");

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updatePreview = (e) => setPreview(e.target.value)
  const updateUrlOne = (e) => setUrlOne(e.target.value)
  const updateUrlTwo = (e) => setUrlTwo(e.target.value)
  const updateUrlThree= (e) => setUrlThree(e.target.value)
  const updateUrlFour = (e) => setUrlFour(e.target.value)

  // hard code lat/long values because its optional
  const latitude = 11;
  const longitude = 14;

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      country,
      address,
      city,
      state,
      description,
      title,
      price,
      preview,
      urlOne
    })
  }


  return (
    <div className='form-container'>
      <h1>Create a new Tree</h1>
      <h2>Where's your treehouse located?</h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>

      <form onSubmit={handleSubmit}>
        <label>Country</label>
        <input type='text'
        name='Country'
        value={country}
        onChange={updateCountry}
        placeholder='Country'/>

        <label>Street Address</label>
        <input type='text'
        name='Address'
        value={address}
        onChange={updateAddress}
        placeholder='Address'/>

        <label>City</label>
        <input type='text'
        name='city' value={city}
        onChange={updateCity}
        placeholder='City'/>

        <label>State</label>
        <input type='text'
        name='state'
        value={state}
        onChange={updateState}
        placeholder='STATE'/>

        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and tree shape or wood.</p>
        <textarea value={description}
        onChange={updateDescription}
        placeholder='Please write at least 30 characters'/>

        <label>Create a title for your treehome</label>
        <p>Catch guests attention with a title that highlights what makes your tree special.</p>
        <input type='text'
        name='title'
        value={title}
        onChange={updateTitle}
        placeholder='Name of your spot'/>

        <label>Set a base price for your tree</label>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <input type='number'
        min='1'
        name='price'
        value={price}
        onChange={updatePrice}
        placeholder='Price per night (USD)'/>

        <label>Liven up your tree with photos</label>
        <p>Submit a link to at least one photo to publish your treehouse.</p>
        <input type='url'
        name='previewURL'
        value={preview}
        onChange={updatePreview}
        placeholder='Preview Image URL'/>
        <input type='url'
        name='additionalURL'
        value={urlOne}
        onChange={updateUrlOne}
        placeholder='Image URL'/>
        <input type='url'
        name='additionalURL'
        value={urlTwo}
        onChange={updateUrlTwo}
        placeholder='Image URL'/>
        <input type='url'
        name='additionalURL'
        value={urlThree}
        onChange={updateUrlThree}
        placeholder='Image URL'/>
        <input type='url'
        name='additionalURL'
        value={urlFour}
        onChange={updateUrlFour}
        placeholder='Image URL'/>

        <button type='submit'>Submit</button>
      </form>

    </div>
  )
}

export default SpotForm
