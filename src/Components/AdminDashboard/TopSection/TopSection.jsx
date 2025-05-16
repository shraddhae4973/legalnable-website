import React from "react"
import './topsection.css'
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt } from "react-icons/bi"
import { BsQuestionCircle } from "react-icons/bs"
import { TbMessageCircle } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import img from '../../../Assets/1.jpg'
import video from '../../../Assets/video.mp4'

const TopSection = () => {
  const navigate = useNavigate();

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h3>Hello admin</h3>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder='Search' />
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

      <div className="cardSections flex">
        <div className="rightCard flex">
          <h1>Create diverse and inclusive community</h1>
          <p>Join our mission to support others through outreach, education, and advocacy.</p>

          <div className="buttons flex">
            <button className="abtn" onClick={() => navigate("/events/createevent")}>Create Event</button>
            <button className="abtn transparent">Events</button>
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        <div className="leftCard flex">
            <div className="sideBarCard">
              <BsQuestionCircle className="sideBarIcon" />
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle1"></div>

                <h3> Help Center</h3>

                <p> Having trouble in Legalnable, please contact us from for more questions</p>
                <button className="sideBarBtn"> Go to help center</button>
              </div>

            </div>

          </div>
        </div>
      </div>
  )
}

export default TopSection