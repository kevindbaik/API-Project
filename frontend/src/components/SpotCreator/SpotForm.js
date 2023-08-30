import React from 'react';
import './SpotForm.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateSpot, thunkGetSpotDetails, thunkCreateImageForSpot } from '../../store/spots';

function SpotForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [ country, setCountry ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ city, setCity ] = useState("");
  const [ state, setState ] = useState("")
  const [ description, setDescription ] = useState("");
  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState(0);
  const [ preview, setPreview ] = useState("");
  const [ urlOne, setUrlOne ] = useState("");
  const [ urlTwo, setUrlTwo ] = useState("");
  const [ urlThree, setUrlThree ] = useState("");
  const [ urlFour, setUrlFour ] = useState("");
  const [ errors, setErrors ] = useState({})

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updatePreview = (e) => setPreview(e.target.value)
  const updateUrlOne = (e) => setUrlOne(e.target.value)
  const updateUrlTwo = (e) => setUrlTwo(e.target.value)
  const updateUrlThree= (e) => setUrlThree(e.target.value)
  const updateUrlFour = (e) => setUrlFour(e.target.value)

 function checkErrors(
  address,
  city,
  state,
  country,
  name,
  description,
  price
) {
  const errorsObj = {};
  if(address.length < 4) errorsObj['address'] = 'Valid address is required.';
  if(city.length < 1) errorsObj['city'] = 'Valid city is required.';
  if(state.length < 1) errorsObj['state'] = 'Valid state is required.'
  if(country.length < 2) errorsObj['country'] = 'Valid country is required.';
  if(name.length < 1) errorsObj['name'] = 'Valid name is required.';
  if(description.length < 30) errorsObj['description'] = 'Description must be at least 30 characters.';
  if(price <= 0) errorsObj['price'] = 'Valid price is required.';
  if(preview.length < 1) errorsObj['preview'] = 'Preview image is required.'

  return errorsObj;
}

  // hard code lat/long values because its optional
  const lat = 11;
  const lng = 14;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = checkErrors(
      address,
      city,
      state,
      country,
      name,
      description,
      price
    );

    setErrors(foundErrors);

    if(Object.values(errors).length > 0) {
      console.log('error found!', foundErrors)
      return null
    }

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };

    let newSpot = await dispatch(thunkCreateSpot(payload));
    if(newSpot) {
      dispatch(thunkCreateImageForSpot(newSpot.id, preview, true))
      dispatch(thunkCreateImageForSpot(newSpot.id, urlOne, false))
      dispatch(thunkCreateImageForSpot(newSpot.id, urlTwo, false))
      dispatch(thunkCreateImageForSpot(newSpot.id, urlThree, false))
      dispatch(thunkCreateImageForSpot(newSpot.id, urlFour, false))
      dispatch(thunkGetSpotDetails(newSpot.id))
      history.push(`/spots/${newSpot.id}`)
    };
  }


  return (
    <div className='form-container'>
      <h1>Create a New Spot</h1>
      <h2>Where's your treehouse located?</h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>

      <form onSubmit={handleSubmit}>
        <label>Country</label>
        <input type='text'
        name='Country'
        value={country}
        onChange={updateCountry}
        placeholder='Country'/>
        {errors.country && <p>{errors.country}</p>}

        <label>Street Address</label>
        <input type='text'
        name='Address'
        value={address}
        onChange={updateAddress}
        placeholder='Address'/>
        {errors.address && <p className='form-errors'>{errors.address}</p>}

        <label>City</label>
        <input type='text'
        name='city' value={city}
        onChange={updateCity}
        placeholder='City'/>
         {errors.city && <p className='form-errors'>{errors.city}</p>}

        <label>State</label>
        <input type='text'
        name='state'
        value={state}
        onChange={updateState}
        placeholder='STATE'/>
         {errors.state && <p className='form-errors'>{errors.state}</p>}

        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and tree shape or wood type.</p>
        <textarea value={description}
        onChange={updateDescription}
        placeholder='Please write at least 30 characters'/>
         {errors.description && <p className='form-errors'>{errors.description}</p>}

        <label>Create a title for your treehome</label>
        <p>Catch guests attention with a title that highlights what makes your tree special.</p>
        <input type='text'
        name='name'
        value={name}
        onChange={updateName}
        placeholder='Name of your spot'/>
         {errors.name && <p className='form-errors'>{errors.name}</p>}

        <label>Set a base price for your tree</label>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <input type='number'
        name='price'
        value={price}
        onChange={updatePrice}
        placeholder='Price per night (USD)'/>
         {errors.price && <p className='form-errors'>{errors.price}</p>}

        <label>Liven up your tree with photos</label>
        <p>Submit a link to at least one photo to publish your treehouse.</p>
        <input type='url'
        name='previewURL'
        value={preview}
        onChange={updatePreview}
        placeholder='Preview Image URL'/>
         {errors.preview && <p className='form-errors'>{errors.preview}</p>}
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
