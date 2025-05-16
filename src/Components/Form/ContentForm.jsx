import React, { useState, useEffect } from "react";
import './form.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const ContentForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Get eventId from URL if it's an edit
  const [eventTitle, setEventTitle] = useState('');
  const [location, setLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState('');

// If we are editing, fetch the current event details
useEffect(() => {
  if (eventId) {
    // If eventId is available, fetch the event to populate the form for editing
    axios.get(`http://localhost:8080/events/getSingleEvent/${eventId}`)
      .then(response => {
        const { eventTitle, location, eventDescription, img } = response.data;
        setEventTitle(eventTitle);
        setLocation(location);
        setEventDescription(eventDescription);
        setImg(img);  
      })
      .catch(error => {
        console.error("Error fetching event details:", error);
        setMessage("Error loading event details.");
      });
  }
}, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('eventTitle', eventTitle);
    formData.append('location', location);
    formData.append('eventDescription', eventDescription);
     // Append image only if a new image was selected
    if (img && typeof img !== 'string') {
      formData.append('img', img);
    }
    try {
      let response;
      if (eventId) {
        response = await axios.post(`http://localhost:8080/events/updateEvent/${eventId}`, formData);
      } else {
        if (!img) {
          setMessage("Please select an image.");
          return;
        }
        formData.append('img', img);
        response = await axios.post('http://localhost:8080/events/createevent', formData);
      }
  
      setMessage(response.data.message);
      navigate("/eventPage");
    }  catch (error) {
      if (error.response && error.response.data) {
        setMessage(JSON.stringify(error.response.data));
        console.error("Validation Errors:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        setMessage("An error occurred while submitting the event.");
        console.error("Unknown Error:", error);
      }
    }
  };


  return (
    <div className="formContainer">
      <h1 className="formheader">{eventId ? 'Edit Event' : 'Create Event'}</h1>
      <form className="formDiv" onSubmit={handleSubmit}>
        <label htmlFor="eventname">Event Name</label>
        <input
          type="text"
          placeholder="Enter Event Name"
          name="eventTitle"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          placeholder="Enter Event Location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          id="desc"
          cols="70"
          rows="10"
          placeholder="Enter Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="picture">Picture</label>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />

<button className="formbtn" type="submit">
          {eventId ? 'Update' : 'Create'} Event
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: 'black'}}>{message}</p>}
    </div>
  );
};

export default ContentForm;
