import React from "react"
import './activity.css'
import { BsArrowRightShort } from "react-icons/bs"
import img from '../../../Assets/1.jpg'

const Activity = () => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>User Activity</h1>

        <button className="abtn flex">
          See All
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="adminContainer grid">
        <div className="singleCustomer flex">
          <img src={img} alt="Customer Right" />

          <div className="customerDetails">
            <span className="name">User one</span>
            <small>Registered new user</small>
          </div>
          <div className="duration">
            6 hours ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={img} alt="Customer Right" />

          <div className="customerDetails">
            <span className="name">User two</span>
            <small>Request for legal Consulting</small>
          </div>
          <div className="duration">
            15 min ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={img} alt="Customer Right" />

          <div className="customerDetails">
            <span className="name">User three</span>
            <small>Registered to event</small>
          </div>
          <div className="duration">
            5 days ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={img} alt="Customer Right" />

          <div className="customerDetails">
            <span className="name">User one</span>
            <small>Registered new user</small>
          </div>
          <div className="duration">
            5 min ago
          </div>
        </div>

 
      </div>

    </div>
  )
}

export default Activity