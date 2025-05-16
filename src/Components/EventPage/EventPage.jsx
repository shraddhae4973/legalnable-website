import { useEffect, useRef, useState } from "react";
import './eventPage.css';
import { BiDotsVertical } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi"
import { TbMessageCircle } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import img from '../../Assets/1.jpg'
import axios from 'axios';

const Eventpage = () => {

  const [events, setEvents] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const dropdownRefs = useRef({});

  const navigate = useNavigate();

  // Fetch events from backend

  useEffect(() => {
    axios
      .get("http://localhost:8080/events")
      .then(response => {
        setEvents(response.data); // Store fetched events in state
      })
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(events.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle dropdown toggle visibility
  const handleDropdownToggle = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };

  // Handle updating an event (navigate to edit event page)
  const handleUpdate = (eventId) => {
    navigate(`/events/getSingleEvent/${eventId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
  
      if (!isClickInsideAnyDropdown) {
        setDropdownVisible(null);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;
  
    axios
      .delete(`http://localhost:8080/events/deleteEvent/${eventId}`)
      .then((response) => {
        // Remove the deleted event from the UI
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Failed to delete the event.");
      });
  };

  return (
    <div className="event-page">
      <div className="container">
         <div className="headerSection flex">
            <div className="searchBar flex">
              <input type="text" placeholder='Search Dashboard' />
              <BiSearchAlt className="icon" />
            </div>
    
            <div className="adminDiv flex">
              <TbMessageCircle className="icon" />
              <IoMdNotificationsOutline className="icon" />
              <div className="adminImage">
                <img src={img} alt="Admin Image" />
              </div>
            </div>
          </div>
              
        {currentItems.map((item) => (
          <div key={item.id} className="card">
          <div className="left">
              <span className="img-path">{item.img}</span> 

              <div className="title-container">
                <span className="title">{item.eventTitle}</span>
              </div>

              <div className="description-container">
                <span className="description">{item.eventDescription}</span>
              </div>

              <div className="location-container">
                <span className="location">{item.location}</span>
              </div>
          </div>

          <div className="menu" ref={(el) => (dropdownRefs.current[item.id] = el)}>
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={() => handleDropdownToggle(item.id)}>
                <BiDotsVertical className="icon text-gray-600" />
              </button>
              {isDropdownVisible === item.id && (
                <div className="dropdown">
                  <div className="item" onClick={() => handleUpdate(item.id)}>Edit</div>
                 <div className="item delete" onClick={() => handleDelete(item.id)}>Delete</div>

                </div>
              )}
            </div>
          </div>
        ))}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      </div>
    </div>
  );
};

export default Eventpage;
