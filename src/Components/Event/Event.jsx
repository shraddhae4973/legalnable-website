import React, {useEffect, useState} from "react";
import './event.css';
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import img from '../../Assets/2.jpg'
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';


const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });

    // Fetch events from backend
  // Fetch events from backend
  axios.get("http://localhost:8080/events")
    .then(response => {
      setEvents(response.data);
    })
    .catch(error => console.error("Error fetching events:", error));
}, []);
  
  return (
    <section className="popular section container">
      <div className="secContainer">
        <div className="secHeader flex">
          <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
            <h2 className="secTitle">
              Events
            </h2>

            <p>
            Stay connected with Legalnable through our upcoming workshops, awareness campaigns, and community meetups. Our events aim to educate, empower, and advocate for the rights of people with disabilities.
            </p>
          </div>

          <div data-aos="fade-left" data-aos-duration="2500" className="iconsDiv flex">
            <IoMdArrowBack className="icon leftIcon" />
            <IoMdArrowForward className="icon" />
          </div>
        </div>

        <div className="mainContent grid">
          {
            events.map(({ id, img, eventDescription, location, eventTitle }) => {
              return (
                <div key={id} data-aos="fade-up"   className="singleEvent">
                  <div className="eventImage">
                    
                  <img src={`http://localhost:8080/uploads/${img}`} alt="Event" />

                    <div className="overlayInfo">
                      <h3>{eventDescription}</h3>
                      <p>{location}</p>
                      <IoMdArrowForward className="icon" />
                    </div>
                  </div>

                  <div className="eventFooter">

                    {/* <div className="number">{id}</div> */}
                    <div className="number">
      <FaRegHeart  />
    
    </div>
                    <div className="eventText flex">
                      <h6>
                        {eventTitle}
                      </h6>

                      {/* <span className="flex">
                        <span className="dot">
                          <BsDot className="icon" />
                        </span>
                        Dot
                      </span> */}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Event